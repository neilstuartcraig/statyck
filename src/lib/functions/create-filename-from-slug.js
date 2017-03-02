"use strict";

function createFilenameFromSlug(slug: string, callback: Function)
{
    const filename = `${slug}.html`;
    return callback(filename);
}

module.exports = createFilenameFromSlug;