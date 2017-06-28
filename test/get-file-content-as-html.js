"use strict";

/*
Unit tests for function createOutputSymlink
*/

// Core deps
import path from "path";

// 3rd party deps
import test from "ava";
import {minify} from "html-minifier";

// Local deps
import getFileContentAsHTML from "../src/lib/functions/get-file-content-as-html.js";

// Yep - this is crap, it shou;dn't be statically defined
const minifierOptions = 
{
  collapseWhitespace: true,
  removeAttributeQuotes: true
};

// Valid args:
test.cb("getFileContentAsHTML with valid inputs", (t) =>
{
  // Args
  const filename = path.resolve(__dirname, "fixtures", "assets", "src", "md", "md-1.md");

  // Outputs
  // TODO: Make this array automatically populated, it's too brittle being hardcoded
  const expectedOutput = minify("<h1 id=\"h1\">H1</h1>\n<p>Hello</p>\n", minifierOptions);

  getFileContentAsHTML(filename, (err, res) =>
  {
    t.is(err === null, true, "Error must be null");
    t.deepEqual(res, expectedOutput, "'res' must be deepEqual to ${expectedOutput}");

    t.end();
  });
});

test.cb("getFileContentAsHTML with valid inputs - file !exists", (t) =>
{
  // Args
  const filename = path.resolve(__dirname, "fixtures", "assets", "src", "md", "does-not-exist.md");

  // Outputs
  // TODO: Make this array automatically populated, it's too brittle being hardcoded
  const expectedOutput = "";

  getFileContentAsHTML(filename, (err, res) =>
  {
    t.is(err instanceof Error, true, "Error must be an instanceof Error");
    t.deepEqual(res, expectedOutput, "'res' must be deepEqual to ${expectedOutput}");

    t.end();
  });
});


// invalid args
test.cb("getFileContentAsHTML with invalid inputs (fileExtensions == null)", (t) =>
{
  // Args
  const filename = null;
    
  const error = t.throws(() => 
  {
      getFileContentAsHTML(filename, () => 
      {
      });
  }, TypeError);

  t.is(error instanceof TypeError, true, "A TypeError must be thrown");
  t.end();
});
