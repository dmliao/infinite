'use strict';

export default class KeyController {
    constructor() {

        Mousetrap.bind('x', function() {
            console.log("Changed to move tool");
            global.Toolbox.setCurrentTool('moveCanvas');
        }, 'keyup');
        Mousetrap.bind('b', function() {
            console.log("Changed to move tool");
            global.Toolbox.setCurrentTool('brush');
        }, 'keyup');

        Mousetrap.bind('r', function() {
            console.log("Reset camera");
            global.Artwork.offsetX = 0;
            global.Artwork.offsetY = 0;
            global.Artwork.draw();
        }, 'keyup');
    }
}