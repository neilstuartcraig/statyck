"use strict";

// Deps - core
import fs from "fs";

// Deps - 3rd party
import marked from "marked";
import {minify} from "html-minifier";


function getFileContentAsHTML(filename: string, callback: Function)
{
    let err = null;
    let ret = "";

    fs.readFile(filename, (RFErr, fileContents) => 
    {
        if(RFErr)
        {
            return callback(RFErr, ret);
        }

// NOTE: This makes a collosal assumption that the files are ALL ALWAYS in UTF8
        const HTMLString = marked(fileContents.toString("utf8"));

        // Minify the HTML we just produced
        // TODO: Make the options centrally define, including in tests
        const HTMLStringMinified = minify(HTMLString, 
        {
            collapseWhitespace: true,
            removeAttributeQuotes: true
        });

        return callback(err, HTMLStringMinified);
    });
}

module.exports = getFileContentAsHTML;