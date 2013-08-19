/// <reference path="D:\Win8\AnimationTest\AnimationTest\create\tweenjs.d.ts" />
/// <reference path="D:\Win8\AnimationTest\AnimationTest\GameModel.ts" />
// Class
var Animate = (function () {
    function Animate(model, view) {
        this.catapultVel = 200;
        this.start = new createjs.Point(0, 0);
        this.frame = 0;
        this.frameCount = 100;
        this.crtEase = 0;
        p = this;
        this.model = model;
        this.view = view;
    }
    Animate.prototype.Init = function () {
        //manafest should be loaded, view ready
        //ready to build game
        this.backGround = new createjs.Bitmap(this.model.getAsset("background"));
        this.backGround.scaleX = this.model.gameWidth / 256;
        this.backGround.scaleY = this.model.gameHeight / 150;
        this.view.stage.addChild(this.backGround);

        var img = this.model.getAsset("catapult");

        var localSpriteSheet = new createjs.SpriteSheet({
            images: [img],
            frames: { width: 128, height: 128, regX: 64, regY: 64 },
            animations: {
                move_right: [0, 0, "move_right", 16],
                move_left: [13, 14, "move_left", 16],
                fire_on_right: [0, 5, "fire_on_right", 6],
                fire_off_right: [6, 11, "fire_off_right", 4],
                fire_left: [12, 23, "fireon_left", 12],
                ready_left: [12, 12, "ready_left", 12],
                ready_right: [0, 0, "ready_right", 12]
            }
        });

        createjs.SpriteSheetUtils.addFlippedFrames(localSpriteSheet, true, false, false);

        this.catapult = new createjs.BitmapAnimation(localSpriteSheet);

        localSpriteSheet = new createjs.SpriteSheet({
            images: [this.model.getAsset("buttons")],
            frames: { width: 128, height: 42, regX: 64, regY: 21 },
            animations: {
                out: [0, 0, "out", 0],
                over: [1, 1, "over", 0],
                click: [2, 2, "click", 0],
                hit: [0, 0, "hit", 0]
            }
        });

        this.buttonsAnim = new createjs.BitmapAnimation(localSpriteSheet);

        this.buttons = new createjs.ButtonHelper(this.buttonsAnim, "out", "over", "click", false, null, "hit");
        this.buttons.setEnabled(false);

        this.buttonsAnim.x = (m.gameWidth / 2) - 64;
        this.buttonsAnim.y = m.gameHeight - 128;
        this.view.stage.addChild(this.buttonsAnim);
        this.view.stage.addChild(this.catapult);

        this.buttons.setEnabled(true);
        this.buttonsAnim.addEventListener("click", this.handleButtonClick);

        this.catapult.x = 128;
        this.catapult.y = m.gameHeight - 196;
        this.catapult.onAnimationEnd = this.catapultCycle.bind(name);
        this.direction = "right";
        this.action = "fire_on_";
        this.animation = this.action + this.direction;
        this.catapult.gotoAndPlay(this.animation);
        this.catapult.play();

        this.rock = new createjs.Shape();
        this.rock.graphics.setStrokeStyle(1);
        this.rock.graphics.beginStroke('#113355');
        this.rock.graphics.beginFill("rgb(100,100,100)");
        this.rock.graphics.drawCircle(0, 0, 9);
        this.view.stage.addChild(this.rock);
        this.rock.visible = false;

        createjs.Ticker.setPaused(false);
        this.view.stage.addEventListener("stagemouseup", this.handleMouseUp);

        this.ease = createjs.Ease.quadOut;
        p.view.stage.update();
    };

    Animate.prototype.catapultCycle = function (name) {
        switch (p.action) {
            case "fire_on_":
                p.action = "fire_off_";
                p.animation = p.action + p.direction;
                p.catapult.gotoAndPlay(p.animation);

                p.rock.x = p.catapult.x - 4;
                p.rock.y = p.catapult.y - 28;
                p.fire();

                break;

            case "fire_off_":
                p.action = "ready_";
                p.animation = p.action + p.direction;
                p.catapult.stop();

                break;

            case "move_":
                p.action = "ready_";
                p.animation = p.action + p.direction;
                p.catapult.gotoAndPlay(p.animation);
                break;

            case "ready_":
                p.action = "move_";
                p.animation = p.action + p.direction;
                p.catapult.gotoAndPlay(p.animation);

                break;

            default:
                console.log("Animation not recognised: " + p.action);
                break;
        }
        //p.animation = p.action + p.direction;
        //p.catapult.gotoAndPlay(p.animation);
    };

    Animate.prototype.tick = function (dt, paused) {
        if (p.rock.isVisible()) {
            if (p.crtEase == 0) {
                if (++p.frame > p.frameCount) {
                    p.crtEase = 1;
                }
                ;

                p.rock.x = p.start.x + (p.distance * (p.frame / (p.frameCount)));
                p.rock.y = p.start.y - (p.ease(p.frame / p.frameCount) * 100);
            } else if (p.crtEase == 1) {
                if (--p.frame < 0) {
                    p.crtEase = 0;
                    p.frame = 0;
                    p.rock.visible = false;
                    p.action = "ready_";
                }
                ;

                p.rock.x = p.start.x + p.distance + (p.distance * ((p.frameCount - p.frame + 1) / p.frameCount));
                p.rock.y = p.start.y - (p.ease((p.frame) / p.frameCount) * 100);
            }
        }
    };

    Animate.prototype.fire = function () {
        p.distance = Helper.RandomRange(p.model.gameWidth - 400, p.model.gameWidth - 300);

        p.crtEase = 0;
        p.frame = 0;
        p.start.x = p.catapult.x + 20 + (p.distance * (p.frame / p.frameCount));
        p.start.y = p.catapult.y - 50 + (p.ease(0));

        p.rock.visible = true;
    };

    Animate.prototype.handleButtonClick = function (event) {
        if (p.action == "ready_" || p.action == "move_") {
            p.action = "fire_on_";
            p.catapult.gotoAndPlay("fire_on_" + p.direction);
        }
        console.log("click! " + p.action);
    };

    Animate.prototype.handleMouseUp = function (event) {
        if (p.buttonsAnim.currentAnimation == "out") {
            if (p.action == "ready_" || p.action == "move_") {
                //time, but in ms
                var time = 1000 * (Math.abs(p.view.stage.mouseX - p.catapult.x) / p.catapultVel);

                p.catapultTween = createjs.Tween.get(p.catapult, { loop: false }).to({ x: p.view.stage.mouseX, y: p.catapult.y }, time, createjs.Ease.backOut);
                p.view.stage.update();
            }
        }
    };

    Animate.prototype.handleReady = function (tween) {
        p.action = "ready_";
    };
    return Animate;
})();

//var to store this if it falls out of scope
var p;
//# sourceMappingURL=Animate.js.map
