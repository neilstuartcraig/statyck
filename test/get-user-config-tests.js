"use strict";

/*
Unit tests for function getUserConfig
*/

// Core deps
import path from "path";

// 3rd party deps
import test from "ava";

// Local deps
import getUserConfig from "../src/lib/functions/get-user-config.js";


// Valid inputs:
test.cb("getUserConfig with valid inputs", (t) =>
{
    // Args
    const projectBaseDirectory = path.resolve(__dirname, "fixtures");

    // Outputs
    const statykConfig = require("./fixtures/conf/statyck-config.json");
    const themeConfig = require("./fixtures/conf/theme-config.json");
    let expectedOutput = statykConfig;
    expectedOutput.theme = themeConfig;

    getUserConfig(projectBaseDirectory, (err, res) => 
    {
        t.is(err, null, "err must be null");

        t.deepEqual(res, expectedOutput, "res must exactly equal expectedOutput");''

        t.end();
    });
});

test.cb("getUserConfig with valid inputs (wrong base dir & thus config file", (t) =>
{
    // Args
    const projectBaseDirectory = path.resolve(__dirname, "fixtures-doesnt-exist");

    // Outputs
    const expectedOutput = {};


    getUserConfig(projectBaseDirectory, (err, res) => 
    {
        t.is(err instanceof Error, true, "err must be an instance of Error");

        t.deepEqual(res, expectedOutput, "res must exactly equal expectedOutput");

        t.end();
    });
});


// invalid args
test.cb("getUserConfig with invalid inputs (destDir == null)", (t) =>
{
    const projectBaseDirectory = null;

    const error = t.throws(() => 
    {
        getUserConfig(projectBaseDirectory, () => 
        {
        });
    }, TypeError);

    t.is(error instanceof TypeError, true, "A TypeError must be thrown");
    t.end();
});
