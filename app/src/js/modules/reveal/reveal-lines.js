export class RevealLines {
  constructor(targets, debug = false) {
    const ø = window.ø;
    const parents = ø.all('.page-focus .focus:not(.page-illu)');

    // DEBUG MODE
    if (debug)
      for (const target of targets) {
        const parent = target.parentNode.parentNode.parentNode;
        parent.classList.add('reveal');
        this.finish();
      }





    for (const target of targets) {
      const parent = target.parentNode.parentNode.parentNode;
      target.parentLinked = parent;

      target.parentNode.addEventListener('mouseenter', (e) => {
        if (e.path.indexOf(target.parentNode) >= 0 && parent.classList.contains('reveal') === false) {
          parent.classList.add('reveal');
          if (!parents[0].parentNode.parentNode.querySelector('.focus:not(.reveal):not(.page-illu)')) {
            this.finish();
          }
        }
      });
    }
  }

  finish() {
    ø.el('.page-legend').classList.add('reveal');
  }

}
