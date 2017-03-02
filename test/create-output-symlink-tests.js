"use strict";

/*
Unit tests for function createOutputSymlink
*/

// Core deps
import path from "path";
import fs from "fs";

// 3rd party deps
import test from "ava";

// Local deps
import {createOutputSymlink} from "../src/lib/statyck-lib.js";


// Valid inputs:
test.cb("createOutputSymlink with valid inputs, non-existant symlink, then exists", (t) =>
{
  const outputDir = path.resolve(__dirname, "fixtures", "assets", "src");
  const symlink = path.resolve(__dirname, "fixtures", "src-symlink");

  createOutputSymlink(outputDir, symlink, (err) =>
  {
    t.is(err === null, true, "'err' must be null");

    fs.exists(symlink, (EErr) => 
    {
      t.is(EErr, true, "Symlink must be created without error");

      // We will NOT delete the symlink, but then run again to demonstrate that we wan handle the symlink already existing
      createOutputSymlink(outputDir, symlink, (err) =>
      {
        t.is(err === null, true, "'err' must be null");

        fs.exists(symlink, (EErr2) => 
        {
          fs.unlink(symlink, () => 
          {
            t.is(EErr2, true, "Symlink must be created without error2");
            t.end();
          });
        });
      });
    });
  });
});


// Invalid args
test.cb("createOutputSymlink with invalid inputs (outputDir == null)", (t) =>
{
  const outputDir = null;
  const symlink = "";

  const error = t.throws(() => 
  {
      createOutputSymlink(outputDir, symlink, () => 
      {
      });
  }, TypeError);

  t.is(error instanceof TypeError, true, "A TypeError must be thrown");
  t.end();    
});

test.cb("createOutputSymlink with invalid inputs (symlink == null)", (t) =>
{
  const outputDir = "";
  const symlink = null;
    
  const error = t.throws(() => 
  {
      createOutputSymlink(outputDir, symlink, () => 
      {
      });
  }, TypeError);

  t.is(error instanceof TypeError, true, "A TypeError must be thrown");
  t.end(); 
});
