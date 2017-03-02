"use strict";

// Deps - Core

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _statyckLib = require("./lib/statyck-lib.js");

var _statyckLib2 = _interopRequireDefault(_statyckLib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// NOTE: Path is relative to build dir (dist/) - local because lib is babel'd

function build(currentWorkingDirectory, statyckConfig, callback) {
    if (!(typeof currentWorkingDirectory === 'string')) {
        throw new TypeError("Value of argument \"currentWorkingDirectory\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(currentWorkingDirectory));
    }

    if (!(statyckConfig instanceof Object)) {
        throw new TypeError("Value of argument \"statyckConfig\" violates contract.\n\nExpected:\nObject\n\nGot:\n" + _inspect(statyckConfig));
    }

    if (!(typeof callback === 'function')) {
        throw new TypeError("Value of argument \"callback\" violates contract.\n\nExpected:\nFunction\n\nGot:\n" + _inspect(callback));
    }

    // Create a (JS-style, inc. milliseconds) timestamp for use in paths
    const currentTimestamp = new Date().getTime();

    // Calculate the content source path
    const contentSourceBaseDir = _path2.default.resolve(currentWorkingDirectory, "content-source");

    // Calculate the output directory path - this will be used as a basis for all other paths, see below ...
    const outputBaseDir = _path2.default.resolve(currentWorkingDirectory, statyckConfig.general.outputBaseDir);

    // ... then calculate the path to the version-specific dir
    const versionOutputBaseDir = _path2.default.join(outputBaseDir, currentTimestamp.toString(10));

    // List the pages files
    const pagesSourcePath = _path2.default.join(contentSourceBaseDir, "pages");
    _statyckLib2.default.listFiles(pagesSourcePath, statyckConfig.pages.contentSourceFilenameExtension, (listPagesErr, pagesFiles) => {
        if (listPagesErr) {
            // NOTE: Trying to make the output more user-friendly but have kept listPagesErr as an Error for the mo at least
            console.error(listPagesErr.message);
            process.exit(1);
        }

        // build the pages
        const pagesOutputDirectory = _path2.default.join(versionOutputBaseDir, "pages");
        _statyckLib2.default.getFilesContent(pagesSourcePath, pagesFiles, statyckConfig.pages.contentSourceFilenameExtension, statyckConfig.theme.settings, statyckConfig.pages.numPostsPerIndexPage, pagesOutputDirectory, (getPagesErr, pages) => {
            if (getPagesErr) {
                console.error(getPagesErr.message);
                process.exit(1);
            }

            // TODO: it'd be more sensible/obvious to calc the name of the file and then use a lib fn to get the file content - we'd drop a fn too
            // Read in the pages index template
            _statyckLib2.default.getTemplateFile(statyckConfig.theme.sourceDir, "pages-index", (pageIndexGTFErr, pagesIndexTemplate) => // eslint-disable-line consistent-return
            {
                if (pageIndexGTFErr) {
                    console.error(pageIndexGTFErr.message);
                    process.exit(1);
                }

                const pagesContextIndex = {}; // We don't need any additional context for the pages index
                _statyckLib2.default.createIndexes(pages, statyckConfig.pages.numPostsPerIndexPage, pagesIndexTemplate, statyckConfig.theme.settings, pagesContextIndex, pagesOutputDirectory, false, (PCIErr, pagesIndex) => {
                    if (PCIErr) {
                        console.error(PCIErr.message);
                        process.exit(1);
                    }

                    // Copy static assets for pages to the output dir
                    const pagesAssetsSourcePath = _path2.default.join(contentSourceBaseDir, "pages", "assets");
                    const pagesAssetsDestinationPath = _path2.default.join(versionOutputBaseDir, "pages", "assets");
                    _statyckLib2.default.copyAssetFiles(pagesAssetsSourcePath, pagesAssetsDestinationPath, PaCAFErr => {
                        if (PaCAFErr) {
                            console.error(PaCAFErr.message);
                            process.exit(1);
                        }

                        // Read in the page template
                        _statyckLib2.default.getTemplateFile(statyckConfig.theme.sourceDir, "page", (pageGTFErr, pageTemplate) => // eslint-disable-line consistent-return
                        {
                            if (pageGTFErr) {
                                console.error(pageGTFErr.message);
                                process.exit(1);
                            }

                            const pagesContext = {
                                theme: statyckConfig.theme.settings,
                                pagesIndexHTML: pagesIndex
                            };

                            _statyckLib2.default.createOutputFiles(pageTemplate, pages, pagesContext, pagesOutputDirectory, COFPErr => {
                                if (COFPErr) {
                                    console.error(COFPErr.message);
                                    process.exit(1);
                                }

                                // POSTS -------------------------------------------------------------                

                                // List the blog post files
                                const postsSourcePath = _path2.default.join(contentSourceBaseDir, "posts");
                                _statyckLib2.default.listFiles(postsSourcePath, statyckConfig.posts.contentSourceFilenameExtension, (listPostsErr, blogPostFiles) => {
                                    if (listPostsErr) {
                                        // NOTE: Trying to make the output more user-friendly but have kept listPostsErr as an Error for the mo at least
                                        console.error(listPostsErr.message);
                                        process.exit(1);
                                    }

                                    // Process posts
                                    const postsOutputDirectory = _path2.default.join(versionOutputBaseDir, "posts");
                                    _statyckLib2.default.getFilesContent(postsSourcePath, blogPostFiles, statyckConfig.posts.contentSourceFilenameExtension, statyckConfig.theme.settings, statyckConfig.posts.numPostsPerIndexPage, postsOutputDirectory, (getBlogPostsErr, blogPosts) => {
                                        if (getBlogPostsErr) {
                                            console.error(getBlogPostsErr.message);
                                            process.exit(1);
                                        }

                                        // Read in the post template
                                        _statyckLib2.default.getTemplateFile(statyckConfig.theme.sourceDir, "post", (postGTFErr, postTemplate) => // eslint-disable-line consistent-return
                                        {
                                            if (postGTFErr) {
                                                console.error(postGTFErr.message);
                                                process.exit(1);
                                            }

                                            // NOTE This context obj is the same as that for pages
                                            const postsContext = {
                                                theme: statyckConfig.theme.settings,
                                                pagesIndexHTML: pagesIndex
                                            };

                                            // Create the output files (one per post)
                                            _statyckLib2.default.createOutputFiles(postTemplate, blogPosts, postsContext, postsOutputDirectory, COFErr => {
                                                if (COFErr) {
                                                    console.error(COFErr.message);
                                                    process.exit(1);
                                                }

                                                // Read in the posts index template
                                                _statyckLib2.default.getTemplateFile(statyckConfig.theme.sourceDir, "posts-index", (postsIndexGTFErr, postsIndexTemplate) => // eslint-disable-line consistent-return
                                                {
                                                    if (postsIndexGTFErr) {
                                                        console.error(postsIndexGTFErr.message);
                                                        process.exit(1);
                                                    }

                                                    const postsContextIndex = {
                                                        pagesIndexHTML: pagesIndex
                                                    };
                                                    _statyckLib2.default.createIndexes(blogPosts, statyckConfig.posts.numPostsPerIndexPage, postsIndexTemplate, statyckConfig.theme.settings, postsContextIndex, versionOutputBaseDir, true, CIErr => {
                                                        if (CIErr) {
                                                            console.error(CIErr.message);
                                                            process.exit(1);
                                                        }

                                                        // Copy static assets for posts to the output dir
                                                        const postsAssetsSourcePath = _path2.default.join(contentSourceBaseDir, "posts", "assets");
                                                        const postsAssetsDestinationPath = _path2.default.join(versionOutputBaseDir, "posts", "assets");
                                                        _statyckLib2.default.copyAssetFiles(postsAssetsSourcePath, postsAssetsDestinationPath, PCAFErr => {
                                                            if (PCAFErr) {
                                                                console.error(PCAFErr.message);
                                                                process.exit(1);
                                                            }

                                                            // Copy static assets for the theme to the output dir
                                                            const themeAssetsSourcePath = _path2.default.resolve(currentWorkingDirectory, statyckConfig.theme.sourceDir, "assets");
                                                            const themeAssetsDestinationPath = _path2.default.join(versionOutputBaseDir, "assets");
                                                            _statyckLib2.default.copyAssetFiles(themeAssetsSourcePath, themeAssetsDestinationPath, TCAFErr => {
                                                                if (TCAFErr) {
                                                                    console.error(TCAFErr.message);
                                                                    process.exit(1);
                                                                }

                                                                // Create a symlink to the output dir as a universal alias e.g. 'latest' -> 12312243141234
                                                                const symlink = _path2.default.join(outputBaseDir, "latest");

                                                                _statyckLib2.default.createOutputSymlink(versionOutputBaseDir, symlink, symlinkErr => {
                                                                    if (symlinkErr) {
                                                                        console.error(symlinkErr.message);
                                                                        process.exit(1);
                                                                    }

                                                                    let overallErr = null;
                                                                    return callback(overallErr); // TODO: sort the returned values
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

// Deps - local


module.exports = build;

function _inspect(input, depth) {
    const maxDepth = 4;
    const maxKeys = 15;

    if (depth === undefined) {
        depth = 0;
    }

    depth += 1;

    if (input === null) {
        return 'null';
    } else if (input === undefined) {
        return 'void';
    } else if (typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean') {
        return typeof input;
    } else if (Array.isArray(input)) {
        if (input.length > 0) {
            if (depth > maxDepth) return '[...]';

            const first = _inspect(input[0], depth);

            if (input.every(item => _inspect(item, depth) === first)) {
                return first.trim() + '[]';
            } else {
                return '[' + input.slice(0, maxKeys).map(item => _inspect(item, depth)).join(', ') + (input.length >= maxKeys ? ', ...' : '') + ']';
            }
        } else {
            return 'Array';
        }
    } else {
        const keys = Object.keys(input);

        if (!keys.length) {
            if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
                return input.constructor.name;
            } else {
                return 'Object';
            }
        }

        if (depth > maxDepth) return '{...}';
        const indent = '  '.repeat(depth - 1);
        let entries = keys.slice(0, maxKeys).map(key => {
            return (/^([A-Z_$][A-Z0-9_$]*)$/i.test(key) ? key : JSON.stringify(key)) + ': ' + _inspect(input[key], depth) + ';';
        }).join('\n  ' + indent);

        if (keys.length >= maxKeys) {
            entries += '\n  ' + indent + '...';
        }

        if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
            return input.constructor.name + ' {\n  ' + indent + entries + '\n' + indent + '}';
        } else {
            return '{\n  ' + indent + entries + '\n' + indent + '}';
        }
    }
}