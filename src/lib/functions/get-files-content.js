"use strict";

// Deps - core
import path from "path";

// Deps - local
import getFileContentAsHTML from "./get-file-content-as-html.js";
import getFileMetadata from "./get-file-metadata.js";
import getFileTitle from "./get-file-title.js";
import createSlug from "./create-slug.js";
import createFilenameFromSlug from "./create-filename-from-slug";
import createURI from "./create-uri.js";


// TODO: remove numItemsPerIndexPage

function getFilesContent(sourceDirectory: string, filesArray: Array, filenameExtension: string, themeSettings: Object, numItemsPerIndexPage: number, outputDirectory: string, callback: Function)
{
    // Outputs
    let err = null;

    // let ret = {}; // eslint-disable-line object-curly-newline
    let ret = [];

    // Working vars
    let numFilesProcessed = 0;

    const totalNumFiles = filesArray.length;

    filesArray.map((f) => 
    {
        // Working vars
        const filename = path.resolve(sourceDirectory, f);

        getFileTitle(filename, filenameExtension, (title) => 
        {
            createSlug(title, (slug) => 
            {
                createFilenameFromSlug(slug, (outputFilename) => 
                {
                    createURI(themeSettings.scheme, themeSettings.hostname, themeSettings.baseURI, outputDirectory, slug, themeSettings.createAbsoluteHRefs, (GAUErr, URI) => 
                    {
                        if(GAUErr)
                        {
                            return callback(GAUErr, []);
                        }

                        getFileMetadata(filename, (GFMErr, fileMetadata) => 
                        {
                            if(GFMErr)
                            {
                                return callback(GFMErr, []);
                            }

                            getFileContentAsHTML(filename, (GFCAHErr, HTML) => 
                            {
                                if(GFCAHErr)
                                {
                                    return callback(GFCAHErr, []);
                                }

                                numFilesProcessed = numFilesProcessed + 1;

                                // We need to set all the obj props here otherwise we'll suffer context issues WRT async-ness
                                let item = 
                                {
                                    absoluteURI: URI,
                                    filename: outputFilename,
                                    title: title,
                                    slug: slug,
                                    metadata: fileMetadata,
                                    HTML: HTML
                                };

                                ret.push(item);

                                if(numFilesProcessed >= totalNumFiles)
                                {
                                    // We're done
                                    return callback(err, ret);
                                }
                            });
                        });
                    });
                });
            });
        });
    });
}

module.exports = getFilesContent;