import { InitGUIControllers } from './color_camera_gui';
import { DomManipulator } from './models/class.dom-manipulator';
import { MoonTimeline } from './modules/moon-timeline';
import { RythmAlarm } from './modules/rythm-alarm';
import { Torch } from './modules/torch';
import { Reveal } from './modules/reveal';
// import { scrollDetect } from './scroll-detect';

window.ø = new DomManipulator();
const ø = window.ø;

const page = location.pathname.replace('.html', '').replace('/', '');

const torch = new Torch();

switch (page) {
case 'moon-test':

  new MoonTimeline('-90%');

  break;
case 'leo':

  new MoonTimeline('-95%');
  new Reveal('lines', ø.all('svg circle.trigger'));
  torch.launchCamera();

  break;
case 'dermatologue':

  new MoonTimeline('-95%');
  new Reveal('tabs', ø.all('.target.trigger'));
  torch.launchCamera();

  break;
case 'suit':

  new MoonTimeline('-100%');
  new Reveal('lines', ø.all('svg circle.trigger'));
  torch.launchCamera();
  break;
case 'rythm':
case 'sport':

  new MoonTimeline('-12.5%');

  break;

}


    // demoFlashlight.onmousemove = (e) => {
    //   torch.style.transform = `translate(${(e.pageX - 250)}px ,${e.pageY - 500}px)`;
    //   [].forEach.call(demoFlashlight.querySelectorAll('p'), (elem) => {
    //     elem.style.transform = `translate3d(${(e.pageX - 250) * -0.25}px , ${(e.pageY - 250) * -0.25}px, 0px)`;
    //   });
