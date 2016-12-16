import { DomManipulator } from './models/class.dom-manipulator';
import { MoonTimeline } from './modules/moon-timeline';
import { RythmAlarm } from './modules/rythm-alarm';
import { Torch } from './modules/torch';
import { PageEvents } from './modules/page-events';
// import { scrollDetect } from './scroll-detect';

window.ø = new DomManipulator();
const ø = window.ø;
const $ = window.$;

// START.HTML JS
var flashlight = document.getElementById('flashlight');

// flashlight.onmousemove = function(event) {
//   this.style.backgroundPosition = (event.clientX-200) + 'px ' + (event.clientY-200) + 'px';
// }

const allSections = $('section.page');
allSections.not(':eq(0)').addClass('disabled');
allSections.eq(0).addClass('active');
const pages = [
  {
    tag: 'leo',
    reveal: ['lines', ø.all('.page-leo svg circle.trigger')],

  },
  {
    tag: 'journee',
  },
  {
    tag: 'suit',
    reveal: ['lines', ø.all('.page-suit svg circle.trigger')],
  },
  {
    tag: 'dermatologue',
    reveal: ['tabs',  ø.all('.page-dermatologue .target.trigger')]
  },
  {
    tag: 'consequences',
  },
  {
    tag: 'howToTreat',
  },
  {
    tag: 'lune',
  },
];
let i = 0;
$('.next').on('click', () => {
  if (i >= allSections.length - 1) return false;

  allSections.removeClass('active');
  $('.page-' + pages[i].tag).addClass('disabled');
  ++i;
  $('.page-' + pages[i].tag).addClass('active');
  const events = new PageEvents(pages.filter((e) => e.tag === pages[i].tag)[0]);

  if (i === 1) {
    $('.previous').fadeIn();
  }
  else if(i === (allSections.length - 1)) {
    $('.next').fadeOut();
  }
});
$('.previous').on('click', () => {
  if (i <= 0)
    return false;

  allSections.removeClass('active');
  $('.page-' + pages[i].tag).addClass('disabled');
  --i;
  $('.page-' + pages[i].tag).addClass('active');

  if (i === (allSections.length - 2)) {
    $('.next').fadeIn();
  } else if (i === 0) {
    $('.previous').fadeOut();
  }
});


const torch = new Torch();
const moon = new MoonTimeline('-95%');
const events = new PageEvents(pages.filter((e) => e.tag === pages[0].tag)[0]);
//torch.launchCamera();


/*if (i = 6 ){
  $(".big_moon")
    .css('opacity', 0)
    .slideUp('slow')
    .animate(
      { opacity: 1 },
      { queue: false, duration: 'slow' }
  );
}*/

// Loader
$(window).on('load', function() {
  $(".loader").addClass('fadeOut');
});

    // demoFlashlight.onmousemove = (e) => {
    //   torch.style.transform = `translate(${(e.pageX - 250)}px ,${e.pageY - 500}px)`;
    //   [].forEach.call(demoFlashlight.querySelectorAll('p'), (elem) => {
    //     elem.style.transform = `translate3d(${(e.pageX - 250) * -0.25}px , ${(e.pageY - 250) * -0.25}px, 0px)`;
    //   });
