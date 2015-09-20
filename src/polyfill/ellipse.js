'use strict';

// polyfill to allow ellipses to work on firefox, etc.
module.exports = function(context, cx, cy, rx, ry, rot, aStart, aEnd) {
    context.save();
    context.translate(cx, cy);
    context.rotate(rot);
    context.translate(-rx, -ry);

    context.scale(rx, ry);
    context.arc(1, 1, 1, aStart, aEnd, false);
    context.restore();
}