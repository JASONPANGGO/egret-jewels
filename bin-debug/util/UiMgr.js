var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var util;
(function (util) {
    /**
     * Ui管理器
     */
    var UiMgr = (function () {
        function UiMgr() {
            this.uiFilePool = {}; //Ui界面池
        }
        /**
         * 创建界面
         * @param {string|ui.UiFile|ui.UiFileBase} UiFile 文件类名
         */
        UiMgr.prototype.create = function (UiFile) {
            if (typeof (UiFile) === "string") {
                return this.UiFileEmpty;
            }
            var className = gDevelop.classToString(UiFile);
            if (!ui[className]) {
                return this.UiFileEmpty;
            }
            else {
                var uiFile = this.getByClassName(className);
                if (!uiFile) {
                    uiFile = new ui[className]();
                    uiFile.className = className;
                    this.uiFilePool[className] = uiFile;
                }
                return uiFile;
            }
        };
        /**
         * 获取界面
         * @param {ui.UiFile|ui.UiFileBase} UiFile 文件类名
         */
        UiMgr.prototype.get = function (UiFile) {
            var className = gDevelop.classToString(UiFile);
            if (!ui[className]) {
                return;
            }
            else {
                return this.uiFilePool[className];
            }
        };
        /**
         * 通过className获取界面
         * @param {string} className 文件类名
         */
        UiMgr.prototype.getByClassName = function (className) {
            return this.uiFilePool[className];
        };
        /**
         * 销毁界面
         * @param {string} className 文件类名
         */
        UiMgr.prototype.destroy = function (className) {
            this.uiFilePool[className] = null;
        };
        Object.defineProperty(UiMgr.prototype, "UiFileEmpty", {
            /**
             * 获取一个UI文件（空）
             */
            get: function () {
                if (!this.uiEmpty) {
                    this.uiEmpty = new ui.UiEmpty();
                }
                return this.uiEmpty;
            },
            enumerable: true,
            configurable: true
        });
        return UiMgr;
    }());
    util.UiMgr = UiMgr;
    __reflect(UiMgr.prototype, "util.UiMgr");
})(util || (util = {}));
//# sourceMappingURL=UiMgr.js.map