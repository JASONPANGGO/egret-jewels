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
     * 冒泡组件
     */
    var ComBubble = (function (_super) {
        __extends(ComBubble, _super);
        function ComBubble() {
            var _this = _super.call(this) || this;
            _this.skinName = skins.ComBubble;
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args 构建传参会通过init()传过去
         */
        ComBubble.prototype.init = function (source, _cfg) {
            // console.info("init", ...args);
            this.word.source = source;
            if (!_cfg) {
                _cfg = {};
            }
            _cfg.paddingX = _cfg.paddingX != void 0 ? _cfg.paddingX : 25;
            _cfg.paddingY = _cfg.paddingY != void 0 ? _cfg.paddingY : 18;
            _cfg.arrowDiffX = _cfg.arrowDiffX != void 0 ? _cfg.arrowDiffX : 148;
            _cfg.arrowDiffY = _cfg.arrowDiffY != void 0 ? _cfg.arrowDiffY : 20;
            _cfg.arrowDir = _cfg.arrowDir != void 0 ? _cfg.arrowDir : gConst.direction.LEFT_BOTTOM;
            this.cfg = _cfg;
        };
        /** 首次创建组件时调用 */
        ComBubble.prototype.load = function () {
            // console.info("load");
            var con = this.con;
            var conWord = this.conWord;
            var bgDebug = this.bgDebug;
            var bgWord = this.bgWord;
            var word = this.word;
            var cfg = this.cfg;
            var paddingX = cfg.paddingX;
            var paddingY = cfg.paddingY;
            var arrowDiffY = cfg.arrowDiffY;
            var arrowDir = cfg.arrowDir;
            gComMgr.setObjSize(word);
            var conW = word.width + paddingX * 2;
            var conH = word.height + paddingY * 2;
            bgWord.width = conW;
            bgWord.height = conH + arrowDiffY;
            bgWord.anchorOffsetX = bgWord.width / 2;
            bgWord.y = bgWord.anchorOffsetY = (bgWord.height - arrowDiffY) / 2;
            var initS = bgWord.scaleX;
            var rotation = 0;
            var scaleX = 1;
            var anchorX = cfg.arrowDiffX;
            var anchorY = cfg.arrowDiffY;
            switch (arrowDir) {
                case gConst.direction.LEFT_TOP:
                    rotation = 180;
                    scaleX = -1;
                    anchorX = conW - anchorX;
                    anchorY *= -1;
                    break;
                case gConst.direction.RIGHT_TOP:
                    rotation = 180;
                    anchorY *= -1;
                    break;
                case gConst.direction.LEFT_BOTTOM:
                    anchorX = conW - anchorX;
                    anchorY += conH;
                    break;
                case gConst.direction.RIGHT_BOTTOM:
                    scaleX = -1;
                    anchorY += conH;
                    break;
            }
            bgWord.rotation = rotation;
            bgWord.scaleX = initS * scaleX;
            conWord.width = conW;
            conWord.height = conH;
            conWord.x = conWord.anchorOffsetX = anchorX;
            conWord.y = conWord.anchorOffsetY = anchorY;
            gComMgr.setObjSize(conWord, true);
            gComMgr.setObjSize(con, true);
            //Debug
            bgDebug.width = conW;
            bgDebug.height = conH + arrowDiffY;
            bgDebug.anchorOffsetX = bgDebug.width / 2;
            bgDebug.y = bgDebug.anchorOffsetY = (bgDebug.height - arrowDiffY) / 2;
            bgDebug.rotation = bgWord.rotation + 180; //Debug模式，方向相反
            bgDebug.visible = gConst.debugModel;
        };
        /** 每次创建组件都会调用 */
        ComBubble.prototype.start = function () {
            // console.info("start");
            var conWord = this.conWord;
            conWord.visible = false;
        };
        /** 每次结束组件都会调用 */
        ComBubble.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听组件，每帧都会调用 */
        ComBubble.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        ComBubble.prototype.addEvent = function () {
            // console.info("addEvent");
        };
        /** 移除事件 */
        ComBubble.prototype.removeEvent = function () {
            // console.info("removeEvent");
        };
        /** 窗口大小改变时调用 */
        ComBubble.prototype.resizeView = function (event) {
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
        ComBubble.prototype.rotateView = function (event) {
            // console.info("rotateView", event, GameMgr.screenType, GameMgr.mobileType);
            if (GameMgr.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        ComBubble.prototype.showBubble = function (duration, floatBubble) {
            if (duration === void 0) { duration = 500; }
            if (floatBubble === void 0) { floatBubble = { isFloat: true }; }
            if (this.showBubbled) {
                this.hideBubble(void 0, this.showBubble, this);
            }
            else {
                var conWord = this.conWord;
                // egret.setTimeout(() => {
                // gSoundMgr.playEff("sm_tanchu");
                // }, this, 200);
                this.showBubbled = true;
                // gTween.toLeftShow(conWord, 500, 0, 1, egret.Ease.backOut);
                gTween.showBubble(conWord, duration, { orgS: 1, orgA: 1 }, void 0, void 0, void 0, floatBubble);
            }
        };
        ComBubble.prototype.hideBubble = function (duration, callback, thisObj) {
            if (duration === void 0) { duration = 300; }
            if (!this.showBubbled) {
                return;
            }
            var conWord = this.conWord;
            this.showBubbled = false;
            // gTween.toRightHide(conWord, 300, 1, 1, void 0, void 0, {
            // 	callback: callback,
            // 	thisObj: thisObj
            // });
            gTween.hideBubble(conWord, duration, { orgS: 1, orgA: 1 }, callback, thisObj);
        };
        return ComBubble;
    }(com.ComFile));
    com.ComBubble = ComBubble;
    __reflect(ComBubble.prototype, "com.ComBubble");
})(com || (com = {}));
//# sourceMappingURL=ComBubble.js.map