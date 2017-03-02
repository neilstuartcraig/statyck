"use strict";

// Deps - local
import getFilesFromDir from "./get-files-from-dir.js";

function listFiles(path: string, fileExtensions: string, callback: Function)
{
    getFilesFromDir(path, fileExtensions, (RDErr, files) => 
    {
        return callback(RDErr, files);
    });
}

module.exports = listFiles;