var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scene;
(function (scene) {
    /**
     * 游戏场景
     */
    var GameScene = (function (_super) {
        __extends(GameScene, _super);
        function GameScene() {
            var _this = _super.call(this) || this;
            _this.skinName = skins.GameScene;
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args open()传参会通过init()传过去
         */
        GameScene.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // console.info("init", ...args);
        };
        /** 首次打开场景时调用 */
        GameScene.prototype.load = function () {
            // console.info("load");
        };
        /** 每次打开场景都会调用 */
        GameScene.prototype.start = function () {
            // console.info("start");
            this.openFirst();
            this.openStart();
        };
        /** 每次结束场景都会调用 */
        GameScene.prototype.stop = function () {
            // console.info("stop");
        };
        /** 每帧都会调用 */
        GameScene.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        GameScene.prototype.addEvent = function () {
            // console.info("addEvent");
        };
        /** 移除事件 */
        GameScene.prototype.removeEvent = function () {
            // console.info("removeEvent");
        };
        /** 窗口大小改变时调用 */
        GameScene.prototype.resizeView = function () {
            // console.info("resizeView", this.width, this.height, GameMgr.screenType, GameMgr.mobileType);
            this.dispatchEventWith(gConst.eventType.RESIZE_VIEW);
            var baseScale = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];
            this.bg.scaleX = this.bg.scaleY = Math.max(this.width / this.bg.width, this.height / this.bg.height);
            if (GameMgr.screenType == 1 /* VERTICAL */) {
                //竖屏
                this.ui_grass.scaleX = this.ui_grass.scaleY = this.ui_con.scaleX = this.ui_con.scaleY = this.width / this.ui_con.width;
                this.ui_goals_title.rotation = this.ui_score.rotation = this.ui_steps.rotation = this.ui_con.rotation = 0;
                this.ui_goals_title.verticalCenter = NaN;
                this.ui_goals_title.top = 0;
                this.ui_goals_title.horizontalCenter = 0;
                this.ui_grass.rotation = 0;
                this.ui_grass.bottom = this.ui_con.height * this.ui_con.scaleY;
                this.main_con.horizontalCenter = 0;
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
                this.ui_grass.scaleX = this.ui_grass.scaleY = this.ui_con.scaleX = this.ui_con.scaleY = this.height / this.ui_con.width;
                this.ui_con.rotation = 90;
                this.ui_score.rotation = this.ui_steps.rotation = -90;
                this.ui_goals_title.top = NaN;
                this.ui_goals_title.rotation = -90;
                this.ui_goals_title.horizontalCenter = NaN;
                this.ui_goals_title.verticalCenter = 0;
                this.ui_goals_title.x = 0;
                this.ui_grass.bottom = 0;
                this.ui_grass.rotation = -90;
                this.main_con.horizontalCenter = -70;
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
            this.main_con.scaleX = this.main_con.scaleY = baseScale;
        };
        /** 屏幕横竖屏转换时调用 */
        GameScene.prototype.rotateView = function () {
            // console.info("GameScene.rotateView", GameMgr.screenType);
            this.dispatchEventWith(gConst.eventType.ROTATE_VIEW);
            if (GameMgr.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        /* =========== 框架结构代码-end =========== */
        /* =========== 业务代码-start =========== */
        GameScene.prototype.openStart = function () {
            this.UiStart = gUiMgr.create(ui.UiStart);
            this.UiStart.open();
        };
        return GameScene;
    }(scene.GameBase));
    scene.GameScene = GameScene;
    __reflect(GameScene.prototype, "scene.GameScene");
})(scene || (scene = {}));
//# sourceMappingURL=GameScene.js.map