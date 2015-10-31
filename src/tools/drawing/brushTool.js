'use strict';

var Tool = require('../tool');

export default class BrushTool extends Tool {
    constructor(artwork) {
        super(artwork);
        this.currentStroke = null;

        // TODO: better way to choose brushes
        this.brushList = require('../../brushes/brushlist')();
    }

    update() {
        if (this.currentStroke) {
            if (this.currentStroke.brush.update) {
                this.currentStroke.brush.update();
            }
        }
    }

    onMousePress(mouseX, mouseY) {

        // add a stroke of random color (using the pen brush)
        // TODO: have a tool global variable to set the color
        this.currentStroke = this.artwork.getCurrentLayer().addStroke(
            this.brushList.pen,
            'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(
                Math.random() * 255) + ',' + Math.floor(Math.random() *
                255) +
            ')');

        let actualX = mouseX - this.artwork.offsetX;
        let actualY = mouseY - this.artwork.offsetY;

        // TODO: allow thickness to be user-controlled
        this.currentStroke.addPoint(actualX, actualY, {
            thickness: 3
        });
    }

    onMouseMove(mouseX, mouseY) {
        if (!this.currentStroke) {
            return false;
        }
        let actualX = mouseX - this.artwork.offsetX;
        let actualY = mouseY - this.artwork.offsetY;

        // TODO: allow thickness to be user-controlled
        this.currentStroke.addPoint(actualX, actualY, {
            thickness: 3
        });
    }

    onMouseRelease(mouseX, mouseY) {
        if (!this.currentStroke) {
            return false;
        }

        // trigger a brush's release
        if (this.currentStroke.brush.release) {
            let ctx = this.currentStroke.layer.getContext();

            // make sure that the brush strokes in the correct color
            ctx.fillStyle = this.currentStroke.color;
            ctx.strokeStyle = this.currentStroke.color;

            this.currentStroke.brush.release(this.currentStroke.layer,
                ctx,
                this.currentStroke.getLastPoint());
        }
        this.currentStroke = null;
    }
}