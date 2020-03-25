var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var util;
(function (util) {
    /**
     * 震动工具
     * @author chenkai
     * [url=home.php?mod=space&uid=81950]@since[/url] 2017/5/24
     *
     * Example:
     * 震动目标obj，1秒内震动10次，震动最大距离10
     * ShakeTool.getInstance().shakeObj(obj, 1, 10, 10);
     */
    var ShakeTool = (function () {
        function ShakeTool() {
            this.count = 0; //计时器次数
            this.timer = new egret.Timer(1000);
        }
        /**
         * 震动显示对象
         * @param {egret.DisplayObject} target 震动目标对象
         * @param {number} time 震动持续时长（毫秒）
         * @param {number} rate 震动频率(一秒震动多少次)
         * @param {number} maxDisX 震动x轴最大距离
         * @param {number} maxDisY 震动y轴最大距离
         * @param {number} orgX 原来的x轴
         * @param {number} orgY 原来的y轴
         */
        ShakeTool.prototype.shakeObj = function (target, time, rate, maxDisX, maxDisY, orgX, orgY) {
            this.target = target;
            gTween.rmTweens(this.target);
            if (orgX != void 0) {
                target.x = orgX;
            }
            if (orgY != void 0) {
                target.y = orgY;
            }
            this.initX = target.x;
            this.initY = target.y;
            this.maxDisX = maxDisX;
            this.maxDisY = maxDisY;
            this.count = time / 1000 * rate;
            this.rate = rate;
            this.timer.delay = 1000 / rate;
            this.timer.repeatCount = this.count;
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.shaking, this);
            this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.shakeComplete, this);
            this.timer.reset();
            this.timer.start();
        };
        /**
         * 震动中
         */
        ShakeTool.prototype.shaking = function () {
            this.target.x = this.initX - this.maxDisX + Math.random() * this.maxDisX * 2;
            this.target.y = this.initY - this.maxDisY + Math.random() * this.maxDisY * 2;
            gTween.tween(this.target, void 0, {
                props: { x: this.initX, y: this.initY },
                duration: 999 / this.rate
            });
        };
        /**
         * 震动完成
         */
        ShakeTool.prototype.shakeComplete = function () {
            if (this.target) {
                gTween.rmTweens(this.target);
                this.target.x = this.initX;
                this.target.y = this.initY;
            }
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.shaking, this);
            this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.shakeComplete, this);
            this.target.dispatchEventWith(egret.Event.COMPLETE);
        };
        /**
         * 停止震动
        */
        ShakeTool.prototype.stop = function () {
            this.shakeComplete();
        };
        return ShakeTool;
    }());
    util.ShakeTool = ShakeTool;
    __reflect(ShakeTool.prototype, "util.ShakeTool");
})(util || (util = {}));
//# sourceMappingURL=ShakeTool.js.map