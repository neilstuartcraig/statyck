"use strict";

// Core deps
import path from "path";
import fs from "fs";

// 3rd party deps
import test from "ava";
import rimraf from "rimraf";

// Local deps
import createDirRec from "../src/lib/functions/create-dir-rec.js";

test.cb("createDirRec with valid outputDir", (t) =>
{
    // Args
    const outputDir = path.resolve(__dirname, "fixtures", "test-dir");

    createDirRec(outputDir, (CODErr) => 
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
test.cb("createDirRec with invalid outputDir === null", (t) =>
{
    // Args
    const outputDir = null;

    const error = t.throws(() => 
    {
        createDirRec(outputDir, () => 
        {
        });
    }, TypeError);

    t.is(error instanceof TypeError, true, "A TypeError must be thrown");
    t.end();
});
