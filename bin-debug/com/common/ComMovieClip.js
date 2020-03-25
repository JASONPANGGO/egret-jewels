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
     * 动画组件
     */
    var ComMovieClip = (function (_super) {
        __extends(ComMovieClip, _super);
        /**
         * 构造动画对象
         */
        function ComMovieClip() {
            var _this = _super.call(this) || this;
            _this.interval = 40; //播放间隔
            /** 播放次数 -1为循环播放 */
            _this.playTime = -1;
            _this.isplay = false; //是否继续播放
            _this.backToFirst = true; //播放完成后是否回到第一帧
            _this.isReverse = false;
            _this.skinName = skins.ComEmpty;
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args 构建传参会通过init()传过去
         */
        ComMovieClip.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // console.info("init", ...args);
        };
        /** 首次创建组件时调用 */
        ComMovieClip.prototype.load = function () {
            // console.info("load");
            this.bm = new eui.Image();
            this.addChild(this.bm);
            // this.pixelHitTest(true);
        };
        /** 每次创建组件都会调用 */
        ComMovieClip.prototype.start = function () {
            // console.info("start");
        };
        /** 每次结束组件都会调用 */
        ComMovieClip.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听组件，每帧都会调用 */
        ComMovieClip.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        ComMovieClip.prototype.addEvent = function () {
            // console.info("addEvent");
        };
        /** 移除事件 */
        ComMovieClip.prototype.removeEvent = function () {
            // console.info("removeEvent");
        };
        /** 窗口大小改变时调用 */
        ComMovieClip.prototype.resizeView = function (event) {
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
        ComMovieClip.prototype.rotateView = function (event) {
            // console.info("rotateView", event, GameMgr.screenType, GameMgr.mobileType);
            if (GameMgr.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        /* =========== 框架结构代码-end =========== */
        /* =========== 业务代码-start =========== */
        /**
         * 设置动画数据
         * @param {data.McData[]} ob 动画数据列表，可传多组动画
         * @param {number} anchorOffsetX 动画图片锚点X轴
         * @param {number} anchorOffsetY 动画图片锚点Y轴
         */
        ComMovieClip.prototype.setData = function (ob, anchorOffsetX, anchorOffsetY) {
            if (anchorOffsetX === void 0) { anchorOffsetX = 0; }
            if (anchorOffsetY === void 0) { anchorOffsetY = 0; }
            this.list = ob;
            this.bm.anchorOffsetX = anchorOffsetX;
            this.bm.anchorOffsetY = anchorOffsetY;
        };
        /**
         * 获取总帧数
         */
        ComMovieClip.prototype.frameCnt = function () {
            if (this.currentData.order && this.currentData.order.length > 0) {
                return this.currentData.order.length;
            }
            else {
                return this.currentData.frameCnt;
            }
        };
        ComMovieClip.prototype.getCurIndex = function () {
            return this.frameIndex;
        };
        /** 根据当前帧，获取对应的帧数 */
        ComMovieClip.prototype.getFrameIndexCnt = function () {
            if (this.currentData.order && this.currentData.order.length > 0) {
                return this.currentData.order[this.frameIndex - 1];
            }
            else {
                return this.frameIndex + this.currentData.firstIndex - 1;
            }
        };
        /** 根据当前帧，获取对应名称里的帧数 */
        ComMovieClip.prototype.getFrameIndexName = function () {
            var index = this.getFrameIndexCnt();
            return gMath.switchNum(index, false, this.currentData.minBit);
        };
        /**
         * 获取当前帧对应纹理名称
         */
        ComMovieClip.prototype.picName = function () {
            var searchIdx = this.currentData.frameName.indexOf("{1}");
            if (searchIdx > -1) {
                return this.currentData.frameName.replace("{1}", this.getFrameIndexName());
            }
            else {
                return this.currentData.frameName;
            }
        };
        /**
         * 开启精准碰撞
         * @param {boolean} pixelHitTest 是否开启精准碰撞
         */
        ComMovieClip.prototype.pixelHitTest = function (pixelHitTest) {
            this.bm.pixelHitTest = pixelHitTest;
        };
        /**
         * 停留在指定动作的某一帧
         * @param {string} fName 动作名称
         * @param {number} frameIndex 指定帧, 默认 1
         */
        ComMovieClip.prototype.gotoAndStop = function (fName, frameIndex) {
            if (frameIndex === void 0) { frameIndex = 1; }
            if (this.isplay) {
                this.isplay = false;
                this.removeEventListener(egret.Event.ENTER_FRAME, this._update, this);
            }
            this.currentFrameName = fName;
            this.currentData = this.getMcDataByAction(fName);
            this.frameIndex = frameIndex;
            if (this.currentData) {
                this.bm.source = this.picName();
            }
        };
        /**
         * 销毁
         */
        ComMovieClip.prototype.dispose = function () {
            this.pause();
            if (this.parent) {
                this.parent.removeChild(this);
            }
            this.removeChildren();
            this.list = null;
        };
        /**
         * 反向播放
         * @param {string} fName 动作名称
         * @param {number} playTime = -1 播放次数
         */
        ComMovieClip.prototype.gotoAndReverse = function (fName, playTime) {
            if (playTime === void 0) { playTime = -1; }
            this.isReverse = true;
            this.currentFrameName = fName;
            this.playTime = playTime;
            this.currentData = this.getMcDataByAction(fName);
            if (this.currentData) {
                this.nextUpdateTime = egret.getTimer() + this.interval;
                this.currentData.direct = -1;
                this.frameIndex = this.frameCnt();
                // console.log("this.frameIndex:" + this.frameIndex);
                this.bm.source = this.picName();
                if (!this.isplay) {
                    this.isplay = true;
                    this.addEventListener(egret.Event.ENTER_FRAME, this._update, this);
                }
            }
        };
        /**
         * 正向播放
         * @param {string} fName 动作名称
         * @param {number} playTime = -1 播放次数
         * @param {number} frameIndex = 1 从指定帧开始播放
         * @param {boolean} backToFirst = true 播放完成后是否回到第一帧
         */
        ComMovieClip.prototype.gotoAndPlay = function (fName, playTime, frameIndex, backToFirst) {
            if (playTime === void 0) { playTime = -1; }
            if (frameIndex === void 0) { frameIndex = 1; }
            if (backToFirst === void 0) { backToFirst = true; }
            this.isReverse = false;
            this.currentFrameName = fName;
            this.playTime = playTime;
            this.backToFirst = backToFirst;
            this.currentData = this.getMcDataByAction(fName);
            if (this.currentData) {
                this.nextUpdateTime = egret.getTimer() + this.interval;
                this.currentData.direct = 1;
                this.frameIndex = frameIndex;
                // console.log("this.frameIndex:" + this.frameIndex);
                this.bm.source = this.picName();
                if (!this.isplay) {
                    this.isplay = true;
                    this.addEventListener(egret.Event.ENTER_FRAME, this._update, this);
                }
            }
        };
        /**
         * 按播放间隔刷新视频
         * @example 每帧监听
         * @param {egret.Event} event 动画对象自身事件源
         */
        ComMovieClip.prototype._update = function (event) {
            if (egret.getTimer() >= this.nextUpdateTime) {
                this.updateFrame();
            }
        };
        /**
         * 刷新视频
         */
        ComMovieClip.prototype.updateFrame = function () {
            this.nextUpdateTime = egret.getTimer() + this.interval;
            this.dispatchEventWith(gConst.eventType.ONE_STEP_COMPLETE);
            if (this.isReverse && this.frameIndex < 1) {
                this.pause();
                this.dispatchEventWith(egret.Event.COMPLETE);
            }
            // console.log("this.frameIndex:" + this.frameIndex);
            this.bm.source = this.picName();
            this.frameIndex += this.currentData.direct;
            if (this.frameIndex > this.frameCnt()) {
                //正向播放到最后
                if (this.currentData.direct == 1 && this.currentData.backplay) {
                    //改为反向播放
                    this.frameIndex -= 2;
                    this.currentData.direct = -1;
                }
                else {
                    //无来回方向播放时，播放完成，停留在第一帧
                    if (this.backToFirst) {
                        this.frameIndex = 1;
                    }
                    else {
                        //保持在最后一帧
                        this.frameIndex--;
                    }
                }
                if (this.playTime == -1) {
                    //循环播放
                    this.dispatchEventWith(gConst.eventType.ONCE_COMPLETE);
                }
                else if (!this.currentData.backplay || (this.currentData.backplay && this.isReverse)) {
                    //正常播放的时候 播放到最后 次数减少一次
                    //次数播放
                    this.playTime--;
                    this.dispatchEventWith(gConst.eventType.ONCE_COMPLETE);
                    if (this.playTime == 0) {
                        this.pause();
                        this.dispatchEventWith(egret.Event.COMPLETE);
                    }
                }
            }
            else if (this.frameIndex < 1) {
                //方向播放到最初
                if (this.currentData.direct == -1 && this.currentData.backplay) {
                    //改为正向播放
                    this.frameIndex += 2;
                    this.currentData.direct = 1;
                }
                if (this.currentData.backplay && !this.isReverse) {
                    //正常播放的时候 播放到最后 次数减少一次
                    //次数播放
                    this.playTime--;
                    this.dispatchEventWith(gConst.eventType.ONCE_COMPLETE);
                    if (this.playTime == 0) {
                        this.pause();
                        this.dispatchEventWith(egret.Event.COMPLETE);
                    }
                }
            }
        };
        /**
         * 暂停播放
         */
        ComMovieClip.prototype.pause = function () {
            if (this.isplay) {
                this.isplay = false;
                this.removeEventListener(egret.Event.ENTER_FRAME, this._update, this);
            }
        };
        /**
         * 通过动作名称获取动画数据
         * @param {string} fName 动作名称
         */
        ComMovieClip.prototype.getMcDataByAction = function (fName) {
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].fName == fName) {
                    return this.list[i];
                }
            }
            return null;
        };
        return ComMovieClip;
    }(com.ComFileBase));
    com.ComMovieClip = ComMovieClip;
    __reflect(ComMovieClip.prototype, "com.ComMovieClip");
})(com || (com = {}));
//# sourceMappingURL=ComMovieClip.js.map