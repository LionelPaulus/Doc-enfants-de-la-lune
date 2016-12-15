import { RevealLines } from './reveal/reveal-lines';


export class Reveal {
  constructor(type, targets = document.body, debug = false) {
    switch (type) {
    case 'lines':
      new RevealLines(targets, debug);
      break;
    default:
    }
  }


}
