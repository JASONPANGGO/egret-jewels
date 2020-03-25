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
     * 刀痕
     */
    var ComScar = (function (_super) {
        __extends(ComScar, _super);
        /**
         * 构造动画对象
         */
        function ComScar() {
            var _this = _super.call(this) || this;
            _this.moveCount = 0; //记录鼠标移动事件触发次数
            _this.hasThrow = false; //是否触发挥刀音效
            //上一次mousemove事件是的触摸点位置
            _this.prePointX = -1;
            _this.prePointY = -1;
            return _this;
            // this.skinName = skins.ComEmpty;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args 构建传参会通过init()传过去
         */
        ComScar.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // console.info("init", ...args);
            this.touchEnabled = this.touchChildren = false;
            // this.filters = [new egret.GlowFilter(0x923500,0.5,0.4,0.4)];
        };
        /** 首次创建组件时调用 */
        ComScar.prototype.load = function () {
            // console.info("load");
        };
        /** 每次创建组件都会调用 */
        ComScar.prototype.start = function () {
            // console.info("start");
        };
        /** 每次结束组件都会调用 */
        ComScar.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听组件，每帧都会调用 */
        ComScar.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        ComScar.prototype.addEvent = function () {
            // console.info("addEvent");
            GameMgr.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.addScar, this);
            GameMgr.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.moveEnd, this);
        };
        /** 移除事件 */
        ComScar.prototype.removeEvent = function () {
            // console.info("removeEvent");
            GameMgr.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.addScar, this);
            GameMgr.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.moveEnd, this);
        };
        /** 窗口大小改变时调用 */
        ComScar.prototype.resizeView = function (event) {
            // console.info("resizeView", event, GameMgr.gameview.width, GameMgr.gameview.height);
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
        ComScar.prototype.rotateView = function (event) {
            // console.info("rotateView", event, GameMgr.screenType, GameMgr.mobileType);
            if (GameMgr.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        /**
         * 添加刀痕方法
         */
        ComScar.prototype.addScar = function (event) {
            //去掉多点触控
            if (this.touchPointID && this.touchPointID != event.touchPointID) {
                return;
            }
            this.touchPointID = event.touchPointID;
            /**
             * 添加音效
             */
            this.moveCount++;
            if (!this.hasThrow && this.moveCount > 10) {
                // const soundThrow: egret.Sound = RES.getRes("throw_mp3");
                // const channelThrow = soundThrow.play(0, 1);
                this.hasThrow = true;
            }
            var stx = event.stageX;
            var sty = event.stageY;
            /**
             * 添加刀痕
             */
            if (this.prePointX > 0 && this.prePointY > 0) {
                var len = Math.floor(Math.sqrt((this.prePointY - sty) * (this.prePointY - sty) + (this.prePointX - stx) * (this.prePointX - stx)));
                var theta = Math.atan((sty - this.prePointY) / (stx - this.prePointX)) * 57.3;
                if (this.prePointX <= stx) {
                    len *= -1;
                }
                var scar_1 = new egret.Shape();
                var ra = 30;
                scar_1.graphics.lineStyle(ra, 0xFFFFFF);
                scar_1.graphics.moveTo(0, 0);
                scar_1.graphics.lineTo(len, 0);
                scar_1.graphics.endFill();
                this.addChild(scar_1);
                // let lPos: egret.Point = scar.parent.globalToLocal(stx, sty);
                scar_1.x = stx; //lPos.x;
                scar_1.y = sty; //lPos.y;
                scar_1.anchorOffsetX = 4.5;
                scar_1.rotation = theta;
                gTween.tween(scar_1, void 0, {
                    props: { scaleY: 0 /* , alpha: 0 */ }, duration: 300, call: {
                        callback: function () {
                            scar_1 = gComMgr.rmObj(scar_1);
                        }
                    }
                });
            }
            this.prePointX = stx;
            this.prePointY = sty;
        };
        /**
         * 抬起手之后的处理
         */
        ComScar.prototype.moveEnd = function (event) {
            this.touchPointID = null;
            this.prePointX = -1;
            this.prePointY = -1;
            this.moveCount = 0;
            this.hasThrow = false;
        };
        return ComScar;
    }(com.ComFile));
    com.ComScar = ComScar;
    __reflect(ComScar.prototype, "com.ComScar");
})(com || (com = {}));
//# sourceMappingURL=ComScar.js.map