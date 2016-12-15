export class Torch {
  constructor() {
    this.userMedia = this.hasGetUserMedia();
    this.cursor = this.renderCursor();
  }
  // detect webcam
  hasGetUserMedia() {
    return !!(
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia);
  }


  renderCursor() {
    // CREATE FAKE CURSOR
    const point = document.createElement('div');
    point.className = 'torch';
    document.body.appendChild(point);
    const halfWidth = point.clientWidth / 2;


    window.addEventListener('mousemove', (e) => {
      // CALCULATE NEW POS OF FAKE CURSOR
      const pos = {
        y: (e.pageY - halfWidth - (halfWidth / 2)),
        x: (e.pageX - halfWidth - (halfWidth / 2)),
      };

      // UPDATE CURSOR POS
      point.style.top = `${pos.y}px`;
      point.style.left = `${pos.x}px`;

      // console.log(e.target.tagName.svg);
      // if (e.target.tagName === 'svg' && !e.target.classList.contains('reveal')) {
      //   e.target.parentNode.classList.add('reveal');
      // }
    });

    // RETURN DOM NODE
    return point;
  }

}
