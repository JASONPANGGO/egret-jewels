var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var data;
(function (data) {
    /**
     * 漂浮物数据
     */
    var FloatData = (function () {
        function FloatData() {
        }
        /**
         * 设置数据
         * @param {...} cfg 漂浮物数据
         */
        FloatData.prototype.setData = function (cfg) {
            this.updateData(cfg, false);
            this.speedMax = this.speedMax != void 0 ? this.speedMax : 10;
            this.rotateMax = this.rotateMax != void 0 ? this.rotateMax : 0;
            this.rotateDiff = this.rotateDiff != void 0 ? this.rotateDiff : .1;
            this.alphaMax = this.alphaMax != void 0 ? this.alphaMax : 1;
            this.alphaDiff = this.alphaDiff != void 0 ? this.alphaDiff : .01;
            this.scaleMax = this.scaleMax != void 0 ? this.scaleMax : 1;
            this.scaleDiff = this.scaleDiff != void 0 ? this.scaleDiff : .005;
            this.initDefault();
        };
        /**
         * 更新漂浮物数据
         * @param {...} cfg 漂浮物数据
         * @param {boolean} isInitDefault = true 是否初始化默认值
         */
        FloatData.prototype.updateData = function (cfg, isInitDefault) {
            if (isInitDefault === void 0) { isInitDefault = true; }
            if (cfg) {
                if (cfg.floatAnswers != void 0) {
                    this.floatAnswers = cfg.floatAnswers;
                }
                if (cfg.dires != void 0) {
                    this.dires = cfg.dires;
                }
                if (cfg.speedMax != void 0) {
                    this.speedMax = cfg.speedMax;
                }
                if (cfg.speedMin != void 0) {
                    this.speedMin = cfg.speedMin;
                }
                if (cfg.rotateMax != void 0) {
                    this.rotateMax = cfg.rotateMax;
                }
                if (cfg.rotateMin != void 0) {
                    this.rotateMin = cfg.rotateMin;
                }
                if (cfg.rotateDiff != void 0) {
                    this.rotateDiff = cfg.rotateDiff;
                }
                if (cfg.alphaMax != void 0) {
                    this.alphaMax = cfg.alphaMax;
                }
                if (cfg.alphaMin != void 0) {
                    this.alphaMin = cfg.alphaMin;
                }
                if (cfg.alphaDiff != void 0) {
                    this.alphaDiff = cfg.alphaDiff;
                }
                if (cfg.scaleMax != void 0) {
                    this.scaleMax = cfg.scaleMax;
                }
                if (cfg.scaleMin != void 0) {
                    this.scaleMin = cfg.scaleMin;
                }
                if (cfg.scaleDiff != void 0) {
                    this.scaleDiff = cfg.scaleDiff;
                }
                if (cfg.isAllAlpha != void 0) {
                    this.isAllAlpha = cfg.isAllAlpha;
                }
                if (cfg.isAdaptiveScale != void 0) {
                    this.isAdaptiveScale = cfg.isAdaptiveScale;
                }
                if (cfg.floatMaxCnt != void 0) {
                    this.floatMaxCnt = cfg.floatMaxCnt;
                }
            }
            if (isInitDefault) {
                this.initDefault();
            }
        };
        /** 初始化默认值 */
        FloatData.prototype.initDefault = function () {
            this.speedMin = this.speedMin != void 0 ? this.speedMin : this.speedMax;
            this.rotateMin = this.rotateMin != void 0 ? this.rotateMin : this.rotateMax;
            this.alphaMin = this.alphaMin != void 0 ? this.alphaMin : this.alphaMax;
            this.scaleMin = this.scaleMin != void 0 ? this.scaleMin : this.scaleMax;
        };
        return FloatData;
    }());
    data.FloatData = FloatData;
    __reflect(FloatData.prototype, "data.FloatData");
})(data || (data = {}));
//# sourceMappingURL=FloatData.js.map