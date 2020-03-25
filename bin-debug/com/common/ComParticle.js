var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var com;
(function (com) {
    /**
     * 粒子对象
     */
    var ComParticle = (function () {
        /**
         * 构造一个粒子对象
         */
        function ComParticle() {
        }
        /**
         * 创建粒子
         */
        ComParticle.prototype.create = function () {
            if (!this.system) {
                var texture = RES.getRes(this.resName + "_png");
                var config = RES.getRes(this.cfgName + "_json");
                this.system = new particle.GravityParticleSystem(texture, config);
                this.system.touchEnabled = false;
                this.setPos();
            }
            this.parent.addChild(this.system);
        };
        /**
         * 设置数据
         * @param {egret.DisplayObjectContainer} parent 父级对象容器
         * @param {string} resName 资源名称
         */
        ComParticle.prototype.setData = function (parent, resName, cfgName) {
            this.parent = parent;
            this.resName = resName;
            this.cfgName = cfgName || resName;
            this.create();
        };
        /**
         * 开始播放粒子
         * @param {number} duration 粒子出现总时间
         */
        ComParticle.prototype.start = function (duration) {
            this.system.start(duration);
        };
        /**
         * 停止创建粒子
         * @param {boolean} clear 是否清除掉现有粒子
         */
        ComParticle.prototype.stop = function (clear) {
            this.system.stop(clear);
        };
        /**
         * 更换粒子纹理
         * @param {string} resName 资源名称
         */
        ComParticle.prototype.change = function (resName) {
            this.resName = resName;
            var texture = RES.getRes(this.resName + "_png");
            this.system.changeTexture(texture);
        };
        /**
         * 设置层级
         */
        ComParticle.prototype.setIndex = function (index) {
            if (!this.system || !this.system.parent) {
                return;
            }
            this.system.parent.setChildIndex(this.system, index);
        };
        /**
         * 设置粒子位置
         */
        ComParticle.prototype.setPos = function (x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.system.x = x;
            this.system.y = y;
        };
        /**
         * 设置粒子系统最大粒子数，超过该数量将不会继续创建粒子，取值范围[1,Number.MAX_VALUE]
         */
        ComParticle.prototype.setMaxParticle = function (max) {
            this.system.maxParticles = max;
        };
        /**
         * 设置缩放值
         */
        ComParticle.prototype.setScale = function (x, y) {
            if (x === void 0) { x = 1; }
            if (y === void 0) { y = 1; }
            this.system.scaleX = x;
            this.system.scaleY = y;
        };
        /**
         * 设置角度
         */
        ComParticle.prototype.setRotation = function (rotation) {
            if (rotation === void 0) { rotation = 0; }
            this.system.rotation = rotation;
        };
        /**
         * 更新粒子发射位置x
         */
        ComParticle.prototype.updateEmitterX = function (x) {
            this.system.emitterX = x;
        };
        /**
         * 更新粒子发射位置y
         */
        ComParticle.prototype.updateEmitterY = function (y) {
            this.system.emitterY = y;
        };
        return ComParticle;
    }());
    com.ComParticle = ComParticle;
    __reflect(ComParticle.prototype, "com.ComParticle");
})(com || (com = {}));
//# sourceMappingURL=ComParticle.js.map