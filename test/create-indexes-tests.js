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
import createIndexes from "../src/lib/functions/create-indexes.js";


// Valid inputs:
test.cb("createIndexes with valid inputs (empty items array)", (t) =>
{
  // Args
  const items = []; 
  const numberOfItemsPerIndexPage = 1;
  const template = "";
  const themeSettings = {};
  const additionalContext = {}; 
  const outputDir = ""; 
  const writeOutputFile = false;

  // Outputs
  const expectedOutput = "";

  createIndexes(items, numberOfItemsPerIndexPage, template, themeSettings, additionalContext, outputDir, writeOutputFile, (err, res) =>
  {
    t.is(err instanceof Error, true, "err must be an instance of Error");
    t.deepEqual(res, expectedOutput, "'res' must be deepEqual to ${expectedOutput}");

    t.end();
  });
});

test.cb("createIndexes with valid inputs (no output file)", (t) =>
{
     // Args
    const items = 
    [ 
        {
            absoluteURI: '/pages/contact.html',
            filename: 'contact.html',
            title: 'Contact',
            slug: 'contact',
            metadata: { dateCreated: [Object], dateModified: [Object] },
            HTML: '<p>email and shiz plus social media and all of the that.\nbye.</p>\n' 
        },
        { 
            absoluteURI: '/pages/about.html',
            filename: 'about.html',
            title: 'About',
            slug: 'about',
            metadata: { dateCreated: [Object], dateModified: [Object] },
            HTML: '<p>Splain, this&#39;d be some BS about me</p>\n' 
        } 
    ];
  const numberOfItemsPerIndexPage = 30; // This is deliberately > items.length
  const template = `{{#each items.items ~}}{{title}}.{{~/each}}`;
  const themeSettings = {};
  const additionalContext = {}; 
  const outputDir = ""; 
  const writeOutputFile = false;

  // Outputs
  let expectedOutput = "";
  items.map((v) => 
  {
    expectedOutput += `${v.title}.`;
  });

  createIndexes(items, numberOfItemsPerIndexPage, template, themeSettings, additionalContext, outputDir, writeOutputFile, (err, res) =>
  {
    t.is(err === null, true, "err must be null");
    t.deepEqual(res, expectedOutput, "'res' must be deepEqual to ${expectedOutput}");

    t.end();
  });
});

test.cb("createIndexes with valid inputs (incorrect numberOfItemsPerIndexPage - 0)", (t) =>
{
     // Args
    const items = 
    [ 
        {
            absoluteURI: '/pages/contact.html',
            filename: 'contact.html',
            title: 'Contact',
            slug: 'contact',
            metadata: { dateCreated: [Object], dateModified: [Object] },
            HTML: '<p>email and shiz plus social media and all of the that.\nbye.</p>\n' 
        },
        { 
            absoluteURI: '/pages/about.html',
            filename: 'about.html',
            title: 'About',
            slug: 'about',
            metadata: { dateCreated: [Object], dateModified: [Object] },
            HTML: '<p>Splain, this&#39;d be some BS about me</p>\n' 
        } 
    ];
  const numberOfItemsPerIndexPage = 0; // This is deliberately > items.length
  const template = `{{#each items.items ~}}{{title}}.{{~/each}}`;
  const themeSettings = {};
  const additionalContext = {}; 
  const outputDir = ""; 
  const writeOutputFile = false;

  // Outputs
  let expectedOutput = "";

  createIndexes(items, numberOfItemsPerIndexPage, template, themeSettings, additionalContext, outputDir, writeOutputFile, (err, res) =>
  {
    t.is(err instanceof Error, true, "err must be an instance of Error");
    t.deepEqual(res, expectedOutput, "'res' must be deepEqual to ${expectedOutput}");

    t.end();
  });
});

