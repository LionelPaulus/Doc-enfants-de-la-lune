export class RevealTabs {
  constructor(targets, debug = false) {
    const ø = window.ø;
    const parents = ø.all('.step__triggers .step');
    // DEBUG MODE
    if (debug)
      for (const target of targets) {
        const parent = target.parentNode;
        parent.classList.add('reveal');
        this.finish();
      }

    for (const target of targets) {
      const index = target.getAttribute('data-index');
      const parent = target.parentNode.parentNode.children[1].children[index];
      target.lighted = false;
      target.parentLinked = parent;

      target.addEventListener('mouseenter', () => {
        if (parent.classList.contains('reveal') === false) {
          const previousActive = ø.el('.step.reveal');
          if (previousActive) previousActive.classList.remove('reveal');

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
