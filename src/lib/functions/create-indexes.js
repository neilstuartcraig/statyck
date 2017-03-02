"use strict";

// Deps - local
import createIndex from "./create-index.js";
import splitItems from "./split-items.js";
import createIndexMetadata from "./create-index-metadata.js";
import createIndexFilename from "./create-index-filename.js";


function createIndexes(items: Array, numberOfItemsPerIndexPage: number, template: string, themeSettings: Object, additionalContext: Object, outputDir: string, writeOutputFile: boolean, callback: Function)
{
    // Fast fail for any occurences of empty items arrays
    if(items.length === 0)
    {
        const ILErr = new Error("items array is empty! Cannot proceed");
        return callback(ILErr, "");
    }

    splitItems(items, numberOfItemsPerIndexPage, (SOErr, itemsArray) => 
    {
        if(SOErr)
        {
            return callback(SOErr, "");
        }
  
        let numItemsProcessed = 0;
        const totalNumItems = itemsArray.length;
        const indexPathPrefix = outputDir; // NOTE: This is the path into which the index file will be written, not the HRef path prefix

        itemsArray.map((item, currentIndexNum) => 
        {

// TODO: sort the path prefix from config         
            createIndexMetadata(currentIndexNum, totalNumItems, "", (indexMetadata) => 
            {
                const context = 
                {
                    items: item,
                    indexMetadata: indexMetadata,
                    config: themeSettings
                };

                // Copy in additional context (excluding any clashes with existing context data)
                for(let a in additionalContext)
                {                  
                    if(context[a] === undefined)
                    {
                        context[a] = additionalContext[a];
                    }
                }

                createIndexFilename(currentIndexNum, indexPathPrefix, (indexFilename) => 
                {
                    createIndex(context, template, currentIndexNum, (totalNumItems - 1), indexFilename, writeOutputFile, (CIErr, index) => // eslint-disable-line consistent-return, no-loop-func
                    {
                        numItemsProcessed++;

                        if(CIErr || numItemsProcessed >= itemsArray.length)
                        {

// TODO: FIXUP! index is the LAST index created, this should really be an array of all created indexes                            
                            return callback(CIErr, index);
                        }
                    });
                });
            });
        });
    });
}

module.exports = createIndexes;