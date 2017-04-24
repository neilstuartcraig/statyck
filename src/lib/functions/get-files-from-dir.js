"use strict";

import fs from "fs";
import path from "path";

function getFilesFromDir(dirName: string, fileExtension: string, callback: Function)
{
    // Read all files (except . and ..) in the specified dirName
    fs.readdir(dirName, (readErr, fileList) => 
    {
        // Defaults
        let err = null;
        let files = []; // Default to empty array so that we always have an array to work with

        if(readErr)
        {
            err = readErr;
        }
        else
        {
            // Filter the dir listing to include only file with matching file extension
            const filteredFiles = fileList.filter((filename) =>
            {
                // Note that fileExtension should include a leading . if the filenames require it
                const regex = new RegExp(fileExtension + "$");

                // Note: this string match will return either null for no match or the file extension if it does match
                const matches = filename.match(regex);

                // Boolean-ify the returned value to allow the filter to work properly
                return matches === null ? false : true;
            });

            // Sort files by birthtime (creation date/time)
            files = filteredFiles;
            files.sort((a, b) => 
            {
                const pathA = path.join(dirName, a);
                const aCTime = fs.statSync(pathA).birthtime;
                const aCTimeTS = new Date(aCTime).getTime();

                const pathB = path.join(dirName, b);
                const bCTime = fs.statSync(pathB).birthtime;
                const bCTimeTS = new Date(bCTime).getTime();

                // NOTE: b - a gives reverse-order sort (i.e. newest first)
                const ret = bCTimeTS - aCTimeTS;      

                return ret;
            });
        }

        return callback(err, files);
    });
}

module.exports = getFilesFromDir;