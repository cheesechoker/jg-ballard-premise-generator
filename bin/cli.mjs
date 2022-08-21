#!/usr/bin/env node

/*eslint-env node*/
/*eslint-disable no-console*/

import Generator from "../src/generator.mjs";
import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function loadAsArray(path) {
    return readFileSync(resolve(__dirname, path), "utf8")
        .split(/\n/)
        .map(s => s.trim())
        .filter(s => s !== '' && !s.startsWith('#'));
}

const gen = new Generator({
    subject: loadAsArray("../corpus/subject.txt"),
    action: loadAsArray("../corpus/action.txt"),
    location: loadAsArray("../corpus/location.txt"),
});

for (var i = 0; i < 100; i++) {
    console.log("" + gen.getString())
}