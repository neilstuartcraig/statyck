"use strict";

/*
Unit tests for function getFileTitle
*/

// Core deps
import path from "path";

// 3rd party deps
import test from "ava";

// Local deps
import getFileTitle from "../src/lib/functions/get-file-title.js";




// Valid inputs:
test.cb("getFileTitle with valid inputs", (t) =>
{
  // Args
  const postName = "Some blog post.md";
  const filename = path.resolve(__dirname, "fixtures", "assets", "src", "posts", postName);
  const fileExtension = ".md";

  // Outputs
  // TODO: Make this array automatically populated, it's too brittle being hardcoded
  const expectedOutput = "Some blog post";

  getFileTitle(filename, fileExtension, (res) =>
  {
    t.deepEqual(res, expectedOutput, "'res' must be deepEqual to ${expectedOutput}");

    t.end();
  });
});


// Invalid inputs
test.cb("getFileTitle with invalid inputs (path == null)", (t) =>
{
  // Args
  const filename = null;
  const fileExtensions = ".md";
  
  const error = t.throws(() => 
  {
      getFileTitle(filename, fileExtensions, () => 
      {
      });
  }, TypeError);

  t.is(error instanceof TypeError, true, "A TypeError must be thrown");
  t.end();
});

test.cb("getFileTitle with invalid inputs (fileExtensions == null)", (t) =>
{
  // Args
  const postName = "Some blog post.md";
  const filename = path.resolve(__dirname, "fixtures", "assets", "src", "posts", postName);
  const fileExtensions = null;
    
  const error = t.throws(() => 
  {
      getFileTitle(filename, fileExtensions, () => 
      {
      });
  }, TypeError);

  t.is(error instanceof TypeError, true, "A TypeError must be thrown");
  t.end();
});
