"use strict";

// Core deps
import path from "path";
import fs from "fs";

// 3rd party deps
import test from "ava";
import rimraf from "rimraf";

// Local deps
import createOutputDir from "../src/lib/functions/create-output-dir.js";

test.cb("createOutputDir with valid outputDir", (t) =>
{
    // Args
    const outputDir = path.resolve(__dirname, "fixtures", "test-dir");

    createOutputDir(outputDir, (CODErr) => 
    {
        t.is(CODErr === null, true, "CODErr must be null");

        fs.exists(outputDir, (EErr) => 
        {
            if(EErr)
            {
                console.error(`Error creating output dir: ${EErr.message}`);
                rimraf(outputDir, () => 
                {
                    t.end();
                });
            }
        });
    });
});

// invalid args
test.cb("createOutputDir with invalid outputDir === null", (t) =>
{
    // Args
    const outputDir = null;

    const error = t.throws(() => 
    {
        createOutputDir(outputDir, () => 
        {
        });
    }, TypeError);

    t.is(error instanceof TypeError, true, "A TypeError must be thrown");
    t.end();
});
