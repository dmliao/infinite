'use strict';

var BrushTool = require('./drawing/brushTool');

var MoveCanvasTool = require('./moving/moveCameraTool');

export default class Toolbox {
    constructor(artwork) {
        this.artwork = artwork;

        // initialize all the tools
        this.tools = {
            brush: new BrushTool(artwork),
            moveCanvas: new MoveCanvasTool(artwork)
        }

        this.currentTool = 'brush';
    }

    getCurrentTool() {
        return this.tools[this.currentTool];
    }

    setCurrentTool(toolName) {
        this.currentTool = toolName;
    }
}