test.cb("createIndexes with valid inputs (incorrect numberOfItemsPerIndexPage - -9)", (t) =>
{
     // Args
    const items = 
    [ 
        {
            absoluteURI: '/pages/contact.html',
            filename: 'contact.html',
            title: 'Contact',
            slug: 'contact',
            metadata: { dateCreated: [Object], dateModified: [Object] },
            HTML: '<p>email and shiz plus social media and all of the that.\nbye.</p>\n' 
        },
        { 
            absoluteURI: '/pages/about.html',
            filename: 'about.html',
            title: 'About',
            slug: 'about',
            metadata: { dateCreated: [Object], dateModified: [Object] },
            HTML: '<p>Splain, this&#39;d be some BS about me</p>\n' 
        } 
    ];
  const numberOfItemsPerIndexPage = -9; // This is deliberately > items.length
  const template = `{{#each items.items ~}}{{title}}.{{~/each}}`;
  const themeSettings = {};
  const additionalContext = {}; 
  const outputDir = ""; 
  const writeOutputFile = false;

  // Outputs
  let expectedOutput = "";

  createIndexes(items, numberOfItemsPerIndexPage, template, themeSettings, additionalContext, outputDir, writeOutputFile, (err, res) =>
  {
    t.is(err instanceof Error, true, "err must be an instance of Error");
    t.deepEqual(res, expectedOutput, "'res' must be deepEqual to ${expectedOutput}");

    t.end();
  });
});

test.cb("createIndexes with valid inputs (verify that additionalContext doesnt overwrite existing context)", (t) =>
{
     // Args
    const items = 
    [ 
        {
            absoluteURI: '/pages/contact.html',
            filename: 'contact.html',
            title: 'Contact',
            slug: 'contact',
            metadata: { dateCreated: [Object], dateModified: [Object] },
            HTML: '<p>email and shiz plus social media and all of the that.\nbye.</p>\n' 
        },
        { 
            absoluteURI: '/pages/about.html',
            filename: 'about.html',
            title: 'About',
            slug: 'about',
            metadata: { dateCreated: [Object], dateModified: [Object] },
            HTML: '<p>Splain, this&#39;d be some BS about me</p>\n' 
        } 
    ];
  const numberOfItemsPerIndexPage = -9; // This is deliberately > items.length
  const template = `{{#each items.items ~}}{{title}}.{{~/each}}`;
  const themeSettings = {};
  const additionalContext = 
  {
      items: "duplicate key"
  }; 
  const outputDir = ""; 
  const writeOutputFile = false;

  // Outputs
  let expectedOutput = "";

  createIndexes(items, numberOfItemsPerIndexPage, template, themeSettings, additionalContext, outputDir, writeOutputFile, (err, res) =>
  {
    t.is(err instanceof Error, true, "err must be an instance of Error");
    t.deepEqual(res, expectedOutput, "'res' must be deepEqual to ${expectedOutput}");

    t.end();
  });
});

test.cb("createIndexes with valid inputs (with output file)", (t) =>
{
     // Args
    const items = 
    [ 
        {
            absoluteURI: '/pages/contact.html',
            filename: 'contact.html',
            title: 'Contact',
            slug: 'contact',
            metadata: { dateCreated: [Object], dateModified: [Object] },
            HTML: '<p>email and shiz plus social media and all of the that.\nbye.</p>\n' 
        },
        { 
            absoluteURI: '/pages/about.html',
            filename: 'about.html',
            title: 'About',
            slug: 'about',
            metadata: { dateCreated: [Object], dateModified: [Object] },
            HTML: '<p>Splain, this&#39;d be some BS about me</p>\n' 
        } 
    ];
  const numberOfItemsPerIndexPage = 1; // This is deliberately < items.length
  const template = `{{#each items.items ~}}{{title}}.{{~/each}}`;
  const themeSettings = {};
  const additionalContext = 
  {
      blah: "burgerssss"
  }; 
  const outputDir = path.resolve(__dirname, "fixtures"); 
  const writeOutputFile = true;

  // Outputs
  let expectedOutput = items[1].title + "."; // NOTE: the returned value is only the LAST index - this is not really cricket

  createIndexes(items, numberOfItemsPerIndexPage, template, themeSettings, additionalContext, outputDir, writeOutputFile, (err, res) =>
  {
    t.is(err === null, true, "err must be null");
    t.deepEqual(res, expectedOutput, "'res' must be deepEqual to ${expectedOutput}");

// NOTE: Ad per above, currently, createIndexes is returning only the LAST created index - fix this, then fix the test
    const filename = path.resolve(outputDir, "index-1.html");
    fs.readFile(filename, (FRErr, data) => 
    {
        t.is(FRErr === null, true, "FRErr must be null");
        const f = data.toString("utf8");
        t.is(f, expectedOutput, "File output content must be === expectedOutput");

        fs.unlink(filename, (UErr) => 
        {
            t.end();
        });
    });
  });
});



