import { RevealLines } from './reveal/reveal-lines';


export class Reveal {
  constructor(type, targets = document.body, debug = false) {
    window.reveal = this;
    window.targets = targets;

    switch (type) {
    case 'lines':
      this.lines = new RevealLines(targets, debug);
      break;
    default:
    }
  }


}
