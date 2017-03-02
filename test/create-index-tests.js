"use strict";

/*
Unit tests for function createIndex
*/

// Core deps
import path from "path";
import fs from "fs";

// 3rd party deps
import test from "ava";

// Local deps
import createIndex from "../src/lib/functions/create-index.js";


// Valid inputs:
test.cb("createIndex with valid inputs (no output file)", (t) =>
{
  // Args
  const context = 
  {
      num: 123,
      obj: 
      {
          str: "string"
      }
  }; 
  const templateString = "start. num = {{num}}. obj.str = {{obj.str}}. ci = {{indexes.current}}. ti = {{indexes.total}}. end"; // This must be a handlebars template string
  const currentIndexNumber = 1; 
  const totalNumberOfIndexes = 99; 
  const outputPathAndFilename = ""; 
  const writeOutputFile = false;

  // Outputs
  const expectedOutput = `start. num = ${context.num}. obj.str = ${context.obj.str}. ci = ${currentIndexNumber}. ti = ${totalNumberOfIndexes}. end`;

  createIndex(context, templateString, currentIndexNumber, totalNumberOfIndexes, outputPathAndFilename, writeOutputFile, (err, res) =>
  {
    t.is(err === null, true, "err must be null");
    t.deepEqual(res, expectedOutput, "'res' must be deepEqual to ${expectedOutput}");

    t.end();
  });
});

test.cb("createIndex with valid inputs (with output file)", (t) =>
{
  // Args
  const context = 
  {
      num: 123,
      obj: 
      {
          str: "string"
      }
  }; 
  const templateString = "start. num = {{num}}. obj.str = {{obj.str}}. ci = {{indexes.current}}. ti = {{indexes.total}}. end"; // This must be a handlebars template string
  const currentIndexNumber = 1; 
  const totalNumberOfIndexes = 99; 
  const outputPathAndFilename = path.resolve(__dirname, "fixtures", "create-index-test-output.txt"); 
  const writeOutputFile = true;

  // Outputs
  const expectedOutput = `start. num = ${context.num}. obj.str = ${context.obj.str}. ci = ${currentIndexNumber}. ti = ${totalNumberOfIndexes}. end`;

  createIndex(context, templateString, currentIndexNumber, totalNumberOfIndexes, outputPathAndFilename, writeOutputFile, (err, res) =>
  {
    t.is(err === null, true, "err must be null");
    t.deepEqual(res, expectedOutput, "'res' must be deepEqual to ${expectedOutput}");

    fs.readFile(outputPathAndFilename, (FRErr, data) => 
    {
        t.is(FRErr === null, true, "fread err must be null");

        const f = data.toString("utf8");
        t.is(f, expectedOutput, "Output file content must match expectedOutput");

        // Delete the output file
        fs.unlink(outputPathAndFilename, (UErr) => 
        {
            if(UErr)
            {
                console.error(`Couldn't delete create-indexes-tests output file": ${UErr.message}`);
            }

            t.end();
        });
    });    
  });
});


// Invalid inputs
test.cb("createIndex with invalid inputs (context == null)", (t) =>
{
  // Args
  const context = null;
  const templateString = "start. num = {{num}}. obj.str = {{obj.str}}. ci = {{indexes.current}}. ti = {{indexes.total}}. end"; // This must be a handlebars template string
  const currentIndexNumber = 1; 
  const totalNumberOfIndexes = 99; 
  const outputPathAndFilename = ""; 
  const writeOutputFile = false;
  
  const error = t.throws(() => 
  {
      createIndex(context, templateString, currentIndexNumber, totalNumberOfIndexes, outputPathAndFilename, writeOutputFile, () => 
      {
      });
  }, TypeError);

  t.is(error instanceof TypeError, true, "A TypeError must be thrown");
  t.end();
});

