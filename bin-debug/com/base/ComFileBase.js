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
     * 控件基础文件
     */
    var ComFileBase = (function (_super) {
        __extends(ComFileBase, _super);
        /**
         * 构建组件
         */
        function ComFileBase() {
            var _this = _super.call(this) || this;
            _this.isLoadRes = null; //是否已loadRes()资源
            _this.isFirstOpen = true; //是否第一次创建组件
            _this.classId = gAutoId.id;
            _this.className = _this.__proto__.__class__.split(".")[1];
            _this.isFirstOpen = true;
            return _this;
        }
        /**
         * 打开组件
         * @param {any[]} args open()传参会通过init()传过去
         */
        ComFileBase.prototype.open = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.init.apply(this, args);
            if (!this.isLoadRes) {
                this.isLoadRes = true;
                this.load();
            }
            this._resizeView();
            GameMgr.gameScene.removeEventListener(gConst.eventType.RESIZE_VIEW, this._resizeView, this);
            GameMgr.gameScene.addEventListener(gConst.eventType.RESIZE_VIEW, this._resizeView, this);
            this._rotateView();
            GameMgr.gameScene.removeEventListener(gConst.eventType.ROTATE_VIEW, this._rotateView, this);
            GameMgr.gameScene.addEventListener(gConst.eventType.ROTATE_VIEW, this._rotateView, this);
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
        /** 关闭组件 */
        ComFileBase.prototype.close = function () {
            this.end();
            gComMgr.rmObj(this);
            this.dispatchEventWith(gConst.eventType.CLOSE);
        };
        /** 结束组件 */
        ComFileBase.prototype.end = function () {
            this.isLoadRes = false;
            GameMgr.gameScene.removeEventListener(gConst.eventType.RESIZE_VIEW, this._resizeView, this);
            GameMgr.gameScene.removeEventListener(gConst.eventType.ROTATE_VIEW, this._rotateView, this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
            this.removeEvent();
            // gComMgr.rmEvent(this);
            this.stop();
        };
        /** 显示组件 */
        ComFileBase.prototype.show = function () {
            this.visible = true;
        };
        /** 隐藏组件 */
        ComFileBase.prototype.hide = function () {
            this.visible = false;
        };
        /** 销毁组件 */
        ComFileBase.prototype.destroy = function (isAim) {
            GameMgr.gameScene.removeEventListener(gConst.eventType.RESIZE_VIEW, this.resizeView, this);
            GameMgr.gameScene.removeEventListener(gConst.eventType.ROTATE_VIEW, this.rotateView, this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
            this.removeEvent();
            this.isFirstOpen = false;
            if (!isAim) {
                gComMgr.destory(this);
            }
            else {
                gComMgr.fadeOutDestory(this);
            }
        };
        /** 点击下载(用户点击下载，调用SDK函数) */
        ComFileBase.prototype.clickInstall = function (event) {
            if (event) {
                event.stopPropagation();
            }
            Mapi.install();
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
        ComFileBase.prototype.createParticles = function (parent, resName, cfgName, idx, autoStart, x, y) {
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
        ComFileBase.prototype.getParticle = function (id) {
            if (!this.particleMgr) {
                return;
            }
            return this.particleMgr.getParticle(id);
        };
        /**
         * 开始播放所有粒子
         * @param {number} duration 粒子出现总时间
         */
        ComFileBase.prototype.startParticles = function (duration) {
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
        ComFileBase.prototype.startParticle = function (id, duration) {
            if (!this.particleMgr) {
                return;
            }
            this.particleMgr.startParticle(id, duration);
        };
        /**
         * 停止创建所有粒子
         * @param {boolean} clear 是否清除掉现有粒子
         */
        ComFileBase.prototype.stopParticles = function (clear) {
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
        ComFileBase.prototype.stopParticle = function (id, clear) {
            if (!this.particleMgr) {
                return;
            }
            this.particleMgr.stopParticle(id, clear);
        };
        /**
         * 设置所有粒子层级
         */
        ComFileBase.prototype.setParticlesIndex = function (idx) {
            if (!this.particleMgr) {
                return;
            }
            this.particleMgr.setParticlesIndex(idx);
        };
        /**
         * 更新所有粒子发射位置
         */
        ComFileBase.prototype.updataParticlesEmitter = function () {
            if (!this.particleMgr) {
                return;
            }
            this.particleMgr.updataParticlesEmitter();
        };
        /**
         * 设置所有粒子位置
         */
        ComFileBase.prototype.setParticlesPos = function (x, y) {
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
        ComFileBase.prototype.setMaxParticles = function (id, max) {
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
        ComFileBase.prototype.showStar = function (con, starAnswers, cfg) {
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
        ComFileBase.prototype.updateStarData = function (starAnswers, cfg) {
            if (!this.starMgr) {
                return;
            }
            this.starMgr.updateData(starAnswers, cfg);
        };
        /**
         * 隐藏闪烁物
         * @param {boolean} clearAll = true 是否清除所有
         */
        ComFileBase.prototype.hideStar = function (clearAll) {
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
        ComFileBase.prototype.showFloat = function (con, cfg) {
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
        ComFileBase.prototype.updateFloatData = function (cfg) {
            if (!this.floatMgr) {
                return;
            }
            this.floatMgr.updateData(cfg);
        };
        /**
         * 隐藏漂浮物
         * @param {boolean} clearAll = true 是否清除所有
         */
        ComFileBase.prototype.hideFloat = function (clearAll) {
            if (clearAll === void 0) { clearAll = true; }
            if (!this.floatMgr) {
                return;
            }
            this.floatMgr.hide(clearAll);
        };
        /* =========== 漂浮物代码-end =========== */
        /** 窗口大小改变时调用 */
        ComFileBase.prototype._resizeView = function (event) {
            this.resizeView(event);
            this.updataParticlesEmitter();
        };
        /** 屏幕横竖屏转换时调用 */
        ComFileBase.prototype._rotateView = function (event) {
            this.rotateView(event);
        };
        return ComFileBase;
    }(eui.Component));
    com.ComFileBase = ComFileBase;
    __reflect(ComFileBase.prototype, "com.ComFileBase");
})(com || (com = {}));
//# sourceMappingURL=ComFileBase.js.map