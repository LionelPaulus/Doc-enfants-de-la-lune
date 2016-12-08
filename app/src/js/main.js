import {initGUIControllers} from "./color_camera_gui.js"
import {scrollDetect} from "./scroll-detect.js"

window.onload = function() {
    var point = document.createElement('div');
    point.className = "light";
    document.body.appendChild(point)

    var body = document.body,
        html = document.documentElement;

    var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    var width = Math.max(body.scrollLeft, body.offsetWidth, html.clientWidth, html.scrollLeft, html.offsetWidth);
    var totalWindow = height + width;

    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var tracker = new tracking.ColorTracker("magenta");
    var trackerTask = tracking.track('#video', tracker, {camera: true});
    var prevPos = {
        x: 0,
        y: 0
    }
    tracker.on('track', function(event) {
        if (event.data.length === 0)
            return // No targets were detected in this frame.
        context.clearRect(0, 0, canvas.width, canvas.height);



        var rect = event.data[0];
        if (rect.color === 'custom') {
            rect.color = tracker.customColor;
        }

        var totalRect = rect.height + rect.width;
        var ratio = parseInt(totalRect / totalWindow * 100)

        //ZOOM
        point.style.transform = `scale(${ratio / 10})`
        if (ratio < 0.5) {
            demoFlashlight.style.transform = `scale(1)`
        }
        else{
             demoFlashlight.style.transform = `scale(${ratio / 10})`
        }
        //RENDER TRACK
        point.style.left = (canvas.width - rect.x) / canvas.width * 100 + "%";
        point.style.top = (rect.y / canvas.height * 100) + "%";
        [].forEach.call(demoFlashlight.querySelectorAll('p'), function(elem){
          elem.style.transform = `translate3d(${ (rect.x - 250) * -0.25}px , ${(rect.y - 250) * -0.25}px, 0px)`
        })
        //FLASH LIGHT
        demoFlashlight.style.backgroundPosition = (canvas.width - rect.x) / canvas.width * 100 + "%" + (rect.y / canvas.height * 100) + "%";


        context.strokeStyle = rect.color;
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.font = '11px Helvetica';
        context.fillStyle = "#fff";
        context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
        context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
        //

        prevPos = {
            x: event.data[0].x,
            y: event.data[0].y
        }
    });
    console.log(trackerTask);

    new initGUIControllers(tracker);
};
var demoFlashlight = document.getElementsByClassName("demo-flashlight")[0];

demoFlashlight.onmousemove = (function(e) {
    demoFlashlight.style.backgroundPosition = (e.pageX - 250) + 'px ' + (e.pageY - 250) + 'px';
    [].forEach.call(demoFlashlight.querySelectorAll('p'), function(elem){
      elem.style.transform = `translate3d(${ (e.pageX - 250) * -0.25}px , ${(e.pageY - 250) * -0.25}px, 0px)`
    })
  //  demoFlashlight.style.transform = `translate3d(${ (e.pageX - 250) * -0.25}px , ${(e.pageY - 250) * -0.25}px, 0px)`
});
demoFlashlight.onmousewheel = (function(e) {
    //  let test = new scrollDetect(e, demoFlashlight);
});
