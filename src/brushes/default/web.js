'use strict';

var Brush = require('../brush');

// weblike brush that connects points to previous points
export default class Web extends Brush {
    // rendering the actual brush    
    brush(layer, ctx, point, nextPoint, allPoints) {
        ctx.lineWidth = this.setThickness(point.thickness());
        ctx.beginPath();
        ctx.moveTo(allPoints[0].x, allPoints[0].y);
        for (let i = 1; i < allPoints.length; i++) {
            ctx.lineTo(allPoints[i].x, allPoints[i].y);
            var nearPoint = allPoints[i - point.thickness()];
            if (nearPoint) {
                ctx.moveTo(nearPoint.x, nearPoint.y);
                ctx.lineTo(allPoints[i].x, allPoints[i].y);
            }
        }

        ctx.stroke();
    }

    // set the thickness of the brush with a given base thickness to start with
    setThickness(base) {
        return 1;
    }

    setOpacity(base) {
        return base;
    }
}