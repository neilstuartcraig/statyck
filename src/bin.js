#!/usr/local/bin/node

"use strict";

// Deps - Core
import path from "path";

// Deps - local
import build from "./build.js";
import init from "./init.js";

// Deps - 3rd party
import yargs from "yargs";

// Get project base directory
const projectBaseDirectory = process.cwd();


yargs
.usage("usage: $0 <command>")
.command("init", "initialise Statyck for usage (creates and populates a config file in the current directory/folder)", () =>
{
    init(projectBaseDirectory, (initErr) => 
    {
        if(initErr)
        {
            console.error(initErr.message);
            process.exit(1);
        }

        process.exit(0);
    });
})
.command("build", "Build your Statyck website, ready to be published", () =>
{
    build(projectBaseDirectory, (buildErr) => 
    {
        if(buildErr)
        {
            console.error(buildErr.message);
            process.exit(1);
        }

        process.exit(0);
    });
})
.command("version", "Show Statyck version number and exit", () => 
{
    // Read in the package.json via a relative path from this file so that it'll work when we're in a global install
    const pkgJSONFilename = path.resolve(__dirname, "..", "package.json");
    const pkg = require(pkgJSONFilename);

    if(pkg.version)
    {
        console.log(pkg.version);
        process.exit(0);
    }
    else
    {
        console.error(`Sorry, couldn't get the Statyck version number from ${projectBaseDirectory}/package.json - does the file exist?`);
        process.exit(1);
    }
})
.wrap(yargs.terminalWidth())
.demandCommand(1, `Please specify a commamd (see above for details and usage example)`)
.help("help")
.argv;