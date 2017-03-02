"use strict";

// Core deps

// 3rd party deps
import test from "ava";

// Local deps
import splitItems from "../src/lib/functions/split-items.js";

test.cb("splitItems with valid input with chunkLength = 3", (t) =>
{
    // inputs
    const items = 
    [
        {
            el1a: "element1a",
            el2a: "element2a",
            el3a: "element3a"
        },
        {
            el1b: "element1b",
            el2b: "element2b",
            el3b: "element3b"
        },
        {
            el1c: "element1c",
            el2c: "element2c",
            el3c: "element3c"
        },
        {
            el1d: "element1d",
            el2d: "element2d",
            el3d: "element3d"
        },
        {
            el1e: "element1e",
            el2e: "element2e",
            el3e: "element3e"
        }
    ];

    const chunkLength = 3;


    // outputs
    const expectedOutput = 
    [
        {
            "items": 
            [
                {
                    "el1a": "element1a",
                    "el2a": "element2a",
                    "el3a": "element3a"
                },
                {
                    "el1b": "element1b",
                    "el2b": "element2b",
                    "el3b": "element3b"
                },
                {
                    "el1c": "element1c",
                    "el2c": "element2c",
                    "el3c": "element3c"
                }
            ]
        },
        {
            "items": 
            [
                {
                    "el1d": "element1d",
                    "el2d": "element2d",
                    "el3d": "element3d"
                },
                {
                    "el1e": "element1e",
                    "el2e": "element2e",
                    "el3e": "element3e"
                }
            ]
        }
    ];

    splitItems(items, chunkLength, (err, res) => 
    {
        t.is(err, undefined, "err must be undefined");;        
        t.deepEqual(res, expectedOutput, `expected output must be ${expectedOutput}`);
        t.end();
    });
});

test.cb("splitItems with valid input with chunkLength = -1", (t) =>
{
    // inputs
    const items = 
    [
        {
            el1a: "element1a",
            el2a: "element2a",
            el3a: "element3a"
        },
        {
            el1b: "element1b",
            el2b: "element2b",
            el3b: "element3b"
        },
        {
            el1c: "element1c",
            el2c: "element2c",
            el3c: "element3c"
        },
        {
            el1d: "element1d",
            el2d: "element2d",
            el3d: "element3d"
        },
        {
            el1e: "element1e",
            el2e: "element2e",
            el3e: "element3e"
        }
    ];

    const chunkLength = -1;


    // outputs
    const expectedOutput = 
    [
        {
            "items": 
            [
                {
                    "el1a": "element1a",
                    "el2a": "element2a",
                    "el3a": "element3a"
                },
                {
                    "el1b": "element1b",
                    "el2b": "element2b",
                    "el3b": "element3b"
                },
                {
                    "el1c": "element1c",
                    "el2c": "element2c",
                    "el3c": "element3c"
                },
                {
                    "el1d": "element1d",
                    "el2d": "element2d",
                    "el3d": "element3d"
                },
                {
                    "el1e": "element1e",
                    "el2e": "element2e",
                    "el3e": "element3e"
                }
            ]
        }
    ];

    splitItems(items, chunkLength, (err, res) => 
    {
        t.is(err, undefined, "err must be undefined");;        
        t.deepEqual(res, expectedOutput, `expected output must be ${expectedOutput}`);
        t.end();
    });
});

test.cb("splitItems with valid input with chunkLength = 1", (t) =>
{
    // inputs
    const items = 
    [
        {
            el1a: "element1a",
            el2a: "element2a",
            el3a: "element3a"
        },
        {
            el1b: "element1b",
            el2b: "element2b",
            el3b: "element3b"
        },
        {
            el1c: "element1c",
            el2c: "element2c",
            el3c: "element3c"
        },
        {
            el1d: "element1d",
            el2d: "element2d",
            el3d: "element3d"
        },
        {
            el1e: "element1e",
            el2e: "element2e",
            el3e: "element3e"
        }
    ];

    const chunkLength = 1;


    // outputs
    const expectedOutput = 
    [
        {
            "items": 
            [
                {
                    "el1a": "element1a",
                    "el2a": "element2a",
                    "el3a": "element3a"
                }
            ]
        },
        {
            "items": 
            [
                {
                    "el1b": "element1b",
                    "el2b": "element2b",
                    "el3b": "element3b"
                }
            ]
        },
        {
            "items": 
            [
                {
                    "el1c": "element1c",
                    "el2c": "element2c",
                    "el3c": "element3c"
                }
            ]
        },
        {
            "items": 
            [
                {
                    "el1d": "element1d",
                    "el2d": "element2d",
                    "el3d": "element3d"
                }
            ]
        },
        {
            "items": 
            [
                {
                    "el1e": "element1e",
                    "el2e": "element2e",
                    "el3e": "element3e"
                }
            ]
        }
    ];

    splitItems(items, chunkLength, (err, res) => 
    {
        t.is(err, undefined, "err must be undefined");
        t.deepEqual(res, expectedOutput, `expected output must be ${expectedOutput}`);
        t.end();
    });
});

