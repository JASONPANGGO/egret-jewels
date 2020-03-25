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
     * 漂浮物组件（如：云朵、海浪）
     */
    var ComFloat = (function (_super) {
        __extends(ComFloat, _super);
        function ComFloat() {
            var _this = _super.call(this) || this;
            _this.skinName = skins.ComFloat;
            return _this;
        }
        /* =========== 生命周期结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args 构建传参会通过init()传过去
         */
        ComFloat.prototype.init = function (data) {
            // console.info("init", ...args);
            this.data = data;
        };
        /** 首次创建组件时调用 */
        ComFloat.prototype.load = function () {
            // console.info("load");
            this.touchEnabled = this.touchChildren = false;
        };
        /** 每次创建组件都会调用 */
        ComFloat.prototype.start = function () {
            // console.info("start");
            // this.con_cloud.scaleX = 1;
            var data = this.data;
            var float = this.float;
            var conFloat = this.conFloat;
            var con = this.con;
            float.source = gMath.getRandomAnswer.apply(gMath, data.floatAnswers);
            if (data.isAdaptiveScale && this.parent) {
                float.scaleX = float.scaleY = this.parent.scaleX;
            }
            gComMgr.setItemAnchor(float);
            gComMgr.setItemAnchor(conFloat);
            gComMgr.setItemAnchor(con);
            this.speed(gMath.getRandomInteger(data.speedMax, data.speedMin));
            this.rotateDir = gMath.getRandomAnswer(1, -1);
            this.rotate(gMath.getRandomInteger(data.rotateMax, data.rotateMin));
            this.alphaDir = gMath.getRandomAnswer(1, -1);
            float.alpha = gMath.getRandom(data.alphaMax, data.alphaMin);
            this.scaleDir = gMath.getRandomAnswer(1, -1);
            float.scaleX = float.scaleY = gMath.getRandom(data.scaleMax, data.scaleMin);
            this.die(false);
        };
        /** 每次结束组件都会调用 */
        ComFloat.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听组件，每帧都会调用 */
        ComFloat.prototype.update = function () {
            // console.info("update");
            this.yoyoRotate();
            this.yoyoAlpha();
            this.yoyoScale();
        };
        /** 注册事件 */
        ComFloat.prototype.addEvent = function () {
            // console.info("addEvent");
        };
        /** 移除事件 */
        ComFloat.prototype.removeEvent = function () {
            // console.info("removeEvent");
        };
        /** 窗口大小改变时调用 */
        ComFloat.prototype.resizeView = function (event) {
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
        ComFloat.prototype.rotateView = function (event) {
            // console.info("rotateView", event, GameMgr.screenType, GameMgr.mobileType);
            if (GameMgr.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        /* =========== 生命周期结构代码-end =========== */
        /* =========== 业务代码-start =========== */
        /** 设置or获取漂浮物速度 */
        ComFloat.prototype.speed = function (speed) {
            if (speed != void 0) {
                this._speed = speed;
            }
            else {
                return this._speed;
            }
        };
        /** 设置or获取漂浮物角度 */
        ComFloat.prototype.rotate = function (rotate) {
            if (rotate != void 0) {
                this._rotate = rotate;
                this.float.rotation = this._rotate;
            }
            else {
                return this._rotate;
            }
        };
        ComFloat.prototype.yoyoRotate = function () {
            var data = this.data;
            if (data.rotateMax == data.rotateMin) {
                return;
            }
            var float = this.float;
            var diffR = data.rotateDiff;
            var realR = this.rotate() + diffR * this.rotateDir;
            if (realR < data.rotateMin || realR > data.rotateMax) {
                this.rotateDir *= -1;
                diffR *= this.rotateDir;
                realR = this.rotate() + diffR;
            }
            this.rotate(realR);
        };
        ComFloat.prototype.yoyoAlpha = function () {
            var data = this.data;
            if (data.isAllAlpha) {
                return;
            }
            if (data.alphaMax == data.alphaMin) {
                return;
            }
            var float = this.float;
            var diffA = data.alphaDiff;
            var realA = float.alpha + diffA * this.alphaDir;
            if (realA < data.alphaMin || realA >= data.alphaMax) {
                this.alphaDir *= -1;
                diffA *= this.alphaDir;
                realA = float.alpha + diffA;
            }
            float.alpha = realA;
        };
        ComFloat.prototype.yoyoScale = function () {
            var data = this.data;
            if (data.scaleMax == data.scaleMin) {
                return;
            }
            var float = this.float;
            var diffS = data.scaleDiff;
            var realS = float.scaleX + diffS * this.scaleDir;
            if (realS < data.scaleMin || realS > data.scaleMax) {
                this.scaleDir *= -1;
                diffS *= this.scaleDir;
                realS = float.scaleX + diffS;
            }
            float.scaleX = float.scaleY = realS;
        };
        /** 设置or获取漂浮物死亡状态 */
        ComFloat.prototype.die = function (die) {
            if (die !== void 0) {
                this._die = die;
            }
            else {
                return this._die;
            }
        };
        /** 设置or获取漂浮物出生方向 */
        ComFloat.prototype.dire = function (dire) {
            if (dire !== void 0) {
                this._dire = dire;
            }
            else {
                return this._dire;
            }
        };
        return ComFloat;
    }(com.ComFile));
    com.ComFloat = ComFloat;
    __reflect(ComFloat.prototype, "com.ComFloat");
})(com || (com = {}));
//# sourceMappingURL=ComFloat.js.map