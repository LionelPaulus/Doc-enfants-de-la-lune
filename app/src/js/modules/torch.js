export class Torch {
  constructor() {
    this.userMedia = this.hasGetUserMedia();
    this.cursor = this.renderCursor();
    this.launchCamera();
    const body = document.body;
    const html = document.documentElement;

    this.pageHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    this.pageWidth = Math.max(body.scrollLeft, body.offsetWidth, html.clientWidth, html.scrollLeft, html.offsetWidth);
  //v ar totalWindow = height + width;
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

      console.log(pos);
      // UPDATE CURSOR POS
      point.style.top = `${pos.y}px`;
      point.style.left = `${pos.x}px`;
    });

    // RETURN DOM NODE
    return point;
  }

  launchCamera() {
    const video = document.createElement('video');
    video.width = 600;
    video.height = 450;
    video.id = 'video';


    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 450;
    canvas.id = 'canvas';

    const container = document.createElement('div');
    container.id = 'camera-detection';

    container.appendChild(video);
    container.appendChild(canvas);
    document.body.appendChild(container);


    this.target = ø.el('svg circle.trigger')
    this.test = this.target.getBoundingClientRect();
    this.test = {
      x: parseInt(this.test.left - 11 + 4),
      y: parseInt(this.test.top - 11 + 4),
    }

    const tracking = window.tracking;
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.tracker = new tracking.ColorTracker('magenta');
    this.trackerTask = tracking.track('#video', this.tracker, {
      camera: true,
    });


    this.tracker.on('track', (event) => {
      if (event.data.length === 0) return; // No targets were detected in this frame.
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // if tracking set up these vars
      const rect = event.data[0];
      if (rect.color === 'custom') {
        rect.color = this.tracker.customColor;
      }
      // zoom ratio
      // const totalRect = rect.height + rect.width;
      // const ratio = totalRect / totalWindow * 100;
      const newPosLeft = ((this.canvas.width - rect.x) / this.canvas.width) * 100;
      const newPosTop = (rect.y / this.canvas.height) * 100;
      const fakeMouse = {
        x: parseInt(this.pageWidth * (newPosLeft * 0.01)),
        y: parseInt(this.pageHeight * (newPosTop * 0.01) - 146 - 60),
      };
      const fakeRatio = {
        x: Math.abs(fakeMouse.x - this.test.x),
        y: Math.abs(fakeMouse.y - this.test.y),
      };
      console.log(fakeRatio);
      if (fakeRatio.x < 20 && fakeRatio.y < 20 ){
        this.target = ø.el('.focus').classList.add('reveal')

      }
      // UPDATE CURSOR POS
      this.cursor.style.top = `${newPosTop}%`;
      this.cursor.style.left = `${newPosLeft}%`;

      // // RENDER TRACK
      // point.style.transform = `translate3d(${newPosLeft}vw ,${newPosTop}vh, 0`;
      // [].forEach.call(demoFlashlight.querySelectorAll('p'), (elem) => {
      //   elem.style.transform = `translate3d(${(rect.x - 250) * -0.25}px , ${(rect.y - 250) * -0.25}px, 0px)`;
      // });


      // if (debugDetection) {
      //   this.context.strokeStyle = rect.color;
      //   this.context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      //   this.context.font = '11px Helvetica';
      //   this.context.fillStyle = '#fff';
      //   this.context.fillText(`x: ${rect.x}px`, rect.x + rect.width + 5, rect.y + 11);
      //   this.context.fillText(`y: ${rect.y}px`, rect.y + rect.height + 5, rect.y + 22);
      // }
    });
  //  new InitGUIControllers(this.tracker);
  }
}
