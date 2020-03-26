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
     * 珠宝grid组件
     */
    var ComGrid = (function (_super) {
        __extends(ComGrid, _super);
        function ComGrid() {
            var _this = _super.call(this) || this;
            _this.skinName = skins.ComGrid;
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args 构建传参会通过init()传过去
         */
        ComGrid.prototype.init = function (jewelIndex) {
            // console.info("init", ...args);
            this.jewelIndex = jewelIndex;
            this.jewel.source = 'grid' + jewelIndex + '_png';
            gComMgr.setObjSize(this.jewel, true);
            gComMgr.setObjSize(this.con, true);
            this.anchorOffsetX = this.anchorOffsetY = gConst.gridSize.WIDTH / 2;
        };
        /** 首次创建组件时调用 */
        ComGrid.prototype.load = function () {
            // console.info("load");
        };
        /** 每次创建组件都会调用 */
        ComGrid.prototype.start = function () {
            // console.info("start");
        };
        /** 每次结束组件都会调用 */
        ComGrid.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听组件，每帧都会调用 */
        ComGrid.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        ComGrid.prototype.addEvent = function () {
            // console.info("addEvent");
        };
        /** 移除事件 */
        ComGrid.prototype.removeEvent = function () {
            // console.info("removeEvent");
        };
        /** 窗口大小改变时调用 */
        ComGrid.prototype.resizeView = function (event) {
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
        ComGrid.prototype.rotateView = function (event) {
            // console.info("rotateView", event, GameMgr.screenType, GameMgr.mobileType);
            if (GameMgr.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        ComGrid.prototype.hit = function (prop) {
            if (prop)
                this.prop.source = gConst.propType[prop];
            this.partical = new com.ComParticle();
            this.partical.setData(this.parent, 'grid' + this.jewelIndex, 'grid');
            this.partical.setPos(this.x, this.y);
            this.partical.start(1000);
            gTween.toSmallHide(this, 500, 1, 1, egret.Ease.quadOut);
        };
        return ComGrid;
    }(com.ComFile));
    com.ComGrid = ComGrid;
    __reflect(ComGrid.prototype, "com.ComGrid");
})(com || (com = {}));
//# sourceMappingURL=ComGrid.js.map