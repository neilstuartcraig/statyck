# statyck

[![Travis CI build status](https://travis-ci.org/neilstuartcraig/statyck.svg)](https://travis-ci.org/neilstuartcraig/statyck)


## Overview
A super simple, markdown-based, static blog generator. 

`statyck` takes [Markdown](https://en.wikipedia.org/wiki/Markdown) files in a known directory/folder structure and generates a (template-able, via [Handlebars](http://handlebarsjs.com/)) set of blog posts and pages, each with optional assets (images etc.).


## Quickstart
If you're familiar with node installation and the command line (and you're on a *nix-like system), run this in your shell:

```
cd 
mkdir statyck-blog
cd $_
npm install statyck --production --global
statyck init
statyck build
statyck local
```

You should then see a message (roughly) as follows:

```
Local server running at http://127.0.0.1:8080/
```

So you can now open `http://127.0.0.1:8080` in your browser and you'll see a very basic, starter website.

You can then modify your content inside `./content-source/` then run:

```
statyck build
statyck local
```

And test in your browser again. Once you're happy, you can copy your website files from `./output/` to your web server/service.



## Prerequisites
* [NodeJS](https://nodejs.org/) and [NPM](https://www.npmjs.com/) (NPM is included in the installers from nodejs.org)
    * Node version 6+ is required
* Optional: [Yarn]()


## Installation

### Via Yarn  
```
yarn global add statyck
```  
Note: For development use, omit the `global` command (i.e. run `yarn add statyck`)

...or...

### Via NPM  
```
npm install statyck --production --global
```  
Note: For development use, omit the `--production --global` flags  


## Using statyck

### Creating a new blog/website
Assuming you're currently in the directory/folder which you'd like to host your new blog and you have done a global install of statyck:  

```
statyck init
```

This will create some directories/folders in the current working directory/folder.

### Adding your content
You now need to edit the markdown files in `content-source/pages` and `content-source/posts`. You can:

* Delete (or edit) the existing files
* Create any new pages and/or posts you want:
    * One `content-source/pages` file for each page you want on your blog/website
    * One `content-source/posts` file for each blog post you want on your blog/website (they'll be listed in date order, newest first)
    * Both `content-source/pages` and `content-source/posts` must be valid [Markdown](https://en.wikipedia.org/wiki/Markdown) files
    * Add any assets (e.g. images for pages/posts) in `content-source/pages/assets` or `content-source/posts/assets` inside the relevant directory/folder
        * Note: assets can be referenced in pages/posts via the path `./assets/<dir>/<asset filename>`

### Building your blog/website

```
statyck build
```

Note: the built files will be in `./output` 


### Testing your website locally

Statyck `v1.4.0` added a very simple local web server which you can use to test your website before you deploy it. Just run:

```
statyck local
```

**WARNING** This web server is absolutely *NOT* intended for any other usage than local testing, it's not at all resilient/stable and potentialy/probably insecure! Do not ever run a public service with this web server. For this reason, the web server binds to `127.0.0.1` *only* - this is *not* configurable for a good reason! Sorry for the rant but this is important.

You can amend the port (`:8080` by default) on which the local web server is run (e.g. if you have something running on/bound to `127.0.0.1:8080` already).


### Deploying your blog/website
`statyck` doesn't currently handle deployments but you could, for example deploy to...:

* AWS S3: `aws s3 cp ./output/* s3://<bucket name>`
* Google Cloud Storage: `gsutil -m cp -r ./output/* gs://<bucket name>`

If you would like `statyck` to be able deploy, please let me know via [issues](./issues) and I'll consider your request. Likely any deployment addition would be via a plugin/addon system which would probably be independent of `statyck` in most/all regards.


## Semver
This project aims to maintain the [semver](http://semver.org/) version numbering scheme.


## Changelog
Please see the [changelog](./changelog.md) file


## To do list, bugs, feature requests etc.
Please see [issues](./issues)


## Contributing
Contributions are *very* welcome for fixes, improvements, new features, documentation, bug reports and/or ideas. Please create a Github issue initially so we can discuss and agree actions/approach - that should save time all-round.

The ideal way to receive contributions is via a [Github Pull Request](https://help.github.com/articles/using-pull-requests/) from the master branch. Please ensure that at least unit tests (you can run these via `npm test`) and if possible, linter rules (`npm run lint`).

If you find a sensitive, security issue with this application, please email me privately in the first instance: `neil [dot] craig [at] thedotproduct [dot] org`.


## License
[MIT license](./license.md)
