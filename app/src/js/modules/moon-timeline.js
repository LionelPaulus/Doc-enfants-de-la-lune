export class MoonTimeline {
  constructor(bottom = '-20%') {
    if (typeof $ === 'undefined')
      return console.error('you must import jquery for the moon timeline component');

    window.moon = this;
    this.$ = {};

    const MoonDomNode = document.createElement('div');
    MoonDomNode.id = 'moon';
    MoonDomNode.className = 'moon';

    ø.el('.moon-container').appendChild(MoonDomNode);
    this.$.container = $(MoonDomNode);

    this.$.container[0].style.bottom = bottom;
    this.$.container.roundSlider({
      sliderType: 'default',
      value: 18,
      editableTooltip: false,
      keyboardAction: false,
      showTooltip: false,
      width: 10,
      step: 5,
      readOnly: true,
    });

    for(let i = 0; i < 6; i++) {
      const step = document.createElement('li');
      this.$.container[0].appendChild(step);
    }
  }
}
