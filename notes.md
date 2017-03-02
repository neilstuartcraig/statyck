# Statyck notes

switch the PoC around a little and create all the posts (if they need creating/updating) first, building an array for the nav/index as we go...
...then build the index page(s) at the end.
poss even don't write anything until the end in case sutin goes wrong, less likely that we'll end up in an unknown state

also include some way to have static (HTML) files e.g. "about", "contact" etc. 

MORE:
* add static types to all vars
* add static types to all functions to denote the type they return
* generate output in a temp dir and use a symlink to point to current ver, keep X old versions
* automatically amend ver path for assets when the mtime changes - maybe just use mtime ts as the path prefix? - dont use QS
* create "content-source" dir 
* move posts dir into content-source
    * create sub-dirs for drafts and publish
* create img, misc in content-source dir
* rename "rendered" dir to e.g. public
* add content and template statics to public
* post-install script
    * create template and per-proj config file
    * create dir structure 
* CLI scripts - prob common top-level cmd e.g. xblog <operation> <options>:
    * render-content (this)
    * deploy/publish-content
    * git-add-commit-push (or would this be done in deploy?)
    * new-post
* static content - render via static
    * need separate nav for statics but it should use the same processing for rendering but diff template file


PROC ORDER:
* DONE load config - require
* list files
    * DONE posts
        * build index object (in RAM, all files, ctime, mtime etc.)
            * stat files & get dates
    * DONE static pages
        * build index (in RAM, all files, ctime, mtime etc.)
            * stat files & get dates
* render files
    * check if mdate on dest < mdate on src
    * if y, render to dest
        * posts
        * static files
* write indexes to dest dir - with pagination
    * posts
    * static pages    
* copy assets to output dir

SETUP
* create source-content dir structure (if !exists)
