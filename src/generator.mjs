import randIndex from './rand.mjs';


function randomElement(array) {
  return array[randIndex(array)];
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
      `${subject}…`,
      action,
      `${preposition} ${location}.\n`
    ].join('\n');
  }
}