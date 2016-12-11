export class MoonTimeline {
  constructor(MoonDomNode) {
    if (typeof $ === 'undefined')
      return console.error('you must import jquery for the moon timeline component');

    this.$ = {};
    this.$.container = $('#moon');

    this.$.container.roundSlider({
      sliderType: 'default',
      value: 10,
      width: 18,
    });
  }
}
