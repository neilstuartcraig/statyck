"use strict";

// Deps - 3rd party
import FSExtra from "fs-extra";

function recCopyFiles(sourceDir: string, destDir: string, callback: Function)
{
    FSExtra.copy(sourceDir, destDir, (CErr) => 
    {
        return callback(CErr);
    });
}

module.exports = recCopyFiles;