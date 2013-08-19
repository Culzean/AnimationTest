/// <reference path="D:\Win8\AnimationTest\AnimationTest\GameModel.ts" />
//list of each possible view
var VIEW_TYPES;
(function (VIEW_TYPES) {
    VIEW_TYPES[VIEW_TYPES["BACKGROUND"] = 0] = "BACKGROUND";
    VIEW_TYPES[VIEW_TYPES["GAME"] = 1] = "GAME";
    VIEW_TYPES[VIEW_TYPES["OVERLAY"] = 2] = "OVERLAY";
    VIEW_TYPES[VIEW_TYPES["HUD"] = 3] = "HUD";

    VIEW_TYPES[VIEW_TYPES["COUNT"] = 4] = "COUNT";
})(VIEW_TYPES || (VIEW_TYPES = {}));

var View = (function () {
    function View(_canvas, _context, _stage, w, h) {
        //this.stage = _stage;
        this.canvas = _canvas;
        this.context = _context;
        this.width = w;
        this.height = h;
        this.stage = _stage;
    }
    View.prototype.getX = function () {
        return this.stage.x;
    };
    View.prototype.getY = function () {
        return this.stage.y;
    };

    View.prototype.setX = function (val) {
        this.stage.x = val;
    };
    View.prototype.setY = function (val) {
        this.stage.y = val;
    };

    View.prototype.Clear = function () {
        this.stage.removeAllChildren();
        this.context.fillStyle = "rgba(0,0,0,0)";
        this.context.clearRect(0, 0, this.width, this.height);
        this.stage.update();
    };
    return View;
})();
//# sourceMappingURL=View.js.map
