import { RevealLines } from './reveal/reveal-lines';


export class Reveal {
  constructor(type, targets = document.body) {
    switch (type) {
    case 'lines':
      new RevealLines(targets);
      break;
    default:
    }
  }


}
