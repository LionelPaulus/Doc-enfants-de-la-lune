export class InitGUIControllers {

    constructor(tracker) {
        // GUI Controllers
        const gui = new dat.GUI();
        const trackedColors = {
            custom: false,
            cyan: false,
            magenta: true,
            yellow: false,
        };

        // Object.keys(tracking.ColorTracker.knownColors_).forEach(function(color) {
        //     trackedColors[color] = true;
        // });

        tracker.customColor = '#43918b';

        function createCustomColor(value) {
            var components = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value);
            var customColorR = parseInt(components[1], 16);
            var customColorG = parseInt(components[2], 16);
            var customColorB = parseInt(components[3], 16);

            var colorTotal = customColorR + customColorG + customColorB;


            if (colorTotal === 0) {

                tracking.ColorTracker.registerColor('custom', function(r, g, b) {
                    return r + g + b < 10;
                });
            } else {

                var rRatio = customColorR / colorTotal;
                var gRatio = customColorG / colorTotal;

                tracking.ColorTracker.registerColor('custom', function(r, g, b) {
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


        createCustomColor(tracker.customColor);


        function updateColors() {
            const colors = [];

            for (const color in trackedColors) {
                if (trackedColors[color]) {
                    colors.push(color);
                }
            }

            tracker.setColors(colors);
        }

        const colorsFolder = gui.addFolder('Colors');

        Object.keys(trackedColors).forEach((color) => {
            if (color !== 'custom') {
                colorsFolder.add(trackedColors, color).onFinishChange(updateColors);
            }
        });
        colorsFolder.add(trackedColors, 'custom').onFinishChange((value) => {
            if (value) {
                this.customColorElement = colorsFolder.addColor(tracker, 'customColor').onChange(createCustomColor);
            } else if ((this.customColorElement)) {
                colorsFolder.remove(this.customColorElement);
            }
        });

        const parametersFolder = gui.addFolder('Parameters');

        parametersFolder.add(tracker, 'minDimension', 1, 100);
        parametersFolder.add(tracker, 'minGroupSize', 1, 100);

        colorsFolder.open();
        parametersFolder.open();

        updateColors();
    }
}
