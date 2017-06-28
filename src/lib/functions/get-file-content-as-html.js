"use strict";

// Deps - core
import fs from "fs";

// Deps - 3rd party
import marked from "marked";


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

        return callback(err, HTMLString);
    });
}

module.exports = getFileContentAsHTML;