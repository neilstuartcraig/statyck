"use strict";

// import getConfig from "./functions/get-config.js"; //UNUSED
import listFiles from "./functions/list-files.js";
import getFilesContent from "./functions/get-files-content.js";
import getTemplateFile from "./functions/get-template-file.js";
import createOutputFiles from "./functions/create-output-files.js";
import createIndexes from "./functions/create-indexes.js";
import copyAssetFiles from "./functions/copy-asset-files.js";
import createOutputSymlink from "./functions/create-output-symlink.js";

module.exports =
{
    // getConfig: getConfig,
    listFiles: listFiles, 
    getFilesContent: getFilesContent, 
    getTemplateFile: getTemplateFile, 
    createOutputFiles: createOutputFiles, 
    createIndexes: createIndexes, 
    copyAssetFiles: copyAssetFiles, 
    createOutputSymlink: createOutputSymlink 
};
