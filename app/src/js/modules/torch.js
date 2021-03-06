export class Torch {
  constructor() {
    window.torch = this;
    this.userMedia = this.hasGetUserMedia();
    this.cursor = this.renderCursor();
    // this.launchCamera();
    const body = document.body;
    const html = document.documentElement;
    this.light = document.getElementById('flashlight');

    this.pageHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    this.pageWidth = Math.max(body.scrollLeft, body.offsetWidth, html.clientWidth, html.scrollLeft, html.offsetWidth);
    // var totalWindow = height + width;
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
        point.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
        this.light.style.backgroundPosition = `${e.clientX - 300}px ${e.clientY - 300}px`;
      });

      // RETURN DOM NODE
      return point;
    }

    launchCamera() {
      const ø = window.ø;
      const video = document.createElement('video');
      video.width = 600;
      video.height = 450;
      video.id = 'video';
      window.delayAction = false;
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 450;
      canvas.id = 'canvas';

      const container = document.createElement('div');
      container.id = 'camera-detection';

      container.appendChild(video);
      container.appendChild(canvas);
      document.body.appendChild(container);


      window.commands = ø.all('.page-commands > div');
      this.commands = Object.keys(window.commands).map((key, index) => {
        const elem = window.commands[index];
        const coords = elem.getBoundingClientRect();
        elem.coords = {
          x: parseInt(coords.left - 11 + 4),
          y: parseInt(coords.top - 11 + 4),
        };
        return elem;
      });

      this.targets = Object.keys(window.targets).map((key, index) => {
        const elem = window.targets[index];
        const coords = elem.getBoundingClientRect();
        elem.coords = {
          x: parseInt(coords.left - 11 + 4),
          y: parseInt(coords.top - 11 + 4),
        };
        elem.parent = elem.parentNode.parentNode.parentNode;

        return elem;
      });

      this.page = ø.el('.page.active').classList[2].replace('page-', '');
      const tracking = window.tracking;
      this.canvas = canvas;
      this.context = this.canvas.getContext('2d');
      this.tracker = new tracking.ColorTracker('magenta');
      this.trackerTask = tracking.track('#video', this.tracker, {
        camera: true,
      });
      //this.trackerTask.stop(); // Stops the tracking

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
          y: parseInt(this.pageHeight * (newPosTop * 0.01)),
        };

        for (const target of this.targets) {
          const fakeRatio = {
            x: Math.abs(fakeMouse.x - target.coords.x),
            y: Math.abs(fakeMouse.y - target.coords.y),
          };

          if (fakeRatio.x < 50 && fakeRatio.y < 50) {
            // SUIT && LEO


            if ((this.page === 'suit' || this.page === 'leo') && target.parentLinked.classList.contains('reveal') === false) {
              target.parentLinked.classList.add('reveal');

              if (!target.parent.parentNode.parentNode.querySelector('.focus:not(.reveal):not(.page-illu)')) {
                window.reveal.lines.finish();
              }
            }
            // SUIT && LEO
            if ((this.page === 'dermatologue') && target.parentLinked.classList.contains('reveal') === false) {
              const previousActive = ø.el('.step.reveal');
              if (previousActive) previousActive.classList.remove('reveal');
              const move = $('.step').width();
              target.activeBar.style.transform = `translateX(${move * target.index}px)`;
              target.parentLinked.classList.add('reveal');
              target.parentLinked.classList.add('lighted');
              target.lighted = true;
              if (!target.parentLinked.parentNode.querySelector('.step:not(.lighted)')) {
                window.reveal.tabs.finish();
                this.trackerTask.stop(); // Stops the tracking
              }
            }
          }
        }
        for (const command of this.commands) {
          const fakeRatio = {
            x: Math.abs(fakeMouse.x - command.coords.x),
            y: Math.abs(fakeMouse.y - command.coords.y),
          };

          if (fakeRatio.x < 50 && fakeRatio.y < 50) {
            if (!window.delayAction) {
              command.click();
              window.delayAction = true;
              setTimeout(() => {
                window.delayAction = false;
              }, 4000);
            }
          }
        }

        console.log(this.pageWidth, this.pageHeight);
        // UPDATE CURSOR POS
        this.cursor.style.transform = `translate3d(${newPosLeft}vw, ${newPosTop}vh, 0)`;
        this.light.style.backgroundPosition = `
        ${(this.pageWidth * newPosLeft / 100) - 300 }px
        ${(this.pageHeight * newPosTop / 100) - 300}px`;

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
