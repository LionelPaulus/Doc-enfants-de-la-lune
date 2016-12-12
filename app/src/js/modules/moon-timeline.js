export class MoonTimeline {
  constructor() {
    if (typeof $ === 'undefined')
      return console.error('you must import jquery for the moon timeline component');

    this.$ = {};

    const MoonDomNode = document.createElement('div');
    MoonDomNode.id = 'moon';
    MoonDomNode.className = 'moon';

    ø.el('section.page').appendChild(MoonDomNode);
    this.$.container = $(MoonDomNode);

    this.$.container.roundSlider({
      sliderType: 'default',
      value: 18,
      width: 18,
    });
  }
}
