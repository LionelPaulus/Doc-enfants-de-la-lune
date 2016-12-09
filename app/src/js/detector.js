/**
* @author alteredq / http://alteredqualia.com/
* @author mr.doob / http://mrdoob.com/
*/

const Detector = {
  isMobile: navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/),
};

// browserify support
if (typeof module === 'object') {
  module.exports = Detector;
}
