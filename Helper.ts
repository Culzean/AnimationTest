/**
 * @author Culzean
 */
/// <reference path="D:\Win8\AnimationTest\AnimationTest\GameModel.ts" />
module Helper{
    export function RandomCurve (min, max, repeat):number {
        var val = 0;
        for (var i = 0; i < repeat; ++i)
            val += this.RandomRange(min, max);
        return val;
    }

    export function RandomCurveObj (obj):number {
        var val = 0;
        for (var i = 0; i < obj.randRepeat; ++i)
            val += this.RandomRange(obj.randMin, obj.randMax);
        return val;
    }

    export function RandomRange(minVal: number, maxVal: number): number {
        return minVal + (Math.random() * (maxVal - minVal));
    }

    export function RandomXToYf (minVal, maxVal, floatVal):boolean {
        var randVal = minVal + (Math.random() * (maxVal - minVal));
        return typeof floatVal == 'undefined' ? Math.round(randVal) : randVal.toFixed(floatVal);
    }

    export function Convert1D2D (oneDPos, twoDWidth):createjs.Point {
        var pos = new createjs.Point(0, 0);

        pos.x = Math.floor(oneDPos % twoDWidth);
        pos.y = Math.floor(oneDPos / twoDWidth);
        return pos;
    }

    export function Convert1DToXY (oneDPos, twoDWidth, tileWidth):createjs.Point {
        var pos = new createjs.Point(0, 0);

        pos.x = Math.floor(oneDPos % twoDWidth) * tileWidth;
        pos.y = Math.floor(oneDPos / twoDWidth) * tileWidth;
        return pos;
    }

    export function Convert2D1D (posX, posY, twoDWidth):number {
        //origin at top left, col row
        if (posY > 0)
            posY -= 1;

        var val = (posY * twoDWidth);
        val += posX;

        return val;
    }
}
