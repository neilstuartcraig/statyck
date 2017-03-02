"use strict";

// Core deps

// 3rd party deps
import test from "ava";

// Local deps
import createIndexFilename from "../src/lib/functions/create-index-filename.js";

test.cb("createIndexFilename with valid input with indexNumber = 0 and pathPrefix = \"\"", (t) =>
{
    // Args
    const indexNumber = 0;
    const pathPrefix = "";

    // Output
    const expectedOutput = "index.html";

    createIndexFilename(indexNumber, pathPrefix, (res) => 
    {
        t.deepEqual(res, expectedOutput, `expected output must be ${expectedOutput}`);
        t.end();
    });
});

test.cb("createIndexFilename with valid input with indexNumber = 1 and pathPrefix = \"", (t) =>
{
    // Args
    const indexNumber = 1;
    const pathPrefix = "";

    // Output
    const expectedOutput = `index-${indexNumber}.html`;

    createIndexFilename(indexNumber, pathPrefix, (res) => 
    {
        t.deepEqual(res, expectedOutput, `expected output must be ${expectedOutput}`);
        t.end();
    });
});

test.cb("createIndexFilename with valid input with indexNumber = 1 and pathPrefix = \"/path/to/site\"", (t) =>
{
    // Args
    const indexNumber = 10;
    const pathPrefix = "/path/to/site";

    // Output
    const expectedOutput = `${pathPrefix}/index-${indexNumber}.html`;

    createIndexFilename(indexNumber, pathPrefix, (res) => 
    {
        t.deepEqual(res, expectedOutput, `expected output must be ${expectedOutput}`);
        t.end();
    });
});

test.cb("createIndexFilename with valid input with indexNumber = 0 and pathPrefix = \"/path/to/site\"", (t) =>
{
    // Args
    const indexNumber = 0;
    const pathPrefix = "/path/to/site";

    // Output
    const expectedOutput = `${pathPrefix}/index.html`;

    createIndexFilename(indexNumber, pathPrefix, (res) => 
    {
        t.deepEqual(res, expectedOutput, `expected output must be ${expectedOutput}`);
        t.end();
    });
});


test.cb("createIndexFilename with invalid input with indexNumber = -1 and pathPrefix = \"\"", (t) =>
{
    // Args
    const indexNumber = -1;
    const pathPrefix = "";

    // Output
    const expectedOutput = `index.html`;

    createIndexFilename(indexNumber, pathPrefix, (res) => 
    {
        t.deepEqual(res, expectedOutput, `expected output must be ${expectedOutput}`);
        t.end();
    });
});

test.cb("createIndexFilename with invalid input with indexNumber = -1 and pathPrefix = \"/path/to/site\"", (t) =>
{
    // Args
    const indexNumber = -1;
    const pathPrefix = "/path/to/site";

    // Output
    const expectedOutput = `${pathPrefix}/index.html`;

    createIndexFilename(indexNumber, pathPrefix, (res) => 
    {
        t.deepEqual(res, expectedOutput, `expected output must be ${expectedOutput}`);
        t.end();
    });
});


test.cb("createIndexFilename with invalid input with indexNumber = null and pathPrefix = \"\"", (t) =>
{
    // Args
    const indexNumber = null;
    const pathPrefix = "/path/to/site";

    // Output
    // const expectedOutput = `${pathPrefix}/index.html`;

    const error = t.throws(() => 
    {
        createIndexFilename(indexNumber, pathPrefix, () => 
        {
        });
    }, TypeError);

    t.is(error instanceof TypeError, true, "A TypeError must be thrown");
    t.end();
});

test.cb("createIndexFilename with invalid input with indexNumber = 0 and pathPrefix = null", (t) =>
{
    // Args
    const indexNumber = 0;
    const pathPrefix = null;

    // Output
    // const expectedOutput = `${pathPrefix}/index.html`;

    const error = t.throws(() => 
    {
        createIndexFilename(indexNumber, pathPrefix, () => 
        {
        });
    }, TypeError);

    t.is(error instanceof TypeError, true, "A TypeError must be thrown");
    t.end();
});
