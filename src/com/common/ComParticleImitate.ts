namespace com {
	/**
	 * 模仿粒子对象
	 */
	export class ComParticleImitate extends egret.Sprite {
		public rangeX: number = 300;
		public rangeY: number = 0;
		public goalX: number = 0;
		public goalY: number = 0;
		public textureName: string = "";
		public liziWidth: number = 0;
		public liziHeight: number = 0;
		public liziScale: number = 1;
		public zhongliY: number = 0;
		public speedY: number = 1;
		public speedRangeY: number = 1;
		public speedX: number = 2;
		public speedRangeX: number = 2;
		public life: number = 10000;
		private createtime: number = 100;
		private lizinum: number = 2;

		public constructor() {
			super();
			this.touchEnabled = this.touchChildren = false;
		}

		public setData(rangeX: number, rangeY: number, goalX: number, goalY: number, textureName: string, width: number, height: number, scale: number, zhongliY: number = 0, speedY: number = 2, speedRangeY: number = 1, speedX: number = 2, speedRangeX: number = 2, life: number = 10000, createtime: number = 100, lizinum: number = 2): void {
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
		}

		public start(): void {
			for (var i: number = 0; i < this.lizinum; i++) {
				var img: FlyObj = new FlyObj(this.goalX, this.goalY, this.textureName, this.liziWidth, this.liziHeight, this.liziScale, this.zhongliY, this.speedY, this.speedRangeY, this.speedX, this.speedRangeX, this.life);
				this.addChild(img);
				img.x = -this.rangeX / 2 + this.rangeX / 2 * Math.random();
				img.y = -this.rangeY / 2 + this.rangeY / 2 * Math.random();
			}
		}
	}

	/**
	 * 飞行对象
	 */
	class FlyObj extends eui.Image {
		private rangeX: number = 0;
		private rangeY: number = 0;
		private goalX: number = 0;
		private goalY: number = 0;
		private speedY: number;
		private speedX: number;
		private createTime: number;
		private zl: number = 0;
		private life: number;

		public constructor(goalX: number, goalY: number, textureName: string, width: number, height: number, scale: number, zl: number = 0, speedY: number = 1, speedRangeY: number = 1, speedX: number = 1, speedRangeX: number = 1, life: number) {
			super();
			this.goalX = goalX;
			this.goalY = goalY;
			this.source = textureName;
			this.width = width;
			this.height = height;
			this.scaleX = this.scaleY = scale - 0.01 + 0.01 * Math.random();
			this.speedY = Math.random() * speedRangeY + speedY;
			this.speedX = Math.random() * speedRangeX + speedX;
			this.zl = zl;
			this.life = life;
			this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
			this.createTime = egret.getTimer();
		}

		private play() {
			egret.Tween.get(this).to({
				x: this.goalX,
				y: this.goalY
			}, this.life * 2 / 5).call(() => {
				this.parent.removeChild(this);
				egret.Tween.removeTweens(this);
			}, this);
		}

		private update(): void {
			this.alpha -= 0.01;
			this.y += this.speedY;
			this.x += this.speedX;
			if (egret.getTimer() - this.createTime >= this.life * 3 / 5) {
				this.play();
				this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
			}
			this.speedY += this.zl;
		}
	}
}