"use strict";

function createIndexFilename(indeXNumber: number, pathPrefix: string, callback: Function)
{
    let indexFilename = indeXNumber > 0 ? `index-${indeXNumber}.html` : "index.html";

    let indexFilenameAndPath = indexFilename;

    if(pathPrefix)
    {
        indexFilenameAndPath = [pathPrefix, indexFilename].join("/");
    }

    return callback(indexFilenameAndPath);
}

module.exports = createIndexFilename;