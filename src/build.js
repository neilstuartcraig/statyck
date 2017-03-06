"use strict";

// Deps - Core
import path from "path";

// Deps - local
import statyck from "./lib/statyck-lib.js"; // NOTE: Path is relative to build dir (dist/) - local because lib is babel'd

function build(projectBaseDirectory: string, callback: Function)
{
    statyck.getUserConfig(projectBaseDirectory, (GUCErr, statyckConfig) => 
    {
        if(GUCErr)
        {
            return callback(GUCErr);
        }

        // Create a (JS-style, inc. milliseconds) timestamp for use in paths
        const currentTimestamp = new Date().getTime();

        // Calculate the content source path
        const contentSourceBaseDir = path.resolve(projectBaseDirectory, "content-source");

        // Calculate the output directory path - this will be used as a basis for all other paths, see below ...
        const outputBaseDir = path.resolve(projectBaseDirectory, statyckConfig.general.outputBaseDir);

        // ... then calculate the path to the version-specific dir
        const versionOutputBaseDir = path.join(outputBaseDir, currentTimestamp.toString(10));

        // List the pages files
        const pagesSourcePath = path.join(contentSourceBaseDir, "pages");
        statyck.listFiles(pagesSourcePath, statyckConfig.pages.contentSourceFilenameExtension, (listPagesErr, pagesFiles) => 
        {
            if(listPagesErr)
            {
                // NOTE: Trying to make the output more user-friendly but have kept listPagesErr as an Error for the mo at least
                console.error(listPagesErr.message);
                process.exit(1);
            }

            // build the pages
            const pagesOutputDirectory = path.join(versionOutputBaseDir, "pages");
            statyck.getFilesContent(pagesSourcePath, pagesFiles, statyckConfig.pages.contentSourceFilenameExtension, statyckConfig.theme.settings, statyckConfig.pages.numPostsPerIndexPage, pagesOutputDirectory, (getPagesErr, pages) => 
            {
                if(getPagesErr)
                {
                    console.error(getPagesErr.message);
                    process.exit(1);
                }               

    // TODO: it'd be more sensible/obvious to calc the name of the file and then use a lib fn to get the file content - we'd drop a fn too
                // Read in the pages index template
                statyck.getTemplateFile(statyckConfig.theme.sourceDir, "pages-index", (pageIndexGTFErr, pagesIndexTemplate) => // eslint-disable-line consistent-return
                {
                    if(pageIndexGTFErr)
                    {        
                        console.error(pageIndexGTFErr.message);
                        process.exit(1);
                    }

                    const pagesContextIndex = {}; // We don't need any additional context for the pages index
                    statyck.createIndexes(pages, statyckConfig.pages.numPostsPerIndexPage, pagesIndexTemplate, statyckConfig.theme.settings, pagesContextIndex, pagesOutputDirectory, false, (PCIErr, pagesIndex) => 
                    {
                        if(PCIErr)
                        {                         
                            console.error(PCIErr.message);
                            process.exit(1);
                        }

                        // Copy static assets for pages to the output dir
                        const pagesAssetsSourcePath = path.join(contentSourceBaseDir, "pages", "assets");
                        const pagesAssetsDestinationPath = path.join(versionOutputBaseDir, "pages", "assets");
                        statyck.copyAssetFiles(pagesAssetsSourcePath, pagesAssetsDestinationPath, (PaCAFErr) => 
                        {
                            if(PaCAFErr)
                            {
                                console.error(PaCAFErr.message);
                                process.exit(1);
                            }

                            // Read in the page template
                            statyck.getTemplateFile(statyckConfig.theme.sourceDir, "page", (pageGTFErr, pageTemplate) => // eslint-disable-line consistent-return
                            {
                                if(pageGTFErr)
                                {        
                                    console.error(pageGTFErr.message);
                                    process.exit(1);
                                }

                                const pagesContext = 
                                {             
                                    theme: statyckConfig.theme.settings,
                                    pagesIndexHTML: pagesIndex
                                };
                                
                                statyck.createOutputFiles(pageTemplate, pages, pagesContext, pagesOutputDirectory, (COFPErr) => 
                                {
                                    if(COFPErr)
                                    {
                                        console.error(COFPErr.message);
                                        process.exit(1);
                                    }



                    // POSTS -------------------------------------------------------------                

                                    // List the blog post files
                                    const postsSourcePath = path.join(contentSourceBaseDir, "posts");
                                    statyck.listFiles(postsSourcePath, statyckConfig.posts.contentSourceFilenameExtension, (listPostsErr, blogPostFiles) => 
                                    {
                                        if(listPostsErr)
                                        {
                                            // NOTE: Trying to make the output more user-friendly but have kept listPostsErr as an Error for the mo at least
                                            console.error(listPostsErr.message);
                                            process.exit(1);
                                        }

                                        // Process posts
                                        const postsOutputDirectory = path.join(versionOutputBaseDir, "posts");
                                        statyck.getFilesContent(postsSourcePath, blogPostFiles, statyckConfig.posts.contentSourceFilenameExtension, statyckConfig.theme.settings, statyckConfig.posts.numPostsPerIndexPage, postsOutputDirectory, (getBlogPostsErr, blogPosts) => 
                                        {
                                            if(getBlogPostsErr)
                                            {
                                                console.error(getBlogPostsErr.message);
                                                process.exit(1);
                                            }


                                            // Read in the post template
                                            statyck.getTemplateFile(statyckConfig.theme.sourceDir, "post", (postGTFErr, postTemplate) => // eslint-disable-line consistent-return
                                            {
                                                if(postGTFErr)
                                                {        
                                                    console.error(postGTFErr.message);
                                                    process.exit(1);
                                                }

                                                // NOTE This context obj is the same as that for pages
                                                const postsContext = 
                                                {
                                                    theme: statyckConfig.theme.settings,
                                                    pagesIndexHTML: pagesIndex
                                                };


                                                // Create the output files (one per post)
                                                statyck.createOutputFiles(postTemplate, blogPosts, postsContext, postsOutputDirectory, (COFErr) => 
                                                {
                                                    if(COFErr)
                                                    {
                                                        console.error(COFErr.message);
                                                        process.exit(1);
                                                    }
                                                    
                                                    // Read in the posts index template
                                                    statyck.getTemplateFile(statyckConfig.theme.sourceDir, "posts-index", (postsIndexGTFErr, postsIndexTemplate) => // eslint-disable-line consistent-return
                                                    {
                                                        if(postsIndexGTFErr)
                                                        {        
                                                            console.error(postsIndexGTFErr.message);
                                                            process.exit(1);
                                                        }


                                                        const postsContextIndex = 
                                                        {
                                                            pagesIndexHTML: pagesIndex
                                                        }; 
                                                        statyck.createIndexes(blogPosts, statyckConfig.posts.numPostsPerIndexPage, postsIndexTemplate, statyckConfig.theme.settings, postsContextIndex, versionOutputBaseDir, true, (CIErr) => 
                                                        {
                                                            if(CIErr)
                                                            {                         
                                                                console.error(CIErr.message);
                                                                process.exit(1);
                                                            }

                                                            // Copy static assets for posts to the output dir
                                                            const postsAssetsSourcePath = path.join(contentSourceBaseDir, "posts", "assets");
                                                            const postsAssetsDestinationPath = path.join(versionOutputBaseDir, "posts", "assets");
                                                            statyck.copyAssetFiles(postsAssetsSourcePath, postsAssetsDestinationPath, (PCAFErr) => 
                                                            {
                                                                if(PCAFErr)
                                                                {
                                                                    console.error(PCAFErr.message);
                                                                    process.exit(1);
                                                                }

                                                                // Copy static assets for the theme to the output dir
                                                                const themeAssetsSourcePath = path.resolve(projectBaseDirectory, statyckConfig.theme.sourceDir, "assets");
                                                                const themeAssetsDestinationPath = path.join(versionOutputBaseDir, "assets");
                                                                statyck.copyAssetFiles(themeAssetsSourcePath, themeAssetsDestinationPath, (TCAFErr) => 
                                                                {
                                                                    if(TCAFErr)
                                                                    {
                                                                        console.error(TCAFErr.message);
                                                                        process.exit(1);
                                                                    }

                                                                    // Create a symlink to the output dir as a universal alias e.g. 'latest' -> 12312243141234
                                                                    const symlink = path.join(outputBaseDir, "latest");

                                                                    statyck.createOutputSymlink(versionOutputBaseDir, symlink, (symlinkErr) => 
                                                                    {
                                                                        if(symlinkErr)
                                                                        {                        
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
    });
}

module.exports = build;