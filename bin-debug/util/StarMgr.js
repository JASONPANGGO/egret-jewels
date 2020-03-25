var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var util;
(function (util) {
    /**
     * 闪烁物管理器
     */
    var StarMgr = (function () {
        function StarMgr(con) {
            this._starPool = [];
            this._curAllStar = [];
            this.con = con;
        }
        StarMgr.prototype.update = function (timeStamp) {
            this.addStar();
            return;
        };
        /**
         * 显示闪烁物
         * @param {string[]} starAnswers 闪烁物资源名称配置
         * @param {number} cfg.intervalMax 下次显示闪烁物，时间间隔范围，最大值
         * @param {number} cfg.intervalMin 下次显示闪烁物，时间间隔范围，最小值
         * @param {number} cfg.scaleMax 闪烁物缩放值范围，最大值
         * @param {number} cfg.scaleMin 闪烁物缩放值范围，最小值
         * @param {boolean} cfg.isRotate 闪烁物是否旋转
         * @param {boolean} cfg.isAdaptiveScale 闪烁物是否自适应父级缩放
         * @param {number} cfg.starMaxCnt 闪烁物最大数量
         */
        StarMgr.prototype.show = function (starAnswers, cfg) {
            this.updateData(starAnswers, cfg);
            this.intervalMax = this.intervalMax != void 0 ? this.intervalMax : 300;
            this.intervalMin = this.intervalMin != void 0 ? this.intervalMin : 100;
            this.scaleMax = this.scaleMax != void 0 ? this.scaleMax : 1;
            this.scaleMin = this.scaleMin != void 0 ? this.scaleMin : .3;
            this.isShowed = true;
            this.addStar();
            this.updateNextShow();
            egret.startTick(this.update, this);
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
         * @param {number} cfg.starMaxCnt 闪烁物最大数量
         */
        StarMgr.prototype.updateData = function (starAnswers, cfg) {
            if (starAnswers) {
                this.starAnswers = starAnswers;
            }
            if (cfg) {
                if (cfg.intervalMax != void 0) {
                    this.intervalMax = cfg.intervalMax;
                }
                if (cfg.intervalMin != void 0) {
                    this.intervalMin = cfg.intervalMin;
                }
                if (cfg.scaleMax != void 0) {
                    this.scaleMax = cfg.scaleMax;
                }
                if (cfg.scaleMin != void 0) {
                    this.scaleMin = cfg.scaleMin;
                }
                if (cfg.isRotate != void 0) {
                    this.isRotate = cfg.isRotate;
                }
                if (cfg.isAdaptiveScale != void 0) {
                    this.isAdaptiveScale = cfg.isAdaptiveScale;
                }
                if (cfg.starMaxCnt != void 0) {
                    this.starMaxCnt = cfg.starMaxCnt;
                }
            }
        };
        /**
         * 隐藏闪烁物
         * @param {boolean} clearAll = true 是否清除所有
         */
        StarMgr.prototype.hide = function (clearAll) {
            if (clearAll === void 0) { clearAll = true; }
            egret.stopTick(this.update, this);
            this.isShowed = false;
            if (clearAll) {
                var i = 0;
                var _curAllStar = this._curAllStar;
                var star = _curAllStar.length > i ? _curAllStar[i] : null;
                while (star) {
                    this.removeStar(star);
                    star = _curAllStar.length > i ? _curAllStar[i] : null;
                }
            }
        };
        StarMgr.prototype.updateNextShow = function () {
            var max = this.intervalMax;
            var min = this.intervalMin;
            if (GameMgr.screenType == 1 /* VERTICAL */) {
                max = Math.floor(max * .9);
                min = Math.floor(min * .9);
            }
            this.nextShowStar = egret.getTimer() + gMath.getRandomInteger(max, min);
        };
        StarMgr.prototype.createStar = function (source) {
            var star;
            if (this._starPool && this._starPool.length > 0) {
                star = this._starPool.shift();
                star.source = source;
            }
            else {
                star = new eui.Image(source);
            }
            return star;
        };
        StarMgr.prototype.removeStar = function (star) {
            gTween.rmTweens(star);
            egret.clearTimeout(star["hideDelay"]);
            gComMgr.rmObj(star);
            gDevelop.arrDelVal(this._curAllStar, star);
            this._starPool.push(star);
        };
        /** 添加闪烁物 */
        StarMgr.prototype.addStar = function () {
            var _this = this;
            if (!this.isShowed) {
                return;
            }
            if (this.nextShowStar >= egret.getTimer()) {
                return;
            }
            else {
                this.updateNextShow();
            }
            if (this.starMaxCnt != void 0 && this.starMaxCnt <= this._curAllStar.length) {
                return;
            }
            //初始化
            var source = gMath.getRandomAnswer.apply(gMath, this.starAnswers);
            var star = this.createStar(source);
            gComMgr.setObjAnchor(star);
            star.visible = false;
            /** 开始闪烁 */
            var start = function () {
                //显示
                star.alpha = 0;
                star.scaleX = star.scaleY = 0;
                star.visible = true;
                var scale = gMath.getRandom(_this.scaleMax, _this.scaleMin) / (_this.isAdaptiveScale && _this.con.parent ? _this.con.parent.scaleX : 1);
                var showTime = gMath.getRandomInteger(150, 50);
                egret.Tween.get(star).to({ scaleX: scale, scaleY: scale, alpha: 1 }, showTime).call(function () {
                    //呼吸
                    var breateTime = gMath.getRandomInteger(800, 300);
                    var alpha = gMath.getRandom(0.6, 0.2);
                    egret.Tween.get(star, { loop: true }).to({ alpha: alpha }, breateTime).to({ alpha: 1 }, breateTime);
                });
                //旋转
                if (_this.isRotate) {
                    var rotationTime = gMath.getRandomInteger(3000, 1200);
                    egret.Tween.get(star, { loop: true }).to({ rotation: 360 }, rotationTime);
                }
                //消失
                var waitTime = gMath.getRandomInteger(2500, 1000);
                var hideTime = gMath.getRandomInteger(500, 300);
                star["hideDelay"] = egret.setTimeout(function () {
                    egret.Tween.get(star).to({ scaleX: 0, scaleY: 0, alpha: 0 }, hideTime).call(function () {
                        _this.removeStar(star);
                    });
                }, _this, waitTime);
            };
            /** 更新位置 */
            var updatePos = function (star) {
                star.x = gMath.getRandomInteger(_this.con.width);
                star.y = gMath.getRandomInteger(_this.con.height);
                //筛去无效区域
                // if (star.x < 240 && star.y < 340) {
                // 	updatePos.call(this, star);
                // } else {
                start.call(_this);
                // }
            };
            updatePos.call(this, star);
            this.con.addChild(star);
            this._curAllStar.push(star);
        };
        return StarMgr;
    }());
    util.StarMgr = StarMgr;
    __reflect(StarMgr.prototype, "util.StarMgr");
})(util || (util = {}));
//# sourceMappingURL=StarMgr.js.map