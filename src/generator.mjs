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
    const { subjects, actions, locations } = this;
    const subject = randomElement(subjects);
    const action = randomElement(actions);
    const [preposition, location] = randomElement(locations).split('|');
    return `${subject}…
${action}
${preposition} ${location}.\n`;
  }
}