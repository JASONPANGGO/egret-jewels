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
     * 挖空遮罩组件(灯泡、聚焦、矩形挖空突出提示效果)
     */
    var ComLightMask = (function (_super) {
        __extends(ComLightMask, _super);
        // private lightMatrix:egret.Matrix;
        function ComLightMask() {
            var _this = _super.call(this) || this;
            _this.blendMode = egret.BlendMode.ERASE;
            // this.lightMatrix = new egret.Matrix();
            _this.cirleLight = new egret.Shape();
            _this.cirleLight.blendMode = egret.BlendMode.ERASE;
            _this.addChild(_this.cirleLight);
            return _this;
        }
        /**
         * 显示遮罩
         */
        ComLightMask.prototype.show = function () {
            this.visible = true;
        };
        /**
         * 隐藏遮罩
         */
        ComLightMask.prototype.hide = function () {
            this.visible = false;
        };
        /**
         * 设置光圈的大小
         * @param {number} width 圆的半径、矩形的宽
         * @param {number} type 0:圆 1:矩形
         * @param {number} height 矩形的高，不设置默认等于宽
         * @param {number} ellipseWidth 用于绘制圆角的椭圆的宽度（以像素为单位）。
         * @param {number} ellipseHeight 用于绘制圆角的椭圆的高度（以像素为单位）。 （可选）如果未指定值，则默认值与为 ellipseWidth 参数提供的值相匹配。
         */
        ComLightMask.prototype.setLightSize = function (width, type, height, ellipseWidth, ellipseHeight) {
            if (type === void 0) { type = 0; }
            if (height === void 0) { height = width; }
            // this.lightMatrix.createGradientBox(width * 2, width * 2, 0, -width, -width);
            this.cirleLight.graphics.clear();
            // this.cirleLight.graphics.beginGradientFill(egret.GradientType.RADIAL, [0xffffff, 0xd3d3d3, 0x888888, 0x000000], [1, 0.9, 0.2, 0], [0, 50, 180, 255], this.lightMatrix);//这个渐变的参数是自己调的，可能不太理想，谁有好的参数可以留言，谢谢啦。
            this.cirleLight.graphics.beginFill(0);
            if (type == 1) {
                this.cirleLight.graphics.drawRoundRect(0, 0, width, height, ellipseWidth, ellipseHeight);
            }
            else {
                this.cirleLight.graphics.drawCircle(0, 0, width);
            }
            this.cirleLight.graphics.endFill();
            this.show();
        };
        /**
         * 设置光圈的位置
         */
        ComLightMask.prototype.setLightPos = function (posx, posy) {
            this.cirleLight.x = posx;
            this.cirleLight.y = posy;
        };
        /**
         * 设置背景框的大小
         * @param {number} maskW 遮罩宽度
         * @param {number} maskH 遮罩高度
         * @param {number} maskA = 1 遮罩透明度
         */
        ComLightMask.prototype.setMaskSize = function (maskW, maskH, maskA) {
            if (maskA === void 0) { maskA = 1; }
            this.graphics.clear();
            this.graphics.beginFill(0x000000, maskA);
            this.graphics.drawRect(0, 0, maskW, maskH);
            this.graphics.endFill();
        };
        return ComLightMask;
    }(egret.Sprite));
    com.ComLightMask = ComLightMask;
    __reflect(ComLightMask.prototype, "com.ComLightMask");
})(com || (com = {}));
//# sourceMappingURL=ComLightMask.js.map