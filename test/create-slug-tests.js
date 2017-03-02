"use strict";

// Core deps

// 3rd party deps
import test from "ava";

// Local deps
import createSlug from "../src/lib/functions/create-slug.js";

test.cb("createSlug with valid title", (t) =>
{
    // Args
    const title = "This is a Blog Post Title - It's excellent! Likely it's worth $500 or 100%";

    // Output
    const expectedOutput = "this-is-a-blog-post-title-its-excellent-likely-its-worth-$500-or-100%";

    createSlug(title, (res) => 
    {
        t.deepEqual(res, expectedOutput, `expected output must be ${expectedOutput}`);
        t.end();
    });
});




test.cb("createSlug with invalid title === null", (t) =>
{
    // Args
    const title = null;

    const error = t.throws(() => 
    {
        createSlug(title, () => 
        {
        });
    }, TypeError);

    t.is(error instanceof TypeError, true, "A TypeError must be thrown");
    t.end();
});
