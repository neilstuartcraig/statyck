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
import createOutputFiles from "../src/lib/functions/create-output-files.js";


// Valid inputs:
test.cb("createOutputFiles with valid inputs (inc. context)", (t) =>
{
    const templateStart = "This is the HTML: ";

  // Args
  const template = `${templateStart}{{{content.HTML}}}{{a}}`; 
  const items = 
  [ 
    { 
        absoluteURI: 'my-blog/posts/post-1.html',
        filename: 'post-1.html',
        title: 'Post 1',
        slug: 'post-1',
        metadata: 
        { 
            dateCreated: 123, 
            dateModified: 456
        },
        HTML: "some HTML for post 1"
    },
    { 
        absoluteURI: 'my-blog/posts/post-2.html',
        filename: 'post-2.html',
        title: 'Post 2',
        slug: 'post-2',
        metadata: 
        { 
            dateCreated: 123, 
            dateModified: 456
        },
        HTML: "some HTML for post 2"
    }
  ];
  
  const context = 
  {
    a: 123
  };

  const outputDir = path.resolve(__dirname, "fixtures");

  createOutputFiles(template, items, context, outputDir, (COFErr) => 
  {
      t.is(COFErr === null, true, "err must be null"); 

    // Check the outputted files
        const totalNumItems = items.length;

        items.map((item, i) => 
        {
            const filename = path.join(outputDir, item.filename);

            // Resd output file content
            fs.readFile(filename, (FRErr, data) => 
            {
                t.is(FRErr === null, true, "Must be able to read output file");

                const fileContent = data.toString("utf8");

                const expectedOutput = `${templateStart}${item.HTML}${context.a}`;

                t.is(fileContent, expectedOutput, "expectedOutput must be correct");

                fs.unlink(filename, (UErr) => 
                {
                    if(UErr)
                    {
                        console.error(UErr.message);
                    }

                    if(totalNumItems <= (i + 1))
                    {
                        t.end();
                    }
                });
            });
        });
    });
});


// invalid Args
test.cb("createOutputFiles with invalid inputs (template == null)", (t) =>
{
  const templateStart = "This is the HTML: ";

  // Args
  const template = null; 
  const items = 
  [ 
    { 
        absoluteURI: 'my-blog/posts/post-1.html',
        filename: 'post-1.html',
        title: 'Post 1',
        slug: 'post-1',
        metadata: 
        { 
            dateCreated: 123, 
            dateModified: 456
        },
        HTML: "some HTML for post 1"
    },
    { 
        absoluteURI: 'my-blog/posts/post-2.html',
        filename: 'post-2.html',
        title: 'Post 2',
        slug: 'post-2',
        metadata: 
        { 
            dateCreated: 123, 
            dateModified: 456
        },
        HTML: "some HTML for post 2"
    }
  ];
  
  const context = 
  {
    a: 123
  };

  const outputDir = path.resolve(__dirname, "fixtures");
  
    const error = t.throws(() => 
    {
        createOutputFiles(template, items, context, outputDir, () => 
        {
        });
    }, TypeError);

    t.is(error instanceof TypeError, true, "A TypeError must be thrown");
    t.end();
});

test.cb("createOutputFiles with invalid inputs (items == null)", (t) =>
{
  const templateStart = "This is the HTML: ";

  // Args
  const template = `${templateStart}{{{content.HTML}}}{{a}}`; 
  const items = null;
  
  const context = 
  {
    a: 123
  };

  const outputDir = path.resolve(__dirname, "fixtures");
  
    const error = t.throws(() => 
    {
        createOutputFiles(template, items, context, outputDir, () => 
        {
        });
    }, TypeError);

    t.is(error instanceof TypeError, true, "A TypeError must be thrown");
    t.end();
});

test.cb("createOutputFiles with invalid inputs (context == null)", (t) =>
{
  const templateStart = "This is the HTML: ";

  // Args
  const template = `${templateStart}{{{content.HTML}}}{{a}}`; 
  const items = 
  [ 
    { 
        absoluteURI: 'my-blog/posts/post-1.html',
        filename: 'post-1.html',
        title: 'Post 1',
        slug: 'post-1',
        metadata: 
        { 
            dateCreated: 123, 
            dateModified: 456
        },
        HTML: "some HTML for post 1"
    },
    { 
        absoluteURI: 'my-blog/posts/post-2.html',
        filename: 'post-2.html',
        title: 'Post 2',
        slug: 'post-2',
        metadata: 
        { 
            dateCreated: 123, 
            dateModified: 456
        },
        HTML: "some HTML for post 2"
    }
  ];
  
  const context = null;

  const outputDir = path.resolve(__dirname, "fixtures");
  
    const error = t.throws(() => 
    {
        createOutputFiles(template, items, context, outputDir, () => 
        {
        });
    }, TypeError);

    t.is(error instanceof TypeError, true, "A TypeError must be thrown");
    t.end();
});

test.cb("createOutputFiles with invalid inputs (outputDir == null)", (t) =>
{
    const templateStart = "This is the HTML: ";

    // Args
    const template = `${templateStart}{{{content.HTML}}}{{a}}`; 
    const items = 
    [ 
        { 
            absoluteURI: 'my-blog/posts/post-1.html',
            filename: 'post-1.html',
            title: 'Post 1',
            slug: 'post-1',
            metadata: 
            { 
                dateCreated: 123, 
                dateModified: 456
            },
            HTML: "some HTML for post 1"
        },
        { 
            absoluteURI: 'my-blog/posts/post-2.html',
            filename: 'post-2.html',
            title: 'Post 2',
            slug: 'post-2',
            metadata: 
            { 
                dateCreated: 123, 
                dateModified: 456
            },
            HTML: "some HTML for post 2"
        }
    ];
    
    const context = 
    {
        a: 123
    };

    const outputDir = null;
  
    const error = t.throws(() => 
    {
        createOutputFiles(template, items, context, outputDir, () => 
        {
        });
    }, TypeError);

    t.is(error instanceof TypeError, true, "A TypeError must be thrown");
    t.end();
});
