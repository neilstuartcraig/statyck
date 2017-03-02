"use strict";

import {mkdirp} from "fs-extra";

function createOutputDir(outputDir: string, callback: Function)
{
    mkdirp(outputDir, (CODErr) => 
    {
        return callback(CODErr);
    });
}

module.exports = createOutputDir;