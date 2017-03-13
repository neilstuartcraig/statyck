"use strict";

import listFiles from "./functions/list-files.js";
import getFilesContent from "./functions/get-files-content.js";
import getTemplateFile from "./functions/get-template-file.js";
import createOutputFiles from "./functions/create-output-files.js";
import createIndexes from "./functions/create-indexes.js";
import recCopyFiles from "./functions/rec-copy-files.js";
import createOutputSymlink from "./functions/create-output-symlink.js";
import getUserConfig from "./functions/get-user-config.js";

module.exports =
{
    // getConfig: getConfig,
    listFiles: listFiles, 
    getFilesContent: getFilesContent, 
    getTemplateFile: getTemplateFile, 
    createOutputFiles: createOutputFiles, 
    createIndexes: createIndexes, 
    recCopyFiles: recCopyFiles, 
    createOutputSymlink: createOutputSymlink,
    getUserConfig: getUserConfig 
};
