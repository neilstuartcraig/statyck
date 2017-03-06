"use strict";

import {mkdirp} from "fs-extra";

function createDirRec(outputDir: string, callback: Function)
{
    mkdirp(outputDir, (CODErr) => 
    {
        return callback(CODErr);
    });
}

module.exports = createDirRec;