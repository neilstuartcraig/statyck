"use strict";

// Core deps

// 3rd party deps
import test from "ava";

// Local deps
import createFilenameFromSlug from "../src/lib/functions/create-filename-from-slug.js";

test.cb("createFilenameFromSlug with valid input", (t) =>
{
    // Args
    const slug = "some-slug";

    // Output
    const expectedOutput = `${slug}.html`;

    createFilenameFromSlug(slug, (res) => 
    {
        t.deepEqual(res, expectedOutput, `expected output must be ${expectedOutput}`);
        t.end();
    });
});


// invalid args
test.cb("createFilenameFromSlug with invalid input - slug === null", (t) =>
{
    // Args
    const slug = null;

    const error = t.throws(() => 
    {
        createFilenameFromSlug(slug, () => 
        {
        });
    }, TypeError);

    t.is(error instanceof TypeError, true, "A TypeError must be thrown");
    t.end();
});