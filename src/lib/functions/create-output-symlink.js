"use strict";

import fs from "fs";

function createOutputSymlink(outputDir: string, symlink: string, callback: Function)
{
    fs.unlink(symlink, (delSymlinkErr) => 
    {
        if(delSymlinkErr)
        {
            // Don't return an error if the symlink doesnt exist othewrwise this'll fail inititally and from then on
            if(delSymlinkErr.code !== `ENOENT`)
            {            
                return callback(delSymlinkErr);
            }
        }

        fs.symlink(outputDir, symlink, "dir", (symlinkErr) => 
        {
            return callback(symlinkErr);
        });
    });
}

module.exports = createOutputSymlink;