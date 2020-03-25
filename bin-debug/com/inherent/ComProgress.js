var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var com;
(function (com) {
    /**
     * 进度条组件
     */
    var ComProgress = (function (_super) {
        __extends(ComProgress, _super);
        function ComProgress() {
            var _this = _super.call(this) || this;
            _this.loadingAngle = 0;
            _this.skinName = skins.ComProgress;
            return _this;
        }
        /* =========== 生命周期结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args 构建传参会通过init()传过去
         */
        ComProgress.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // console.info("init", ...args);
        };
        /** 首次创建组件时调用 */
        ComProgress.prototype.load = function () {
            // console.info("load");
            // this.updateRender();
            var bar = this.bar;
            var conBar = this.conBar;
            var con = this.con;
            gComMgr.setObjSize(bar, true);
            gComMgr.setObjSize(conBar, true);
            gComMgr.setObjSize(con, true);
            this.initGraphics();
            // this.changeGraphics();
        };
        /** 每次创建组件都会调用 */
        ComProgress.prototype.start = function () {
            // console.info("start");
            // this.word.visible = false;
            // this.conBar.width = this.barMinW;
            // gTween.rmTweens(this.conBar);
            // this.people.open();
            // this.people.interval = 200;
            // this.people.setData([
            // 	new data.McData("walk", 2, "psmallgirl{1}_png"),
            // ]);
            // this.people.gotoAndStop("walk");
        };
        /** 每次结束组件都会调用 */
        ComProgress.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听组件，每帧都会调用 */
        ComProgress.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        ComProgress.prototype.addEvent = function () {
            // console.info("addEvent");
        };
        /** 移除事件 */
        ComProgress.prototype.removeEvent = function () {
            // console.info("removeEvent");
            // if (this.loadingTime) {
            // 	this.loadingTime.removeEventListener(egret.TimerEvent.TIMER, this.drawStart, this);
            // 	this.loadingTime.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.drawComplete, this);
            // }
        };
        /** 窗口大小改变时调用 */
        ComProgress.prototype.resizeView = function (event) {
            // console.info("resizeView", event, GameMgr.gameview.width, GameMgr.gameview.height);
            var baseScale = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];
            this.scaleX = this.scaleY = baseScale;
            if (GameMgr.screenType == 1 /* VERTICAL */) {
                //竖屏
                switch (GameMgr.mobileType) {
                    //iPhoneX或以上
                    case 1 /* IPHONE_X */:
                        break;
                    //iPhone8或以下
                    case 2 /* IPHONE_8 */:
                        break;
                    //iPad或其它
                    case 3 /* IPAD */:
                        break;
                }
            }
            else {
                //横屏
                switch (GameMgr.mobileType) {
                    //iPhoneX或以上
                    case 1 /* IPHONE_X */:
                        break;
                    //iPhone8或以下
                    case 2 /* IPHONE_8 */:
                        break;
                    //iPad或其它
                    case 3 /* IPAD */:
                        break;
                }
            }
        };
        /** 屏幕横竖屏转换时调用 */
        ComProgress.prototype.rotateView = function (event) {
            // console.info("rotateView", event, GameMgr.screenType, GameMgr.mobileType);
            if (GameMgr.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        /** 初始化赋值 */
        ComProgress.prototype.initGraphics = function () {
            var bar = this.bar;
            gComMgr.setObjSize(bar);
            var shape = this._shape = new egret.Shape();
            shape.x = bar.x + bar.width / 2;
            shape.y = bar.y + bar.height / 2;
            bar.parent.addChildAt(shape, bar.parent.getChildIndex(bar));
            this.bar.mask = shape;
        };
        ComProgress.prototype.startLoading = function () {
            if (this.barLoading) {
                return;
            }
            this.barLoading = true;
            var shape = this._shape;
            this.resetLoading();
        };
        ComProgress.prototype.stopLoading = function () {
            if (!this.barLoading) {
                return;
            }
            this.barLoading = false;
            if (this.loadingTime) {
                this.loadingTime.removeEventListener(egret.TimerEvent.TIMER, this.drawStart, this);
                this.loadingTime.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.drawComplete, this);
                this.loadingTime.stop();
            }
            this.loadingAngle = 0;
            this.changeGraphics(this.loadingAngle);
        };
        ComProgress.prototype.resetLoading = function () {
            // const meanDelay: number = barTimes[lv - 1] * 1000 / 360;
            // const repeatCount = Math.floor(360 / meanDelay) // 360;
            // this.chgAngle = Math.floor(360 / repeatCount) // 1;
            // const delay = Math.floor(barTimes[lv - 1] * 1000 / repeatCount);
            var scale = 1;
            var range = 360;
            var time = 1000;
            var delay = 18;
            var repeatCount = time / delay / scale;
            var speed = range / repeatCount;
            this.chgAngle = speed;
            // console.info("resetLoading id ==", comHouse.id, delay, repeatCount, this.chgAngle);
            if (this.loadingTime) {
                this.loadingTime.removeEventListener(egret.TimerEvent.TIMER, this.drawStart, this);
                this.loadingTime.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.drawComplete, this);
                this.loadingTime.stop();
                this.loadingTime = null;
            }
            if (!this.loadingTime) {
                this.loadingTime = new egret.Timer(delay, repeatCount + 1);
                this.loadingTime.removeEventListener(egret.TimerEvent.TIMER, this.drawStart, this);
                this.loadingTime.addEventListener(egret.TimerEvent.TIMER, this.drawStart, this);
                this.loadingTime.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.drawComplete, this);
                this.loadingTime.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.drawComplete, this);
            }
            else {
                this.loadingTime.delay = delay;
                this.loadingTime.repeatCount = repeatCount + 1;
            }
            this.loadingAngle = 0;
            this.changeGraphics(this.loadingAngle);
            this.loadingTime.start();
        };
        ComProgress.prototype.drawStart = function (event) {
            this.changeGraphics(this.loadingAngle);
            this.loadingAngle += this.chgAngle;
            if (this.loadingAngle > 360) {
                this.loadingAngle = this.loadingAngle % 360;
            }
        };
        ComProgress.prototype.drawComplete = function (event) {
            // console.info("drawComplete", this.loadingAngle);
            this.loadingTime.removeEventListener(egret.TimerEvent.TIMER, this.drawStart, this);
            this.loadingTime.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.drawComplete, this);
            // Mapi.sendAction(2);
            this.loadingTime.stop();
            this.barLoading = false;
            this.dispatchEventWith(egret.Event.COMPLETE);
        };
        /** 快速完成进度条 */
        ComProgress.prototype.fastComlete = function () {
            if (this.loadingTime) {
                this.loadingTime.removeEventListener(egret.TimerEvent.TIMER, this.drawStart, this);
                this.loadingTime.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.drawComplete, this);
                this.loadingTime.stop();
                this.loadingTime = null;
            }
        };
        ComProgress.prototype.changeGraphics = function (angle) {
            // console.info("changeGraphics", angle);
            var shape = this._shape;
            shape.graphics.clear();
            shape.graphics.beginFill(0x00ffff, 1);
            shape.graphics.moveTo(0, 0);
            shape.graphics.lineTo(50, 0);
            shape.graphics.drawArc(0, 0, 50, 0, angle * Math.PI / 180, false);
            shape.graphics.lineTo(0, 0);
            shape.graphics.endFill();
        };
        return ComProgress;
    }(com.ComFile));
    com.ComProgress = ComProgress;
    __reflect(ComProgress.prototype, "com.ComProgress");
})(com || (com = {}));
//# sourceMappingURL=ComProgress.js.map