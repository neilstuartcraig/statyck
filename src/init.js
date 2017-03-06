"use strict";

// Core deps
import path from "path";


// Deps - local
import createDirRec from "./lib/functions/create-dir-rec.js"; // NOTE: Path is relative to build dir (dist/) - local because lib is babel'd
// import createOutputFile from "./functions/create-output-file.js";
import copyAssetFiles from "./lib/functions/copy-asset-files.js";


function init(projectBaseDirectory: string, callback: Function)
{
    // create ./config/ dir
    const configDir = path.join(projectBaseDirectory, "conf");
    createDirRec(configDir, (CDErr) => 
    {  
        if(CDErr)
        {
            return callback(CDErr);
        }

        // we'll do a simple copy of the config "template" (they're not really templates) files
        const configTemplateDir = path.join(__dirname, "..", "config-templates");

        copyAssetFiles(configTemplateDir, configDir, (CAErr) => 
        {
            if(CAErr)
            {
                return callback(CAErr);
            }

            // Create content-source dir
            const contentSourceSourceDir = path.join(__dirname, "..", "content-source");
            const contentSourceDestinationDir = path.join(projectBaseDirectory, "content-source");
            copyAssetFiles(contentSourceSourceDir, contentSourceDestinationDir, (CSErr) => 
            {
                if(CSErr)
                {
                    return callback(CSErr);
                }

                // Copy default theme into proj dir
                const themeSourceDir = path.join(__dirname, "..", "themes", "default");
                const themeDestinationDir = path.join(projectBaseDirectory, "themes", "default");
                copyAssetFiles(themeSourceDir, themeDestinationDir, (TErr) => 
                {
                    return callback(TErr);
                });
            });
        });
    });
}

module.exports = init;