namespace com {
	/**
	 * 光圈组件
	 */
	export class ComLight extends com.ComFile {
		public con: eui.Group;
		// public warn: eui.Image;
		public light: eui.Image;

		public constructor() {
			super();
			this.skinName = skins.ComLight;
		}

		/* =========== 框架结构代码-start =========== */
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
			const con = this.con;
			const light = this.light;

			gComMgr.setItemAnchor(light);
			gComMgr.setItemAnchor(con);

			this.touchEnabled = this.touchChildren = false;
			this.anchorOffsetX = this.width / 2;
			this.anchorOffsetY = this.height / 2;
		}

		/** 每次创建组件都会调用 */
		protected start() {
			// console.info("start");
			const con = this.con;
			const light = this.light;

			con.removeChildren();
			con.visible = true;
			gTween.rmTweens(con);
			this.lightPool = [light];

			let handTime: number = GameMgr.getConfig("handTime");
			if (handTime == void 0) {
				handTime = 500;
			}

			egret.setTimeout(() => {
				this.addLight();
				this.addLightDelay = egret.setInterval(this.addLight, this, handTime + gGuideMgr.pressT + gGuideMgr.liftT);
			}, this, gGuideMgr.delayTimer + gGuideMgr.liftT);

			// this.warn.visible = false;
			// this.showWarn();
			this.show();
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
		/* =========== 框架结构代码-end =========== */


		/* =========== 业务代码-start =========== */
		private lightPool: eui.Image[] = [];

		private createLight(): eui.Image {
			let light: eui.Image;
			if (this.lightPool && this.lightPool.length > 0) {
				light = this.lightPool.shift();
			} else {
				light = new eui.Image(this.light.source);
			}
			gTween.rmTweens(light);
			return light;
		}

		private removeLight(light: eui.Image) {
			if (!this.lightPool) {
				this.lightPool = [];
			}
			gTween.rmTweens(light);
			gComMgr.rmObj(light);
			this.lightPool.push(light);
		}

		private addLightDelay: number;

		private addLight() {
			const con = this.con;
			const light = this.createLight();

			light.alpha = 0;
			light.scaleX = light.scaleY = 0;
			con.addChild(light);
			gComMgr.setItemAnchor(light);
			const scaleT: number = 1500;
			const alphaT: number = 500;
			egret.Tween.get(light).to({ alpha: 1 }, alphaT);
			egret.Tween.get(light).to({ scaleX: 3, scaleY: 3 }, scaleT);
			egret.setTimeout(() => {
				egret.Tween.get(light).to({ alpha: 0 }, alphaT).call(() => {
					this.removeLight(light);
				});
			}, this, scaleT - alphaT);
		}

		// private showWarn() {
		// 	gTween.toBigShow(this.warn, 300, 1, 1, egret.Ease.bounceOut, void 0, {
		// 		callback: () => {
		// 			gTween.loopFloat(this.warn, -10, 1000, 128);
		// 		}
		// 	});
		// }

		// private hideWarn() {
		// 	gTween.toSmallHide(this.warn, 300, 1, 1);
		// }

		public hide() {
			egret.clearInterval(this.addLightDelay);
			gTween.fadeOut(this.con, 300, 1, void 0, void 0, {
				callback: () => {
					super.hide();
				}
			});
			// this.hideWarn();
		}
		/* =========== 业务代码-end =========== */
	}
}