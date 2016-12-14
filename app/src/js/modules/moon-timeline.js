export class MoonTimeline {
  constructor(bottom = '-20%') {
    if (typeof $ === 'undefined')
      return console.error('you must import jquery for the moon timeline component');

    this.$ = {};

    const MoonDomNode = document.createElement('div');
    MoonDomNode.id = 'moon';
    MoonDomNode.className = 'moon';

    ø.el('section.page').appendChild(MoonDomNode);
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
  }
}
