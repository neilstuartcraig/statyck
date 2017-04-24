"use strict";

// Deps - core
import fs from "fs";

function getFileMetadata(filename: string, callback: Function)
{
    let ret = 
    {
        dateCreated:
        {
            timestamp: 0,
            string: ""
        },
        dateModified:
        {
            timestamp: 0,
            string: ""
        }
    };

    fs.access(filename, fs.constants.R_OK, (accessErr) => 
    {
        if(accessErr)
        {
            return callback(accessErr, {});
        }

        fs.stat(filename, (statErr, stat) => 
        {
            let CTS = new Date(stat.birthtime).getTime(); // NOTE: stat.birthtime might be OSX-specific
            if(CTS)
            {
                ret.dateCreated.timestamp =  CTS;
                ret.dateCreated.string =  new Date(CTS).toUTCString();
            }
            
            let MTS = new Date(stat.mtime).getTime();
            if(MTS)
            {
                ret.dateModified.timestamp =  MTS;
                ret.dateModified.string =  new Date(MTS).toUTCString();
            }

            return callback(statErr, ret);
        });
    });
}

module.exports = getFileMetadata;