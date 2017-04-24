"use strict";

// Core deps
import path from "path";


// Deps - local
import createDirRec from "./lib/functions/create-dir-rec.js"; // NOTE: Path is relative to build dir (dist/) - local because lib is babel'd
// import createOutputFile from "./functions/create-output-file.js";
import recCopyFiles from "./lib/functions/rec-copy-files.js";

// App config (not user config - fixed location)
import {production as appConfig} from "../config/statyck-app-config.js";


function init(projectBaseDirectory: string, callback: Function)
{
    // create ./statyck-config/ dir in the blog root dir
    const configDir = path.join(projectBaseDirectory, appConfig.userlandConfigDestinationDirectory);
    createDirRec(configDir, (CDErr) => 
    {  
        if(CDErr)
        {
            return callback(CDErr);
        }

        // we'll do a simple copy of the config "template" (they're not really templates) files
        const configTemplateDir = path.join(__dirname, "..", appConfig.userlandConfigTemplateSourceDirectory);

        recCopyFiles(configTemplateDir, configDir, (CAErr) => 
        {
            if(CAErr)
            {
                return callback(CAErr);
            }

            // Create content-source dir
            const contentSourceSourceDir = path.join(__dirname, "..", appConfig.contentSourceBaseDir);
            const contentSourceDestinationDir = path.join(projectBaseDirectory, appConfig.contentSourceBaseDir);
            recCopyFiles(contentSourceSourceDir, contentSourceDestinationDir, (CSErr) => 
            {
                if(CSErr)
                {
                    return callback(CSErr);
                }
            });
        });
    });
}

module.exports = init;