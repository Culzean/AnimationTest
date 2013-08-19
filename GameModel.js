/// <reference path="D:\Win8\AnimationTest\AnimationTest\create\easeljs.d.ts" />
/// <reference path="D:\Win8\AnimationTest\AnimationTest\create\preloadjs.d.ts" />
/// <reference path="D:\Win8\AnimationTest\AnimationTest\create\soundjs.d.ts" />
/// <reference path="D:\Win8\AnimationTest\AnimationTest\create\tweenjs.d.ts" />
/// <reference path="D:\Win8\AnimationTest\AnimationTest\View.ts" />
/// <reference path="D:\Win8\AnimationTest\AnimationTest\Helper.ts" />
var GameModel = (function () {
    function GameModel(stateChangeFunc) {
        //store assets
        this.assets = [];
        this.gameWidth = 768;
        this.gameHeight = 576;
        this.handleComplete = function () {
        };
        this.buildMenu = function () {
        };
        this.reset = function () {
        };
        this.SetCallBack = function (callBackMethod) {
            this.queue.onDownload = callBackMethod;
        };
        this.loadMenu = function () {
        };
        this.loadGame = function () {
            //this.addEventListener("fileload", handleFileLoad);
            m.queue.addEventListener("complete", buildAssets);

            //queue.addEventListener("fileload", this.handleFileLoad);
            m.queue.addEventListener("progress", handleOverallProgress);
            m.queue.addEventListener("error", handleFileError);

            m.queue.loadManifest(manifest);
            //this.onComplete = GameModel.prototype.buildAssets;
        };
        m = this;

        this.queue = new createjs.LoadQueue();

        this.callBack = stateChangeFunc;
        this.loadGame();
    }
    GameModel.prototype.setView = function (view) {
        this.view = view;
    };

    GameModel.prototype.loadAsset = function (name) {
        //what checking should be done here?
        this.assets[name] = this.queue.getResult(name);
        return true;
    };

    GameModel.prototype.getAsset = function (resName) {
        var res = this.assets[resName];
        if (res != null) {
            return res;
        }
        throw new Error("Resource name not found: " + resName);
    };
    return GameModel;
})();

var m;

var manifest = [
    { src: "res/4.png", id: "catapult" },
    { src: "res/buttons.png", id: "buttons" },
    { src: "res/Hill.png", id: "background" }
];

function buildAssets() {
    for (var i = 0; i < manifest.length; i++) {
        m.loadAsset(manifest[i].id);
    }
    m.callBack();
    return true;
}

function handleOverallProgress(event) {
    console.log("Progress: " + m.queue.progress);
    return true;
}

function handleFileError(event) {
    console.log("Error loading: " + event.item.src);

    //try cross domain
    return true;
}
//# sourceMappingURL=GameModel.js.map
