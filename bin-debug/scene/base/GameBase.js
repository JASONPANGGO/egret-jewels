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
     * 游戏场景基础文件
     */
    var GameBase = (function (_super) {
        __extends(GameBase, _super);
        function GameBase() {
            var _this = _super.call(this) || this;
            _this.isLoadRes = null; //是否已loadRes()资源
            _this.isFirstOpen = true; //是否第一次打开界面
            _this.screenType = null; //横竖屏类型
            _this.mobileType = null; //设备类型
            _this.firstTouch = null; //首次触摸
            _this.classId = gAutoId.id;
            // this.className = (this as any).__proto__.__class__.split(".")[1];
            _this.isFirstOpen = true;
            return _this;
        }
        /**
         * 打开界面
         * @param {any[]} args open()传参会通过init()传过去
         */
        GameBase.prototype.open = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var main = GameMgr.main;
            main.addChild(GameMgr.gameScene);
            this.init.apply(this, args);
            if (this.isFirstOpen) {
                this._initResizeView();
            }
            if (!this.isLoadRes) {
                this.isLoadRes = true;
                this.load();
            }
            this._resizeView();
            GameMgr.stage.removeEventListener(egret.Event.RESIZE, this._resizeView, this);
            GameMgr.stage.addEventListener(egret.Event.RESIZE, this._resizeView, this);
            this.start();
            this._update();
            this.removeEventListener(egret.Event.ENTER_FRAME, this._update, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this._update, this);
            this.removeEvent();
            this.addEvent();
            if (this.isFirstOpen) {
                this.isFirstOpen = false;
            }
        };
        /** 关闭界面 */
        GameBase.prototype.close = function () {
            this.end();
            gComMgr.rmObj(this);
            this.dispatchEventWith(gConst.eventType.CLOSE);
        };
        /** 结束界面 */
        GameBase.prototype.end = function () {
            this.isLoadRes = false;
            GameMgr.stage.removeEventListener(egret.Event.RESIZE, this._resizeView, this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this._update, this);
            this.removeEvent();
            gComMgr.rmEvent(this);
            this.stop();
        };
        /** 显示界面 */
        GameBase.prototype.show = function () {
            this.visible = true;
        };
        /** 隐藏界面 */
        GameBase.prototype.hide = function () {
            this.visible = false;
        };
        /** 点击重玩 */
        GameBase.prototype.clickReplay = function (event) {
            event.stopPropagation();
            GameMgr.replay();
        };
        /** 游戏结束(SDK上报需要) */
        GameBase.prototype.gameEnd = function () {
            Mapi.gameEnd();
            // GameMgr.isEnd = true;
            this.UiFirst.updateDir({
                horDir: gConst.direction.RIGHT_TOP,
                verDir: gConst.direction.CENTER_TOP
            }, {
                horDir: gConst.direction.RIGHT_TOP,
                verDir: gConst.direction.CENTER_BOTTOM
            });
            this.UiFirst.gameEnd();
        };
        /** 重玩游戏 */
        GameBase.prototype.replay = function () {
            this.destroy();
            GameMgr.init();
            GameMgr.gameScene = new scene.GameScene();
            GameMgr.gameScene.open();
            if (this.parent) {
                this.parent.addChild(GameMgr.gameScene);
                this.parent.removeChild(this);
            }
            Mapi.gameRetry();
        };
        /** 销毁 */
        GameBase.prototype.destroy = function () {
            if (this.UiFirst) {
                this.UiFirst.destroy();
            }
            this.removeEvent();
            this.isLoadRes = null;
        };
        /** 点击下载(用户点击下载，调用SDK函数) */
        GameBase.prototype.clickInstall = function (event) {
            if (event) {
                event.stopPropagation();
            }
            Mapi.install();
        };
        /** 自动结束 */
        GameBase.prototype.autoEnd = function () {
            var autoEndTime = GameMgr.getConfig("autoEndTime");
            if (autoEndTime != void 0 && autoEndTime > 0) {
                egret.clearTimeout(this.endDelay);
                this.endDelay = egret.setTimeout(this.openEnd, this, autoEndTime * 1000);
            }
        };
        /**
         * 创建所有粒子
         * @param {egret.DisplayObjectContainer} parent 粒子父级
         * @param {string[]} resName 粒子资源名称组
         * @param {string} cfgName 粒子配置名称
         * @param {number} idx 粒子层级
         * @param {boolean} autoStart = true 粒子自动开始播放
         * @param {number} x = 0 粒子X坐标
         * @param {number} y = 0 粒子Y坐标
         * @returns {number} 当前粒子ID
         */
        GameBase.prototype.createParticles = function (parent, resName, cfgName, idx, autoStart, x, y) {
            if (autoStart === void 0) { autoStart = true; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (!this.particleMgr) {
                this.particleMgr = new util.ParticleMgr(this);
            }
            return this.particleMgr.createParticles(parent, resName, cfgName, idx, autoStart, x, y);
        };
        /**
         * 获取粒子
         * @param {number} id 粒子ID
         */
        GameBase.prototype.getParticle = function (id) {
            if (!this.particleMgr) {
                return;
            }
            return this.particleMgr.getParticle(id);
        };
        /**
         * 开始播放所有粒子
         * @param {number} duration 粒子出现总时间
         */
        GameBase.prototype.startParticles = function (duration) {
            if (!this.particleMgr) {
                return;
            }
            this.particleMgr.startParticles(duration);
        };
        /**
         * 开始播放粒子
         * @param {number} id 当前粒子ID
         * @param {number} duration 粒子出现总时间
         */
        GameBase.prototype.startParticle = function (id, duration) {
            if (!this.particleMgr) {
                return;
            }
            this.particleMgr.startParticle(id, duration);
        };
        /**
         * 停止创建所有粒子
         * @param {boolean} clear 是否清除掉现有粒子
         */
        GameBase.prototype.stopParticles = function (clear) {
            if (!this.particleMgr) {
                return;
            }
            this.particleMgr.stopParticles(clear);
        };
        /**
         * 停止创建粒子
         * @param {number} id 当前粒子ID
         * @param {boolean} clear 是否清除掉现有粒子
         */
        GameBase.prototype.stopParticle = function (id, clear) {
            if (!this.particleMgr) {
                return;
            }
            this.particleMgr.stopParticle(id, clear);
        };
        /**
         * 设置所有粒子层级
         */
        GameBase.prototype.setParticlesIndex = function (idx) {
            if (!this.particleMgr) {
                return;
            }
            this.particleMgr.setParticlesIndex(idx);
        };
        /**
         * 更新所有粒子发射位置
         */
        GameBase.prototype.updataParticlesEmitter = function () {
            if (!this.particleMgr) {
                return;
            }
            this.particleMgr.updataParticlesEmitter();
        };
        /**
         * 设置所有粒子位置
         */
        GameBase.prototype.setParticlesPos = function (x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (!this.particleMgr) {
                return;
            }
            this.particleMgr.setParticlesPos(x, y);
        };
        /**
         * 设置所有粒子系统最大粒子数，超过该数量将不会继续创建粒子，取值范围[1,Number.MAX_VALUE]
         * @param {number} id 当前粒子ID
         */
        GameBase.prototype.setMaxParticles = function (id, max) {
            if (!this.particleMgr) {
                return;
            }
            this.particleMgr.setMaxParticles(id, max);
        };
        /**
         * 显示闪烁物
         * @param {egret.DisplayObjectContainer} con 闪烁物容器
         * @param {string[]} starAnswers 闪烁物资源名称配置
         * @param {number} cfg.intervalMax 下次显示闪烁物，时间间隔范围，最大值
         * @param {number} cfg.intervalMin 下次显示闪烁物，时间间隔范围，最小值
         * @param {number} cfg.scaleMax 闪烁物缩放值范围，最大值
         * @param {number} cfg.scaleMin 闪烁物缩放值范围，最小值
         * @param {boolean} cfg.isRotate 闪烁物是否旋转
         * @param {boolean} cfg.isAdaptiveScale 闪烁物是否自适应父级缩放
         * @param {number} cfg.starMaxCnt 闪烁物是否自适应父级缩放
         */
        GameBase.prototype.showStar = function (con, starAnswers, cfg) {
            if (!this.starMgr) {
                this.starMgr = new util.StarMgr(con);
            }
            this.starMgr.show(starAnswers, cfg);
        };
        /**
         * 更新闪烁物数据
         * @param {string[]} starAnswers 闪烁物资源名称配置
         * @param {number} cfg.intervalMax 下次显示闪烁物，时间间隔范围，最大值
         * @param {number} cfg.intervalMin 下次显示闪烁物，时间间隔范围，最小值
         * @param {number} cfg.scaleMax 闪烁物缩放值范围，最大值
         * @param {number} cfg.scaleMin 闪烁物缩放值范围，最小值
         * @param {boolean} cfg.isRotate 闪烁物是否旋转
         * @param {boolean} cfg.isAdaptiveScale 闪烁物是否自适应父级缩放
         * @param {number} cfg.starMaxCnt 闪烁物是否自适应父级缩放
         */
        GameBase.prototype.updateStarData = function (starAnswers, cfg) {
            if (!this.starMgr) {
                return;
            }
            this.starMgr.updateData(starAnswers, cfg);
        };
        /**
         * 隐藏闪烁物
         * @param {boolean} clearAll = true 是否清除所有
         */
        GameBase.prototype.hideStar = function (clearAll) {
            if (clearAll === void 0) { clearAll = true; }
            if (!this.starMgr) {
                return;
            }
            this.starMgr.hide(clearAll);
        };
        /**
         * 显示漂浮物
         * @param {egret.DisplayObjectContainer} con 漂浮物容器
         * @param {...} cfg 漂浮物数据
         */
        GameBase.prototype.showFloat = function (con, cfg) {
            if (!this.floatMgr) {
                this.floatMgr = new util.FloatMgr(con);
            }
            this.floatMgr.show(cfg);
        };
        /**
         * 更新漂浮物数据
         * @param {...} cfg 漂浮物数据
         * @param {boolean} isInitDefault = true 是否初始化默认值
         */
        GameBase.prototype.updateFloatData = function (cfg) {
            if (!this.floatMgr) {
                return;
            }
            this.floatMgr.updateData(cfg);
        };
        /**
         * 隐藏漂浮物
         * @param {boolean} clearAll = true 是否清除所有
         */
        GameBase.prototype.hideFloat = function (clearAll) {
            if (clearAll === void 0) { clearAll = true; }
            if (!this.floatMgr) {
                return;
            }
            this.floatMgr.hide(clearAll);
        };
        /* =========== 漂浮物代码-end =========== */
        /* =========== 业务代码-start =========== */
        /** 打开顶层页面 */
        GameBase.prototype.openFirst = function () {
            this.UiFirst = gUiMgr.create(ui.UiFirst);
            this.UiFirst.open({
                horDir: gConst.direction.RIGHT_CENTER,
                verDir: gConst.direction.CENTER_TOP
            }, {
                horDir: gConst.direction.RIGHT_CENTER,
                verDir: gConst.direction.CENTER_TOP
            });
        };
        /** 关闭顶层页面 */
        GameBase.prototype.closeFirst = function () {
            if (!this.UiFirst) {
                return;
            }
            this.UiFirst.close();
        };
        /** 打开结束界面 */
        GameBase.prototype.openEnd = function (isShowEnd) {
            if (isShowEnd === void 0) { isShowEnd = true; }
            // console.info("openEnd");
            egret.clearTimeout(this.endDelay);
            if (GameMgr.isEnd) {
                return;
            }
            GameMgr.isEnd = true;
            this.hideGuide();
            this.removeEvent();
            Mapi.gameEnd();
            if (isShowEnd) {
                this.showEnd();
            }
        };
        /** 显示结束界面 */
        GameBase.prototype.showEnd = function () {
            this.gameEnd();
            this.UiEnd = gUiMgr.create(ui.UiEnd);
            this.UiEnd.open();
            this.showEndOther();
        };
        /** 结束界面其它元素展示 */
        GameBase.prototype.showEndOther = function () {
            // console.info("showEndOther");
            // if (!this.UiEnd) {
            // 	return;
            // }
            // this.UiEnd.showOther();
        };
        /** 关闭结束界面 */
        GameBase.prototype.closeEnd = function () {
            // if (!this.UiEnd) {
            // 	return;
            // }
            // this.UiEnd.close();
        };
        /** 显示引导 */
        GameBase.prototype.showGuide = function () {
            if (GameMgr.isEnd) {
                return;
            }
            if (this.showGuided) {
                return;
            }
            this.showGuided = true;
            if (!this.guide) {
                this.guide = new com.ComGuide();
                this.guide.open();
            }
            var time = this.firstTouch ? gConst.firstGuideTimer : gConst.afterGuideTimer;
            // this.guide.setData(time, { target1: this.item }, this);
            // this.guide.play();
        };
        /** 隐藏引导 */
        GameBase.prototype.hideGuide = function () {
            this.firstTouch = false;
            if (!this.guide) {
                return;
            }
            if (!this.showGuided) {
                return;
            }
            this.showGuided = false;
            this.guide.over();
        };
        /* =========== 业务代码-end =========== */
        GameBase.prototype._update = function (event) {
            var winW = GameMgr.getWinW;
            if (this.curW != winW) {
                this._resizeView();
            }
            this.update();
        };
        /**
         * 初始化窗口大小
         * @param {boolean} rotate = void 0 是否转屏
         */
        GameBase.prototype._initResizeView = function (rotate) {
            var winW = GameMgr.getWinW;
            var winH = GameMgr.getWinH;
            var isRotate = GameMgr.screenType === null || rotate; //是否转屏
            var _r; //当前窗口宽高比
            if (GameMgr.stage.stageWidth < GameMgr.stage.stageHeight) {
                //竖屏
                if (GameMgr.screenType === 0 /* HORIZONTAL */) {
                    isRotate = true;
                }
                GameMgr.screenType = 1 /* VERTICAL */;
                GameMgr.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
                _r = GameMgr.stage.stageWidth / GameMgr.stage.stageHeight;
            }
            else {
                //横屏
                if (GameMgr.screenType === 1 /* VERTICAL */) {
                    isRotate = true;
                }
                GameMgr.screenType = 0 /* HORIZONTAL */;
                GameMgr.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
                _r = GameMgr.stage.stageHeight / GameMgr.stage.stageWidth;
            }
            GameMgr.mobileType = _r < 0.51 ? 1 /* IPHONE_X */ : _r < 0.65 ? 2 /* IPHONE_8 */ : 3 /* IPAD */;
            this.curW = winW;
            var _w;
            var _h;
            if (winW > winH) {
                _h = 750 /* WIDTH */;
                _w = 750 /* WIDTH */ / winH * winW;
                GameMgr.stage.orientation = egret.OrientationMode.LANDSCAPE;
            }
            else {
                _w = 750 /* WIDTH */;
                _h = 750 /* WIDTH */ / winW * winH;
                GameMgr.stage.orientation = egret.OrientationMode.PORTRAIT;
            }
            if (GameMgr.gameScene) {
                GameMgr.gameScene.width = Math.ceil(_w);
                GameMgr.gameScene.height = Math.ceil(_h);
            }
            GameMgr.scale = 1;
            return isRotate;
        };
        /** 窗口大小改变时调用 */
        GameBase.prototype._resizeView = function (event) {
            var isRotate = this._initResizeView(); //是否第一次打开界面，或存在转屏
            this.resizeView();
            this.updataParticlesEmitter();
            if (isRotate) {
                this.rotateView();
            }
        };
        return GameBase;
    }(eui.Component));
    scene.GameBase = GameBase;
    __reflect(GameBase.prototype, "scene.GameBase");
})(scene || (scene = {}));
//# sourceMappingURL=GameBase.js.map