import { randomElement } from "./rand.mjs";

export default class Vars {
    map = new Map();

    add(name, values) {
        if (this.map.has(name)) {
            throw new Error(`Attempted to redefine: ${name}`);
        }

        this.map.set(name, values);
    }

    get(name) {
        if (!this.map.has(name)) {
            throw new Error(`Variable not defined: ${name}`);
        }

        return randomElement(this.map.get(name));
    }
}