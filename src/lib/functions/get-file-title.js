"use strict";

// Deps - core
import path from "path";

function getFileTitle(filename: string, filenameExtension: string, callback: Function)
{

// TODO: This needs better scrutiny and defensiveness    
    const reg = new RegExp(filenameExtension + "$");
    const f: string = path.basename(filename);
    const title: string = f.replace(reg, "") || "";

    return callback(title);
}

module.exports = getFileTitle;