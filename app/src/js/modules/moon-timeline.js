export class MoonTimeline {
  constructor() {
    if (typeof $ === 'undefined')
      return console.error('you must import jquery for the moon timeline component');

    this.$ = {};
    // <div id='moon' class='moon'></div>
    const MoonDomNode = document.createElement('div');
    MoonDomNode.id = 'moon';
    MoonDomNode.className = 'moon';

    ø.el('section.page').appendChild(MoonDomNode);
    this.$.container = $(MoonDomNode);
    // this.$.container = $('#moon');

    this.$.container.roundSlider({
      sliderType: 'default',
      value: 10,
      width: 18,
    });
  }
}
