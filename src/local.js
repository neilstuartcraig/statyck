"use strict";

// Core deps
import path from "path";
import fs from "fs";
import http from "http";

// Deps - local
import statyck from "./lib/statyck-lib.js"; // NOTE: Path is relative to build dir (dist/) - local because lib is babel'd

// App config (not user config - fixed location)
import {production as appConfig} from "../config/statyck-app-config.js";

function local(projectBaseDirectory: string, callback: Function)
{
    statyck.getUserConfig(projectBaseDirectory, (GUCErr, statyckConfig) => 
    {
        if(GUCErr)
        {
            return callback(GUCErr);
        }

        const server = http.createServer((req, res) => 
        {
            // Remove any query strings from the request URL
            const requestURLNoQS = req.url.replace(/\?.*/g, "");

            // Remap requests for / or "" to index filename
            let requestedPath = requestURLNoQS;
            if(requestURLNoQS === "/" || requestURLNoQS === "")
            {
                requestedPath = appConfig.postsIndexFilename;
            }

// NOTE: I *think* (counter to what seems obvious) this is *not* susceptible to path traversal - at least that didn't work in my testing
            const reqPath = path.join(projectBaseDirectory, statyckConfig.general.outputBaseDir, appConfig.outputDirectorySymlink, requestedPath);

            fs.readFile(reqPath, (FSErr, data) => 
            {
                // Probably a bad assumption but we'll 404 any failures
                if(FSErr)
                {
                    res.statusCode = 404;
                    res.end();
                }
                else
                {
                    const response = data.toString("utf8");
                    res.end(response);                
                }
            });
        });
        
        // Issue a (hopefully useful message to the user so they can click on it or copy/paste)
        console.log(`Local server running at http://127.0.0.1:${statyckConfig.general.localServerPort}/ - hit ctrl+c to stop`);

        server.listen(statyckConfig.general.localServerPort);
    });
}

module.exports = local;