test.cb("createIndex with invalid inputs (templateString == null)", (t) =>
{
  // Args
  const context = 
  {
      num: 123,
      obj: 
      {
          str: "string"
      }
  }; 
  const templateString = null;
  const currentIndexNumber = 1; 
  const totalNumberOfIndexes = 99; 
  const outputPathAndFilename = ""; 
  const writeOutputFile = false;
  
  const error = t.throws(() => 
  {
      createIndex(context, templateString, currentIndexNumber, totalNumberOfIndexes, outputPathAndFilename, writeOutputFile, () => 
      {
      });
  }, TypeError);

  t.is(error instanceof TypeError, true, "A TypeError must be thrown");
  t.end();
});

test.cb("createIndex with invalid inputs (currentIndexNumber == null)", (t) =>
{
  // Args
  const context = 
  {
      num: 123,
      obj: 
      {
          str: "string"
      }
  }; 
  const templateString = "start. num = {{num}}. obj.str = {{obj.str}}. ci = {{indexes.current}}. ti = {{indexes.total}}. end"; // This must be a handlebars template string
  const currentIndexNumber = null; 
  const totalNumberOfIndexes = 99; 
  const outputPathAndFilename = ""; 
  const writeOutputFile = false;
  
  const error = t.throws(() => 
  {
      createIndex(context, templateString, currentIndexNumber, totalNumberOfIndexes, outputPathAndFilename, writeOutputFile, () => 
      {
      });
  }, TypeError);

  t.is(error instanceof TypeError, true, "A TypeError must be thrown");
  t.end();
});

test.cb("createIndex with invalid inputs (totalNumberOfIndexes == null)", (t) =>
{
  // Args
  const context = 
  {
      num: 123,
      obj: 
      {
          str: "string"
      }
  }; 
  const templateString = "start. num = {{num}}. obj.str = {{obj.str}}. ci = {{indexes.current}}. ti = {{indexes.total}}. end"; // This must be a handlebars template string
  const currentIndexNumber = 1; 
  const totalNumberOfIndexes = null; 
  const outputPathAndFilename = ""; 
  const writeOutputFile = false;
  
  const error = t.throws(() => 
  {
      createIndex(context, templateString, currentIndexNumber, totalNumberOfIndexes, outputPathAndFilename, writeOutputFile, () => 
      {
      });
  }, TypeError);

  t.is(error instanceof TypeError, true, "A TypeError must be thrown");
  t.end();
});

test.cb("createIndex with invalid inputs (outputPathAndFilename == null)", (t) =>
{
  // Args
  const context = 
  {
      num: 123,
      obj: 
      {
          str: "string"
      }
  }; 
  const templateString = "start. num = {{num}}. obj.str = {{obj.str}}. ci = {{indexes.current}}. ti = {{indexes.total}}. end"; // This must be a handlebars template string
  const currentIndexNumber = 1; 
  const totalNumberOfIndexes = 99; 
  const outputPathAndFilename = null; 
  const writeOutputFile = false;
  
  const error = t.throws(() => 
  {
      createIndex(context, templateString, currentIndexNumber, totalNumberOfIndexes, outputPathAndFilename, writeOutputFile, () => 
      {
      });
  }, TypeError);

  t.is(error instanceof TypeError, true, "A TypeError must be thrown");
  t.end();
});

test.cb("createIndex with invalid inputs (writeOutputFile == null)", (t) =>
{
  // Args
  const context = 
  {
      num: 123,
      obj: 
      {
          str: "string"
      }
  }; 
  const templateString = "start. num = {{num}}. obj.str = {{obj.str}}. ci = {{indexes.current}}. ti = {{indexes.total}}. end"; // This must be a handlebars template string
  const currentIndexNumber = 1; 
  const totalNumberOfIndexes = 99; 
  const outputPathAndFilename = ""; 
  const writeOutputFile = null;
  
  const error = t.throws(() => 
  {
      createIndex(context, templateString, currentIndexNumber, totalNumberOfIndexes, outputPathAndFilename, writeOutputFile, () => 
      {
      });
  }, TypeError);

  t.is(error instanceof TypeError, true, "A TypeError must be thrown");
  t.end();
});
