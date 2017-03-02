"use strict";

/*
Unit tests for function listFiles
*/

// Core deps
import path from "path";

// 3rd party deps
import test from "ava";

// Local deps
import {listFiles} from "../src/lib/statyck-lib.js";




// Valid inputs:
test.cb("listFiles with valid inputs", (t) =>
{
  // Args
  const pathToFiles = path.resolve(__dirname, "fixtures", "assets", "src", "css");
  const fileExtensions = ".css";

  // Outputs
  // TODO: Make this array automatically populated, it's too brittle being hardcoded
  const expectedOutput = 
  [
    "styles2.css",
    "styles1.css"
  ];

  listFiles(pathToFiles, fileExtensions, (err, res) =>
  {
    t.is(err === null, true, "'err' must be null");
    t.deepEqual(res, expectedOutput, "'res' must be deepEqual to ${expectedOutput}");

    t.end();
  });
});


// Invalid inputs


test.cb("listFiles with invalid inputs (path == null)", (t) =>
{
  const pathToFiles = null;
  const fileExtensions = ".css";
  
  const error = t.throws(() => 
  {
      listFiles(pathToFiles, fileExtensions, () => 
      {
      });
  }, TypeError);

  t.is(error instanceof TypeError, true, "A TypeError must be thrown");
  t.end();
});

test.cb("listFiles with invalid inputs (fileExtensions == null)", (t) =>
{
  const pathToFiles = path.resolve(__dirname, "fixtures", "assets", "src", "css");
  const fileExtensions = null;
    
  const error = t.throws(() => 
  {
      listFiles(pathToFiles, fileExtensions, () => 
      {
      });
  }, TypeError);

  t.is(error instanceof TypeError, true, "A TypeError must be thrown");
  t.end();
});
