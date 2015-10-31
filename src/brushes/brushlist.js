'use strict';

var Pen = require('./default/pen');
var Web = require('./default/web');
var P5 = require('./p5brush/default');

module.exports = function() {
    let pen = new Pen();
    let web = new Web();

    // TODO: P5 Brush is still under construction
    let p5Brush = new P5();

    return {
        pen: pen,
        web: web,
        p5: p5Brush
    };
}