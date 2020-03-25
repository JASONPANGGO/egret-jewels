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
     * 控件文件
     */
    var ComFile = (function (_super) {
        __extends(ComFile, _super);
        function ComFile() {
            return _super.call(this) || this;
        }
        /**
         * 初始化
         * @param {any[]} args 构建传参会通过init()传过去
         */
        ComFile.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // console.info("init", ...args);
        };
        /** 首次创建组件时调用 */
        ComFile.prototype.load = function () {
            // console.info("load");
        };
        /** 每次创建组件都会调用 */
        ComFile.prototype.start = function () {
            // console.info("start");
        };
        /** 每次结束组件都会调用 */
        ComFile.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听组件，每帧都会调用 */
        ComFile.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        ComFile.prototype.addEvent = function () {
            // console.info("addEvent");
        };
        /** 移除事件 */
        ComFile.prototype.removeEvent = function () {
            // console.info("removeEvent");
        };
        /** 窗口大小改变时调用 */
        ComFile.prototype.resizeView = function (event) {
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
        ComFile.prototype.rotateView = function (event) {
            // console.info("rotateView", event, GameMgr.screenType, GameMgr.mobileType);
            if (GameMgr.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        /** 显示组件 */
        ComFile.prototype.show = function () {
            _super.prototype.show.call(this);
        };
        /** 隐藏组件 */
        ComFile.prototype.hide = function () {
            _super.prototype.hide.call(this);
        };
        /** 销毁组件 */
        ComFile.prototype.destroy = function (isAim) {
            _super.prototype.destroy.call(this, isAim);
        };
        return ComFile;
    }(com.ComFileBase));
    com.ComFile = ComFile;
    __reflect(ComFile.prototype, "com.ComFile");
})(com || (com = {}));
//# sourceMappingURL=ComFile.js.map