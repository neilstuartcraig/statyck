"use strict";

import fs from "fs";
import path from "path";

function getTemplateFile(themeDir: string, contentType: string, callback: Function)
{
    const templateFilename = `${contentType}.html`;
    const templatePathAndFilename = path.resolve(themeDir, templateFilename);
    
    fs.readFile(templatePathAndFilename, (FSAErr, file) => 
    {
        let fileContent = "";

        if(FSAErr === null)
        {
            fileContent = file.toString("utf8");
        }
        
        return callback(FSAErr, fileContent);
    });
}

module.exports = getTemplateFile;