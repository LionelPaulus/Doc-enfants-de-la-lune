export class RevealTabs {
  constructor(targets, debug = false) {
    const ø = window.ø;
    // DEBUG MODE
    if (debug)
      for (const target of targets) {
        const parent = target.parentNode;
        parent.classList.add('reveal');
        this.finish();
      }
    this.activeBar = ø.el('.big-divider');
    this.activeBar.move = $('.step').width();

    for (const target of targets) {
      const index = target.getAttribute('data-index');
      const parent = target.parentNode.parentNode.children[1].children[index];
      target.lighted = false;
      target.parentLinked = parent;
      target.activeBar = this.activeBar;
      target.move = this.activeBar.move;
      target.index = index;

      target.addEventListener('mouseenter', () => {
        if (parent.classList.contains('reveal') === false) {
          const previousActive = ø.el('.step.reveal');
          if (previousActive) previousActive.classList.remove('reveal');

          this.activeBar.style.transform = `translateX(${this.activeBar.move * index}px)`;
          parent.classList.add('reveal');
          parent.classList.add('lighted');
          target.lighted = true;
          if (!parent.parentNode.querySelector('.step:not(.lighted)')) {
            this.finish();
          }
        }
      });
    }
  }

  finish() {
    ø.el('.dermatologue__txt').classList.add('reveal');
  }

}
