import { RevealLines } from './reveal/reveal-lines';
import { RevealTabs } from './reveal/reveal-tabs';


export class Reveal {
  constructor(type, targets = document.body, debug = false) {
    window.reveal = this;
    window.targets = targets;

    switch (type) {
    case 'lines':
      this.lines = new RevealLines(targets, debug);
      break;
    case 'tabs':
      this.lines = new RevealTabs(targets, debug);
      break;
    default:
      return null;
    }
  }


}