test.cb("splitItems with valid input with chunkLength = 10 (i.e. gt num items)", (t) =>
{
    // inputs
    const items = 
    [
        {
            el1a: "element1a",
            el2a: "element2a",
            el3a: "element3a"
        },
        {
            el1b: "element1b",
            el2b: "element2b",
            el3b: "element3b"
        },
        {
            el1c: "element1c",
            el2c: "element2c",
            el3c: "element3c"
        },
        {
            el1d: "element1d",
            el2d: "element2d",
            el3d: "element3d"
        },
        {
            el1e: "element1e",
            el2e: "element2e",
            el3e: "element3e"
        }
    ];

    const chunkLength = 10;


    // outputs
    const expectedOutput = 
    [
        {
            "items": 
            [
                {
                    "el1a": "element1a",
                    "el2a": "element2a",
                    "el3a": "element3a"
                },
                {
                    "el1b": "element1b",
                    "el2b": "element2b",
                    "el3b": "element3b"
                },
                {
                    "el1c": "element1c",
                    "el2c": "element2c",
                    "el3c": "element3c"
                },
                {
                    "el1d": "element1d",
                    "el2d": "element2d",
                    "el3d": "element3d"
                },
                {
                    "el1e": "element1e",
                    "el2e": "element2e",
                    "el3e": "element3e"
                }
            ]
        }
    ];

    splitItems(items, chunkLength, (err, res) => 
    {    
        t.is(err, undefined, "err must be undefined");
        t.deepEqual(res, expectedOutput, `expected output must be ${expectedOutput}`);
        t.end();
    });
});

test.cb("splitItems with valid input with empty items array", (t) =>
{
    // inputs
    const items = [];

    const chunkLength = 10;


    // outputs
    const expectedOutput = [];

    splitItems(items, chunkLength, (err, res) => 
    {    
        t.is(err, undefined, "err must be undefined");
        t.deepEqual(res, expectedOutput, `expected output must be ${expectedOutput}`);
        t.end();
    });
});


// incorrect usage
test.cb("splitItems with invalid input with chunkLength = 0", (t) =>
{
    // inputs
    const items = 
    [
        {
            el1a: "element1a",
            el2a: "element2a",
            el3a: "element3a"
        },
        {
            el1b: "element1b",
            el2b: "element2b",
            el3b: "element3b"
        },
        {
            el1c: "element1c",
            el2c: "element2c",
            el3c: "element3c"
        },
        {
            el1d: "element1d",
            el2d: "element2d",
            el3d: "element3d"
        },
        {
            el1e: "element1e",
            el2e: "element2e",
            el3e: "element3e"
        }
    ];

    const chunkLength = 0;

    // outputs
    const expectedOutput = [];

    splitItems(items, chunkLength, (err, res) => 
    {      
        t.is(err instanceof TypeError, true, "err must be a TypeError");
        t.deepEqual(res, expectedOutput, `expected output must be ${expectedOutput}`);
        t.end();
    });
});

test.cb("splitItems with invalid input with chunkLength = -10", (t) =>
{
    // inputs
    const items = 
    [
        {
            el1a: "element1a",
            el2a: "element2a",
            el3a: "element3a"
        },
        {
            el1b: "element1b",
            el2b: "element2b",
            el3b: "element3b"
        },
        {
            el1c: "element1c",
            el2c: "element2c",
            el3c: "element3c"
        },
        {
            el1d: "element1d",
            el2d: "element2d",
            el3d: "element3d"
        },
        {
            el1e: "element1e",
            el2e: "element2e",
            el3e: "element3e"
        }
    ];

    const chunkLength = -10;

    // outputs
    const expectedOutput = [];

    splitItems(items, chunkLength, (err, res) => 
    {      
        t.is(err instanceof TypeError, true, "err must be a TypeError");
        t.deepEqual(res, expectedOutput, `expected output must be ${expectedOutput}`);
        t.end();
    });
});

test.cb("splitItems with invalid inputs (wrong type items)", (t) =>
{
    // inputs
    const items = null;

    const chunkLength = -10;

    // outputs
    // const expectedOutput = [];;

    const error = t.throws(() => 
    {
        splitItems(items, chunkLength, () => 
        {
        });
    }, TypeError);

    t.is(error instanceof TypeError, true, "A TypeError must be thrown");
    t.end();
});