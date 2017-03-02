"use strict";

import fs from "fs";
import handlebars from "handlebars";

function createOutputFile(templateString: string, context: Object, outputPathAndFilename: string, callback: Function)
{
    const template = handlebars.compile(templateString);
    const outputData = template(context);
    
    fs.writeFile(outputPathAndFilename, outputData, (writeErr) => 
    {       
        return callback(writeErr, outputData);
    });
}

module.exports = createOutputFile;