// Invalid inputs
test.cb("createIndexes with invalid inputs (items == null)", (t) =>
{
  // Args
  const items = null; 
  const numberOfItemsPerIndexPage = 1;
  const template = "";
  const themeSettings = {};
  const additionalContext = {}; 
  const outputDir = ""; 
  const writeOutputFile = false;
  
  const error = t.throws(() => 
  {
      createIndexes(items, numberOfItemsPerIndexPage, template, themeSettings, additionalContext, outputDir, writeOutputFile, () => 
      {
      });
  }, TypeError);

  t.is(error instanceof TypeError, true, "A TypeError must be thrown");
  t.end();
});

test.cb("createIndexes with invalid inputs (numberOfItemsPerIndexPage == null)", (t) =>
{
  // Args
  const items = []; 
  const numberOfItemsPerIndexPage = null;
  const template = "";
  const themeSettings = {};
  const additionalContext = {}; 
  const outputDir = ""; 
  const writeOutputFile = false;
  
  const error = t.throws(() => 
  {
      createIndexes(items, numberOfItemsPerIndexPage, template, themeSettings, additionalContext, outputDir, writeOutputFile, () => 
      {
      });
  }, TypeError);

  t.is(error instanceof TypeError, true, "A TypeError must be thrown");
  t.end();
});

test.cb("createIndexes with invalid inputs (template == null)", (t) =>
{
  // Args
  const items = []; 
  const numberOfItemsPerIndexPage = 1;
  const template = null;
  const themeSettings = {};
  const additionalContext = {}; 
  const outputDir = ""; 
  const writeOutputFile = false
  
  const error = t.throws(() => 
  {
      createIndexes(items, numberOfItemsPerIndexPage, template, themeSettings, additionalContext, outputDir, writeOutputFile, () => 
      {
      });
  }, TypeError);

  t.is(error instanceof TypeError, true, "A TypeError must be thrown");
  t.end();
});

test.cb("createIndexes with invalid inputs (themeSettings == null)", (t) =>
{
  // Args
  const items = []; 
  const numberOfItemsPerIndexPage = 1;
  const template = "";
  const themeSettings = null;
  const additionalContext = {}; 
  const outputDir = ""; 
  const writeOutputFile = false
  
  const error = t.throws(() => 
  {
      createIndexes(items, numberOfItemsPerIndexPage, template, themeSettings, additionalContext, outputDir, writeOutputFile, () => 
      {
      });
  }, TypeError);

  t.is(error instanceof TypeError, true, "A TypeError must be thrown");
  t.end();
});

test.cb("createIndexes with invalid inputs (additionalContext == null)", (t) =>
{
  // Args
  const items = []; 
  const numberOfItemsPerIndexPage = 1;
  const template = "";
  const themeSettings = {};
  const additionalContext = null; 
  const outputDir = ""; 
  const writeOutputFile = false;
  
  const error = t.throws(() => 
  {
      createIndexes(items, numberOfItemsPerIndexPage, template, themeSettings, additionalContext, outputDir, writeOutputFile, () => 
      {
      });
  }, TypeError);

  t.is(error instanceof TypeError, true, "A TypeError must be thrown");
  t.end();
});

test.cb("createIndexes with invalid inputs (outputDir == null)", (t) =>
{
  // Args
  const items = []; 
  const numberOfItemsPerIndexPage = 1;
  const template = "";
  const themeSettings = {};
  const additionalContext = {}; 
  const outputDir = null; 
  const writeOutputFile = false;
  
  const error = t.throws(() => 
  {
      createIndexes(items, numberOfItemsPerIndexPage, template, themeSettings, additionalContext, outputDir, writeOutputFile, () => 
      {
      });
  }, TypeError);

  t.is(error instanceof TypeError, true, "A TypeError must be thrown");
  t.end();
});

test.cb("createIndexes with invalid inputs (writeOutputFile == null)", (t) =>
{
  // Args
  const items = []; 
  const numberOfItemsPerIndexPage = 1;
  const template = "";
  const themeSettings = {};
  const additionalContext = {}; 
  const outputDir = ""; 
  const writeOutputFile = null;
  
  const error = t.throws(() => 
  {
      createIndexes(items, numberOfItemsPerIndexPage, template, themeSettings, additionalContext, outputDir, writeOutputFile, () => 
      {
      });
  }, TypeError);

  t.is(error instanceof TypeError, true, "A TypeError must be thrown");
  t.end();
});
