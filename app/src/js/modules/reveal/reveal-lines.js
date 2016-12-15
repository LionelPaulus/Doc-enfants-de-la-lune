export class RevealLines {
  constructor(targets) {
    for (const target of targets) {
      const parent = target.parentNode.parentNode.parentNode;
      target.parentNode.addEventListener('mouseenter', (e) => {
        if (e.path.indexOf(target.parentNode) >= 0 && parent.classList.contains('reveal') === false) {
          parent.classList.add('reveal');
        }
      });
    }
  }
}
