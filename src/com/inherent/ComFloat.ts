namespace com {
	/**
	 * 漂浮物组件（如：云朵、海浪）
	 */
	export class ComFloat extends com.ComFile {
		public con: eui.Group;
		public conFloat: eui.Group;
		public float: eui.Image;

		private data: data.FloatData; //漂浮物数据

		private _rotate: number;
		private _speed: number;
		private _die: boolean;
		private _dire: string;

		public constructor() {
			super();
			this.skinName = skins.ComFloat;
		}

		/* =========== 生命周期结构代码-start =========== */
		/**
		 * 初始化
		 * @param {any[]} args 构建传参会通过init()传过去
		 */
		protected init(data: data.FloatData) {
			// console.info("init", ...args);
			this.data = data;
		}

		/** 首次创建组件时调用 */
		protected load() {
			// console.info("load");
			this.touchEnabled = this.touchChildren = false;
		}

		/** 每次创建组件都会调用 */
		protected start() {
			// console.info("start");
			// this.con_cloud.scaleX = 1;
			const data = this.data;

			const float = this.float;
			const conFloat = this.conFloat;
			const con = this.con;

			float.source = gMath.getRandomAnswer(...data.floatAnswers);
			if (data.isAdaptiveScale && this.parent) {
				float.scaleX = float.scaleY = this.parent.scaleX;
			}
			gComMgr.setItemAnchor(float);
			gComMgr.setItemAnchor(conFloat);
			gComMgr.setItemAnchor(con);

			this.speed(gMath.getRandomInteger(data.speedMax, data.speedMin));
			this.rotateDir = gMath.getRandomAnswer(1, -1);
			this.rotate(gMath.getRandomInteger(data.rotateMax, data.rotateMin));
			this.alphaDir = gMath.getRandomAnswer(1, -1);
			float.alpha = gMath.getRandom(data.alphaMax, data.alphaMin);
			this.scaleDir = gMath.getRandomAnswer(1, -1);
			float.scaleX = float.scaleY = gMath.getRandom(data.scaleMax, data.scaleMin);
			this.die(false);
		}

		/** 每次结束组件都会调用 */
		protected stop() {
			// console.info("stop");
		}

		/** 监听组件，每帧都会调用 */
		protected update() {
			// console.info("update");
			this.yoyoRotate();
			this.yoyoAlpha();
			this.yoyoScale();
		}

		/** 注册事件 */
		protected addEvent() {
			// console.info("addEvent");
		}

		/** 移除事件 */
		protected removeEvent() {
			// console.info("removeEvent");
		}

		/** 窗口大小改变时调用 */
		protected resizeView(event: egret.Event) {
			// console.info("resizeView", event, GameMgr.gameview.width, GameMgr.gameview.height);
			if (GameMgr.screenType == gConst.screenType.VERTICAL) {
				//竖屏
				switch (GameMgr.mobileType) {
					//iPhoneX或以上
					case gConst.mobileType.IPHONE_X:
						break;
					//iPhone8或以下
					case gConst.mobileType.IPHONE_8:
						break;
					//iPad或其它
					case gConst.mobileType.IPAD:
						break;
				}
			} else {
				//横屏
				switch (GameMgr.mobileType) {
					//iPhoneX或以上
					case gConst.mobileType.IPHONE_X:
						break;
					//iPhone8或以下
					case gConst.mobileType.IPHONE_8:
						break;
					//iPad或其它
					case gConst.mobileType.IPAD:
						break;
				}
			}
		}

		/** 屏幕横竖屏转换时调用 */
		protected rotateView(event: egret.Event) {
			// console.info("rotateView", event, GameMgr.screenType, GameMgr.mobileType);
			if (GameMgr.screenType == gConst.screenType.VERTICAL) {
				//竖屏
			} else {
				//横屏
			}
		}
		/* =========== 生命周期结构代码-end =========== */


		/* =========== 业务代码-start =========== */
		/** 设置or获取漂浮物速度 */
		public speed(speed?: number): number {
			if (speed != void 0) {
				this._speed = speed;
				// this.swing();
			} else {
				return this._speed;
			}
		}

		/** 设置or获取漂浮物角度 */
		public rotate(rotate?: number): number {
			if (rotate != void 0) {
				this._rotate = rotate;
				this.float.rotation = this._rotate;
			} else {
				return this._rotate;
			}
		}

		private rotateDir: number; //角度值改变方向（递增、递减）

		private yoyoRotate() {
			const data = this.data;
			if (data.rotateMax == data.rotateMin) {
				return;
			}

			const float = this.float;

			let diffR: number = data.rotateDiff;
			let realR: number = this.rotate() + diffR * this.rotateDir;
			if (realR < data.rotateMin || realR > data.rotateMax) {
				this.rotateDir *= -1;
				diffR *= this.rotateDir;
				realR = this.rotate() + diffR;
			}
			this.rotate(realR)
		}

		private alphaDir: number; //透明度改变方向（递增、递减）

		private yoyoAlpha() {
			const data = this.data;
			if (data.isAllAlpha) {
				return;
			}
			if (data.alphaMax == data.alphaMin) {
				return;
			}

			const float = this.float;

			let diffA: number = data.alphaDiff;
			let realA: number = float.alpha + diffA * this.alphaDir;
			if (realA < data.alphaMin || realA >= data.alphaMax) {
				this.alphaDir *= -1;
				diffA *= this.alphaDir;
				realA = float.alpha + diffA;
			}
			float.alpha = realA;
		}

		private scaleDir: number; //缩放值改变方向（递增、递减）

		private yoyoScale() {
			const data = this.data;
			if (data.scaleMax == data.scaleMin) {
				return;
			}

			const float = this.float;

			let diffS: number = data.scaleDiff;
			let realS: number = float.scaleX + diffS * this.scaleDir;
			if (realS < data.scaleMin || realS > data.scaleMax) {
				this.scaleDir *= -1;
				diffS *= this.scaleDir;
				realS = float.scaleX + diffS;
			}
			float.scaleX = float.scaleY = realS;
		}

		/** 设置or获取漂浮物死亡状态 */
		public die(die?: boolean): boolean {
			if (die !== void 0) {
				this._die = die;
			} else {
				return this._die;
			}
		}

		/** 设置or获取漂浮物出生方向 */
		public dire(dire?: string): string {
			if (dire !== void 0) {
				this._dire = dire;
			} else {
				return this._dire;
			}
		}

		// private swing() {
		// 	gTween.loopScaleX(this.conFloat, 0.95, Math.ceil(5000 / this.speed()), 1);
		// }
		/* =========== 业务代码-end =========== */
	}
}