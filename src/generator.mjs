import { randomElement } from './rand.mjs';

function capitalize(s) {
  return `${s.slice(0,1).toUpperCase()}${s.slice(1)}`;
}

export default class Generator {
  constructor({ action, location, subject, variables }) {
    this.subjects = subject;
    this.actions = action;
    this.locations = location;
    this.variables = variables;
  }

  getElement(array) {
    const string = randomElement(array);
    return this.expandVars(string);
  }

  expandVars(string) {
    return string.replace(/<([^>]+)>/g, (substring, varName) => {
      return this.variables.get(varName);
    });
  }

  getString() {
    const subject = this.getElement(this.subjects);
    const action = this.getElement(this.actions);
    const [preposition, location] = this.getElement(this.locations).split('|');

    return [
      `${capitalize(subject)}…`,
      action,
      `${preposition} ${location}.\n`
    ].join('\n');
  }
}