var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ui;
(function (ui) {
    /**
     * 结束页面
     */
    var UiEnd = (function (_super) {
        __extends(UiEnd, _super);
        function UiEnd() {
            var _this = _super.call(this) || this;
            _this.skinName = skins.UiEnd;
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args open()传参会通过init()传过去
         */
        UiEnd.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // console.info("init", ...args);
        };
        /** 首次打开界面时调用 */
        UiEnd.prototype.load = function () {
            // console.info("load");
        };
        /** 每次打开界面都会调用 */
        UiEnd.prototype.start = function () {
            // console.info("start");
            this.enter();
        };
        /** 每次结束界面都会调用 */
        UiEnd.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听界面，每帧都会调用 */
        UiEnd.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        UiEnd.prototype.addEvent = function () {
            // console.info("addEvent");
        };
        /** 移除事件 */
        UiEnd.prototype.removeEvent = function () {
            // console.info("removeEvent");
        };
        /** 窗口大小改变时调用 */
        UiEnd.prototype.resizeView = function () {
            // console.info("resizeView", this.width, this.height);
            // var s1: number = this.width / this.con.width;
            // var s2: number = this.height / this.con.height;
            // this.con.scaleX = this.con.scaleY = Math.max(s1, s2);
            this.bg.scaleX = this.bg.scaleY = Math.max(this.width / this.bg.width, this.height / this.bg.height);
            if (this.screenType == 1 /* VERTICAL */) {
                //竖屏
                switch (this.mobileType) {
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
                switch (this.mobileType) {
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
        UiEnd.prototype.rotateView = function () {
            // console.info("rotateView", this.screenType);
            if (this.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        /* =========== 框架结构代码-end =========== */
        /* =========== 业务代码-start =========== */
        UiEnd.prototype.enter = function () {
            var _loop_1 = function (i) {
                egret.setTimeout(function () {
                    gTween.toBigShow(this['star' + i], 300, void 0, void 0, egret.Ease.backOut);
                }, this_1, i * 400);
            };
            var this_1 = this;
            for (var i = 0; i < 3; i++) {
                _loop_1(i);
            }
            this.score.text = GameMgr.gameScene.ui_score_label.text;
            this.logo.open();
            this.logo.setData([new data.McData('logo', 12, 'p_logo_{1}_png')]);
            this.logo.gotoAndPlay('logo', 1);
            gTween.loopScale(this.btn, 1.2, 400);
        };
        return UiEnd;
    }(ui.UiFile));
    ui.UiEnd = UiEnd;
    __reflect(UiEnd.prototype, "ui.UiEnd");
})(ui || (ui = {}));
//# sourceMappingURL=UiEnd.js.map