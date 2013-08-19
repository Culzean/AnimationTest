/// <reference path="D:\Win8\AnimationTest\AnimationTest\GameModel.ts" />
/// <reference path="D:\Win8\AnimationTest\AnimationTest\View.ts" />
/// <reference path="D:\Win8\AnimationTest\AnimationTest\animate.ts" />
class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;

    game: Animate;
    model: GameModel;
    view: View;

    constructor() {

    }

    public deploy = function ():void {
        console.log("This is ready to stage");
        //assets loaded and ready to launch
        //createjs.Ticker.addListener(a.game, true);
        createjs.Ticker.addListener(a.game.tick, true);
        createjs.Ticker.addEventListener("tick", this.view.stage);
        createjs.Ticker.useRAF = true;
        createjs.Ticker.setFPS(60);
        stage.enableMouseOver(10);
        stage.mouseMoveOutside = true;
        createjs.Ticker.setPaused(false);

        a.game.Init();
    }

    start() {
       //init and load assets
        
         
        canvasElement = document.getElementById("paperweight");
        canvasContext = canvasElement.getContext('2d');
        stage = new createjs.Stage(canvasElement);
        
        this.view = new View(canvasElement, canvasContext, stage,
            canvasContext.canvas.width, canvasContext.canvas.height);

        this.model = new GameModel(this.deploy);
        this.model.setView(this.view);

        this.game = new Animate(this.model, this.view);
    }

    stop() {
        clearTimeout(this.timerToken);
    }

}

var canvasElement;
var canvasContext;
var stage;
var a:Greeter;

window.onload = () => {
    var greeter = new Greeter();
    greeter.start();
};