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
import getFilesContent from "../src/lib/functions/get-files-content.js";



// Valid inputs:
test.cb("getFilesContent with valid inputs (rel URIs)", (t) =>
{
  const sourceDirectory = path.resolve(__dirname, "fixtures", "posts"); 
  const filesArray = 
  [
    "La fourth de la post.md",
    "This is my first post.md",                       
    "new one.md",
    "Migrating to a statically served Ghost blog.md", 
    "Tres la poste.md",
    "rando.txt",
    "Post numero B.md"
  ];
  const filenameExtension = ".md";
  const themeSettings = 
  {
      scheme: "https:",
      hostname: "blog.example.com",
      baseURI: "my-blog",
      createAbsoluteHRefs: false
  };
  const numItemsPerIndexPage = 1;
  const outputDirectory = "posts";

  getFilesContent(sourceDirectory, filesArray, filenameExtension, themeSettings, numItemsPerIndexPage, outputDirectory, (err, res) =>
  {
    t.is(err === null, true, "'err' must be null");

    // Test props on the res Object
    for(let i in res)
    {
        t.is(typeof(res[i].HTML) === "string", true, "res.HTML must be a string");
        t.is(typeof(res[i].metadata) === "object" && res[i].metadata !== null, true, "res.metadata must be a non-null Object");

        t.is(typeof(res[i].slug) === "string", true, "res.slug must be a string");
        t.is(res[i].filename === `${res[i].slug}.html`, true, "res.filename must be slug + .html");
        t.is(res[i].absoluteURI === `${themeSettings.baseURI}/${outputDirectory}/${res[i].filename}`, true, "res.absoluteURI must be correctly formatted");
    }

    t.end();
  });
});

test.cb("getFilesContent with valid inputs (abs URIs)", (t) =>
{
  const sourceDirectory = path.resolve(__dirname, "fixtures", "posts"); 
  const filesArray = 
  [
    "La fourth de la post.md",
    "This is my first post.md",                       
    "new one.md",
    "Migrating to a statically served Ghost blog.md", 
    "Tres la poste.md",
    "rando.txt",
    "Post numero B.md"
  ];
  const filenameExtension = ".md";
  const themeSettings = 
  {
      scheme: "https:",
      hostname: "blog.example.com",
      baseURI: "my-blog",
      createAbsoluteHRefs: true
  };
  const numItemsPerIndexPage = 1;
  const outputDirectory = "posts";

  getFilesContent(sourceDirectory, filesArray, filenameExtension, themeSettings, numItemsPerIndexPage, outputDirectory, (err, res) =>
  {
    t.is(err === null, true, "'err' must be null");

    // Test props on the res Object
    for(let i in res)
    {
        t.is(typeof(res[i].HTML) === "string", true, "res.HTML must be a string");
        t.is(typeof(res[i].metadata) === "object" && res[i].metadata !== null, true, "res.metadata must be a non-null Object");

        t.is(typeof(res[i].slug) === "string", true, "res.slug must be a string");
        t.is(res[i].filename === `${res[i].slug}.html`, true, "res.filename must be slug + .html");
        t.is(res[i].absoluteURI === `${themeSettings.scheme}//${themeSettings.hostname}/${themeSettings.baseURI}/${outputDirectory}/${res[i].filename}`, true, "res.absoluteURI must be correctly formatted");
    }

    t.end();
  });
});

// invalid args
test.cb("getTemplateFile with invalid inputs (sourceDirectory == null)", (t) =>
{
  const sourceDirectory = null; 
  const filesArray = 
  [
    "La fourth de la post.md",
    "This is my first post.md",                       
    "new one.md",
    "Migrating to a statically served Ghost blog.md", 
    "Tres la poste.md",
    "rando.txt",
    "Post numero B.md"
  ];
  const filenameExtension = ".md";
  const themeSettings = 
  {
      scheme: "https:",
      hostname: "blog.example.com",
      baseURI: "my-blog",
      createAbsoluteHRefs: true
  };
  const numItemsPerIndexPage = 1;
  const outputDirectory = "posts";

  const error = t.throws(() => 
  {
      getFilesContent(sourceDirectory, filesArray, filenameExtension, themeSettings, numItemsPerIndexPage, outputDirectory, () => 
      {
      });
  }, TypeError);

  t.is(error instanceof TypeError, true, "A TypeError must be thrown");
  t.end();
});

test.cb("getTemplateFile with invalid inputs (filesArray == null)", (t) =>
{
  const sourceDirectory = path.resolve(__dirname, "fixtures", "posts"); 
  const filesArray = null;
  const filenameExtension = ".md";
  const themeSettings = 
  {
      scheme: "https:",
      hostname: "blog.example.com",
      baseURI: "my-blog",
      createAbsoluteHRefs: true
  };
  const numItemsPerIndexPage = 1;
  const outputDirectory = "posts";

  const error = t.throws(() => 
  {
      getFilesContent(sourceDirectory, filesArray, filenameExtension, themeSettings, numItemsPerIndexPage, outputDirectory, () => 
      {
      });
  }, TypeError);

  t.is(error instanceof TypeError, true, "A TypeError must be thrown");
  t.end();
});

