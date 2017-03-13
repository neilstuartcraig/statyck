"use strict";

/*
Unit tests for function recCopyFiles
*/

// Core deps
import path from "path";

// 3rd party deps
import test from "ava";
import recursive from "recursive-readdir";
import rimraf from "rimraf";

// Local deps
import {recCopyFiles} from "../src/lib/statyck-lib.js";


// Valid inputs:
test.cb("recCopyFiles with valid inputs", (t) =>
{

// NOTE: This test *could* be expanded upon by also checking file contents are identical  

    let sourceDir = path.resolve(__dirname, "fixtures", "assets", "src");
    let destDir = path.resolve(__dirname, "fixtures", "assets", "dest");

    recCopyFiles(sourceDir, destDir, (err) =>
    {
        t.is(err === null, true, "'err' must be null");

        recursive(sourceDir, (SErr, SFiles) => 
        {
            recursive(destDir, (DErr, DFiles) => 
            {
                t.is(SErr === null, true, `Src err must be null`);
                t.is(DErr === null, true, `Dest err must be null`);

                // Content of src vs dest (recursive)
                const SArr = new Set();
                const DArr = new Set();
                SFiles.map((SF) => 
                {
                    const srcDirStart = path.join(__dirname, "fixtures", "assets", "src");
                    const SFile = SF.replace(srcDirStart, "");
                    SArr.add(SFile);

                    DFiles.map((DF) => 
                    {
                        const destDirStart = path.join(__dirname, "fixtures", "assets", "dest");
                        const DFile = DF.replace(destDirStart, "");
                        DArr.add(DFile);
                    });
                    
                });

                // Ensure that the source and dest dir's are identical
                t.deepEqual(SArr, DArr, `Source and destination directory listing must be identical`);

                // Clean up the filesystem so that previous tests don't impactv subsequent tests
                rimraf(destDir, () => 
                {
                    t.end();
                });                
            });
        });
    });
});

test.cb("recCopyFiles with valid input types but non-existant source", (t) =>
{
    let sourceDir = path.resolve(__dirname, "fixtures", "dir-which-does-not-exist");
    let destDir = path.resolve(__dirname, "fixtures", "assets", "dest");

    recCopyFiles(sourceDir, destDir, (err) =>
    {
        t.is(err instanceof Error, true, `err must be an instance of Error`);

        t.end();
    });
});


// Invalid inputs
test.cb("recCopyFiles with invalid inputs (sourceDir == null)", (t) =>
{
    let sourceDir = null;
    let destDir = "some-path";
    
    const error = t.throws(() => 
    {
        recCopyFiles(sourceDir, destDir, () => 
        {
        });
    }, TypeError);

    t.is(error instanceof TypeError, true, "A TypeError must be thrown");
    t.end();  
});

test.cb("recCopyFiles with invalid inputs (destDir == null)", (t) =>
{
    let sourceDir = "some-path";
    let destDir = null;

    const error = t.throws(() => 
    {
        recCopyFiles(sourceDir, destDir, () => 
        {
        });
    }, TypeError);

    t.is(error instanceof TypeError, true, "A TypeError must be thrown");
    t.end();
});
