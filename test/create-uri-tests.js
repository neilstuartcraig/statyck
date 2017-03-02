"use strict";

// Core deps


// 3rd party deps
import test from "ava";

// Local deps
import createURI from "../src/lib/functions/create-uri.js";

test.cb("createURI with valid args (1 - relative URI)", (t) =>
{
    // Args
    const scheme = "doesnt-matter"; // scheme will be ignored as this is a relative URI
    const hostname = "blog.example.com"; // hostname will be ignored as this is a relative URI
    const basePath = "/blog";
    const outputDirectory = "posts";
    const slug = "some-blog-post"; 
    const createAbsoluteURI = false;

    // Output
    const expectedOutput = basePath + "/" + outputDirectory + "/" + slug + ".html";

    createURI(scheme, hostname, basePath, outputDirectory, slug, createAbsoluteURI, (err, res) => 
    {
        t.is(err === undefined, true, `err must be null`);
        t.deepEqual(res, expectedOutput, `expected output must be ${expectedOutput}`);
        t.end();
    });
});

test.cb("createURI with valid args (2 - absolute URI)", (t) =>
{
    // Args
    const scheme = "https:"; 
    const hostname = "blog.example.com";
    const basePath = "/blog";
    const outputDirectory = "posts";
    const slug = "some-blog-post"; 
    const createAbsoluteURI = true;

    // Output
    const expectedOutput = scheme + "//" + hostname + basePath + "/" + outputDirectory + "/" + slug + ".html";

    createURI(scheme, hostname, basePath, outputDirectory, slug, createAbsoluteURI, (err, res) => 
    {
        t.is(err === undefined, true, `err must be null`);
        t.deepEqual(res, expectedOutput, `expected output must be ${expectedOutput}`);
        t.end();
    });
});

// invalid args

test.cb("createURI with invalid args (invalid scheme)", (t) =>
{
    // Args
    const scheme = "invalid:"; 
    const hostname = "blog.example.com";
    const basePath = "/blog";
    const outputDirectory = "posts";
    const slug = "some-blog-post"; 
    const createAbsoluteURI = true;

    // Output
    const expectedOutput = "";

    createURI(scheme, hostname, basePath, outputDirectory, slug, createAbsoluteURI, (err, res) => 
    {
        t.is(err instanceof Error, true, `err must be an instance of Error`);
        t.deepEqual(res, expectedOutput, `expected output must be ${expectedOutput}`);
        t.end();
    });
});

test.cb("createURI with invalid args (empty slug)", (t) =>
{
    // Args
    const scheme = "doesnt-matter:"; 
    const hostname = "blog.example.com";
    const basePath = "/blog";
    const outputDirectory = "posts";
    const slug = ""; 
    const createAbsoluteURI = false;

    // Output
    const expectedOutput = "";

    createURI(scheme, hostname, basePath, outputDirectory, slug, createAbsoluteURI, (err, res) => 
    {
        t.is(err instanceof Error, true, `err must be an instance of Error`);
        t.deepEqual(res, expectedOutput, `expected output must be ${expectedOutput}`);
        t.end();
    });
});



// Type errors for args

test.cb("createURI with invalid scheme === null", (t) =>
{
    // Args
    const scheme = null; 
    const hostname = "blog.example.com";
    const basePath = "/blog";
    const outputDirectory = "posts";
    const slug = "some-blog-post"; 
    const createAbsoluteURI = false;

    const error = t.throws(() => 
    {
        createURI(scheme, hostname, basePath, outputDirectory, slug, createAbsoluteURI, () => 
        {
        });
    }, TypeError);

    t.is(error instanceof TypeError, true, "A TypeError must be thrown");
    t.end();
});

test.cb("createURI with invalid hostname === null", (t) =>
{
    // Args
    const scheme = "doesnt-matter:"; 
    const hostname = null;
    const basePath = "/blog";
    const outputDirectory = "posts";
    const slug = "some-blog-post"; 
    const createAbsoluteURI = false;

    const error = t.throws(() => 
    {
        createURI(scheme, hostname, basePath, outputDirectory, slug, createAbsoluteURI, () => 
        {
        });
    }, TypeError);

    t.is(error instanceof TypeError, true, "A TypeError must be thrown");
    t.end();
});

test.cb("createURI with invalid basePath === null", (t) =>
{
    // Args
    const scheme = "doesnt-matter:"; 
    const hostname = "blog.example.com";
    const basePath = null;
    const outputDirectory = "posts";
    const slug = "some-blog-post"; 
    const createAbsoluteURI = false;

    const error = t.throws(() => 
    {
        createURI(scheme, hostname, basePath, outputDirectory, slug, createAbsoluteURI, () => 
        {
        });
    }, TypeError);

    t.is(error instanceof TypeError, true, "A TypeError must be thrown");
    t.end();
});

test.cb("createURI with invalid outputDirectory === null", (t) =>
{
    // Args
    const scheme = "doesnt-matter:"; 
    const hostname = "blog.example.com";
    const basePath = "/blog";
    const outputDirectory = null;
    const slug = "some-blog-post"; 
    const createAbsoluteURI = false;

    const error = t.throws(() => 
    {
        createURI(scheme, hostname, basePath, outputDirectory, slug, createAbsoluteURI, () => 
        {
        });
    }, TypeError);

    t.is(error instanceof TypeError, true, "A TypeError must be thrown");
    t.end();
});

test.cb("createURI with invalid slug === null", (t) =>
{
    // Args
    const scheme = "doesnt-matter:"; 
    const hostname = "blog.example.com";
    const basePath = "/blog";
    const outputDirectory = "posts";
    const slug = null; 
    const createAbsoluteURI = false;

    const error = t.throws(() => 
    {
        createURI(scheme, hostname, basePath, outputDirectory, slug, createAbsoluteURI, () => 
        {
        });
    }, TypeError);

    t.is(error instanceof TypeError, true, "A TypeError must be thrown");
    t.end();
});

test.cb("createURI with invalid createAbsoluteURI === null", (t) =>
{
    // Args
    const scheme = "doesnt-matter:"; 
    const hostname = "blog.example.com";
    const basePath = "/blog";
    const outputDirectory = "posts";
    const slug = "some-blog-post"; 
    const createAbsoluteURI = null;

    const error = t.throws(() => 
    {
        createURI(scheme, hostname, basePath, outputDirectory, slug, createAbsoluteURI, () => 
        {
        });
    }, TypeError);

    t.is(error instanceof TypeError, true, "A TypeError must be thrown");
    t.end();
});
