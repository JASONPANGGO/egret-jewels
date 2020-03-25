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
     * 光圈组件
     */
    var ComLight = (function (_super) {
        __extends(ComLight, _super);
        function ComLight() {
            var _this = _super.call(this) || this;
            /* =========== 框架结构代码-end =========== */
            /* =========== 业务代码-start =========== */
            _this.lightPool = [];
            _this.skinName = skins.ComLight;
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args 构建传参会通过init()传过去
         */
        ComLight.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // console.info("init", ...args);
        };
        /** 首次创建组件时调用 */
        ComLight.prototype.load = function () {
            // console.info("load");
            var con = this.con;
            var light = this.light;
            gComMgr.setItemAnchor(light);
            gComMgr.setItemAnchor(con);
            this.touchEnabled = this.touchChildren = false;
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
        };
        /** 每次创建组件都会调用 */
        ComLight.prototype.start = function () {
            var _this = this;
            // console.info("start");
            var con = this.con;
            var light = this.light;
            con.removeChildren();
            con.visible = true;
            gTween.rmTweens(con);
            this.lightPool = [light];
            var handTime = GameMgr.getConfig("handTime");
            if (handTime == void 0) {
                handTime = 500;
            }
            egret.setTimeout(function () {
                _this.addLight();
                _this.addLightDelay = egret.setInterval(_this.addLight, _this, handTime + gGuideMgr.pressT + gGuideMgr.liftT);
            }, this, gGuideMgr.delayTimer + gGuideMgr.liftT);
            // this.warn.visible = false;
            // this.showWarn();
            this.show();
        };
        /** 每次结束组件都会调用 */
        ComLight.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听组件，每帧都会调用 */
        ComLight.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        ComLight.prototype.addEvent = function () {
            // console.info("addEvent");
        };
        /** 移除事件 */
        ComLight.prototype.removeEvent = function () {
            // console.info("removeEvent");
        };
        /** 窗口大小改变时调用 */
        ComLight.prototype.resizeView = function (event) {
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
        ComLight.prototype.rotateView = function (event) {
            // console.info("rotateView", event, GameMgr.screenType, GameMgr.mobileType);
            if (GameMgr.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        ComLight.prototype.createLight = function () {
            var light;
            if (this.lightPool && this.lightPool.length > 0) {
                light = this.lightPool.shift();
            }
            else {
                light = new eui.Image(this.light.source);
            }
            gTween.rmTweens(light);
            return light;
        };
        ComLight.prototype.removeLight = function (light) {
            if (!this.lightPool) {
                this.lightPool = [];
            }
            gTween.rmTweens(light);
            gComMgr.rmObj(light);
            this.lightPool.push(light);
        };
        ComLight.prototype.addLight = function () {
            var _this = this;
            var con = this.con;
            var light = this.createLight();
            light.alpha = 0;
            light.scaleX = light.scaleY = 0;
            con.addChild(light);
            gComMgr.setItemAnchor(light);
            var scaleT = 1500;
            var alphaT = 500;
            egret.Tween.get(light).to({ alpha: 1 }, alphaT);
            egret.Tween.get(light).to({ scaleX: 3, scaleY: 3 }, scaleT);
            egret.setTimeout(function () {
                egret.Tween.get(light).to({ alpha: 0 }, alphaT).call(function () {
                    _this.removeLight(light);
                });
            }, this, scaleT - alphaT);
        };
        // private showWarn() {
        // 	gTween.toBigShow(this.warn, 300, 1, 1, egret.Ease.bounceOut, void 0, {
        // 		callback: () => {
        // 			gTween.loopFloat(this.warn, -10, 1000, 128);
        // 		}
        // 	});
        // }
        // private hideWarn() {
        // 	gTween.toSmallHide(this.warn, 300, 1, 1);
        // }
        ComLight.prototype.hide = function () {
            var _this = this;
            egret.clearInterval(this.addLightDelay);
            gTween.fadeOut(this.con, 300, 1, void 0, void 0, {
                callback: function () {
                    _super.prototype.hide.call(_this);
                }
            });
            // this.hideWarn();
        };
        return ComLight;
    }(com.ComFile));
    com.ComLight = ComLight;
    __reflect(ComLight.prototype, "com.ComLight");
})(com || (com = {}));
//# sourceMappingURL=ComLight.js.map