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
     * 引导组件
     */
    var ComGuide = (function (_super) {
        __extends(ComGuide, _super);
        function ComGuide() {
            var _this = _super.call(this) || this;
            _this.isGuide = false; //是否存在引导
            _this.skinName = skins.ComGuide;
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args 构建传参会通过init()传过去
         */
        ComGuide.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // console.info("init", ...args);
            this.isMC = false;
            this.touchEnabled = this.touchChildren = false;
            this.hideLight();
        };
        /** 首次创建组件时调用 */
        ComGuide.prototype.load = function () {
            // console.info("load");
        };
        /** 每次创建组件都会调用 */
        ComGuide.prototype.start = function () {
            // console.info("start");
        };
        /** 每次结束组件都会调用 */
        ComGuide.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听组件，每帧都会调用 */
        ComGuide.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        ComGuide.prototype.addEvent = function () {
            // console.info("addEvent");
        };
        /** 移除事件 */
        ComGuide.prototype.removeEvent = function () {
            // console.info("removeEvent");
        };
        /** 窗口大小改变时调用 */
        ComGuide.prototype.resizeView = function (event) {
            // console.info("resizeView", event, GameMgr.gameview.width, GameMgr.gameview.height);
            var baseScale = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];
            this.scaleX = this.scaleY = baseScale * this.offS;
            if (this.isGuide) {
                // this.playGuide();
                egret.clearTimeout(this.guideDelay);
                this.guideDelay = egret.setTimeout(this.playGuide, this, 100);
            }
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
        ComGuide.prototype.rotateView = function (event) {
            // console.info("rotateView", event, GameMgr.screenType, GameMgr.mobileType);
            if (GameMgr.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        /* =========== 框架结构代码-end =========== */
        /* =========== 业务代码-start =========== */
        /**
         * 设置帧动画数据
         */
        ComGuide.prototype.setMcData = function (ob, playCnt, anchorOffsetX, anchorOffsetY) {
            if (playCnt === void 0) { playCnt = 1; }
            if (anchorOffsetX === void 0) { anchorOffsetX = 0; }
            if (anchorOffsetY === void 0) { anchorOffsetY = 0; }
            this.isMC = true;
            this.playCnt = playCnt;
            this.hand.open();
            this.hand.setData(ob, anchorOffsetX, anchorOffsetY);
            this.fName = ob[0].fName;
            this.frameCnt = ob[0].frameCnt;
            this.hand.gotoAndStop(this.fName);
        };
        /**
         * 设置数据
         * @param {number} delayTimer 延迟显示时间
         * @param {egret.DisplayObject} targetArg.target1 指引目标对象1
         * @param {egret.DisplayObject} targetArg.target2 指引目标对象2
         * @param {egret.DisplayObject} targetArg.target3 指引目标对象3
         * @param {egret.DisplayObject} targetArg.target4 指引目标对象4
         * @param {egret.DisplayObject} targetArg.target5 指引目标对象5
         * @param {number} moveTime 目标1移动到目标2时间
         * @param {boolean} isReturn 是否做返回运动
         * @param {egret.DisplayObjectContainer} parentObj 父级显示容器
         * @param {number} prop.diffX = 0 x轴差值
         * @param {number} prop.diffY = 20 y轴差值
         * @param {number} prop.diffS = 0.9 缩放差值
         * @param {number} prop.pressT = 300 手指按下时间
         * @param {number} prop.liftT = 800 手指抬起时间
         * @param {number} prop.waitT = 500 手指等待下次按下时间
         * @param {number} prop.direction = "center_center" 手指处于目标方位
         * @param {number} prop.offX = 0 x轴偏移值(特殊处理用)
         * @param {number} prop.offY = 0 y轴偏移值(特殊处理用)
         * @param {number} prop.offR = 0 角度r偏移值(特殊处理用)
         * @param {number} prop.offS = 1 缩放s偏移值(特殊处理用)
         * @param {boolean} prop.isBack 是否相反方向指引
         */
        ComGuide.prototype.setData = function (delayTimer, targetArg, parentObj, prop) {
            if (prop === void 0) { prop = {}; }
            this.delayTimer = delayTimer; //延迟显示时间
            this.target1 = targetArg.target1; //指引目标对象1
            this.target2 = targetArg.target2; //指引目标对象2
            this.target3 = targetArg.target3; //指引目标对象3
            this.target4 = targetArg.target4; //指引目标对象4
            this.target5 = targetArg.target5; //指引目标对象5
            this.moveTime = targetArg.moveTime; //目标1移动到目标2时间
            this.isReturn = targetArg.isReturn; //是否做返回运动
            this.parentObj = parentObj; //父级显示容器
            this.diffX = prop.diffX != void 0 ? prop.diffX : 0; //x轴差值
            this.diffY = prop.diffY != void 0 ? prop.diffY : 20; //y轴差值
            this.diffS = prop.diffS != void 0 ? prop.diffS : 0.9; //缩放差值
            this.pressT = prop.pressT != void 0 ? prop.pressT : 300; //手指按下时间
            this.liftT = prop.liftT != void 0 ? prop.liftT : 800; //手指抬起时间
            this.waitT = prop.waitT != void 0 ? prop.waitT : 500; //手指等待下次按下时间
            this.direction = prop.direction != void 0 ? prop.direction : gConst.direction.CENTER_CENTER; //手指处于目标方位
            this.offX = prop.offX != void 0 ? prop.offX : 0; //x轴偏移值(特殊处理用)
            this.offY = prop.offY != void 0 ? prop.offY : 0; //y轴偏移值(特殊处理用)
            this.offR = prop.offR != void 0 ? prop.offR : 0; //角度r偏移值(特殊处理用)
            this.offS = prop.offS != void 0 ? prop.offS : 1; //缩放s偏移值(特殊处理用)
            this.isBack = prop.isBack != void 0 ? prop.isBack : false; //是否相反方向指引
        };
        /**
         * 更新数据
         * @param {number} config.delayTimer 延迟显示时间
         * @param {egret.DisplayObject} config.targetArg.target1 指引目标对象1
         * @param {egret.DisplayObject} config.targetArg.target2 指引目标对象2
         * @param {egret.DisplayObject} config.targetArg.target3 指引目标对象3
         * @param {egret.DisplayObject} config.targetArg.target4 指引目标对象4
         * @param {egret.DisplayObject} config.targetArg.target5 指引目标对象5
         * @param {number} moveTime 目标1移动到目标2时间
         * @param {boolean} isReturn 是否做返回运动
         * @param {egret.DisplayObjectContainer} config.parentObj 父级显示容器
         * @param {number} config.diffX x轴差值
         * @param {number} config.diffY y轴差值
         * @param {number} config.diffS 缩放差值
         * @param {number} pressT 手指按下时间
         * @param {number} liftT 手指抬起时间
         * @param {number} waitT 手指等待下次按下时间
         * @param {number} direction 手指处于目标方位
         * @param {number} offX x轴偏移值(特殊处理用)
         * @param {number} offY y轴偏移值(特殊处理用)
         * @param {number} offR 角度r偏移值(特殊处理用)
         * @param {number} offS 缩放s偏移值(特殊处理用)
         * @param {boolean} isBack 是否相反方向指引
         */
        ComGuide.prototype.updateData = function (config) {
            if (config.delayTimer != void 0) {
                this.delayTimer = config.delayTimer;
            } //延迟显示时间
            if (config.targetArg.target1 != void 0) {
                this.target1 = config.targetArg.target1;
            } //指引目标对象1
            if (config.targetArg.target2 != void 0) {
                this.target2 = config.targetArg.target2;
            } //指引目标对象2
            if (config.targetArg.target3 != void 0) {
                this.target3 = config.targetArg.target3;
            } //指引目标对象3
            if (config.targetArg.target4 != void 0) {
                this.target4 = config.targetArg.target4;
            } //指引目标对象4
            if (config.targetArg.target5 != void 0) {
                this.target5 = config.targetArg.target5;
            } //指引目标对象5
            if (config.targetArg.moveTime != void 0) {
                this.moveTime = config.targetArg.moveTime;
            } //目标1移动到目标2时间
            if (config.targetArg.isReturn != void 0) {
                this.isReturn = config.targetArg.isReturn;
            } //是否做返回运动
            if (config.parentObj != void 0) {
                this.parentObj = config.parentObj;
            } //父级显示容器
            if (config.prop != void 0) {
                if (config.prop.diffX != void 0) {
                    this.diffX = config.prop.diffX;
                } //x轴差值
                if (config.prop.diffY != void 0) {
                    this.diffY = config.prop.diffY;
                } //y轴差值
                if (config.prop.diffS != void 0) {
                    this.diffS = config.prop.diffS;
                } //缩放差值
                if (config.prop.pressT != void 0) {
                    this.pressT = config.prop.pressT;
                } //手指按下时间
                if (config.prop.liftT != void 0) {
                    this.liftT = config.prop.liftT;
                } //手指抬起时间
                if (config.prop.waitT != void 0) {
                    this.waitT = config.prop.waitT;
                } //手指等待下次按下时间
                if (config.prop.direction != void 0) {
                    this.direction = config.prop.direction;
                } //手指处于目标方位
                if (config.prop.offX != void 0) {
                    this.offX = config.prop.offX;
                } //x轴偏移值(特殊处理用)
                if (config.prop.offY != void 0) {
                    this.offY = config.prop.offY;
                } //y轴偏移值(特殊处理用)
                if (config.prop.offR != void 0) {
                    this.offR = config.prop.offR;
                } //角度r偏移值(特殊处理用)
                if (config.prop.offS != void 0) {
                    this.offS = config.prop.offS;
                } //缩放s偏移值(特殊处理用)
                if (config.prop.isBack != void 0) {
                    this.isBack = config.prop.isBack;
                } //是否相反方向指引
            }
        };
        /**
         * 播放
         */
        ComGuide.prototype.play = function () {
            egret.clearTimeout(this.guideDelay);
            this.guideDelay = egret.setTimeout(this.playGuide, this, this.delayTimer);
        };
        /**
         * 结束
         */
        ComGuide.prototype.over = function () {
            var _this = this;
            egret.clearTimeout(this.guideDelay);
            if (!this.isGuide) {
                return;
            }
            if (!this || !this.parent) {
                return;
            }
            this.isGuide = false;
            this.hideLight(true);
            gTween.fadeOut(this.hand, 300, 1, void 0, void 0, {
                callback: function () {
                    gTween.rmTweens(_this.hand);
                    gComMgr.rmObj(_this);
                    _this.hand.alpha = 1;
                    _this.dispatchEventWith(gConst.eventType.GUIDE_STOP);
                }
            });
        };
        /** 结束帧动画 */
        ComGuide.prototype.stopMC = function () {
            if (!this.isMC) {
                return;
            }
            this.hand.pause();
        };
        /**
         * 重置 (立马结束，重新开始)
         */
        ComGuide.prototype.reset = function () {
            this.once(gConst.eventType.GUIDE_STOP, this.start, this);
            this.over();
        };
        /**
         * 显示光圈提示
         */
        ComGuide.prototype.showLight = function () {
            var _this = this;
            if (!this.light) {
                return;
            }
            this.light.x = this.initHandX;
            this.light.y = this.initHandY;
            this.light.scaleX = this.light.scaleY = 1;
            gTween.fadeIn(this.light, 300, 1, void 0, void 0, {
                callback: function () {
                    gTween.loopScale(_this.light, 0.65, (_this.pressT + _this.liftT + _this.waitT) / 2, 1);
                }
            });
        };
        /**
         * 隐藏光圈提示
         */
        ComGuide.prototype.hideLight = function (isAim) {
            if (isAim === void 0) { isAim = false; }
            if (!this.light) {
                return;
            }
            if (!isAim) {
                this.light.visible = false;
            }
            else {
                gTween.fadeOut(this.light, 300, 1);
            }
        };
        /**
         * 显示引导
         */
        ComGuide.prototype.showGuide = function () {
            if (this.isMC) {
                this.hand.gotoAndStop(this.fName);
            }
            this.show();
            this.hand.alpha = 1;
            this.parentObj.addChild(this);
            this.updateGuideLoc();
        };
        /**
         * 更新引导位置
         */
        ComGuide.prototype.updateGuideLoc = function (target) {
            if (target === void 0) { target = this.target1; }
            if (!this || !this.parent) {
                return;
            }
            var _x = target.x - target.anchorOffsetX * target.scaleX; //x原点
            var _y = target.y - target.anchorOffsetY * target.scaleX; //y原点
            var _w = target.width * target.scaleX; //宽度
            var _h = target.height * target.scaleX; //高度
            switch (this.direction) {
                //左上 ↖
                case gConst.direction.LEFT_TOP:
                    //左上就在原点
                    this.rotation = 135;
                    break;
                //中上 ↑
                case gConst.direction.CENTER_TOP:
                    _x += _w / 2;
                    this.rotation = 180;
                    break;
                //右上 ↗
                case gConst.direction.RIGHT_TOP:
                    _x += _w;
                    this.rotation = -135;
                    break;
                //右中 →
                case gConst.direction.RIGHT_CENTER:
                    _x += _w;
                    _y += _h / 2;
                    this.rotation = -90;
                    break;
                //右下 ↘
                case gConst.direction.RIGHT_BOTTOM:
                    _x += _w / 2;
                    _y += _h / 2;
                    this.rotation = -45;
                    break;
                //中下 ↓
                case gConst.direction.CENTER_BOTTOM:
                    _x += _w / 2;
                    _y += _h;
                    this.rotation = 0;
                    break;
                //左下 ↙
                case gConst.direction.LEFT_BOTTOM:
                    _y += _h;
                    this.rotation = 45;
                    break;
                //左中 ←
                case gConst.direction.LEFT_CENTER:
                    _y += _h / 2;
                    this.rotation = 90;
                    break;
                //默认 中心
                default:
                    _x += _w / 2;
                    _y += _h / 2;
                    this.rotation = 0;
                    break;
            }
            _x += (this.offX * target.scaleX);
            _y += (this.offY * target.scaleX);
            this.rotation += this.offR;
            var baseScale = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];
            this.scaleX = this.scaleY = baseScale * this.offS;
            var gPot = target.parent.localToGlobal(_x, _y);
            var lPot = this.globalToLocal(gPot.x, gPot.y, gPot);
            this.initHandX = this.hand.x = lPot.x;
            this.initHandY = this.hand.y = lPot.y;
        };
        /**
         * 播放引导
         */
        ComGuide.prototype.playGuide = function () {
            var _this = this;
            this.showGuide();
            this.isGuide = true;
            gTween.rmTweens(this.hand);
            this.hand.alpha = 0;
            this.hand.scaleX = this.hand.scaleY = 1;
            this.hand.visible = true;
            this.showLight();
            if (!this.target2) {
                if (!this.isBack) {
                    this.hand.x = this.initHandX + this.diffX;
                    this.hand.y = this.initHandY + this.diffY;
                    egret.Tween.get(this.hand).to({ alpha: 1 }, 300).call(function () {
                        if (!_this.isMC) {
                            egret.Tween.get(_this.hand, { loop: true }).to({
                                scaleX: _this.diffS,
                                scaleY: _this.diffS,
                                x: _this.initHandX,
                                y: _this.initHandY
                            }, _this.pressT).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE]).to({
                                scaleX: 1,
                                scaleY: 1,
                                x: _this.initHandX + _this.diffX,
                                y: _this.initHandY + _this.diffY
                            }, _this.liftT).wait(_this.waitT);
                        }
                        else {
                            if (_this.playCnt > -1) {
                                var playCnt_1 = _this.playCnt;
                                egret.Tween.get(_this.hand, { loop: true }).call(function () {
                                    _this.hand.interval = _this.pressT;
                                    _this.hand.gotoAndPlay(_this.fName, _this.playCnt);
                                }, _this).wait(_this.pressT * _this.playCnt * (_this.frameCnt * 2)).call(function () {
                                    _this.hand.gotoAndStop(_this.fName);
                                }, _this).call(function () {
                                    _this.dispatchEventWith.call(_this, gConst.eventType.GUIDE_TOUCH_ONE);
                                    playCnt_1--;
                                    if (playCnt_1 <= 0) {
                                        _this.over();
                                        return;
                                    }
                                }).wait(_this.waitT);
                            }
                            else {
                                _this.hand.interval = _this.pressT;
                                _this.hand.gotoAndPlay(_this.fName, _this.playCnt);
                            }
                        }
                    }, this);
                }
                else {
                    this.hand.x = this.initHandX;
                    this.hand.y = this.initHandY;
                    egret.Tween.get(this.hand).to({ alpha: 1 }, 300).call(function () {
                        if (!_this.isMC) {
                            egret.Tween.get(_this.hand, { loop: true }).to({
                                scaleX: 1,
                                scaleY: 1,
                                x: _this.initHandX + _this.diffX,
                                y: _this.initHandY + _this.diffY
                            }, _this.liftT).wait(_this.waitT).to({
                                scaleX: _this.diffS,
                                scaleY: _this.diffS,
                                x: _this.initHandX,
                                y: _this.initHandY
                            }, _this.pressT).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE]);
                        }
                        else {
                            egret.Tween.get(_this.hand, { loop: true }).call(function () {
                                _this.hand.gotoAndStop(_this.fName, 2);
                            }, _this).wait(_this.liftT + _this.waitT).call(function () {
                                _this.hand.interval = _this.pressT;
                                _this.hand.gotoAndReverse(_this.fName, _this.playCnt);
                            }, _this).wait(_this.pressT * _this.playCnt * (_this.frameCnt + 3)).call(function () {
                                _this.hand.gotoAndStop(_this.fName, 2);
                            }, _this).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE]);
                        }
                    }, this);
                }
            }
            else {
                if (!this.target3) {
                    var initHandX_1_1 = this.initHandX;
                    var initHandY_1_1 = this.initHandY;
                    this.updateGuideLoc(this.target2);
                    var initHandX_2_1 = this.initHandX;
                    var initHandY_2_1 = this.initHandY;
                    this.hand.x = initHandX_1_1 + this.diffX;
                    this.hand.y = initHandY_1_1 + this.diffY;
                    if (this.moveTime == void 0) {
                        this.moveTime = 100;
                    }
                    var returnProps_1;
                    if (this.isReturn) {
                        returnProps_1 = {
                            x: initHandX_1_1 + this.diffX,
                            y: initHandY_1_1 + this.diffY
                        };
                    }
                    else {
                        returnProps_1 = {
                            alpha: 0
                        };
                    }
                    egret.Tween.get(this.hand).to({ alpha: 1 }, 300).call(function () {
                        if (!_this.isMC) {
                            egret.Tween.get(_this.hand, { loop: true }).to({
                                scaleX: _this.diffS,
                                scaleY: _this.diffS,
                                x: initHandX_1_1,
                                y: initHandY_1_1,
                                alpha: 1
                            }, _this.pressT).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE]).to({
                                scaleX: 1,
                                scaleY: 1,
                                x: initHandX_1_1 + _this.diffX,
                                y: initHandY_1_1 + _this.diffY
                            }, _this.liftT).to({
                                x: initHandX_2_1 + _this.diffX,
                                y: initHandY_2_1 + _this.diffY
                            }, _this.moveTime).to({
                                scaleX: _this.diffS,
                                scaleY: _this.diffS,
                                x: initHandX_2_1,
                                y: initHandY_2_1
                            }, _this.pressT).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE]).to({
                                scaleX: 1,
                                scaleY: 1,
                                x: initHandX_2_1 + _this.diffX,
                                y: initHandY_2_1 + _this.diffY
                            }, _this.liftT).wait(_this.waitT).to(returnProps_1, _this.isReturn ? _this.moveTime : _this.waitT);
                        }
                        else {
                            egret.Tween.get(_this.hand, { loop: true }).call(function () {
                                _this.hand.interval = _this.pressT;
                                _this.hand.gotoAndPlay(_this.fName, _this.playCnt);
                            }, _this).wait(_this.pressT * _this.playCnt * (_this.frameCnt + 3)).call(function () {
                                _this.hand.gotoAndStop(_this.fName);
                            }, _this).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE]).wait(_this.liftT).to({
                                x: initHandX_2_1,
                                y: initHandY_2_1
                            }, _this.moveTime).call(function () {
                                _this.hand.interval = _this.pressT;
                                _this.hand.gotoAndPlay(_this.fName, _this.playCnt);
                            }, _this).wait(_this.pressT * _this.playCnt * (_this.frameCnt + 3)).call(function () {
                                _this.hand.gotoAndStop(_this.fName);
                            }, _this).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE])
                                .wait(_this.liftT).wait(_this.waitT).to(returnProps_1, _this.isReturn ? _this.moveTime : _this.waitT);
                        }
                    }, this);
                }
                else {
                    if (!this.target4) {
                        var initHandX_1_2 = this.initHandX;
                        var initHandY_1_2 = this.initHandY;
                        this.updateGuideLoc(this.target2);
                        var initHandX_2_2 = this.initHandX;
                        var initHandY_2_2 = this.initHandY;
                        this.updateGuideLoc(this.target3);
                        var initHandX_3_1 = this.initHandX;
                        var initHandY_3_1 = this.initHandY;
                        this.hand.x = initHandX_1_2 + this.diffX;
                        this.hand.y = initHandY_1_2 + this.diffY;
                        if (this.moveTime == void 0) {
                            this.moveTime = 100;
                        }
                        var returnProps_2;
                        if (this.isReturn) {
                            returnProps_2 = {
                                x: initHandX_1_2 + this.diffX,
                                y: initHandY_1_2 + this.diffY
                            };
                        }
                        else {
                            returnProps_2 = {
                                alpha: 0
                            };
                        }
                        egret.Tween.get(this.hand).to({ alpha: 1 }, 300).call(function () {
                            if (!_this.isMC) {
                                egret.Tween.get(_this.hand, { loop: true }).to({
                                    scaleX: _this.diffS,
                                    scaleY: _this.diffS,
                                    x: initHandX_1_2,
                                    y: initHandY_1_2,
                                    alpha: 1
                                }, _this.pressT).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE]).to({
                                    scaleX: 1,
                                    scaleY: 1,
                                    x: initHandX_1_2 + _this.diffX,
                                    y: initHandY_1_2 + _this.diffY
                                }, _this.liftT).to({
                                    x: initHandX_2_2 + _this.diffX,
                                    y: initHandY_2_2 + _this.diffY
                                }, _this.moveTime).to({
                                    scaleX: _this.diffS,
                                    scaleY: _this.diffS,
                                    x: initHandX_2_2,
                                    y: initHandY_2_2
                                }, _this.pressT).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE]).to({
                                    scaleX: 1,
                                    scaleY: 1,
                                    x: initHandX_2_2 + _this.diffX,
                                    y: initHandY_2_2 + _this.diffY
                                }, _this.liftT).to({
                                    x: initHandX_3_1 + _this.diffX,
                                    y: initHandY_3_1 + _this.diffY
                                }, _this.moveTime).to({
                                    scaleX: _this.diffS,
                                    scaleY: _this.diffS,
                                    x: initHandX_3_1,
                                    y: initHandY_3_1
                                }, _this.pressT).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE]).to({
                                    scaleX: 1,
                                    scaleY: 1,
                                    x: initHandX_3_1 + _this.diffX,
                                    y: initHandY_3_1 + _this.diffY
                                }, _this.liftT).wait(_this.waitT).to(returnProps_2, _this.isReturn ? _this.moveTime * 2 : _this.waitT);
                            }
                            else {
                                egret.Tween.get(_this.hand, { loop: true }).call(function () {
                                    _this.hand.interval = _this.pressT;
                                    _this.hand.gotoAndPlay(_this.fName, _this.playCnt);
                                }, _this).wait(_this.pressT * _this.playCnt * (_this.frameCnt + 3)).call(function () {
                                    _this.hand.gotoAndStop(_this.fName);
                                }, _this).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE]).wait(_this.liftT).to({
                                    x: initHandX_2_2,
                                    y: initHandY_2_2
                                }, _this.moveTime).call(function () {
                                    _this.hand.interval = _this.pressT;
                                    _this.hand.gotoAndPlay(_this.fName, _this.playCnt);
                                }, _this).wait(_this.pressT * _this.playCnt * (_this.frameCnt + 3)).call(function () {
                                    _this.hand.gotoAndStop(_this.fName);
                                }, _this).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE]).wait(_this.liftT).to({
                                    x: initHandX_3_1,
                                    y: initHandY_3_1
                                }, _this.moveTime).call(function () {
                                    _this.hand.interval = _this.pressT;
                                    _this.hand.gotoAndPlay(_this.fName, _this.playCnt);
                                }, _this).wait(_this.pressT * _this.playCnt * (_this.frameCnt + 3)).call(function () {
                                    _this.hand.gotoAndStop(_this.fName);
                                }, _this).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE])
                                    .wait(_this.liftT).wait(_this.waitT).to(returnProps_2, _this.isReturn ? _this.moveTime : _this.waitT);
                            }
                        }, this);
                    }
                    else {
                        if (!this.target5) {
                            var initHandX_1_3 = this.initHandX;
                            var initHandY_1_3 = this.initHandY;
                            this.updateGuideLoc(this.target2);
                            var initHandX_2_3 = this.initHandX;
                            var initHandY_2_3 = this.initHandY;
                            this.updateGuideLoc(this.target3);
                            var initHandX_3_2 = this.initHandX;
                            var initHandY_3_2 = this.initHandY;
                            this.updateGuideLoc(this.target4);
                            var initHandX_4_1 = this.initHandX;
                            var initHandY_4_1 = this.initHandY;
                            this.hand.x = initHandX_1_3 + this.diffX;
                            this.hand.y = initHandY_1_3 + this.diffY;
                            if (this.moveTime == void 0) {
                                this.moveTime = 100;
                            }
                            var returnProps_3;
                            if (this.isReturn) {
                                returnProps_3 = {
                                    x: initHandX_1_3 + this.diffX,
                                    y: initHandY_1_3 + this.diffY
                                };
                            }
                            else {
                                returnProps_3 = {
                                    alpha: 0
                                };
                            }
                            egret.Tween.get(this.hand).to({ alpha: 1 }, 300).call(function () {
                                if (!_this.isMC) {
                                    egret.Tween.get(_this.hand, { loop: true }).to({
                                        scaleX: _this.diffS,
                                        scaleY: _this.diffS,
                                        x: initHandX_1_3,
                                        y: initHandY_1_3,
                                        alpha: 1
                                    }, _this.pressT).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE]).to({
                                        scaleX: 1,
                                        scaleY: 1,
                                        x: initHandX_1_3 + _this.diffX,
                                        y: initHandY_1_3 + _this.diffY
                                    }, _this.liftT).to({
                                        x: initHandX_2_3 + _this.diffX,
                                        y: initHandY_2_3 + _this.diffY
                                    }, _this.moveTime).to({
                                        scaleX: _this.diffS,
                                        scaleY: _this.diffS,
                                        x: initHandX_2_3,
                                        y: initHandY_2_3
                                    }, _this.pressT).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE]).to({
                                        scaleX: 1,
                                        scaleY: 1,
                                        x: initHandX_2_3 + _this.diffX,
                                        y: initHandY_2_3 + _this.diffY
                                    }, _this.liftT).to({
                                        x: initHandX_3_2 + _this.diffX,
                                        y: initHandY_3_2 + _this.diffY
                                    }, _this.moveTime).to({
                                        scaleX: _this.diffS,
                                        scaleY: _this.diffS,
                                        x: initHandX_3_2,
                                        y: initHandY_3_2
                                    }, _this.pressT).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE]).to({
                                        scaleX: 1,
                                        scaleY: 1,
                                        x: initHandX_3_2 + _this.diffX,
                                        y: initHandY_3_2 + _this.diffY
                                    }, _this.liftT).to({
                                        x: initHandX_4_1 + _this.diffX,
                                        y: initHandY_4_1 + _this.diffY
                                    }, _this.moveTime).to({
                                        scaleX: _this.diffS,
                                        scaleY: _this.diffS,
                                        x: initHandX_4_1,
                                        y: initHandY_4_1
                                    }, _this.pressT).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE]).to({
                                        scaleX: 1,
                                        scaleY: 1,
                                        x: initHandX_4_1 + _this.diffX,
                                        y: initHandY_4_1 + _this.diffY
                                    }, _this.liftT).wait(_this.waitT).to(returnProps_3, _this.isReturn ? _this.moveTime * 3 : _this.waitT);
                                }
                                else {
                                    egret.Tween.get(_this.hand, { loop: true }).call(function () {
                                        _this.hand.interval = _this.pressT;
                                        _this.hand.gotoAndPlay(_this.fName, _this.playCnt);
                                    }, _this).wait(_this.pressT * _this.playCnt * (_this.frameCnt + 3)).call(function () {
                                        _this.hand.gotoAndStop(_this.fName);
                                    }, _this).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE]).wait(_this.liftT).to({
                                        x: initHandX_2_3,
                                        y: initHandY_2_3
                                    }, _this.moveTime).call(function () {
                                        _this.hand.interval = _this.pressT;
                                        _this.hand.gotoAndPlay(_this.fName, _this.playCnt);
                                    }, _this).wait(_this.pressT * _this.playCnt * (_this.frameCnt + 3)).call(function () {
                                        _this.hand.gotoAndStop(_this.fName);
                                    }, _this).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE]).wait(_this.liftT).to({
                                        x: initHandX_3_2,
                                        y: initHandY_3_2
                                    }, _this.moveTime).call(function () {
                                        _this.hand.interval = _this.pressT;
                                        _this.hand.gotoAndPlay(_this.fName, _this.playCnt);
                                    }, _this).wait(_this.pressT * _this.playCnt * (_this.frameCnt + 3)).call(function () {
                                        _this.hand.gotoAndStop(_this.fName);
                                    }, _this).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE]).wait(_this.liftT).to({
                                        x: initHandX_4_1,
                                        y: initHandY_4_1
                                    }, _this.moveTime).call(function () {
                                        _this.hand.interval = _this.pressT;
                                        _this.hand.gotoAndPlay(_this.fName, _this.playCnt);
                                    }, _this).wait(_this.pressT * _this.playCnt * (_this.frameCnt + 3)).call(function () {
                                        _this.hand.gotoAndStop(_this.fName);
                                    }, _this).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE])
                                        .wait(_this.liftT).wait(_this.waitT).to(returnProps_3, _this.isReturn ? _this.moveTime : _this.waitT);
                                }
                            }, this);
                        }
                        else {
                            var initHandX_1_4 = this.initHandX;
                            var initHandY_1_4 = this.initHandY;
                            this.updateGuideLoc(this.target2);
                            var initHandX_2_4 = this.initHandX;
                            var initHandY_2_4 = this.initHandY;
                            this.updateGuideLoc(this.target3);
                            var initHandX_3_3 = this.initHandX;
                            var initHandY_3_3 = this.initHandY;
                            this.updateGuideLoc(this.target4);
                            var initHandX_4_2 = this.initHandX;
                            var initHandY_4_2 = this.initHandY;
                            this.updateGuideLoc(this.target5);
                            var initHandX_5_1 = this.initHandX;
                            var initHandY_5_1 = this.initHandY;
                            this.hand.x = initHandX_1_4 + this.diffX;
                            this.hand.y = initHandY_1_4 + this.diffY;
                            if (this.moveTime == void 0) {
                                this.moveTime = 100;
                            }
                            var returnProps_4;
                            if (this.isReturn) {
                                returnProps_4 = {
                                    x: initHandX_1_4 + this.diffX,
                                    y: initHandY_1_4 + this.diffY
                                };
                            }
                            else {
                                returnProps_4 = {
                                    alpha: 0
                                };
                            }
                            egret.Tween.get(this.hand).to({ alpha: 1 }, 300).call(function () {
                                if (!_this.isMC) {
                                    egret.Tween.get(_this.hand, { loop: true }).to({
                                        scaleX: _this.diffS,
                                        scaleY: _this.diffS,
                                        x: initHandX_1_4,
                                        y: initHandY_1_4,
                                        alpha: 1
                                    }, _this.pressT).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE]).to({
                                        scaleX: 1,
                                        scaleY: 1,
                                        x: initHandX_1_4 + _this.diffX,
                                        y: initHandY_1_4 + _this.diffY
                                    }, _this.liftT).to({
                                        x: initHandX_2_4 + _this.diffX,
                                        y: initHandY_2_4 + _this.diffY
                                    }, _this.moveTime).to({
                                        scaleX: _this.diffS,
                                        scaleY: _this.diffS,
                                        x: initHandX_2_4,
                                        y: initHandY_2_4
                                    }, _this.pressT).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE]).to({
                                        scaleX: 1,
                                        scaleY: 1,
                                        x: initHandX_2_4 + _this.diffX,
                                        y: initHandY_2_4 + _this.diffY
                                    }, _this.liftT).to({
                                        x: initHandX_3_3 + _this.diffX,
                                        y: initHandY_3_3 + _this.diffY
                                    }, _this.moveTime).to({
                                        scaleX: _this.diffS,
                                        scaleY: _this.diffS,
                                        x: initHandX_3_3,
                                        y: initHandY_3_3
                                    }, _this.pressT).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE]).to({
                                        scaleX: 1,
                                        scaleY: 1,
                                        x: initHandX_3_3 + _this.diffX,
                                        y: initHandY_3_3 + _this.diffY
                                    }, _this.liftT).to({
                                        x: initHandX_4_2 + _this.diffX,
                                        y: initHandY_4_2 + _this.diffY
                                    }, _this.moveTime).to({
                                        scaleX: _this.diffS,
                                        scaleY: _this.diffS,
                                        x: initHandX_4_2,
                                        y: initHandY_4_2
                                    }, _this.pressT).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE]).to({
                                        scaleX: 1,
                                        scaleY: 1,
                                        x: initHandX_4_2 + _this.diffX,
                                        y: initHandY_4_2 + _this.diffY
                                    }, _this.liftT).to({
                                        x: initHandX_5_1 + _this.diffX,
                                        y: initHandY_5_1 + _this.diffY
                                    }, _this.moveTime).to({
                                        scaleX: _this.diffS,
                                        scaleY: _this.diffS,
                                        x: initHandX_5_1,
                                        y: initHandY_5_1
                                    }, _this.pressT).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE]).to({
                                        scaleX: 1,
                                        scaleY: 1,
                                        x: initHandX_5_1 + _this.diffX,
                                        y: initHandY_5_1 + _this.diffY
                                    }, _this.liftT).wait(_this.waitT).to(returnProps_4, _this.isReturn ? _this.moveTime * 4 : _this.waitT);
                                }
                                else {
                                    egret.Tween.get(_this.hand, { loop: true }).call(function () {
                                        _this.hand.interval = _this.pressT;
                                        _this.hand.gotoAndPlay(_this.fName, _this.playCnt);
                                    }, _this).wait(_this.pressT * _this.playCnt * (_this.frameCnt + 3)).call(function () {
                                        _this.hand.gotoAndStop(_this.fName);
                                    }, _this).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE]).wait(_this.liftT).to({
                                        x: initHandX_2_4,
                                        y: initHandY_2_4
                                    }, _this.moveTime).call(function () {
                                        _this.hand.interval = _this.pressT;
                                        _this.hand.gotoAndPlay(_this.fName, _this.playCnt);
                                    }, _this).wait(_this.pressT * _this.playCnt * (_this.frameCnt + 3)).call(function () {
                                        _this.hand.gotoAndStop(_this.fName);
                                    }, _this).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE]).wait(_this.liftT).to({
                                        x: initHandX_3_3,
                                        y: initHandY_3_3
                                    }, _this.moveTime).call(function () {
                                        _this.hand.interval = _this.pressT;
                                        _this.hand.gotoAndPlay(_this.fName, _this.playCnt);
                                    }, _this).wait(_this.pressT * _this.playCnt * (_this.frameCnt + 3)).call(function () {
                                        _this.hand.gotoAndStop(_this.fName);
                                    }, _this).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE]).wait(_this.liftT).to({
                                        x: initHandX_4_2,
                                        y: initHandY_4_2
                                    }, _this.moveTime).call(function () {
                                        _this.hand.interval = _this.pressT;
                                        _this.hand.gotoAndPlay(_this.fName, _this.playCnt);
                                    }, _this).wait(_this.pressT * _this.playCnt * (_this.frameCnt + 3)).call(function () {
                                        _this.hand.gotoAndStop(_this.fName);
                                    }, _this).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE]).wait(_this.liftT).to({
                                        x: initHandX_5_1,
                                        y: initHandY_5_1
                                    }, _this.moveTime).call(function () {
                                        _this.hand.interval = _this.pressT;
                                        _this.hand.gotoAndPlay(_this.fName, _this.playCnt);
                                    }, _this).wait(_this.pressT * _this.playCnt * (_this.frameCnt + 3)).call(function () {
                                        _this.hand.gotoAndStop(_this.fName);
                                    }, _this).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE])
                                        .wait(_this.liftT).wait(_this.waitT).to(returnProps_4, _this.isReturn ? _this.moveTime : _this.waitT);
                                }
                            }, this);
                        }
                    }
                }
            }
        };
        return ComGuide;
    }(com.ComFile));
    com.ComGuide = ComGuide;
    __reflect(ComGuide.prototype, "com.ComGuide");
})(com || (com = {}));
//# sourceMappingURL=ComGuide.js.map