test.cb("getTemplateFile with invalid inputs (filenameExtension == null)", (t) =>
{
  const sourceDirectory = path.resolve(__dirname, "fixtures", "posts"); 
  const filesArray = 
  [
    "La fourth de la post.md",
    "This is my first post.md",                       
    "new one.md",
    "Migrating to a statically served Ghost blog.md", 
    "Tres la poste.md",
    "rando.txt",
    "Post numero B.md"
  ];
  const filenameExtension = null;
  const themeSettings = 
  {
      scheme: "https:",
      hostname: "blog.example.com",
      baseURI: "my-blog",
      createAbsoluteHRefs: true
  };
  const numItemsPerIndexPage = 1;
  const outputDirectory = "posts";

  const error = t.throws(() => 
  {
      getFilesContent(sourceDirectory, filesArray, filenameExtension, themeSettings, numItemsPerIndexPage, outputDirectory, () => 
      {
      });
  }, TypeError);

  t.is(error instanceof TypeError, true, "A TypeError must be thrown");
  t.end();
});

test.cb("getTemplateFile with invalid inputs (themeSettings == null)", (t) =>
{
  const sourceDirectory = path.resolve(__dirname, "fixtures", "posts"); 
  const filesArray = 
  [
    "La fourth de la post.md",
    "This is my first post.md",                       
    "new one.md",
    "Migrating to a statically served Ghost blog.md", 
    "Tres la poste.md",
    "rando.txt",
    "Post numero B.md"
  ];
  const filenameExtension = ".md";
  const themeSettings = null;
  const numItemsPerIndexPage = 1;
  const outputDirectory = "posts";

  const error = t.throws(() => 
  {
      getFilesContent(sourceDirectory, filesArray, filenameExtension, themeSettings, numItemsPerIndexPage, outputDirectory, () => 
      {
      });
  }, TypeError);

  t.is(error instanceof TypeError, true, "A TypeError must be thrown");
  t.end();
});

test.cb("getTemplateFile with invalid inputs (themeSettings == {})", (t) =>
{
  const sourceDirectory = path.resolve(__dirname, "fixtures", "posts"); 
  const filesArray = 
  [
    "La fourth de la post.md",
    "This is my first post.md",                       
    "new one.md",
    "Migrating to a statically served Ghost blog.md", 
    "Tres la poste.md",
    "rando.txt",
    "Post numero B.md"
  ];
  const filenameExtension = ".md";
  const themeSettings = {};
  const numItemsPerIndexPage = 1;
  const outputDirectory = "posts";

  const error = t.throws(() => 
  {
      getFilesContent(sourceDirectory, filesArray, filenameExtension, themeSettings, numItemsPerIndexPage, outputDirectory, () => 
      {
      });
  }, TypeError);

  t.is(error instanceof TypeError, true, "A TypeError must be thrown");
  t.end();
});

test.cb("getTemplateFile with invalid inputs (numItemsPerIndexPage == null)", (t) =>
{
  const sourceDirectory = path.resolve(__dirname, "fixtures", "posts"); 
  const filesArray = 
  [
    "La fourth de la post.md",
    "This is my first post.md",                       
    "new one.md",
    "Migrating to a statically served Ghost blog.md", 
    "Tres la poste.md",
    "rando.txt",
    "Post numero B.md"
  ];
  const filenameExtension = ".md";
  const themeSettings = 
  {
      scheme: "https:",
      hostname: "blog.example.com",
      baseURI: "my-blog",
      createAbsoluteHRefs: true
  };
  const numItemsPerIndexPage = null;
  const outputDirectory = "posts";

  const error = t.throws(() => 
  {
      getFilesContent(sourceDirectory, filesArray, filenameExtension, themeSettings, numItemsPerIndexPage, outputDirectory, () => 
      {
      });
  }, TypeError);

  t.is(error instanceof TypeError, true, "A TypeError must be thrown");
  t.end();
});

test.cb("getTemplateFile with invalid inputs (outputDirectory == null)", (t) =>
{
  const sourceDirectory = path.resolve(__dirname, "fixtures", "posts"); 
  const filesArray = 
  [
    "La fourth de la post.md",
    "This is my first post.md",                       
    "new one.md",
    "Migrating to a statically served Ghost blog.md", 
    "Tres la poste.md",
    "rando.txt",
    "Post numero B.md"
  ];
  const filenameExtension = ".md";
  const themeSettings = 
  {
      scheme: "https:",
      hostname: "blog.example.com",
      baseURI: "my-blog",
      createAbsoluteHRefs: true
  };
  const numItemsPerIndexPage = 1;
  const outputDirectory = null;

  const error = t.throws(() => 
  {
      getFilesContent(sourceDirectory, filesArray, filenameExtension, themeSettings, numItemsPerIndexPage, outputDirectory, () => 
      {
      });
  }, TypeError);

  t.is(error instanceof TypeError, true, "A TypeError must be thrown");
  t.end();
});

