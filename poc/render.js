// Core deps
const fs = require("fs");
const path = require("path");

// 3rd party deps
const marked = require("marked");
const fsextra = require("fs-extra");

// Conf
const postsDir = "./posts";
const postsPerPage = 2;

const outputDir = "./rendered";
const templateDir = "./templates/tdp1";
// implicit path to assets templateDir/assets/

const blogConfig = 
{
    title: "TheDotProduct"
};


// working shiz
// TODO: add fs.access check (r)
fs.readdir(postsDir, (err, files) => 
{
    if(err)
    {
        // TODO: Don't throw - bubble error
        throw err;
    }

    let numPostsRemaining = files.length;
    let posts = [];


    // Sort the array of files
// TODO: de-sync the fs stats
    filesSorted = files.sort((a, b) => 
    {
        const pathA = path.join(postsDir, a);
        const aCTime = fs.statSync(pathA).birthtime;
        const aCTimeTS = new Date(aCTime).getTime();

        const pathB = path.join(postsDir, b);
        const bCTime = fs.statSync(pathB).birthtime;
        const bCTimeTS = new Date(bCTime).getTime();

        return bCTimeTS - aCTimeTS;
    });   

    filesSorted.map((f) => 
    {
        const filename = path.join(postsDir, f);
        fs.stat(filename, (err, stats) => 
        {
            if(err)
            {
                throw err;
            }

            // TODO: filter out non-.md files

// NOTE: These should each be separate functions
            // Created TS
            const createdTS = new Date(stats.birthtime).getTime();

            // Modified TS
            const modifiedTS = new Date(stats.mtime).getTime();

            // TODO: fix this up, obviously!
            const filenameMinusExtension = f.replace(".md", "");

            // Title
            const title = filenameMinusExtension.replace(/-/g, " ");

            // Slug
            const slug = filenameMinusExtension.toLowerCase();

            const post = 
            {
                createdTS: createdTS,
                createdDate: new Date(createdTS).toUTCString(),
                modifiedTS: modifiedTS,
                modifiedDate: new Date(modifiedTS).toUTCString(),
                slug: slug,
                title: title
            };

            
            posts.push(post);

            numPostsRemaining -= 1;

            if(numPostsRemaining === 0)
            {


// TODO: Move this to the end (filewriting stage)
// TODO: separate content images from template images - copy both to dest in e.g. /img/c/ and /img/t/                
                // Copy template assets to output dir
                const templateAssetsDir = path.join(templateDir, "assets");
                const outputAssetsDir = path.join(outputDir);
                fsextra.copy(templateAssetsDir, outputAssetsDir, (err) => 
                {
                    if(err)
                    {
                        throw err;
                    }

                    // TODO LATER run through the posts in postsPerPage chunks and output an HTML file for each via a template
                    // TODO LATER remember to version the posts - QS?

                    // make index listing
                    let indexListHTML = "<ul role=site-navigation aria-label=\"List of blog posts\">";
                    posts.map((p, i) => 
                    {
                        // TODO: decide on config options here
                        // TODO: maybe use JS template strings?
                        // TODO: decide how to version posts
                        // TODO: consider adding date(s) to this and better a11y
                        indexListHTML += `
                        <li>
                            <a href=./p/${p.slug}.html>
                                ${p.title}
                            </a>
                        </li>`;
                    });

                    indexListHTML += "</ul>";

                    blogConfig.index = indexListHTML;


                    const indexTemplateFilename = path.join(templateDir, "index.html");
                    fs.readFile(indexTemplateFilename, (err, data) => 
                    {
                        if(err)
                        {
                            throw err;
                        }

                        const indexTemplateString = data.toString("utf8");
                        let indexHTML = indexTemplateString;
                        // TODO: blog title etc. also - best to replace items from, an obj generically - maybe use JS template strings?
                        // const indexHTML = indexTemplateString.replace("%%index%%", indexListHTML);
                        Object.keys(blogConfig).map((el) => 
                        {
                            let re = new RegExp("%%" + el + "%%", "g");                    
                            indexHTML = indexHTML.replace(re, blogConfig[el]);
                        });

                        fs.mkdir(outputDir, (err) => 
                        {
                            if(err)
                            {
                                if(err.code !== "EEXIST")
                                {
                                    throw err;
                                }
                            }

                            // TODO: add paging when done
                            const outputFilename = path.join(outputDir, "index.html");
                            fs.writeFile(outputFilename, indexHTML, (err) => 
                            {
                                if(err)
                                {
                                    throw err;
                                }

                                // render posts HTML
                                const postTemplateFilename = path.join(templateDir, "post.html");
                                fs.readFile(postTemplateFilename, (err, data) => 
                                {
                                    if(err)
                                    {
                                        throw err;
                                    }

                                    const postTemplateString = data.toString("utf8");

                                    const postsOutputDir = path.join(outputDir, "p");
                                    fs.mkdir(postsOutputDir, (err) => 
                                    {
                                        if(err)
                                        {
                                            if(err.code !== "EEXIST")
                                            {
                                                throw err;
                                            }
                                        }

                                        posts.map((p, i) => 
                                        {
                                            const postMarkdownFilename = path.join(postsDir, p.slug + ".md");
                                            const postHTMLFilename = path.join(postsOutputDir, p.slug + ".html");

                                            fs.readFile(postMarkdownFilename, (err, data) => 
                                            {
                                                if(err)
                                                {
                                                    throw err;
                                                }

                                                const postHTMLString = marked(data.toString("utf8"));

                                                p.HTML = postHTMLString;



                                                let postHTML = postTemplateString;
                                                Object.keys(p).map((el) => 
                                                {
                                                    let re = new RegExp("%%" + el + "%%", "g");
                                                    console.log(re);
                                                    postHTML = postHTML.replace(re, p[el]);
                                                });



                                                fs.writeFile(postHTMLFilename, postHTML, (err) => 
                                                {
                                                    if(err)
                                                    {
                                                        throw err;
                                                    }

                                                    console.log("Rendered: ", p.title);
                                                });
                                            });
                                        });
                                    });   
                                });   
                            });
                        })  
                    });
                }); 
            }
        });
    });
});