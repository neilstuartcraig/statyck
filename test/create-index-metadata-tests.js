"use strict";

/*
Unit tests for function createIndexFilename
*/

// Core deps
;

// 3rd party deps
import test from "ava";


// Local deps
import createIndexMetadata from "../src/lib/functions/create-index-metadata.js";


// Valid inputs:
test.cb("createIndexFilename with valid inputs (0th)", (t) =>
{
    // Args
    const currentIndexNumber = 0;
    const totalNumberOfIndexes = 10;
    const pathPrefix = "";

    // Outputs
    const expectedOutput = 
    {
        isFirstIndex: true,
        isNotFirstIndex: false,
        prevIndexHRef: "",
        isLastIndex: false,
        isNotLastIndex: true,
        nextIndexHRef: "index-1.html"
    };

    createIndexMetadata(currentIndexNumber, totalNumberOfIndexes, pathPrefix, (res) => 
    {
        t.deepEqual(res, expectedOutput, `expectedOutput must deepEqual ${res}`);

        t.end();
    });
});

test.cb("createIndexFilename with valid inputs (Nth)", (t) =>
{
    // Args
    const currentIndexNumber = 5;
    const totalNumberOfIndexes = 10;
    const pathPrefix = "/prefx";

    // Outputs
    const expectedOutput = 
    {
        isFirstIndex: false,
        isNotFirstIndex: true,
        prevIndexHRef: `${pathPrefix}/index-4.html`,
        isLastIndex: false,
        isNotLastIndex: true,
        nextIndexHRef: `${pathPrefix}/index-6.html`
    };

    createIndexMetadata(currentIndexNumber, totalNumberOfIndexes, pathPrefix, (res) => 
    {
        t.deepEqual(res, expectedOutput, `expectedOutput must deepEqual ${res}`);

        t.end();
    });
});

test.cb("createIndexFilename with valid inputs (last)", (t) =>
{
    // Args
    const currentIndexNumber = 10;
    const totalNumberOfIndexes = 10;
    const pathPrefix = "/prefx";

    // Outputs
    const expectedOutput = 
    {
        isFirstIndex: false,
        isNotFirstIndex: true,
        prevIndexHRef: `${pathPrefix}/index-9.html`,
        isLastIndex: true,
        isNotLastIndex: false,
        nextIndexHRef: ``
    };

    createIndexMetadata(currentIndexNumber, totalNumberOfIndexes, pathPrefix, (res) => 
    {
        t.deepEqual(res, expectedOutput, `expectedOutput must deepEqual ${res}`);

        t.end();
    });
});

test.cb("createIndexFilename with valid inputs (1 of 1)", (t) =>
{
    // Args
    const currentIndexNumber = 0;
    const totalNumberOfIndexes = 0;
    const pathPrefix = "/prefx";

    // Outputs
    const expectedOutput = 
    {
        isFirstIndex: true,
        isNotFirstIndex: false,
        prevIndexHRef: ``,
        isLastIndex: true,
        isNotLastIndex: false,
        nextIndexHRef: ``
    };

    createIndexMetadata(currentIndexNumber, totalNumberOfIndexes, pathPrefix, (res) => 
    {
        t.deepEqual(res, expectedOutput, `expectedOutput must deepEqual ${res}`);

        t.end();
    });
});