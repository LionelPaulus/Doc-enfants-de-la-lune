import { DomManipulator } from './models/class.dom-manipulator';
import { MoonTimeline } from './modules/moon-timeline';
import { RythmAlarm } from './modules/rythm-alarm';
import { Torch } from './modules/torch';
import { PageEvents } from './modules/page-events';
// import { scrollDetect } from './scroll-detect';

window.ø = new DomManipulator();
const ø = window.ø;
const $ = window.$;


const allSections = $('section.page');
allSections.eq(0).show();
const pages = [
  {
    tag: 'leo',
    moonPos: 15,
    reveal: ['lines', ø.all('.page-leo svg circle.trigger')],

  },
  {
    tag: 'journee',
    moonPos: 19,

  },
  {
    tag: 'suit',
    moonPos: 23,
    reveal: ['lines', ø.all('.page-suit svg circle.trigger')],
  },
  {
    tag: 'dermatologue',
    moonPos: 27,
    reveal: ['tabs', ø.all('.page-dermatologue .target.trigger')],
    lights: false,

  },
  {
    moonPos: 31,
    lights: true,
    tag: 'consequences',
  },
  {
    moonPos: 35,
    tag: 'howToTreat',
  },
  {
    tag: 'lune',
  },
];
let i = 0;
let alreadyClicked = false;
$('.next').on('click', () => {
  if (alreadyClicked) return false;

  alreadyClicked = true;

  if (i >= allSections.length - 1) return false;

  $('.page-' + pages[i].tag).fadeOut(() => {
    ++i;
    moon.setValue(pages[i].moonPos);
    torch.page = pages[i].tag;
    $('.page-' + pages[i].tag).fadeIn();
    const events = new PageEvents(pages.filter((e) => e.tag === pages[i].tag)[0]);

    if (i === 1) {
      $('.previous').fadeIn();
    }
    else if (i === (allSections.length - 1)) {
      $('.next').fadeOut();
      $('#moon').fadeOut();
    }
    alreadyClicked = false;
  });
});
$('.previous').on('click', () => {
  if (alreadyClicked) return false;

  alreadyClicked = true;

  if (i <= 0) return false;

  $('.page-' + pages[i].tag).fadeOut(() => {
    --i;
    moon.setValue(pages[i].moonPos);
    torch.page = pages[i].tag;
    $('.page-' + pages[i].tag).fadeIn();

    if (i === (allSections.length - 2)) {
      $('.next').fadeIn();
      $('#moon').fadeIn();
    } else if (i === 0) {
      $('.previous').fadeOut();
    }

    alreadyClicked = false;
  });
});


const torch = new Torch();
const moon = new MoonTimeline('-92%');
const events = new PageEvents(pages.filter((e) => e.tag === pages[0].tag)[0]);
moon.setValue(pages[0].moonPos);
torch.launchCamera();


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
