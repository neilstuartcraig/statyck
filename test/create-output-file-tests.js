"use strict";

/*
Unit tests for function createOutputFile
*/

// Core deps
import path from "path";
import fs from "fs";

// 3rd party deps
import test from "ava";

// Local deps
import createOutputFile from "../src/lib/functions/create-output-file.js";


// Valid inputs:
test.cb("createOutputFile with valid inputs (no output file)", (t) =>
{
  // Args
  const templateString = "start. num = {{num}}. obj.str = {{obj.str}}. end"; // This must be a handlebars template string
  const context = 
  {
      num: 123,
      obj: 
      {
          str: "string"
      }
  }; 
  const outputPathAndFilename = path.resolve(__dirname, "fixtures", "output-file-tmp.txt"); 

  // Outputs
  const expectedOutput = `start. num = ${context.num}. obj.str = ${context.obj.str}. end`;

  createOutputFile(templateString, context, outputPathAndFilename, (err, res) =>
  {
    t.is(err === null, true, "err must be null");
    t.deepEqual(res, expectedOutput, "'res' must be deepEqual to ${expectedOutput}");

    fs.readFile(outputPathAndFilename, (FErr, data) => 
    {
        t.is(FErr === null, true, "Must be able to read the output file");

        const fileContent = data.toString("utf8");
        t.is(fileContent === expectedOutput, true, "file content must match expectedOutput");

        fs.unlink(outputPathAndFilename, () => 
        {
            t.end();
        });
    });
  });
});

// invalid args
test.cb("createOutputFile with invalid inputs (templateString == null)", (t) =>
{
    // Args
    const templateString = null;
    const context = 
    {
        num: 123,
        obj: 
        {
            str: "string"
        }
    }; 
    const outputPathAndFilename = path.resolve(__dirname, "fixtures", "output-file-tmp.txt");
  
    const error = t.throws(() => 
    {
        createOutputFile(templateString, context, outputPathAndFilename, () => 
        {
        });
    }, TypeError);

    t.is(error instanceof TypeError, true, "A TypeError must be thrown");
    t.end();
});

test.cb("createOutputFile with invalid inputs (context == null)", (t) =>
{
    // Args
    const templateString = "start. num = {{num}}. obj.str = {{obj.str}}. end"; // This must be a handlebars template string
    const context = null; 
    const outputPathAndFilename = path.resolve(__dirname, "fixtures", "output-file-tmp.txt");
  
    const error = t.throws(() => 
    {
        createOutputFile(templateString, context, outputPathAndFilename, () => 
        {
        });
    }, TypeError);

    t.is(error instanceof TypeError, true, "A TypeError must be thrown");
    t.end();
});

test.cb("createOutputFile with invalid inputs (outputPathAndFilename == null)", (t) =>
{
    // Args
    const templateString = "start. num = {{num}}. obj.str = {{obj.str}}. end"; // This must be a handlebars template string
    const context = 
    {
        num: 123,
        obj: 
        {
            str: "string"
        }
    }; 
    const outputPathAndFilename = null;
  
    const error = t.throws(() => 
    {
        createOutputFile(templateString, context, outputPathAndFilename, () => 
        {
        });
    }, TypeError);

    t.is(error instanceof TypeError, true, "A TypeError must be thrown");
    t.end();
});
