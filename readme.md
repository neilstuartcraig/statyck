# statyck

[![Travis CI build status](https://travis-ci.org/neilstuartcraig/statyck.svg)](https://travis-ci.org/neilstuartcraig/statyck)


## Overview
A super simple, markdown-based, static blog generator. 

`statyck` takes [Markdown](https://en.wikipedia.org/wiki/Markdown) files in a known directory/folder structure and generates a (template-able, via [Handlebars](http://handlebarsjs.com/)) set of blog posts and pages, each with optional assets (images etc.).



## Prerequisites
* [NodeJS](https://nodejs.org/) and [NPM](https://www.npmjs.com/) (NPM is included in the installers from nodejs.org)
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
