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
     * UI文件（空，可作模板用）
     */
    var UiEmpty = (function (_super) {
        __extends(UiEmpty, _super);
        function UiEmpty() {
            var _this = _super.call(this) || this;
            _this.skinName = skins.UiEmpty;
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args open()传参会通过init()传过去
         */
        UiEmpty.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // console.info("init", ...args);
        };
        /** 首次打开界面时调用 */
        UiEmpty.prototype.load = function () {
            // console.info("load");
        };
        /** 每次打开界面都会调用 */
        UiEmpty.prototype.start = function () {
            // console.info("start");
        };
        /** 每次结束界面都会调用 */
        UiEmpty.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听界面，每帧都会调用 */
        UiEmpty.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        UiEmpty.prototype.addEvent = function () {
            // console.info("addEvent");
        };
        /** 移除事件 */
        UiEmpty.prototype.removeEvent = function () {
            // console.info("removeEvent");
        };
        /** 窗口大小改变时调用 */
        UiEmpty.prototype.resizeView = function () {
            // console.info("resizeView", this.width, this.height);
            // var s1: number = this.width / this.con.width;
            // var s2: number = this.height / this.con.height;
            // this.con.scaleX = this.con.scaleY = Math.max(s1, s2);
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
        UiEmpty.prototype.rotateView = function () {
            // console.info("rotateView", this.screenType);
            if (this.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        return UiEmpty;
    }(ui.UiFile));
    ui.UiEmpty = UiEmpty;
    __reflect(UiEmpty.prototype, "ui.UiEmpty");
})(ui || (ui = {}));
//# sourceMappingURL=UiEmpty.js.map