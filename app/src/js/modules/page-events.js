import { Reveal } from './reveal';


export class PageEvents {
  constructor(events) {
    window.pageEvents = this;
    Object.keys(events).map((key) => {
      const v = events[key];

      if (key === 'tag') {
        this.page = v;
      }
      if (key === 'reveal') {
        this.reveal = new Reveal(v[0], v[1]);
      }

      return v;
    });
  }
}
