namespace data {
	/**
	 * 漂浮物数据
	 */
	export class FloatData {
		public floatAnswers: string[]; //漂浮物资源名称配置
		public dires: string[]; //出生方向
		public speedMax: number; //漂浮物速度值范围，最大值
		public speedMin: number; //漂浮物速度值范围，最小值
		public rotateMax: number; //漂浮物角度值范围，最大值
		public rotateMin: number; //漂浮物角度值范围，最小值
		public rotateDiff: number; //漂浮物角度值，变化差值
		public alphaMax: number; //漂浮物透明度范围，最大值
		public alphaMin: number; //漂浮物透明度范围，最小值
		public alphaDiff: number; //漂浮物透明度，变化差值
		public scaleMax: number; //漂浮物缩放值范围，最大值
		public scaleMin: number; //漂浮物缩放值范围，最小值
		public scaleDiff: number; //漂浮物缩放值，变化差值

		public isAllAlpha: boolean; //漂浮物是否整体改变透明度
		public isAdaptiveScale: boolean; //漂浮物是否自适应父级缩放
		public floatMaxCnt: number; //漂浮物最大数量

		public constructor() {

		}

		/**
		 * 设置数据
		 * @param {...} cfg 漂浮物数据
		 */
		public setData(cfg?: { floatAnswers: string[], dires?: string[], speedMax?: number, speedMin?: number, rotateMax?: number, rotateMin?: number, rotateDiff?: number, alphaMax?: number, alphaMin?: number, alphaDiff?: number, scaleMax?: number, scaleMin?: number, scaleDiff?: number, isAllAlpha?: boolean, isAdaptiveScale?: boolean, floatMaxCnt?: number }) {
			this.updateData(cfg, false);

			this.speedMax = this.speedMax != void 0 ? this.speedMax : 10;
			this.rotateMax = this.rotateMax != void 0 ? this.rotateMax : 0;
			this.rotateDiff = this.rotateDiff != void 0 ? this.rotateDiff : .1;
			this.alphaMax = this.alphaMax != void 0 ? this.alphaMax : 1;
			this.alphaDiff = this.alphaDiff != void 0 ? this.alphaDiff : .01;
			this.scaleMax = this.scaleMax != void 0 ? this.scaleMax : 1;
			this.scaleDiff = this.scaleDiff != void 0 ? this.scaleDiff : .005;

			this.initDefault();
		}

		/**
		 * 更新漂浮物数据
		 * @param {...} cfg 漂浮物数据
		 * @param {boolean} isInitDefault = true 是否初始化默认值
		 */
		public updateData(cfg?: { floatAnswers: string[], dires?: string[], speedMax?: number, speedMin?: number, rotateMax?: number, rotateMin?: number, rotateDiff?: number, alphaMax?: number, alphaMin?: number, alphaDiff?: number, scaleMax?: number, scaleMin?: number, scaleDiff?: number, isAllAlpha?: boolean, isAdaptiveScale?: boolean, floatMaxCnt?: number }, isInitDefault: boolean = true) {
			if (cfg) {
				if (cfg.floatAnswers != void 0) { this.floatAnswers = cfg.floatAnswers; }
				if (cfg.dires != void 0) { this.dires = cfg.dires; }
				if (cfg.speedMax != void 0) { this.speedMax = cfg.speedMax; }
				if (cfg.speedMin != void 0) { this.speedMin = cfg.speedMin; }
				if (cfg.rotateMax != void 0) { this.rotateMax = cfg.rotateMax; }
				if (cfg.rotateMin != void 0) { this.rotateMin = cfg.rotateMin; }
				if (cfg.rotateDiff != void 0) { this.rotateDiff = cfg.rotateDiff; }
				if (cfg.alphaMax != void 0) { this.alphaMax = cfg.alphaMax; }
				if (cfg.alphaMin != void 0) { this.alphaMin = cfg.alphaMin; }
				if (cfg.alphaDiff != void 0) { this.alphaDiff = cfg.alphaDiff; }
				if (cfg.scaleMax != void 0) { this.scaleMax = cfg.scaleMax; }
				if (cfg.scaleMin != void 0) { this.scaleMin = cfg.scaleMin; }
				if (cfg.scaleDiff != void 0) { this.scaleDiff = cfg.scaleDiff; }
				if (cfg.isAllAlpha != void 0) { this.isAllAlpha = cfg.isAllAlpha; }
				if (cfg.isAdaptiveScale != void 0) { this.isAdaptiveScale = cfg.isAdaptiveScale; }
				if (cfg.floatMaxCnt != void 0) { this.floatMaxCnt = cfg.floatMaxCnt; }
			}
			if (isInitDefault) {
				this.initDefault();
			}
		}

		/** 初始化默认值 */
		private initDefault() {
			this.speedMin = this.speedMin != void 0 ? this.speedMin : this.speedMax;
			this.rotateMin = this.rotateMin != void 0 ? this.rotateMin : this.rotateMax;
			this.alphaMin = this.alphaMin != void 0 ? this.alphaMin : this.alphaMax;
			this.scaleMin = this.scaleMin != void 0 ? this.scaleMin : this.scaleMax;
		}
	}
}