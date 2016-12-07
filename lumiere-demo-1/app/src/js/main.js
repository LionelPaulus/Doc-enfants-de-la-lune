import {initGUIControllers} from "./color_camera_gui.js"

window.onload = function() {
    var point = document.createElement('div');
    point.className = "light";
    document.body.appendChild(point)

    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var tracker = new tracking.ColorTracker('magenta');
    console.log(tracker);
    tracking.track('#video', tracker, {camera: true});
    var prevPos = {
        x: 0,
        y: 0
    }
    tracker.on('track', function(event) {
        if (event.data.length === 0)
            return // No targets were detected in this frame.
        console.log(prevPos);


        context.clearRect(0, 0, canvas.width, canvas.height);
        // event.data.forEach(function(rect) {
        //     if (rect.color === 'custom') {
        //         rect.color = tracker.customColor;
        //     }
        //
        //     context.strokeStyle = rect.color;
        //     context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        //     context.font = '11px Helvetica';
        //     context.fillStyle = "#fff";
        //     context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
        //     context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
        //     //
        //     point.style.left = (canvas.width - rect.x) / canvas.width * 100 + "%";
        //     point.style.top = (rect.y / canvas.height * 100) + "%";
        //
        //     demoFlashlight.style.backgroundPosition = (canvas.width - rect.x) / canvas.width * 100 + "%" + (rect.y / canvas.height * 100) + "%";
        //
        // });
        var rect = event.data[0];
            if (rect.color === 'custom') {
                rect.color = tracker.customColor;
            }

            context.strokeStyle = rect.color;
            context.strokeRect(rect.x, rect.y, rect.width, rect.height);
            context.font = '11px Helvetica';
            context.fillStyle = "#fff";
            context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
            context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
            //
            point.style.left = (canvas.width - rect.x) / canvas.width * 100 + "%";
            point.style.top = (rect.y / canvas.height * 100) + "%";

            demoFlashlight.style.backgroundPosition = (canvas.width - rect.x) / canvas.width * 100 + "%" + (rect.y / canvas.height * 100) + "%";


        prevPos = {
            x: event.data[0].x,
            y: event.data[0].y
        }
    });

    new initGUIControllers(tracker);
};
var demoFlashlight = document.getElementsByClassName("demo-flashlight")[0];

demoFlashlight.onmousemove = (function(e) {
    demoFlashlight.style.backgroundPosition = (e.pageX - 250) + 'px ' + (e.pageY - 250) + 'px';
});
