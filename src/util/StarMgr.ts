namespace util {
	/**
	 * 闪烁物管理器
	 */
	export class StarMgr {
		public con: egret.DisplayObjectContainer; //闪烁物容器

		private starAnswers: string[]; //闪烁物资源名称配置
		private intervalMax: number; //下次显示闪烁物，时间间隔范围，最大值
		private intervalMin: number; //下次显示闪烁物，时间间隔范围，最小值
		private scaleMax: number; //闪烁物缩放值范围，最大值
		private scaleMin: number; //闪烁物缩放值范围，最小值
		private isRotate: boolean; //闪烁物是否旋转
		private isAdaptiveScale: boolean; //闪烁物是否自适应父级缩放
		private starMaxCnt: number; //闪烁物最大数量

		public constructor(con: egret.DisplayObjectContainer) {
			this.con = con;
		}

		private update(timeStamp: number): boolean {
			this.addStar();
			return;
		}

		private isShowed: boolean;

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
		public show(starAnswers: string[], cfg?: { intervalMax?: number, intervalMin?: number, scaleMax?: number, scaleMin?: number, isRotate?: boolean, isAdaptiveScale?: boolean, starMaxCnt?: number }) {
			this.updateData(starAnswers, cfg);

			this.intervalMax = this.intervalMax != void 0 ? this.intervalMax : 300;
			this.intervalMin = this.intervalMin != void 0 ? this.intervalMin : 100;
			this.scaleMax = this.scaleMax != void 0 ? this.scaleMax : 1;
			this.scaleMin = this.scaleMin != void 0 ? this.scaleMin : .3;

			this.isShowed = true;
			this.addStar();
			this.updateNextShow();
			egret.startTick(this.update, this);
		}

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
		public updateData(starAnswers?: string[], cfg?: { intervalMax?: number, intervalMin?: number, scaleMax?: number, scaleMin?: number, isRotate?: boolean, isAdaptiveScale?: boolean, starMaxCnt?: number }) {
			if (starAnswers) {
				this.starAnswers = starAnswers;
			}
			if (cfg) {
				if (cfg.intervalMax != void 0) { this.intervalMax = cfg.intervalMax; }
				if (cfg.intervalMin != void 0) { this.intervalMin = cfg.intervalMin; }
				if (cfg.scaleMax != void 0) { this.scaleMax = cfg.scaleMax; }
				if (cfg.scaleMin != void 0) { this.scaleMin = cfg.scaleMin; }
				if (cfg.isRotate != void 0) { this.isRotate = cfg.isRotate; }
				if (cfg.isAdaptiveScale != void 0) { this.isAdaptiveScale = cfg.isAdaptiveScale; }
				if (cfg.starMaxCnt != void 0) { this.starMaxCnt = cfg.starMaxCnt; }
			}
		}

		/**
		 * 隐藏闪烁物
		 * @param {boolean} clearAll = true 是否清除所有
		 */
		public hide(clearAll: boolean = true) {
			egret.stopTick(this.update, this);
			this.isShowed = false;
			if (clearAll) {
				const i: number = 0;
				const _curAllStar = this._curAllStar;
				let star = _curAllStar.length > i ? _curAllStar[i] : null;
				while (star) {
					this.removeStar(star);
					star = _curAllStar.length > i ? _curAllStar[i] : null;
				}
			}
		}

		private nextShowStar: number;
		private updateNextShow() {
			let max: number = this.intervalMax;
			let min: number = this.intervalMin;
			if (GameMgr.screenType == gConst.screenType.VERTICAL) {
				max = Math.floor(max * .9);
				min = Math.floor(min * .9);
			}
			this.nextShowStar = egret.getTimer() + gMath.getRandomInteger(max, min);
		}

		private _starPool: eui.Image[] = [];

		private createStar(source?: string) {
			let star: eui.Image;
			if (this._starPool && this._starPool.length > 0) {
				star = this._starPool.shift();
				star.source = source;
			} else {
				star = new eui.Image(source);
			}
			return star;
		}

		private removeStar(star: eui.Image) {
			gTween.rmTweens(star);
			egret.clearTimeout(star["hideDelay"]);
			gComMgr.rmObj(star);
			gDevelop.arrDelVal(this._curAllStar, star);
			this._starPool.push(star);
		}

		private _curAllStar: eui.Image[] = [];

		/** 添加闪烁物 */
		private addStar() {
			if (!this.isShowed) {
				return;
			}
			if (this.nextShowStar >= egret.getTimer()) {
				return;
			} else {
				this.updateNextShow();
			}

			if (this.starMaxCnt != void 0 && this.starMaxCnt <= this._curAllStar.length) {
				return;
			}

			//初始化
			const source: string = gMath.getRandomAnswer(...this.starAnswers);
			const star: eui.Image = this.createStar(source);
			gComMgr.setObjAnchor(star);
			star.visible = false;

			/** 开始闪烁 */
			const start: Function = () => {
				//显示
				star.alpha = 0;
				star.scaleX = star.scaleY = 0;
				star.visible = true;
				const scale: number = gMath.getRandom(this.scaleMax, this.scaleMin) / (this.isAdaptiveScale && this.con.parent ? this.con.parent.scaleX : 1);
				const showTime: number = gMath.getRandomInteger(150, 50);
				egret.Tween.get(star).to({ scaleX: scale, scaleY: scale, alpha: 1 }, showTime).call(() => {
					//呼吸
					const breateTime: number = gMath.getRandomInteger(800, 300);
					const alpha: number = gMath.getRandom(0.6, 0.2);
					egret.Tween.get(star, { loop: true }).to({ alpha: alpha }, breateTime).to({ alpha: 1 }, breateTime);
				});
				//旋转
				if (this.isRotate) {
					const rotationTime: number = gMath.getRandomInteger(3000, 1200);
					egret.Tween.get(star, { loop: true }).to({ rotation: 360 }, rotationTime);
				}
				//消失
				const waitTime: number = gMath.getRandomInteger(2500, 1000);
				const hideTime: number = gMath.getRandomInteger(500, 300);
				star["hideDelay"] = egret.setTimeout(() => {
					egret.Tween.get(star).to({ scaleX: 0, scaleY: 0, alpha: 0 }, hideTime).call(() => {
						this.removeStar(star);
					});
				}, this, waitTime);
			};

			/** 更新位置 */
			const updatePos: Function = (star: eui.Image) => {
				star.x = gMath.getRandomInteger(this.con.width);
				star.y = gMath.getRandomInteger(this.con.height);
				//筛去无效区域
				// if (star.x < 240 && star.y < 340) {
				// 	updatePos.call(this, star);
				// } else {
				start.call(this);
				// }
			}
			updatePos.call(this, star);
			this.con.addChild(star);
			this._curAllStar.push(star);
		}
	}
}