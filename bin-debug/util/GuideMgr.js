var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var util;
(function (util) {
    /**
     * 引导组件管理器
     * @description 引导组件相关配置、管理接口
     */
    var GuideMgr = (function () {
        function GuideMgr() {
            this.maxStep = 2;
            this.delayTimer = 500;
            this.pressT = 100;
            this.liftT = 200;
            this._stepId = 1; //步骤ID
            /** 引导配置 */
            this.GuideCfg = {
                "1": { id: 1, target: ["6_0", "0_0", "0_6"], moveTime: 500, vertexTarget: ["6_0", "0_6"], items: ["6_0", "5_0", "4_0", "3_0", "2_0", "1_0", "0_0", "0_1", "0_2", "0_3", "0_4", "0_5", "0_6"], finish: false },
                "2": { id: 2, target: ["1_0", "1_1", "0_1", "0_0", "1_0"], lineGuide: true, isHeadAndTail: true, moveTime: 200, items: ["1_0", "1_1", "0_1", "0_0"], finish: false },
            };
        }
        GuideMgr.prototype.init = function () {
            this.stepId = 1;
            this.initGuide();
        };
        Object.defineProperty(GuideMgr.prototype, "stepId", {
            /** 获取步骤ID */
            get: function () {
                return this._stepId;
            },
            /** 设置步骤ID */
            set: function (_stepId) {
                this._stepId = _stepId;
            },
            enumerable: true,
            configurable: true
        });
        GuideMgr.prototype.initGuide = function () {
            for (var key in this.GuideCfg) {
                var guide = this.GuideCfg[key];
                if (!guide.finish) {
                    continue;
                }
                guide.finish = false;
            }
        };
        /**
         * 获取指定步骤引导数据
         * @param {number} id 指定引导步骤ID
         */
        GuideMgr.prototype.getGuideById = function (id) {
            if (id == void 0) {
                return;
            }
            return this.GuideCfg[id];
        };
        /**
         * 完成指定步骤引导
         * @param {number} id 指定引导步骤ID
         */
        GuideMgr.prototype.finishGuide = function (id) {
            if (id === void 0) { id = this.stepId; }
            var guide = this.getGuideById(id);
            if (!guide) {
                return;
            }
            guide.finish = true;
        };
        /** 最后一步引导是否完成 */
        GuideMgr.prototype.lastGuideFinish = function () {
            var guide = this.getGuideById(this.maxStep);
            if (!guide) {
                return;
            }
            return guide.finish;
        };
        GuideMgr.prototype.createHand = function (parent, exitAim) {
            var hand = new com.ComBones();
            hand.setData(parent, "guide", exitAim);
            hand.create();
            return hand;
        };
        return GuideMgr;
    }());
    util.GuideMgr = GuideMgr;
    __reflect(GuideMgr.prototype, "util.GuideMgr");
})(util || (util = {}));
//# sourceMappingURL=GuideMgr.js.map