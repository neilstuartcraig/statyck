// Statyck application (not user) configuration
// NOTE: This is a .js (!.json)file so that we can have functions and/or comments!

"use strict";

// NOTE: Attempting to future-proof a little here by potentially allowing env-specific configs
// Prod(uction) config
const production = 
{
    // Source Content
    contentSourceBaseDir: "content-source", // The base dir for the content we will build *from* (i.e. the markdown files)

    // Pages
    pagesSourceDirectory: "pages", // The dir name *within* contentSourceBaseDir which contains pages
    pagesOutputDirectory: "pages", // The destination dir into which we want to write our built pages (this dir will be inside the base output Dir)
    pagesIndexTemplateFilename: "pages-index", // The name of the index template filename (without the implicit filename extension of .html) for page indexes (this must not include a path, filename only)
    pagesTemplateFilename: "page", // The name of the index template filename (without the implicit filename extension of .html) for pages (this must not include a path, filename only)
    pagesAssetsSourceDirectory: "assets", // Directory name for source assets dir inside `pagesSourceDirectory`
    pagesAssetsDestinationDirectory: "assets", // Directory name for destination assets dir inside `statyckConfig.general.outputBaseDir`

    // Posts
    postsSourceDirectory: "posts", // The dir name *within* contentSourceBaseDir which contains posts
    postsOutputDirectory: "posts", // The destination dir into which we want to write our built posts (this dir will be inside the base output Dir)
    postsIndexTemplateFilename: "posts-index", // The name of the index template filename (without the implicit filename extension of .html) for post indexes (this must not include a path, filename only)
    postsTemplateFilename: "post", // The name of the index template filename (without the implicit filename extension of .html) for posts (this must not include a path, filename only)
    postsAssetsSourceDirectory: "assets", // Directory name for source assets dir inside `postsSourceDirectory`
    postsAssetsDestinationDirectory: "assets", // Directory name for destination assets dir inside `statyckConfig.general.outputBaseDir`

    // Theme
    themesSourceDirectory: "themes", // The base directory (relative to the project root directory) which contains available Statyck themes
    themeAssetsSourceDirectory: "assets", // Directory name for source assets dir inside `themeConfig.sourceDir`
    themeAssetsDestinationDirectory: "assets", // Directory name for source assets dir inside `statyckConfig.general.outputBaseDir`
    defaultThemeDirectory: "default", // The name of the directory inside `themesSourceDirectory` which contains the default Statyck theme

    // Output
    outputDirectorySymlink: "latest", // The name of the symlink inside `statyckConfig.general.outputBaseDir which links to the latest-built set of files

    // Config
    userlandConfigDestinationDirectory: "statyck-config", // Directory (relative to project root directory) which will be created by init to copy the below userland config templates
    userlandConfigTemplateSourceDirectory: "config-templates" // Directory (relative to this codebase root directory) in which userland config templates are stored

};

module.exports["production"] = production;