"use strict";

// Core deps
import path from "path";

// 3rd party deps

// Local deps
import createOutputDir from "./create-output-dir.js";
import createOutputFile from "./create-output-file.js";



// Macro-function to create one or more output files - that is, take an Array of items and push each one through a template to create an output file
function createOutputFiles(template: string, items: Array, context: Object, outputDir: string, callback: Function)
{
    // Create the output (destination) directory, if it doesn't exist
    createOutputDir(outputDir, (CODErr) => 
    {
        if(CODErr)
        {
            return callback(CODErr);
        }

        const totalNumItems = items.length;
        let numItemsProcessed = 0;

        // Create an output file for each item
        items.map((item) => 
        {
            const outputPathAndFilename = path.resolve(outputDir, item.filename);

            let ctx = 
            {
                content: item
            };

            // Copy in additional context (excluding any clashes with existing context data)
            for(let c in context)
            {
                if(ctx[c] === undefined)
                {
                    ctx[c] = context[c];
                }
            }

            createOutputFile(template, ctx, outputPathAndFilename, (COFErr) => 
            {
                numItemsProcessed++;

                if(numItemsProcessed >= totalNumItems)
                {
                    // return callback("err array");
                    return callback(COFErr); // This needs to become an array of errors
                }
            });
        });
    });
}

module.exports = createOutputFiles;