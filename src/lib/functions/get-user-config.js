"use strict";

// Deps - core
import path from "path";


function getUserConfig(projectBaseDirectory: string, callback: Function)
{
    let err = null;
    let statyckConfig = {};

    try
    {
        // Core Statyck config file - likely users won't need to edit this
        const coreConfigFilename = path.join(projectBaseDirectory, "conf", "statyck-config.json");

        // Theme config file - users will need to edit this to some extent - e.g. setting title etc. hence it's JSON, should make it easier for users and theme installers alike
        const themeConfigFilename = path.join(projectBaseDirectory, "conf", "theme-config.json");

        // NOTE: import can't be used here as it's mandatory that its path is static (can't contain vars) & that it's used in the top-level scope
        let coreConfig = require(coreConfigFilename); 
        let themeConfig = require(themeConfigFilename);

        // Form statyckConfig from core and theme config
        statyckConfig = coreConfig;
        statyckConfig.theme = themeConfig; 
    }
    catch(e)
    {
        err = e;
    }

    return callback(err, statyckConfig);
}

module.exports = getUserConfig;