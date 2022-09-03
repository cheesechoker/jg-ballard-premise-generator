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
    let string = randomElement(array);
    while (this.hasVar(string)) {
      string = this.expandVars(string);
    }
    return string;
  }

  hasVar(string) {
    return /<[^>]+>/. test(string);
  }

  expandVars(string) {
    return string.replace(/(\ban? )?<([^>]+)>/g, (substring, article, varName, index) => {
      const varValue = this.variables.get(varName);
      if (!article) {
        return varValue;
      }

      // Make article agree with subsequent word
      const newArticle = /^[aeiou]/.test(varValue) ? "an" : "a";
      return `${newArticle} ${varValue}`;
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