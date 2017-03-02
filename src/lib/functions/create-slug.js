"use strict";

function createSlug(title: string, callback: Function)
{
    const slug: string = title.replace(/\ /g, "-").replace(/[^a-z0-9_\-\$\%]/gi, "").replace(/\-{2,}/g, "-").toLowerCase();

    return callback(slug);
}

module.exports = createSlug;