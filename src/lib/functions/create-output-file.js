"use strict";

import fs from "fs";
import handlebars from "handlebars";
import {minify} from "html-minifier";

function createOutputFile(templateString: string, context: Object, outputPathAndFilename: string, callback: Function)
{
    const template = handlebars.compile(templateString);
    const outputData = template(context);

    const minifiedOutputData = minify(outputData, 
    {
        collapseWhitespace: true,
        removeAttributeQuotes: true
    });

    fs.writeFile(outputPathAndFilename, minifiedOutputData, (writeErr) => 
    {       
        return callback(writeErr, minifiedOutputData);
    });
}

module.exports = createOutputFile;