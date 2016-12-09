import { InitGUIControllers } from './color_camera_gui';
// import { scrollDetect } from './scroll-detect';


function hasGetUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

const demoFlashlight = document.getElementsByClassName('demo-flashlight')[0];
const torch = demoFlashlight.querySelector('img');

const debugDetection = true;

if (hasGetUserMedia()) {
  const point = document.createElement('div');
  point.className = 'light';
  document.body.appendChild(point);

  // const body = document.body;
  // const html = document.documentElement;
  // const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  // const width = Math.max(body.scrollLeft, body.offsetWidth, html.clientWidth, html.scrollLeft, html.offsetWidth);
  // const totalWindow = height + width;

  // const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  const tracker = new tracking.ColorTracker('magenta');
  const trackerTask = tracking.track('#video', tracker, {
    camera: true,
  });
  // let prevPos = {
  //     x: 0,
  //     y: 0
  // }
  tracker.on('track', (event) => {
    if (event.data.length === 0)
    return; // No targets were detected in this frame.
    context.clearRect(0, 0, canvas.width, canvas.height);


    // if tracking set up these vars
    const rect = event.data[0];
    if (rect.color === 'custom') {
      rect.color = tracker.customColor;
    }

    // const totalRect = rect.height + rect.width;
    // const ratio = totalRect / totalWindow * 100;

    const newPosLeft = ((canvas.width - rect.x) / canvas.width) * 100;
    const newPosTop = (rect.y / canvas.height) * 100;





    // ZOOM

    // point.style.transform = `scale(${ratio / 10})`
    // torch.style.transform = `scale(${ratio / 10})`

    // RENDER TRACK
    point.style.transform = `translate3d(${newPosLeft}vw ,${newPosTop}vh, 0`;
      [].forEach.call(demoFlashlight.querySelectorAll('p'), (elem) => {
        elem.style.transform = `translate3d(${(rect.x - 250) * -0.25}px , ${(rect.y - 250) * -0.25}px, 0px)`;
      });

      // FLASH LIGHT
      torch.style.transform = `translate(${((canvas.width - rect.x - 100) / canvas.width) * 100}vw ,${newPosTop - 50}vh`;


      if (debugDetection) {
        context.strokeStyle = rect.color;
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.font = '11px Helvetica';
        context.fillStyle = '#fff';
        context.fillText(`x: ${rect.x}px`, rect.x + rect.width + 5, rect.y + 11);
        context.fillText(`y: ${rect.y}px`, rect.y + rect.height + 5, rect.y + 22);
      }

        // const prevPos = {
        //     x: event.data[0].x,
        //     y: event.data[0].y
        // };
  });

      new InitGUIControllers(tracker);
  }
  demoFlashlight.onmousemove = (e) => {
    torch.style.transform = `translate(${(e.pageX - 250)}px ,${e.pageY - 500}px)`;
    [].forEach.call(demoFlashlight.querySelectorAll('p'), (elem) => {
      elem.style.transform = `translate3d(${(e.pageX - 250) * -0.25}px , ${(e.pageY - 250) * -0.25}px, 0px)`;
    });
  };

  // demoFlashlight.onmousewheel = (e) => {
  //     //  let test = new scrollDetect(e, demoFlashlight);
  // };
