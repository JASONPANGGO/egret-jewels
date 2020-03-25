namespace com {
	/**
	 * 冒泡组件
	 */
	export class ComBubble extends com.ComFile {
		public con: eui.Group;
		public conWord: eui.Group;
		public bgDebug: eui.Image;
		public bgWord: eui.Image;
		public word: eui.Image;

		/**
		 * 配置
		 * @param {number} cfg.paddingX x轴填充大小
		 * @param {number} cfg.paddingY y轴填充大小
		 * @param {number} cfg.arrowDiffX 冒泡（箭头）的x轴差值
		 * @param {number} cfg.arrowDiffY 冒泡（箭头）的y轴差值
		 * @param {string} cfg.arrowDir 冒泡（箭头）的方向
		 */
		private cfg: { paddingX?: number, paddingY?: number, arrowDiffX?: number, arrowDiffY?: number, arrowDir?: string };

		public constructor() {
			super();
			this.skinName = skins.ComBubble;
		}

		/* =========== 框架结构代码-start =========== */
		/**
		 * 初始化
		 * @param {any[]} args 构建传参会通过init()传过去
		 */
		protected init(source: string, _cfg?: { paddingX?: number, paddingY?: number, arrowDiffX?: number, arrowDiffY?: number, arrowDir?: string }) {
			// console.info("init", ...args);
			this.word.source = source;

			if (!_cfg) {
				_cfg = {};
			}
			_cfg.paddingX = _cfg.paddingX != void 0 ? _cfg.paddingX : 25;
			_cfg.paddingY = _cfg.paddingY != void 0 ? _cfg.paddingY : 18;
			_cfg.arrowDiffX = _cfg.arrowDiffX != void 0 ? _cfg.arrowDiffX : 148;
			_cfg.arrowDiffY = _cfg.arrowDiffY != void 0 ? _cfg.arrowDiffY : 20;
			_cfg.arrowDir = _cfg.arrowDir != void 0 ? _cfg.arrowDir : gConst.direction.LEFT_BOTTOM;

			this.cfg = _cfg;
		}

		/** 首次创建组件时调用 */
		protected load() {
			// console.info("load");
			const con = this.con;
			const conWord = this.conWord;
			const bgDebug = this.bgDebug;
			const bgWord = this.bgWord;
			const word = this.word;
			const cfg = this.cfg;
			const paddingX = cfg.paddingX;
			const paddingY = cfg.paddingY;
			const arrowDiffY = cfg.arrowDiffY;
			const arrowDir = cfg.arrowDir;

			gComMgr.setObjSize(word);
			const conW = word.width + paddingX * 2;
			const conH = word.height + paddingY * 2;

			bgWord.width = conW;
			bgWord.height = conH + arrowDiffY;
			bgWord.anchorOffsetX = bgWord.width / 2;
			bgWord.y = bgWord.anchorOffsetY = (bgWord.height - arrowDiffY) / 2;

			const initS: number = bgWord.scaleX;
			let rotation: number = 0;
			let scaleX: number = 1;
			let anchorX: number = cfg.arrowDiffX;
			let anchorY: number = cfg.arrowDiffY;
			switch (arrowDir) {
				case gConst.direction.LEFT_TOP:
					rotation = 180;
					scaleX = -1;
					anchorX = conW - anchorX;
					anchorY *= -1;
					break;
				case gConst.direction.RIGHT_TOP:
					rotation = 180;
					anchorY *= -1;
					break;
				case gConst.direction.LEFT_BOTTOM:
					anchorX = conW - anchorX;
					anchorY += conH;
					break;
				case gConst.direction.RIGHT_BOTTOM:
					scaleX = -1;
					anchorY += conH;
					break;
			}
			bgWord.rotation = rotation;
			bgWord.scaleX = initS * scaleX;

			conWord.width = conW;
			conWord.height = conH;
			conWord.x = conWord.anchorOffsetX = anchorX;
			conWord.y = conWord.anchorOffsetY = anchorY;

			gComMgr.setObjSize(conWord, true);
			gComMgr.setObjSize(con, true);

			//Debug
			bgDebug.width = conW;
			bgDebug.height = conH + arrowDiffY;
			bgDebug.anchorOffsetX = bgDebug.width / 2;
			bgDebug.y = bgDebug.anchorOffsetY = (bgDebug.height - arrowDiffY) / 2;
			bgDebug.rotation = bgWord.rotation + 180; //Debug模式，方向相反
			bgDebug.visible = gConst.debugModel;
		}

		/** 每次创建组件都会调用 */
		protected start() {
			// console.info("start");
			const conWord = this.conWord;

			conWord.visible = false;
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
		protected resizeView(event?: egret.Event) {
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
		private showBubbled: boolean;

		public showBubble(duration: number = 500, floatBubble: { isFloat: boolean, targetY?: number, duration?: number, orgY?: number, ease?: Function } = { isFloat: true }) {
			if (this.showBubbled) {
				this.hideBubble(void 0, this.showBubble, this);
			} else {
				const conWord = this.conWord;

				// egret.setTimeout(() => {
				// gSoundMgr.playEff("sm_tanchu");
				// }, this, 200);
				this.showBubbled = true;
				// gTween.toLeftShow(conWord, 500, 0, 1, egret.Ease.backOut);
				gTween.showBubble(conWord, duration, { orgS: 1, orgA: 1 }, void 0, void 0, void 0, floatBubble);
			}
		}

		public hideBubble(duration: number = 300, callback?: Function, thisObj?: any) {
			if (!this.showBubbled) {
				return;
			}
			const conWord = this.conWord;

			this.showBubbled = false;
			// gTween.toRightHide(conWord, 300, 1, 1, void 0, void 0, {
			// 	callback: callback,
			// 	thisObj: thisObj
			// });
			gTween.hideBubble(conWord, duration, { orgS: 1, orgA: 1 }, callback, thisObj);
		}
		/* =========== 业务代码-end =========== */
	}
}