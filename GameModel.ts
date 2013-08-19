/// <reference path="D:\Win8\AnimationTest\AnimationTest\create\easeljs.d.ts" />
/// <reference path="D:\Win8\AnimationTest\AnimationTest\create\preloadjs.d.ts" />
/// <reference path="D:\Win8\AnimationTest\AnimationTest\create\soundjs.d.ts" />
/// <reference path="D:\Win8\AnimationTest\AnimationTest\create\tweenjs.d.ts" />
/// <reference path="D:\Win8\AnimationTest\AnimationTest\View.ts" />
/// <reference path="D:\Win8\AnimationTest\AnimationTest\Helper.ts" />

class GameModel {

    //store assets
    public assets:any[] = [];

    public gameWidth:number = 768;
    public gameHeight: number = 576;
    public hudWidth: number;
    public hudHeight: number;

    public queue: createjs.LoadQueue;
    public callBack: Function;

    //private gameState: GameState;
    private view: View;

    constructor( stateChangeFunc: () => any) {
        m = this;

        this.queue = new createjs.LoadQueue();

        this.callBack = stateChangeFunc;
        this.loadGame();
    }

    public setView(view: View): void {
        this.view = view;
    }

    public  handleComplete = function ():void {

    }

    public buildMenu = function ():void {


    }

    public reset = function ():void {
    }

    public SetCallBack = function (callBackMethod):void {
        this.queue.onDownload = callBackMethod;
    }

    public loadMenu = function (): void {

    }

    public loadGame = function ():void {
        //this.addEventListener("fileload", handleFileLoad);
        m.queue.addEventListener("complete", buildAssets);
        //queue.addEventListener("fileload", this.handleFileLoad);
        m.queue.addEventListener("progress", handleOverallProgress);
        m.queue.addEventListener("error", handleFileError);

        m.queue.loadManifest(manifest);
        //this.onComplete = GameModel.prototype.buildAssets;
    }

    public loadAsset(name: string): boolean {
        //what checking should be done here?
        this.assets[name] = this.queue.getResult(name);
        return true;
    }

    public getAsset( resName:string ): any {
        var res = this.assets[resName];
        if (res != null) {
            return res;
        }
        throw new Error("Resource name not found: " + resName );
    }
}

var m: GameModel;
	
var manifest = [
    { src: "res/4.png", id: "catapult" },
    { src: "res/buttons.png", id: "buttons" },
    { src: "res/Hill.png", id: "background" }
		];
		
	
function buildAssets():boolean {

    for (var i = 0; i < manifest.length; i++){
        m.loadAsset(<string>manifest[i].id);
    }
    m.callBack();
    return true;
}

function handleOverallProgress (event): boolean {
    console.log("Progress: " + m.queue.progress);
    return true;
}
    
	
function handleFileError (event): boolean {
    console.log("Error loading: " + event.item.src);
    //try cross domain
    return true;
}