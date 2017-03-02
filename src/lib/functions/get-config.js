"use strict";

import path from "path";

function getConfig(currentDirectory: string = "", configFilename: string = "statyck-config.js", callback: Function)
{
    let err = null;
    let config = {};

    let configFileToLoad = configFilename;

    // If no configFilename was specified, use the default location of <project root>/config/statyck-config.js
    if(configFileToLoad === "")
    {
        // NOTE: Using path.join is good for x-platform ops
        configFileToLoad = path.resolve(currentDirectory, "config", "statyck-config.js");
    }

    // NOTE: import/require is sync AFAIK
    // TODO: Is this going to cause issues WRT being async > try/catch
    try
    {
        config = require(configFileToLoad);
    }
    catch(e)
    {
        err = new Error(`Can't open config file from ${configFileToLoad}. Please check the file exists and that permissions are set correctly.`);
    }

    return callback(err, config);
}

module.exports = getConfig;