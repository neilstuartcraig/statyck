"use strict";

// Core deps
import fs from "fs";

// 3rd party deps
import handlebars from "handlebars";
import {minify} from "html-minifier";

function createIndex(context: Object, templateString: string, currentIndexNumber: number, totalNumberOfIndexes: number, outputPathAndFilename: string, writeOutputFile: boolean, callback: Function)
{
    // TODO: use createOutputFile once it's broken out
    const template = handlebars.compile(templateString);
    const ctx = context;
    ctx.indexes = 
    {
        current: currentIndexNumber + 1, // NOTE: "+1" makes the index 1-based (rather than 0-based)
        total: totalNumberOfIndexes + 1  // NOTE: "+1" makes the index 1-based (rather than 0-based)
    };
    const outputData = minify(template(ctx),
    {
        collapseWhitespace: true,
        removeAttributeQuotes: true
    });
    
// TODO: Consider moving the file write into index - keep this fn testable without mocks, would also eliminate 2 x args
    if(writeOutputFile === true)
    {
        fs.writeFile(outputPathAndFilename, outputData, (writeErr) => 
        {
            return callback(writeErr, outputData);
        });
    }
    else // Don't write a file out, just return the index
    {
        return callback(null, outputData);
    }
}

module.exports = createIndex;