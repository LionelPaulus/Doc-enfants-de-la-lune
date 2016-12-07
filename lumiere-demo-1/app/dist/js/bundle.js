/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _color_camera_gui = __webpack_require__(2);

	window.onload = function () {
	    var point = document.createElement('div');
	    point.className = "light";
	    document.body.appendChild(point);

	    var video = document.getElementById('video');
	    var canvas = document.getElementById('canvas');
	    var context = canvas.getContext('2d');

	    var tracker = new tracking.ColorTracker();
	    console.log(tracker);
	    tracking.track('#video', tracker, { camera: true });
	    var prevPos = {
	        x: 0,
	        y: 0
	    };
	    tracker.on('track', function (event) {
	        if (event.data.length === 0) return; // No targets were detected in this frame.
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
	        point.style.top = rect.y / canvas.height * 100 + "%";

	        demoFlashlight.style.backgroundPosition = (canvas.width - rect.x) / canvas.width * 100 + "%" + rect.y / canvas.height * 100 + "%";

	        prevPos = {
	            x: event.data[0].x,
	            y: event.data[0].y
	        };
	    });

	    new _color_camera_gui.initGUIControllers(tracker);
	};
	var demoFlashlight = document.getElementsByClassName("demo-flashlight")[0];

	demoFlashlight.onmousemove = function (e) {
	    demoFlashlight.style.backgroundPosition = e.pageX - 250 + 'px ' + (e.pageY - 250) + 'px';
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var initGUIControllers = exports.initGUIControllers = function initGUIControllers(tracker) {
	    _classCallCheck(this, initGUIControllers);

	    //GUI Controllers
	    var gui = new dat.GUI();
	    var trackedColors = {
	        custom: false,
	        cyan: false,
	        magenta: true,
	        yellow: false
	    };

	    // Object.keys(tracking.ColorTracker.knownColors_).forEach(function(color) {
	    //     trackedColors[color] = true;
	    // });

	    tracker.customColor = '#43918b';

	    createCustomColor(tracker.customColor);
	    function createCustomColor(value) {
	        var components = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value);
	        var customColorR = parseInt(components[1], 16);
	        var customColorG = parseInt(components[2], 16);
	        var customColorB = parseInt(components[3], 16);

	        var colorTotal = customColorR + customColorG + customColorB;

	        if (colorTotal === 0) {

	            tracking.ColorTracker.registerColor('custom', function (r, g, b) {
	                return r + g + b < 10;
	            });
	        } else {

	            var rRatio = customColorR / colorTotal;
	            var gRatio = customColorG / colorTotal;

	            tracking.ColorTracker.registerColor('custom', function (r, g, b) {
	                var colorTotal2 = r + g + b;

	                if (colorTotal2 === 0) {
	                    if (colorTotal < 10) {
	                        return true;
	                    }
	                    return false;
	                }

	                var rRatio2 = r / colorTotal2,
	                    gRatio2 = g / colorTotal2,
	                    deltaColorTotal = colorTotal / colorTotal2,
	                    deltaR = rRatio / rRatio2,
	                    deltaG = gRatio / gRatio2;

	                return deltaColorTotal > 0.9 && deltaColorTotal < 1.1 && deltaR > 0.9 && deltaR < 1.1 && deltaG > 0.9 && deltaG < 1.1;
	            });
	        }

	        updateColors();
	    }

	    function updateColors() {
	        var colors = [];

	        for (var color in trackedColors) {
	            if (trackedColors[color]) {
	                colors.push(color);
	            }
	        }

	        tracker.setColors(colors);
	    }

	    var colorsFolder = gui.addFolder('Colors');

	    Object.keys(trackedColors).forEach(function (color) {
	        if (color !== 'custom') {
	            colorsFolder.add(trackedColors, color).onFinishChange(updateColors);
	        }
	    });
	    colorsFolder.add(trackedColors, 'custom').onFinishChange(function (value) {
	        if (value) {
	            this.customColorElement = colorsFolder.addColor(tracker, 'customColor').onChange(createCustomColor);
	        } else {
	            if (this.customColorElement) colorsFolder.remove(this.customColorElement);
	        }
	    });

	    var parametersFolder = gui.addFolder('Parameters');

	    parametersFolder.add(tracker, 'minDimension', 1, 100);
	    parametersFolder.add(tracker, 'minGroupSize', 1, 100);

	    colorsFolder.open();
	    parametersFolder.open();

	    updateColors();
	};

/***/ }
/******/ ]);