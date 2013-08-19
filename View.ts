/// <reference path="D:\Win8\AnimationTest\AnimationTest\GameModel.ts" />
//list of each possible view
enum VIEW_TYPES {
    BACKGROUND = 0,
    GAME,
    OVERLAY,
    HUD,

    COUNT,
}

class View {
    public width: number;
    public height: number;
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public stage: createjs.Stage;

    constructor(_canvas: HTMLCanvasElement, _context: CanvasRenderingContext2D,
        _stage: createjs.Stage, w: number, h: number) {
        //this.stage = _stage;
        this.canvas = _canvas;
        this.context = _context;
        this.width = w; this.height = h;
        this.stage = _stage;
    }
    public getX(): number { return this.stage.x; }
    public getY(): number { return this.stage.y; }

    public setX(val: number): void { this.stage.x = val; }
    public setY(val: number): void { this.stage.y = val; }

    public Clear(): void {
        this.stage.removeAllChildren();
        this.context.fillStyle = "rgba(0,0,0,0)";
        this.context.clearRect(0, 0, this.width, this.height);
        this.stage.update();
    }
}