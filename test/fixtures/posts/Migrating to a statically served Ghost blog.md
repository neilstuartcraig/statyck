# Migrating to a statically served Ghost blog

The blog you're reading is produced by Ghost which previously I'd served in a pretty typical way - an AWS instance running Node and a local MySQL database server. This was fine for quite a while but recently, there has been a spate of security issues in, for instance, OpenSSL. This and an increasing cost of hosting on AWS which frequently triggered my AWS billing alerts (incidentally, if you run anything on AWS, I'd strongly recommend you set these up) led me to reconsider how I host my blog.

After some thought, the strategy I came up with is static serving via AWS S3. I also wanted to add a CDN in order to better serve readers who are further from my hosting origin, so I took the opportunity to plan this in as well. Static serving gives a number of advantages, chiefly:

* Much lower hosting costs
* A massively reduced attack surface
* Zero-downtime upgrades are much simpler

But also the disadvantage that the admin/editing side of my blog is now not available over the internet. This is not a problem in my situation as I am the only contributor.

The new solution involves me running VirtualBox (on my MacBook Pro) which hosts a Debian virtual machine onto which I installed:

* IOJS (compiled from source - instructions in the source readme)
* Percona (installed from the Percona Debian repo)
* NginX (installed from the NginX Debian repo
* NTP (from the standard Debian repo: sudo apt-get install ntp). This helps keep the VM system clock accurate - S3 uploads will fail if it's drifted.

I then had to download my Ghost website files (using tar + gzip: tar -czf blog.tar.gz /path/to/files) and database (via MySQLDump) and install them on the VM (via SCP), restoring the database locally. I then amended my Ghost config to point to the new, local database server and also configured Ghost to listen on localhost.

Once that was done, I set up NginX to proxy to the local, dynamic (i.e. the version I use to add posts) version of Ghost and also to serve a local, static version of the site so I can check it before publishing (simplified):

```
# Dynamic, local version:
upstream ghost {  
    server 127.0.0.1:2368 max_fails=0 fail_timeout=10s;
}

server {  
    listen 80 deferred;
    server_name thedotproduct.org;
    server_tokens off;

    gzip on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_types text/plain text/css application/javascript application/json application/xml application/octet-stream;
    location /
    {
        proxy_set_header Connection "";
        proxy_http_version 1.1;
        proxy_pass http://ghost;
    }
}

#Static, local version:
server {  
    server_name static.thedotproduct.org;
    listen 81;

    location / {
        index index.html;
        alias /var/www/static.thedotproduct.org/127.0.0.1/;
    }
}
```

A little port forwarding on VirtualBox from 127.0.0.1:9080 (on my host MacBook Pro) to the VM guest on 10.0.2.15:80 and from  127.0.0.1:9081 (host) to 10.0.2.15:81 (guest) to allows me to access the dynamic Ghost instance via http://127.0.0.1:9080/ and the static instance on http://127.0.0.1:9081/ - nice!

So I then needed to be able to reliably and automatically (via CLI script) create the static version of my Ghost blog. For this, I wanted to keep things as simple as I could so I turned to wget which is installed by default on most Linux distro's. To cut a long-ish story short, I simply used the wget arguments -m (mirror) and -p (download assets) to recursively download the whole blog (running this on my VM). This worked just fine but had a small issue with assets which I am versioning via a query string - wget added the query string to the filename it downloaded and since NginX didn't know this, it was looking for static files without the query string in the filename - not good. I couldn't find a solution natively with wget (maybe I should have tried cURL?) so I did a little bit of googling and adapted some findings to create a solution using find and its -exec argument to remove the query string recursively from any downloaded local assets.

Once this was done, I finally needed to be able to upload my files to S3 so I used the AWS CLI (with an argument wrapper so I can easily first check locally before pushing to S3) in my publish script. The publish script now looks like this (it's really simple and somewhat rough and ready at the moment):

```
#!/bin/bash

# vars
HOSTNAME="thedotproduct.org"  
STATIC_DIR="/var/www/static.thedotproduct.org"  
STATIC_ASSET_DIR="/root/tdp-local/static-assets"  
LOCAL_SCHEME="http://"  
LOCAL_ADDRESS="127.0.0.1"  
LOCAL_PORT=80  
S3_BUCKET="thedotproduct.org"  
WEB_SERVER_GROUP="www-data"  
MAX_AGE="3600"

# Crawl local version of website
mkdir -p $STATIC_DIR  
cd $STATIC_DIR

# wget the local dynamic website content...
wget -m -p --header="Host: $HOSTNAME" -q $LOCAL_SCHEME$LOCAL_ADDRESS:$LOCAL_PORT/

# ...and some static asset files which aren't linked in the HTML
cp -R $STATIC_ASSET_DIR/* $STATIC_DIR/$LOCAL_ADDRESS/

chgrp -R $WEB_SERVER_GROUP $STATIC_DIR  
chmod -R g+rx $STATIC_DIR

# Remove query strings appended to filenames
find ./$LOCAL_ADDRESS -name "*\?*" -exec rename 's/\?.*$//' * {} \;

# Upload to S3 if "upload" is the first arg
if [ "$1" = "upload" ]  
then  
aws s3 sync ./$LOCAL_ADDRESS/ s3://$S3_BUCKET --acl public-read --delete --cache-control "public,max-age=$MAX_AGE"  
fi  
```

So I can simply name the above as e.g. publish.sh and mark it executable (via chmod +x publish.sh) and just run that first to simply check locally: ./publish.sh and then when I'm comfortable it's all good, upload to S3: ./publish.sh upload.

Note: S3 does not send a `Cache-Control` header by default, hence the `--cache-control "public,max-age=$MAX_AGE"` in the script above.

I had one last issue to solve, and to be honest, I had been putting it off as it's a bit awkward. My dynamic hosting had been set up to send an HSTS header with max-age of 1 year. This meant, essentially, that I had to serve the website over HTTPS as anyone or any crawlers which had visited the website in the past would require that HTTPS connection and would hard-fail if it was unavailable. S3 doesn't support direct HTTPS so it wasn't an option to serve direct from S3 and in any case, I wanted to add a CDN. The added complexity was that I serve the website on the zone apex (i.e. thedotproduct.org - no "www" or other sub-domain). AWS Cloudformation could have worked as they offer CNAME flattening via their "alias" records, but try as I might, I couldn't get it to serve my pages (which are all called index.html in a directory named for the blog post title slug). I then remembered that Cloudflare had announced support for (RFC-compliant) CNAME flattening so I headed over and configured a free Cloudflare account which also now includes a free TLS certificate without even the need for you to create a CSR and private key - double win! This worked really nicely with very, very little effort - just a delay (about 10 hours) while Cloudflare presumably aggregated some TLS certificate requests and created a SAN certificate which included my hostname.

Lastly, just worth mentioning that the Cloudflare TLS and web-server configuration is (as you'd expect), really nice and gives me an A-rating on Qualys labs SSL tester (also the newest strong ciphersuite - Cha-cha) and also IPv4 and IPv6 connectivity.

This new hosting method has reduced hosting costs from about $60/month to single-digit $'s. I'm not quite sure how much yet as it's only been active a week or two but it'll be an order of magnitude lower which is not to be sniffed at.

I'm going to ultimately look at creating a Ghost plugin to statically publish in the future (unless someone has already done it or beats me to it).

long post but I hope it helps explain one approach - it'd be great to hear other people's approaches and opinions.