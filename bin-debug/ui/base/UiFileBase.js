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
     * UI基础文件
     */
    var UiFileBase = (function (_super) {
        __extends(UiFileBase, _super);
        function UiFileBase() {
            var _this = _super.call(this) || this;
            _this.isUiFirstLimit = true; //是否受UiFirstView限制  默认为true:保证 UiFirstView 在最顶层，false: 打开放最顶层
            _this.isLoadRes = null; //是否已loadRes()资源
            _this.isFirstOpen = true; //是否第一次打开界面
            _this.screenType = null; //横竖屏类型
            _this.mobileType = null; //设备类型
            _this.classId = gAutoId.id;
            // this.className = (this as any).__proto__.__class__.split(".")[1];
            _this.isFirstOpen = true;
            return _this;
        }
        /**
         * 打开界面
         * @param {any[]} args open()传参会通过init()传过去
         */
        UiFileBase.prototype.open = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this.className === gDevelop.classToString(ui.UiFirst)) {
                GameMgr.gameScene.addChild(this);
            }
            else {
                var UiFirst_1 = gUiMgr.get(ui.UiFirst);
                if (UiFirst_1 && UiFirst_1.parent && this.isUiFirstLimit) {
                    //保证 UiFirstView 在最顶层
                    var idx = GameMgr.gameScene.getChildIndex(UiFirst_1);
                    if (this.parent === GameMgr.gameScene) {
                        idx--;
                        idx = Math.max(idx, 0);
                    }
                    GameMgr.gameScene.addChildAt(this, idx);
                }
                else {
                    GameMgr.gameScene.addChild(this);
                }
            }
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
            this.update();
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
            this.removeEvent();
            this.addEvent();
            if (this.isFirstOpen) {
                this.isFirstOpen = false;
            }
        };
        /** 关闭界面 */
        UiFileBase.prototype.close = function () {
            this.end();
            gComMgr.rmObj(this);
            this.dispatchEventWith(gConst.eventType.CLOSE);
        };
        /** 结束界面 */
        UiFileBase.prototype.end = function () {
            this.isLoadRes = false;
            GameMgr.stage.removeEventListener(egret.Event.RESIZE, this._resizeView, this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
            this.removeEvent();
            // gComMgr.rmEvent(this);
            this.stop();
        };
        /** 显示界面 */
        UiFileBase.prototype.show = function () {
            this.visible = true;
        };
        /** 隐藏界面 */
        UiFileBase.prototype.hide = function () {
            this.visible = false;
        };
        /** 销毁界面 */
        UiFileBase.prototype.destroy = function (isAim) {
            var uiFile = gUiMgr.getByClassName(this.className);
            if (uiFile) {
                uiFile.removeEventListener(egret.Event.ENTER_FRAME, uiFile.update, uiFile);
                uiFile.removeEvent();
                if (!isAim) {
                    uiFile = gComMgr.destory(uiFile);
                }
                else {
                    gComMgr.fadeOutDestory(uiFile);
                }
                gUiMgr.destroy(this.className);
                this.isLoadRes = null;
            }
        };
        /** 点击下载(用户点击下载，调用SDK函数) */
        UiFileBase.prototype.clickInstall = function (event) {
            if (event) {
                event.stopPropagation();
            }
            Mapi.install();
        };
        /** 点击重玩 */
        UiFileBase.prototype.clickReplay = function (event) {
            event.stopPropagation();
            GameMgr.replay();
        };
        /** 游戏结束(SDK上报需要) */
        UiFileBase.prototype.gameEnd = function () {
            Mapi.gameEnd();
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
        UiFileBase.prototype.createParticles = function (parent, resName, cfgName, idx, autoStart, x, y) {
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
        UiFileBase.prototype.getParticle = function (id) {
            if (!this.particleMgr) {
                return;
            }
            return this.particleMgr.getParticle(id);
        };
        /**
         * 开始播放所有粒子
         * @param {number} duration 粒子出现总时间
         */
        UiFileBase.prototype.startParticles = function (duration) {
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
        UiFileBase.prototype.startParticle = function (id, duration) {
            if (!this.particleMgr) {
                return;
            }
            this.particleMgr.startParticle(id, duration);
        };
        /**
         * 停止创建所有粒子
         * @param {boolean} clear 是否清除掉现有粒子
         */
        UiFileBase.prototype.stopParticles = function (clear) {
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
        UiFileBase.prototype.stopParticle = function (id, clear) {
            if (!this.particleMgr) {
                return;
            }
            this.particleMgr.stopParticle(id, clear);
        };
        /**
         * 设置所有粒子层级
         */
        UiFileBase.prototype.setParticlesIndex = function (idx) {
            if (!this.particleMgr) {
                return;
            }
            this.particleMgr.setParticlesIndex(idx);
        };
        /**
         * 更新所有粒子发射位置
         */
        UiFileBase.prototype.updataParticlesEmitter = function () {
            if (!this.particleMgr) {
                return;
            }
            this.particleMgr.updataParticlesEmitter();
        };
        /**
         * 设置所有粒子位置
         */
        UiFileBase.prototype.setParticlesPos = function (x, y) {
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
        UiFileBase.prototype.setMaxParticles = function (id, max) {
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
        UiFileBase.prototype.showStar = function (con, starAnswers, cfg) {
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
        UiFileBase.prototype.updateStarData = function (starAnswers, cfg) {
            if (!this.starMgr) {
                return;
            }
            this.starMgr.updateData(starAnswers, cfg);
        };
        /**
         * 隐藏闪烁物
         * @param {boolean} clearAll = true 是否清除所有
         */
        UiFileBase.prototype.hideStar = function (clearAll) {
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
        UiFileBase.prototype.showFloat = function (con, cfg) {
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
        UiFileBase.prototype.updateFloatData = function (cfg) {
            if (!this.floatMgr) {
                return;
            }
            this.floatMgr.updateData(cfg);
        };
        /**
         * 隐藏漂浮物
         * @param {boolean} clearAll = true 是否清除所有
         */
        UiFileBase.prototype.hideFloat = function (clearAll) {
            if (clearAll === void 0) { clearAll = true; }
            if (!this.floatMgr) {
                return;
            }
            this.floatMgr.hide(clearAll);
        };
        /* =========== 漂浮物代码-end =========== */
        /** 初始化窗口大小 */
        UiFileBase.prototype._initResizeView = function () {
            var winW = GameMgr.getWinW;
            var winH = GameMgr.getWinH;
            var _w; //当前窗口宽度
            var _h; //当前窗口高度
            var _r; //当前窗口宽高比
            var isRotate = this.isFirstOpen; //是否第一次打开界面，或存在转屏
            if (winW < winH) {
                //竖屏
                if (this.screenType === 0 /* HORIZONTAL */) {
                    isRotate = true;
                }
                this.screenType = 1 /* VERTICAL */;
                _w = 750 /* WIDTH */;
                _h = 750 /* WIDTH */ / winW * winH;
                _r = winW / winH;
            }
            else {
                //横屏
                if (this.screenType === 1 /* VERTICAL */) {
                    isRotate = true;
                }
                this.screenType = 0 /* HORIZONTAL */;
                _h = 750 /* WIDTH */;
                _w = 750 /* WIDTH */ / winH * winW;
                _r = winH / winW;
            }
            this.width = Math.ceil(_w);
            this.height = Math.ceil(_h);
            this.mobileType = _r < 0.51 ? 1 /* IPHONE_X */ : _r < 0.65 ? 2 /* IPHONE_8 */ : 3 /* IPAD */;
            return isRotate;
        };
        /** 窗口大小改变时调用 */
        UiFileBase.prototype._resizeView = function (event) {
            var isRotate = this._initResizeView(); //是否第一次打开界面，或存在转屏
            this.resizeView();
            this.updataParticlesEmitter();
            if (isRotate) {
                this.rotateView();
            }
        };
        return UiFileBase;
    }(eui.Component));
    ui.UiFileBase = UiFileBase;
    __reflect(UiFileBase.prototype, "ui.UiFileBase");
})(ui || (ui = {}));
//# sourceMappingURL=UiFileBase.js.map