namespace com {
	/**
	 * 挖空遮罩组件(灯泡、聚焦、矩形挖空突出提示效果)
	 */
	export class ComLightMask extends egret.Sprite {
		public cirleLight: egret.Shape;
		// private lightMatrix:egret.Matrix;

		public constructor() {
			super();
			this.blendMode = egret.BlendMode.ERASE;
			// this.lightMatrix = new egret.Matrix();
			this.cirleLight = new egret.Shape();
			this.cirleLight.blendMode = egret.BlendMode.ERASE;
			this.addChild(this.cirleLight);
		}

		/**
		 * 显示遮罩
		 */
		public show() {
			this.visible = true;
		}

		/**
		 * 隐藏遮罩
		 */
		public hide() {
			this.visible = false;
		}

		/**
		 * 设置光圈的大小
		 * @param {number} width 圆的半径、矩形的宽
		 * @param {number} type 0:圆 1:矩形
		 * @param {number} height 矩形的高，不设置默认等于宽
         * @param {number} ellipseWidth 用于绘制圆角的椭圆的宽度（以像素为单位）。
         * @param {number} ellipseHeight 用于绘制圆角的椭圆的高度（以像素为单位）。 （可选）如果未指定值，则默认值与为 ellipseWidth 参数提供的值相匹配。
		 */
		public setLightSize(width: number, type: number = 0, height: number = width, ellipseWidth?: number, ellipseHeight?: number) {
			// this.lightMatrix.createGradientBox(width * 2, width * 2, 0, -width, -width);
			this.cirleLight.graphics.clear();
			// this.cirleLight.graphics.beginGradientFill(egret.GradientType.RADIAL, [0xffffff, 0xd3d3d3, 0x888888, 0x000000], [1, 0.9, 0.2, 0], [0, 50, 180, 255], this.lightMatrix);//这个渐变的参数是自己调的，可能不太理想，谁有好的参数可以留言，谢谢啦。
			this.cirleLight.graphics.beginFill(0);
			if (type == 1) {
				this.cirleLight.graphics.drawRoundRect(0, 0, width, height, ellipseWidth, ellipseHeight);
			} else {
				this.cirleLight.graphics.drawCircle(0, 0, width);
			}
			this.cirleLight.graphics.endFill();
			this.show();
		}

		/**
		 * 设置光圈的位置
		 */
		public setLightPos(posx: number, posy: number) {
			this.cirleLight.x = posx;
			this.cirleLight.y = posy;
		}

		/**
		 * 设置背景框的大小
		 * @param {number} maskW 遮罩宽度
		 * @param {number} maskH 遮罩高度
		 * @param {number} maskA = 1 遮罩透明度
		 */
		public setMaskSize(maskW: number, maskH: number, maskA: number = 1) {
			this.graphics.clear();
			this.graphics.beginFill(0x000000, maskA);
			this.graphics.drawRect(0, 0, maskW, maskH);
			this.graphics.endFill();
		}
	}
}