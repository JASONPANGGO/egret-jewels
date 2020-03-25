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
     * 模仿粒子对象
     */
    var ComParticleImitate = (function (_super) {
        __extends(ComParticleImitate, _super);
        function ComParticleImitate() {
            var _this = _super.call(this) || this;
            _this.rangeX = 300;
            _this.rangeY = 0;
            _this.goalX = 0;
            _this.goalY = 0;
            _this.textureName = "";
            _this.liziWidth = 0;
            _this.liziHeight = 0;
            _this.liziScale = 1;
            _this.zhongliY = 0;
            _this.speedY = 1;
            _this.speedRangeY = 1;
            _this.speedX = 2;
            _this.speedRangeX = 2;
            _this.life = 10000;
            _this.createtime = 100;
            _this.lizinum = 2;
            _this.touchEnabled = _this.touchChildren = false;
            return _this;
        }
        ComParticleImitate.prototype.setData = function (rangeX, rangeY, goalX, goalY, textureName, width, height, scale, zhongliY, speedY, speedRangeY, speedX, speedRangeX, life, createtime, lizinum) {
            if (zhongliY === void 0) { zhongliY = 0; }
            if (speedY === void 0) { speedY = 2; }
            if (speedRangeY === void 0) { speedRangeY = 1; }
            if (speedX === void 0) { speedX = 2; }
            if (speedRangeX === void 0) { speedRangeX = 2; }
            if (life === void 0) { life = 10000; }
            if (createtime === void 0) { createtime = 100; }
            if (lizinum === void 0) { lizinum = 2; }
            this.lizinum = lizinum;
            this.rangeX = rangeX;
            this.rangeY = rangeY;
            this.goalX = goalX;
            this.goalY = goalY;
            this.textureName = textureName;
            this.liziWidth = width;
            this.liziHeight = height;
            this.liziScale = scale;
            this.zhongliY = zhongliY;
            this.speedY = speedY;
            this.speedRangeY = speedRangeY;
            this.speedX = speedX;
            this.speedRangeX = speedRangeX;
            this.life = life;
            this.createtime = createtime;
        };
        ComParticleImitate.prototype.start = function () {
            for (var i = 0; i < this.lizinum; i++) {
                var img = new FlyObj(this.goalX, this.goalY, this.textureName, this.liziWidth, this.liziHeight, this.liziScale, this.zhongliY, this.speedY, this.speedRangeY, this.speedX, this.speedRangeX, this.life);
                this.addChild(img);
                img.x = -this.rangeX / 2 + this.rangeX / 2 * Math.random();
                img.y = -this.rangeY / 2 + this.rangeY / 2 * Math.random();
            }
        };
        return ComParticleImitate;
    }(egret.Sprite));
    com.ComParticleImitate = ComParticleImitate;
    __reflect(ComParticleImitate.prototype, "com.ComParticleImitate");
    /**
     * 飞行对象
     */
    var FlyObj = (function (_super) {
        __extends(FlyObj, _super);
        function FlyObj(goalX, goalY, textureName, width, height, scale, zl, speedY, speedRangeY, speedX, speedRangeX, life) {
            if (zl === void 0) { zl = 0; }
            if (speedY === void 0) { speedY = 1; }
            if (speedRangeY === void 0) { speedRangeY = 1; }
            if (speedX === void 0) { speedX = 1; }
            if (speedRangeX === void 0) { speedRangeX = 1; }
            var _this = _super.call(this) || this;
            _this.rangeX = 0;
            _this.rangeY = 0;
            _this.goalX = 0;
            _this.goalY = 0;
            _this.zl = 0;
            _this.goalX = goalX;
            _this.goalY = goalY;
            _this.source = textureName;
            _this.width = width;
            _this.height = height;
            _this.scaleX = _this.scaleY = scale - 0.01 + 0.01 * Math.random();
            _this.speedY = Math.random() * speedRangeY + speedY;
            _this.speedX = Math.random() * speedRangeX + speedX;
            _this.zl = zl;
            _this.life = life;
            _this.addEventListener(egret.Event.ENTER_FRAME, _this.update, _this);
            _this.createTime = egret.getTimer();
            return _this;
        }
        FlyObj.prototype.play = function () {
            var _this = this;
            egret.Tween.get(this).to({
                x: this.goalX,
                y: this.goalY
            }, this.life * 2 / 5).call(function () {
                _this.parent.removeChild(_this);
                egret.Tween.removeTweens(_this);
            }, this);
        };
        FlyObj.prototype.update = function () {
            this.alpha -= 0.01;
            this.y += this.speedY;
            this.x += this.speedX;
            if (egret.getTimer() - this.createTime >= this.life * 3 / 5) {
                this.play();
                this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
            }
            this.speedY += this.zl;
        };
        return FlyObj;
    }(eui.Image));
    __reflect(FlyObj.prototype, "FlyObj");
})(com || (com = {}));
//# sourceMappingURL=ComParticleImitate.js.map