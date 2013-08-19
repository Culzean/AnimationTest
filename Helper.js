/**
* @author Culzean
*/
/// <reference path="D:\Win8\AnimationTest\AnimationTest\GameModel.ts" />
var Helper;
(function (Helper) {
    function RandomCurve(min, max, repeat) {
        var val = 0;
        for (var i = 0; i < repeat; ++i)
            val += this.RandomRange(min, max);
        return val;
    }
    Helper.RandomCurve = RandomCurve;

    function RandomCurveObj(obj) {
        var val = 0;
        for (var i = 0; i < obj.randRepeat; ++i)
            val += this.RandomRange(obj.randMin, obj.randMax);
        return val;
    }
    Helper.RandomCurveObj = RandomCurveObj;

    function RandomRange(minVal, maxVal) {
        return minVal + (Math.random() * (maxVal - minVal));
    }
    Helper.RandomRange = RandomRange;

    function RandomXToYf(minVal, maxVal, floatVal) {
        var randVal = minVal + (Math.random() * (maxVal - minVal));
        return typeof floatVal == 'undefined' ? Math.round(randVal) : randVal.toFixed(floatVal);
    }
    Helper.RandomXToYf = RandomXToYf;

    function Convert1D2D(oneDPos, twoDWidth) {
        var pos = new createjs.Point(0, 0);

        pos.x = Math.floor(oneDPos % twoDWidth);
        pos.y = Math.floor(oneDPos / twoDWidth);
        return pos;
    }
    Helper.Convert1D2D = Convert1D2D;

    function Convert1DToXY(oneDPos, twoDWidth, tileWidth) {
        var pos = new createjs.Point(0, 0);

        pos.x = Math.floor(oneDPos % twoDWidth) * tileWidth;
        pos.y = Math.floor(oneDPos / twoDWidth) * tileWidth;
        return pos;
    }
    Helper.Convert1DToXY = Convert1DToXY;

    function Convert2D1D(posX, posY, twoDWidth) {
        if (posY > 0)
            posY -= 1;

        var val = (posY * twoDWidth);
        val += posX;

        return val;
    }
    Helper.Convert2D1D = Convert2D1D;
})(Helper || (Helper = {}));
//# sourceMappingURL=Helper.js.map
