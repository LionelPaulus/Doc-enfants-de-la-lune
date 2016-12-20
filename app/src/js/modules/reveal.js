import { RevealLines } from './reveal/reveal-lines';
import { RevealTabs } from './reveal/reveal-tabs';


export class Reveal {
  constructor(type, targets = document.body, debug = false) {
    window.reveal = this;
    window.targets = targets;
    this.targets = targets;
    torch.targets = Object.keys(window.targets).map((key, index) => {
      const elem = window.targets[index];
      const coords = elem.getBoundingClientRect();
      elem.coords = {
        x: parseInt(coords.left - 11 + 4),
        y: parseInt(coords.top - 11 + 4),
      };
      elem.parent = elem.parentNode.parentNode.parentNode;

      return elem;
    });
    switch (type) {
    case 'lines':
      this.lines = new RevealLines(targets, debug);
      break;
    case 'tabs':
      this.tabs = new RevealTabs(targets, debug);
      break;
    default:
      return null;
    }
    return this;
  }


}
