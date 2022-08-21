import randIndex from './rand.mjs';

function randomElement(array) {
  return array[randIndex(array)];
}

function capitalize(s) {
  return `${s.slice(0,1).toUpperCase()}${s.slice(1)}`;
}

export default class Generator {
  constructor({ action, location, subject }) {
    this.subjects = subject;
    this.actions = action;
    this.locations = location;
  }

  getString() {
    const subject = randomElement(this.subjects);
    const action = randomElement(this.actions);
    const [preposition, location] = randomElement(this.locations).split('|');

    return [
      `${capitalize(subject)}…`,
      action,
      `${preposition} ${location}.\n`
    ].join('\n');
  }
}