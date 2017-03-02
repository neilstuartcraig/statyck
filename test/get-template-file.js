"use strict";

/*
Unit tests for function getTemplateFile
*/

// Core deps
import path from "path";
import fs from "fs";

// 3rd party deps
import test from "ava";

// Local deps
import {getTemplateFile} from "../src/lib/statyck-lib.js";



// Valid inputs:
test.cb("getTemplateFile with valid inputs", (t) =>
{
  let themeDir = path.resolve(__dirname, "fixtures", "themes", "default");
  let contentType = "page";

  getTemplateFile(themeDir, contentType, (err, res) =>
  {
    t.is(err === null, true, "'err' must be null");

    const templateFilename = contentType + ".html";
    const templatePathAndFilename = path.join(themeDir, templateFilename);

    fs.readFile(templatePathAndFilename, (TErr, data) => 
    {
      t.is(TErr === null, true, "there must not be an error reading the template for comparison");

      const template = data.toString("utf8");

      t.is(res, template, "template must match template file content");

      t.end();
    });
  });
});


test.cb("getTemplateFile with valid inputs but non-existant template file", (t) =>
{
  let themeDir = path.resolve(__dirname, "fixtures", "themes", "default");
  let contentType = "non-existant-content-type";

  getTemplateFile(themeDir, contentType, (err, res) =>
  {
    t.is(err instanceof Error, true, "'err' must be and instance of Error");
    t.is(res === "", true, "result must be an empty string");

    t.end();

  });
});


// Invalid inputs
test.cb("getTemplateFile with invalid inputs (themeDir == null)", (t) =>
{
  let themeDir = null;
  let contentType = "page";

  const error = t.throws(() => 
  {
      getTemplateFile(themeDir, contentType, () => 
      {
      });
  }, TypeError);

  t.is(error instanceof TypeError, true, "A TypeError must be thrown");
  t.end();
});

test.cb("getTemplateFile with invalid inputs (contentType == null)", (t) =>
{
  let themeDir = path.resolve(__dirname, "fixtures", "themes", "default");
  let contentType = null;
    
  const error = t.throws(() => 
  {
      getTemplateFile(themeDir, contentType, () => 
      {
      });
  }, TypeError);

  t.is(error instanceof TypeError, true, "A TypeError must be thrown");
  t.end();
});
