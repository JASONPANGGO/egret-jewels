namespace com {
	/**
	 * 进度条组件
	 */
	export class ComProgress extends com.ComFile {
		public con: eui.Group;
		public conBar: eui.Group;
		public bar: eui.Image;
		// public people: com.ComMovieClip;
		// public word: eui.Image;

		// private _maxNum: number;
		// private _curNum: number;
		// private readonly barMinW: number = 20;
		// private readonly barMaxW: number = 600;

		public barCover: boolean; //进度条走完

		public constructor() {
			super();
			this.skinName = skins.ComProgress;
		}

		/* =========== 生命周期结构代码-start =========== */
		/**
		 * 初始化
		 * @param {any[]} args 构建传参会通过init()传过去
		 */
		protected init(...args: any[]) {
			// console.info("init", ...args);
		}

		/** 首次创建组件时调用 */
		protected load() {
			// console.info("load");
			// this.updateRender();
			const bar = this.bar;
			const conBar = this.conBar;
			const con = this.con;

			gComMgr.setObjSize(bar, true);
			gComMgr.setObjSize(conBar, true);
			gComMgr.setObjSize(con, true);

			this.initGraphics();
			// this.changeGraphics();
		}

		/** 每次创建组件都会调用 */
		protected start() {
			// console.info("start");
			// this.word.visible = false;
			// this.conBar.width = this.barMinW;
			// gTween.rmTweens(this.conBar);

			// this.people.open();
			// this.people.interval = 200;
			// this.people.setData([
			// 	new data.McData("walk", 2, "psmallgirl{1}_png"),
			// ]);
			// this.people.gotoAndStop("walk");
		}

		/** 每次结束组件都会调用 */
		protected stop() {
			// console.info("stop");
		}

		/** 监听组件，每帧都会调用 */
		protected update() {
			// console.info("update");
		}

		/** 注册事件 */
		protected addEvent() {
			// console.info("addEvent");
		}

		/** 移除事件 */
		protected removeEvent() {
			// console.info("removeEvent");
			// if (this.loadingTime) {
			// 	this.loadingTime.removeEventListener(egret.TimerEvent.TIMER, this.drawStart, this);
			// 	this.loadingTime.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.drawComplete, this);
			// }
		}

		/** 窗口大小改变时调用 */
		protected resizeView(event?: egret.Event) {
			// console.info("resizeView", event, GameMgr.gameview.width, GameMgr.gameview.height);

			const baseScale: number = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];
			this.scaleX = this.scaleY = baseScale;

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
		private _shape: egret.Shape;

		/** 初始化赋值 */
		private initGraphics(): void {
			const bar = this.bar;

			gComMgr.setObjSize(bar);
			const shape: egret.Shape = this._shape = new egret.Shape();
			shape.x = bar.x + bar.width / 2;
			shape.y = bar.y + bar.height / 2;
			bar.parent.addChildAt(shape, bar.parent.getChildIndex(bar));
			this.bar.mask = shape;
		}

		private barLoading: boolean; //进度条进行中

		startLoading() {
			if (this.barLoading) {
				return;
			}
			this.barLoading = true;
			const shape: egret.Shape = this._shape;
			this.resetLoading();
		}

		stopLoading() {
			if (!this.barLoading) {
				return;
			}
			this.barLoading = false;
			if (this.loadingTime) {
				this.loadingTime.removeEventListener(egret.TimerEvent.TIMER, this.drawStart, this);
				this.loadingTime.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.drawComplete, this);
				this.loadingTime.stop();
			}
			this.loadingAngle = 0;
			this.changeGraphics(this.loadingAngle);
		}

		private loadingTime: egret.Timer;
		resetLoading() {

			// const meanDelay: number = barTimes[lv - 1] * 1000 / 360;
			// const repeatCount = Math.floor(360 / meanDelay) // 360;
			// this.chgAngle = Math.floor(360 / repeatCount) // 1;
			// const delay = Math.floor(barTimes[lv - 1] * 1000 / repeatCount);

			const scale = 1;
			const range = 360;
			const time = 1000
			const delay = 18;
			const repeatCount = time / delay / scale;
			const speed = range / repeatCount;

			this.chgAngle = speed;

			// console.info("resetLoading id ==", comHouse.id, delay, repeatCount, this.chgAngle);

			if (this.loadingTime) {
				this.loadingTime.removeEventListener(egret.TimerEvent.TIMER, this.drawStart, this);
				this.loadingTime.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.drawComplete, this);
				this.loadingTime.stop();
				this.loadingTime = null;
			}

			if (!this.loadingTime) {
				this.loadingTime = new egret.Timer(delay, repeatCount + 1);
				this.loadingTime.removeEventListener(egret.TimerEvent.TIMER, this.drawStart, this);
				this.loadingTime.addEventListener(egret.TimerEvent.TIMER, this.drawStart, this);
				this.loadingTime.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.drawComplete, this);
				this.loadingTime.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.drawComplete, this);
			} else {
				this.loadingTime.delay = delay;
				this.loadingTime.repeatCount = repeatCount + 1;
				// this.loadingTime.reset();
			}
			this.loadingAngle = 0;
			this.changeGraphics(this.loadingAngle);
			this.loadingTime.start();
		}

		private loadingAngle: number = 0;

		private chgAngle: number;

		private drawStart(event: egret.TimerEvent) {
			this.changeGraphics(this.loadingAngle);
			this.loadingAngle += this.chgAngle;
			if (this.loadingAngle > 360) {
				this.loadingAngle = this.loadingAngle % 360;
				// this.loadingAngle = 0;
				// this.drawComplete();
			}
		}

		private drawComplete(event?: egret.TimerEvent) {
			// console.info("drawComplete", this.loadingAngle);
			this.loadingTime.removeEventListener(egret.TimerEvent.TIMER, this.drawStart, this);
			this.loadingTime.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.drawComplete, this);
			// Mapi.sendAction(2);
			this.loadingTime.stop();
			this.barLoading = false;
			this.dispatchEventWith(egret.Event.COMPLETE);
		}

		/** 快速完成进度条 */
		fastComlete() {
			if (this.loadingTime) {
				this.loadingTime.removeEventListener(egret.TimerEvent.TIMER, this.drawStart, this);
				this.loadingTime.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.drawComplete, this);
				this.loadingTime.stop();
				this.loadingTime = null;
			}
		}

		private changeGraphics(angle: number): void {
			// console.info("changeGraphics", angle);
			const shape: egret.Shape = this._shape;
			shape.graphics.clear();

			shape.graphics.beginFill(0x00ffff, 1);
			shape.graphics.moveTo(0, 0);
			shape.graphics.lineTo(50, 0);
			shape.graphics.drawArc(0, 0, 50, 0, angle * Math.PI / 180, false);
			shape.graphics.lineTo(0, 0);
			shape.graphics.endFill();
		}
	}
}