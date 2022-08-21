#!/usr/bin/env node

/*eslint-env node*/
/*eslint-disable no-console*/

import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import Generator from "../src/generator.mjs";
import Variables from "../src/variables.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function loadAsArray(path) {
    return readFileSync(resolve(__dirname, path), "utf8")
        .split(/\n/)
        .map(s => s.trim())
        .filter(s => s !== '' && !s.startsWith('#'));
}

function loadVariables(path) {
    const lines = loadAsArray(path);
    const vars = new Variables();
    for (const line of lines) {
        const [name, rest] = line.split(/\s*=\s*/);
        const values = rest.split(/\s*\|\s*/);
        vars.add(name, values);
    }
    return vars;
}

function main() {
    const gen = new Generator({
        subject: loadAsArray("../corpus/subject.txt"),
        action: loadAsArray("../corpus/action.txt"),
        location: loadAsArray("../corpus/location.txt"),
        variables: loadVariables("../corpus/variables.txt"),
    });

    for (let i = 0; i < 100; i++) {
        console.log("" + gen.getString())
    }
}

main()