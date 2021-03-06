namespace ui {
	/**
	 * 顶层页面
	 */
	export abstract class UiFirst extends ui.UiFile {
		public conLogo: eui.Group;
		public gLogo: eui.Group;
		public logo: eui.Image;
		public conBtn: eui.Group;
		public gBtn: eui.Group;
		public btn: eui.Image;
		public btnTxt: eui.Image;

		private logoDir: { horDir: string, verDir: string }; //logo横竖屏方位
		private btnDir: { horDir: string, verDir: string }; //btn横竖屏方位
		private isYoyoBtn: boolean; //是否做按钮呼吸动画

		public logoLoc: data.FirstData; //logo横竖屏位置 (根据方位解析，或自行设置)
		public btnLoc: data.FirstData; //btn横竖屏位置 (根据方位解析，或自行设置)

		private initLogoS: number; //logo初始缩放值
		private initBtnS: number; //btn初始缩放值

		private initConLogoS: number; //logo容器初始缩放值
		private initConBtnS: number; //btn容器初始缩放值

		// private endShowBtn: string;

		// public bg: eui.Rect;

		public constructor() {
			super();
			this.skinName = skins.UiFirst;
		}

		/* =========== 框架结构代码-start =========== */
		/**
		 * 初始化
		 * @param {any[]} args open()传参会通过init()传过去
		 */
		protected init(logoDir: { horDir: string, verDir: string }, btnDir: { horDir: string, verDir: string }, isYoyoBtn: boolean = false) {
			// console.info("init", ...args);
			if (logoDir != void 0) { this.logoDir = logoDir; } //logo横竖屏方位
			if (btnDir != void 0) { this.btnDir = btnDir; } //btn横竖屏方位
			this.initLogoS = this.logo.scaleX;
			this.initBtnS = this.gBtn.scaleX;
			this.initConLogoS = this.conLogo.scaleX;
			this.initConBtnS = this.conBtn.scaleX;
			this.yoyoBtn(isYoyoBtn);
		}

		/** 首次打开界面时调用 */
		protected load() {
			// console.info("load");
			// this.endShowBtn = GameMgr.getConfig("endShowBtn");

			this.touchEnabled = false;

			const conLogo = this.conLogo;
			const conBtn = this.conBtn;

			// conLogo.touchEnabled = conLogo.touchChildren = false;

			gComMgr.setItemAnchor(this.logo);
			gComMgr.setItemAnchor(this.gLogo);
			gComMgr.setItemAnchor(this.btn);
			gComMgr.setItemAnchor(this.gBtn);

			let logoLoc = this.logoLoc;
			let btnLoc = this.btnLoc;

			if (!logoLoc) {
				logoLoc = this.logoLoc = new data.FirstData();
				logoLoc.scale = conLogo.scaleX;
			}
			if (!btnLoc) {
				btnLoc = this.btnLoc = new data.FirstData();
				btnLoc.scale = conBtn.scaleX;
			}
			this.updateLogoLoc();
			this.updateBtnLoc();
		}

		/** 每次打开界面都会调用 */
		protected start() {
			// console.info("start");
		}

		/** 每次结束界面都会调用 */
		protected stop() {
			// console.info("stop");
		}

		/** 监听界面，每帧都会调用 */
		protected update() {
			// console.info("update");
		}

		/** 注册事件 */
		protected addEvent() {
			// console.info("addEvent");
			this.gBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickArticle, this);
			this.gLogo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickArticle, this);
		}

		/** 移除事件 */
		protected removeEvent() {
			// console.info("removeEvent");
			this.gBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickArticle, this);
			this.gLogo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickArticle, this);
		}

		/** 窗口大小改变时调用 */
		protected resizeView(): void {
			// console.info("resizeView", this.width, this.height);
			// const s1: number = this.width / this.con.width;
			// const s2: number = this.height / this.con.height;
			// this.con.scaleX = this.con.scaleY = Math.max(s1, s2);

			const baseScale: number = gConst.mobileByScale[this.screenType][this.mobileType];

			const conLogo = this.conLogo;
			const conBtn = this.conBtn;
			// const bg = this.bg;

			const logoLoc = this.logoLoc;
			const btnLoc = this.btnLoc;

			// logoLoc.scale = this.initConLogoS * baseScale;
			btnLoc.scale = this.initConBtnS * baseScale;

			gTween.rmTweens(conLogo);
			gTween.rmTweens(conBtn);

			if (this.screenType == gConst.screenType.VERTICAL) {
				//竖屏
				logoLoc.scale = this.initConLogoS * baseScale;

				// if (GameMgr.isEnd) {
				// 	logoLoc.center = btnLoc.center = null;
				// }

				this._updateLogoVer();
				this._updateBtnVer();

				switch (this.mobileType) {
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

				conLogo.x = logoLoc.vertical.x;
				conLogo.y = logoLoc.vertical.y;

				conBtn.x = btnLoc.vertical.x;
				conBtn.y = btnLoc.vertical.y;

				conLogo.verticalCenter = conBtn.verticalCenter = conLogo.right = conBtn.right = NaN
				// bg.width = this.width;
				// bg.height = conLogo.height * conLogo.scaleY + (conLogo.y - conLogo.anchorOffsetY * conLogo.scaleY) * 2;
				// bg.x = 0;
			} else {
				//横屏
				logoLoc.scale = this.initConLogoS * baseScale;

				// if (GameMgr.isEnd) {
				// 	logoLoc.center = btnLoc.center = true;
				// }

				this._updateLogoHor();
				this._updateBtnHor();

				// if (!GameMgr.isEnd) {
				// 	// logoLoc.horizontal.x -= 30;
				// 	logoLoc.horizontal.y += 40;
				// 	// btnLoc.horizontal.x = this.width * 0.225;
				// 	// btnLoc.horizontal.y -= 40;
				// }

				switch (this.mobileType) {
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

				conLogo.x = logoLoc.horizontal.x;
				conLogo.y = logoLoc.horizontal.y;

				conBtn.x = btnLoc.horizontal.x;
				conBtn.y = btnLoc.horizontal.y;

				conLogo.verticalCenter = -40
				conBtn.verticalCenter = 70
				conLogo.right = conBtn.right = 120

			}

			conLogo.scaleX = conLogo.scaleY = logoLoc.scale;
			conBtn.scaleX = conBtn.scaleY = btnLoc.scale;

			this.dispatchEventWith(gConst.eventType.RESIZE_VIEW);
		}

		/** 屏幕横竖屏转换时调用 */
		protected rotateView(): void {
			// console.info("rotateView", this.screenType);
			const conLogo = this.conLogo;
			const conBtn = this.conBtn;

			if (this.screenType == gConst.screenType.VERTICAL) {
				//竖屏
				// if (GameMgr.isEnd) {
				// 	conLogo.visible = true;
				// 	conBtn.visible = true;
				// }
			} else {
				//横屏
				// if (GameMgr.isEnd) {
				// 	conLogo.visible = false;
				// 	conBtn.visible = false;
				// }
			}
		}
		/* =========== 框架结构代码-end =========== */


		/* =========== 业务代码-start =========== */

		/** 更新logo横屏位置(占比适配) */
		private __updateLogoHorRatio() {
			const conLogo = this.conLogo;
			const conBtn = this.conBtn;

			const logoLoc = this.logoLoc;
			const btnLoc = this.btnLoc;

			const leftX: Function = () => {
				logoLoc.horizontal.x = Math.floor(this.width * logoLoc.horRatio / 100);
			}

			const centerX: Function = () => {
				logoLoc.horizontal.x = Math.floor(this.width / 2);
			}

			const rightX: Function = () => {
				logoLoc.horizontal.x = Math.floor(this.width * (1 - logoLoc.horRatio / 100));
			}

			const topY: Function = () => {
				const baseScale: number = gConst.mobileByScale[this.screenType][this.mobileType];
				if (!logoLoc.center) {
					if (logoLoc.topSpace > 0 && logoLoc.topSpace < 1) {
						logoLoc.horizontal.y = Math.floor((logoLoc.topSpace * this.height) + conLogo.anchorOffsetY * logoLoc.scale);
					} else {
						logoLoc.horizontal.y = Math.floor((logoLoc.topSpace + conLogo.anchorOffsetY) * logoLoc.scale);
					}
				} else {
					logoLoc.horizontal.y = Math.floor((this.height - logoLoc.horSpace) / 2 - conLogo.height * logoLoc.scale + logoLoc.centerOffset * baseScale);
				}
			}

			const bottomY: Function = () => {
				if (logoLoc.bottomSpace > 0 && logoLoc.bottomSpace < 1) {
					logoLoc.horizontal.y = Math.floor((1 - logoLoc.bottomSpace) * this.height - (conLogo.anchorOffsetY * logoLoc.scale));
				} else if (this.btnDir.horDir == this.logoDir.horDir) {
					logoLoc.horizontal.y = this.height - Math.floor((logoLoc.bottomSpace + conBtn.height) * btnLoc.scale +
						(logoLoc.horSpace + conLogo.anchorOffsetY) * logoLoc.scale);
				} else {
					logoLoc.horizontal.y = this.height - Math.floor((logoLoc.bottomSpace + conLogo.anchorOffsetY) * logoLoc.scale);
				}
			}

			switch (this.logoDir.horDir) {
				//左上 ↖
				case gConst.direction.LEFT_TOP:
					leftX.call(this);
					topY.call(this);
					break;

				//左下 ↙
				case gConst.direction.LEFT_BOTTOM:
					leftX.call(this);
					bottomY.call(this);
					break;

				//中上 ↑
				case gConst.direction.CENTER_TOP:
					centerX.call(this);
					topY.call(this);
					break;

				//中下 ↓
				case gConst.direction.CENTER_BOTTOM:
					centerX.call(this);
					bottomY.call(this);
					break;

				//右上 ↗
				case gConst.direction.RIGHT_TOP:
					rightX.call(this);
					topY.call(this);
					break;

				//右下 ↘
				case gConst.direction.RIGHT_BOTTOM:
					rightX.call(this);
					bottomY.call(this);
					break;
			}
		}

		/** 更新logo横屏位置(非占比适配) */
		private __updateLogoHor() {
			const conLogo = this.conLogo;
			const conBtn = this.conBtn;

			const logoLoc = this.logoLoc;
			const btnLoc = this.btnLoc;

			const leftX: Function = () => {
				if (logoLoc.leftSpace > 0 && logoLoc.leftSpace < 1) {
					if (this.btnDir.horDir == this.logoDir.horDir) {
						logoLoc.horizontal.x = Math.floor(logoLoc.leftSpace * logoLoc.scale * this.width +
							Math.max(conLogo.anchorOffsetX * logoLoc.scale, conBtn.anchorOffsetX * btnLoc.scale));
					} else {
						logoLoc.horizontal.x = Math.floor(logoLoc.leftSpace * logoLoc.scale * this.width + conLogo.anchorOffsetX * logoLoc.scale);
					}
				} else if (this.btnDir.horDir == this.logoDir.horDir) {
					logoLoc.horizontal.x = Math.floor(logoLoc.leftSpace * logoLoc.scale +
						Math.max(conLogo.anchorOffsetX * logoLoc.scale, conBtn.anchorOffsetX * btnLoc.scale));
				} else {
					logoLoc.horizontal.x = Math.floor(logoLoc.leftSpace * logoLoc.scale + conLogo.anchorOffsetX * logoLoc.scale);
				}
			}

			const centerX: Function = () => {
				logoLoc.horizontal.x = Math.floor(this.width / 2);
			}

			const rightX: Function = () => {
				if (logoLoc.rightSpace > 0 && logoLoc.rightSpace < 1) {
					logoLoc.horizontal.x = Math.floor(this.width - (Math.max(conLogo.anchorOffsetX * logoLoc.scale, conBtn.anchorOffsetX * btnLoc.scale) +
						logoLoc.rightSpace * logoLoc.scale * this.width));
				} else if (this.btnDir.horDir == this.logoDir.horDir) {
					logoLoc.horizontal.x = Math.floor(this.width - (Math.max(conLogo.anchorOffsetX * logoLoc.scale, conBtn.anchorOffsetX * btnLoc.scale) +
						logoLoc.rightSpace * logoLoc.scale));
				} else {
					logoLoc.horizontal.x = Math.floor(this.width - (conLogo.anchorOffsetX * logoLoc.scale + logoLoc.rightSpace * logoLoc.scale));
				}
			}

			const topY: Function = () => {
				const baseScale: number = gConst.mobileByScale[this.screenType][this.mobileType];
				if (!logoLoc.center) {
					if (logoLoc.topSpace > 0 && logoLoc.topSpace < 1) {
						logoLoc.horizontal.y = Math.floor(logoLoc.topSpace * this.height + conLogo.anchorOffsetY * logoLoc.scale);
					} else {
						logoLoc.horizontal.y = Math.floor((logoLoc.topSpace + conLogo.anchorOffsetY) * logoLoc.scale);
					}
				} else {
					logoLoc.horizontal.y = Math.floor((this.height - logoLoc.horSpace) / 2 - conLogo.height * logoLoc.scale + logoLoc.centerOffset * baseScale);
				}
			}

			const bottomY: Function = () => {
				if (logoLoc.bottomSpace > 0 && logoLoc.bottomSpace < 1) {
					logoLoc.horizontal.y = Math.floor((1 - logoLoc.bottomSpace) * this.height - (conLogo.anchorOffsetY * logoLoc.scale));
				} else if (this.btnDir.horDir == this.logoDir.horDir) {
					logoLoc.horizontal.y = Math.floor(this.height - ((logoLoc.bottomSpace + conBtn.height) * btnLoc.scale +
						(logoLoc.horSpace + conLogo.anchorOffsetY) * logoLoc.scale));
				} else {
					logoLoc.horizontal.y = Math.floor(this.height - ((logoLoc.bottomSpace + conLogo.anchorOffsetY) * logoLoc.scale));
				}
			}

			switch (this.logoDir.horDir) {
				//左上 ↖
				case gConst.direction.LEFT_TOP:
					leftX.call(this);
					topY.call(this);
					break;

				//左下 ↙
				case gConst.direction.LEFT_BOTTOM:
					leftX.call(this);
					bottomY.call(this);
					break;

				//中上 ↑
				case gConst.direction.CENTER_TOP:
					centerX.call(this);
					topY.call(this);
					break;

				//中下 ↓
				case gConst.direction.CENTER_BOTTOM:
					centerX.call(this);
					bottomY.call(this);
					break;

				//右上 ↗
				case gConst.direction.RIGHT_TOP:
					rightX.call(this);
					topY.call(this);
					break;

				//右下 ↘
				case gConst.direction.RIGHT_BOTTOM:
					rightX.call(this);
					bottomY.call(this);
					break;
			}
		}

		/** 更新logo横屏位置 */
		private _updateLogoHor() {
			if (this.logoLoc.horRatio != void 0) {
				this.__updateLogoHorRatio();
			} else {
				this.__updateLogoHor();
			}
		}

		/** 更新logo竖屏位置(占比适配) */
		private __updateLogoVerRatio() {
			const conLogo = this.conLogo;
			const conBtn = this.conBtn;

			const logoLoc = this.logoLoc;
			const btnLoc = this.btnLoc;

			const leftX: Function = () => {
				if (logoLoc.leftSpace > 0 && logoLoc.leftSpace < 1) {
					logoLoc.vertical.x = Math.floor(logoLoc.leftSpace * logoLoc.scale * this.width +
						Math.max(conLogo.anchorOffsetX * logoLoc.scale, conBtn.anchorOffsetX * btnLoc.scale));
				} else {
					logoLoc.vertical.x = Math.floor(logoLoc.leftSpace * logoLoc.scale +
						Math.max(conLogo.anchorOffsetX * logoLoc.scale, conBtn.anchorOffsetX * btnLoc.scale));
				}
			}

			const centerX: Function = () => {
				logoLoc.vertical.x = this.width / 2;
			}

			const topY: Function = () => {
				const disY: number = Math.floor(this.height * logoLoc.verRatio / 100);
				if (this.btnDir.verDir == this.logoDir.verDir) {
					logoLoc.vertical.y = disY - Math.floor((logoLoc.verSpace / 2 + conLogo.anchorOffsetY) * logoLoc.scale);
				} else {
					logoLoc.vertical.y = disY;
				}
			}

			const bottomY: Function = () => {
				const disY: number = Math.floor(this.height * (1 - logoLoc.verRatio / 100));
				if (this.btnDir.verDir == this.logoDir.verDir) {
					logoLoc.vertical.y = disY - Math.floor((logoLoc.verSpace / 2 + conLogo.anchorOffsetY) * logoLoc.scale);
				} else {
					logoLoc.vertical.y = disY;
				}
			}

			switch (this.logoDir.verDir) {
				//左上 ↖
				case gConst.direction.LEFT_TOP:
					leftX.call(this);
					topY.call(this);
					break;

				//左下 ↙
				case gConst.direction.LEFT_BOTTOM:
					leftX.call(this);
					bottomY.call(this);
					break;

				//中上 ↑
				case gConst.direction.CENTER_TOP:
					centerX.call(this);
					topY.call(this);
					break;
				//中下 ↓
				case gConst.direction.CENTER_BOTTOM:
					centerX.call(this);
					bottomY.call(this);
					break;
			}
		}

		/** 更新logo竖屏位置(非占比适配) */
		private __updateLogoVer() {
			const conLogo = this.conLogo;
			const conBtn = this.conBtn;

			const logoLoc = this.logoLoc;
			const btnLoc = this.btnLoc;

			const leftX: Function = () => {
				if (logoLoc.leftSpace > 0 && logoLoc.leftSpace < 1) {
					logoLoc.vertical.x = Math.floor(logoLoc.leftSpace * logoLoc.scale * this.width +
						Math.max(conLogo.anchorOffsetX * logoLoc.scale, conBtn.anchorOffsetX * btnLoc.scale));
				} else if (this.btnDir.verDir == this.logoDir.verDir) {
					logoLoc.vertical.x = Math.floor(logoLoc.leftSpace * logoLoc.scale +
						Math.max(conLogo.anchorOffsetX * logoLoc.scale, conBtn.anchorOffsetX * btnLoc.scale));
				} else {
					logoLoc.vertical.x = Math.floor(logoLoc.leftSpace * logoLoc.scale + conLogo.anchorOffsetX * logoLoc.scale);
				}
			}

			const centerX: Function = () => {
				logoLoc.vertical.x = this.width / 2;
			}

			const rightX: Function = () => {
				if (logoLoc.rightSpace > 0 && logoLoc.rightSpace < 1) {
					logoLoc.vertical.x = Math.floor(this.width - (Math.max(conLogo.anchorOffsetX * logoLoc.scale, conBtn.anchorOffsetX * btnLoc.scale) +
						logoLoc.rightSpace * logoLoc.scale * this.width));
				} else if (this.btnDir.verDir == this.logoDir.verDir) {
					logoLoc.vertical.x = Math.floor(this.width - (Math.max(conLogo.anchorOffsetX * logoLoc.scale, conBtn.anchorOffsetX * btnLoc.scale) +
						logoLoc.rightSpace * logoLoc.scale));
				} else {
					logoLoc.vertical.x = Math.floor(this.width - (conLogo.anchorOffsetX * logoLoc.scale + logoLoc.rightSpace * logoLoc.scale));
				}
			}

			const topY: Function = () => {
				if (logoLoc.topSpace > 0 && logoLoc.topSpace < 1) {
					logoLoc.vertical.y = Math.floor(logoLoc.topSpace * this.height + conLogo.anchorOffsetY * logoLoc.scale);
				} else {
					logoLoc.vertical.y = Math.floor((logoLoc.topSpace + conLogo.anchorOffsetY) * logoLoc.scale);
				}
			}

			const bottomY: Function = () => {
				if (logoLoc.bottomSpace > 0 && logoLoc.bottomSpace < 1) {
					logoLoc.vertical.y = Math.floor((1 - logoLoc.bottomSpace) * this.height - (conLogo.anchorOffsetY * logoLoc.scale));
				} else if (this.btnDir.verDir == this.logoDir.verDir) {
					logoLoc.vertical.y = Math.floor(this.height - ((logoLoc.bottomSpace + conBtn.height) * btnLoc.scale +
						(logoLoc.verSpace + conLogo.anchorOffsetY) * logoLoc.scale));
				} else {
					logoLoc.vertical.y = Math.floor(this.height - ((logoLoc.bottomSpace + conLogo.anchorOffsetY) * logoLoc.scale));
				}
			}

			switch (this.logoDir.verDir) {
				//左上 ↖
				case gConst.direction.LEFT_TOP:
					leftX.call(this);
					topY.call(this);
					break;

				//左下 ↙
				case gConst.direction.LEFT_BOTTOM:
					leftX.call(this);
					bottomY.call(this);
					break;

				//中上 ↑
				case gConst.direction.CENTER_TOP:
					centerX.call(this);
					topY.call(this);
					break;

				//中下 ↓
				case gConst.direction.CENTER_BOTTOM:
					centerX.call(this);
					bottomY.call(this);
					break;

				//右上 ↗
				case gConst.direction.RIGHT_TOP:
					rightX.call(this);
					topY.call(this);
					break;

				//右下 ↘
				case gConst.direction.RIGHT_BOTTOM:
					rightX.call(this);
					bottomY.call(this);
					break;
			}
		}

		/** 更新logo竖屏位置 */
		private _updateLogoVer() {
			if (this.logoLoc.verRatio != void 0) {
				this.__updateLogoVerRatio();
			} else {
				this.__updateLogoVer();
			}
		}

		/** 更新logo横竖屏位置 */
		public updateLogoLoc(logoLoc?: data.FirstData) {
			if (logoLoc) {
				if (logoLoc.horizontal.x != void 0) { logoLoc.horizontal.x = logoLoc.horizontal.x; } //横屏x轴位置
				if (logoLoc.horizontal.y != void 0) { logoLoc.horizontal.y = logoLoc.horizontal.y; } //横屏y轴位置
				if (logoLoc.vertical.x != void 0) { logoLoc.vertical.x = logoLoc.vertical.x; } //竖屏x轴位置
				if (logoLoc.vertical.y != void 0) { logoLoc.vertical.y = logoLoc.vertical.y; } //竖屏y轴位置
			} else {
				if (!this.logoDir) {
					return;
				}
				this._updateLogoHor();
				this._updateLogoVer();
			}
		}

		/** 更新btn横屏位置(占比适配) */
		private __updateBtnHorRatio() {
			const conLogo = this.conLogo;
			const conBtn = this.conBtn;

			const logoLoc = this.logoLoc;
			const btnLoc = this.btnLoc;

			const leftX: Function = () => {
				btnLoc.horizontal.x = Math.floor(this.width * btnLoc.horRatio / 100);
			}

			const centerX: Function = () => {
				btnLoc.horizontal.x = Math.floor(this.width / 2);
			}

			const rightX: Function = () => {
				btnLoc.horizontal.x = Math.floor(this.width * (1 - btnLoc.horRatio / 100));
			}

			const topY: Function = () => {
				const baseScale: number = gConst.mobileByScale[this.screenType][this.mobileType];
				if (!logoLoc.center) {
					if (btnLoc.topSpace > 0 && btnLoc.topSpace < 1) {
						if (this.logoDir.horDir == this.btnDir.horDir) {
							btnLoc.horizontal.y = Math.floor((logoLoc.topSpace * this.height) + conLogo.height * logoLoc.scale +
								btnLoc.horSpace + conBtn.anchorOffsetY * btnLoc.scale);
						} else {
							btnLoc.horizontal.y = Math.floor(btnLoc.topSpace * this.height * btnLoc.scale);
						}
					} else if (this.logoDir.horDir == this.btnDir.horDir) {
						btnLoc.horizontal.y = Math.floor((logoLoc.topSpace + conLogo.height) * logoLoc.scale +
							(btnLoc.horSpace + conBtn.anchorOffsetY) * btnLoc.scale);
					} else {
						btnLoc.horizontal.y = Math.floor((btnLoc.topSpace + conBtn.anchorOffsetY) * btnLoc.scale);
					}
				} else {
					btnLoc.horizontal.y = Math.floor((this.height + btnLoc.horSpace) / 2 + btnLoc.centerOffset * baseScale);
				}
			}

			const bottomY: Function = () => {
				if (btnLoc.bottomSpace > 0 && btnLoc.bottomSpace < 1) {
					btnLoc.horizontal.y = Math.floor((1 - btnLoc.bottomSpace) * this.height - (conBtn.anchorOffsetY * btnLoc.scale));
				} else {
					btnLoc.horizontal.y = Math.floor(this.height - ((btnLoc.bottomSpace + conBtn.anchorOffsetY) * btnLoc.scale));
				}
			}

			switch (this.btnDir.horDir) {
				//左上 ↖
				case gConst.direction.LEFT_TOP:
					leftX.call(this);
					topY.call(this);
					break;

				//左下 ↙
				case gConst.direction.LEFT_BOTTOM:
					leftX.call(this);
					bottomY.call(this);
					break;

				//中上 ↑
				case gConst.direction.CENTER_TOP:
					centerX.call(this);
					topY.call(this);
					break;

				//中下 ↓
				case gConst.direction.CENTER_BOTTOM:
					centerX.call(this);
					bottomY.call(this);
					break;

				//右上 ↗
				case gConst.direction.RIGHT_TOP:
					rightX.call(this);
					topY.call(this);
					break;

				//右下 ↘
				case gConst.direction.RIGHT_BOTTOM:
					rightX.call(this);
					bottomY.call(this);
					break;
			}
		}

		/** 更新btn横屏位置(非占比适配) */
		private __updateBtnHor() {
			const conLogo = this.conLogo;
			const conBtn = this.conBtn;

			const logoLoc = this.logoLoc;
			const btnLoc = this.btnLoc;

			const leftX: Function = () => {
				if (btnLoc.leftSpace > 0 && btnLoc.leftSpace < 1) {
					if (this.logoDir.horDir == this.btnDir.horDir) {
						btnLoc.horizontal.x = Math.floor(btnLoc.leftSpace * btnLoc.scale * this.width +
							Math.max(conLogo.anchorOffsetX * logoLoc.scale, conBtn.anchorOffsetX * btnLoc.scale));
					} else {
						btnLoc.horizontal.x = Math.floor(btnLoc.leftSpace * btnLoc.scale * this.width + conBtn.anchorOffsetX * btnLoc.scale);
					}
				} else if (this.logoDir.horDir == this.btnDir.horDir) {
					btnLoc.horizontal.x = Math.floor(btnLoc.leftSpace * btnLoc.scale +
						Math.max(conLogo.anchorOffsetX * logoLoc.scale, conBtn.anchorOffsetX * btnLoc.scale));
				} else {
					btnLoc.horizontal.x = Math.floor(btnLoc.leftSpace * btnLoc.scale + conBtn.anchorOffsetX * btnLoc.scale);
				}
			}

			const centerX: Function = () => {
				btnLoc.horizontal.x = Math.floor(this.width / 2);
			}

			const rightX: Function = () => {
				if (btnLoc.rightSpace > 0 && btnLoc.rightSpace < 1) {
					btnLoc.horizontal.x = Math.floor(this.width - (Math.max(conLogo.anchorOffsetX * logoLoc.scale, conBtn.anchorOffsetX * btnLoc.scale) +
						btnLoc.rightSpace * logoLoc.scale * this.width));
				} else if (this.logoDir.horDir == this.btnDir.horDir) {
					btnLoc.horizontal.x = Math.floor(this.width - (Math.max(conLogo.anchorOffsetX * logoLoc.scale, conBtn.anchorOffsetX * btnLoc.scale) +
						btnLoc.rightSpace * btnLoc.scale));
				} else {
					btnLoc.horizontal.x = Math.floor(this.width - (conBtn.anchorOffsetX * btnLoc.scale + btnLoc.rightSpace * btnLoc.scale));
				}
			}

			const topY: Function = () => {
				const baseScale: number = gConst.mobileByScale[this.screenType][this.mobileType];
				if (!logoLoc.center) {
					if (btnLoc.topSpace > 0 && btnLoc.topSpace < 1) {
						if (this.logoDir.horDir == this.btnDir.horDir) {
							btnLoc.horizontal.y = Math.floor((logoLoc.topSpace * this.height) + conLogo.height * logoLoc.scale +
								btnLoc.horSpace + conBtn.anchorOffsetY * btnLoc.scale);
						} else {
							btnLoc.horizontal.y = Math.floor(btnLoc.topSpace * this.height * btnLoc.scale + conBtn.anchorOffsetY * btnLoc.scale);
						}
					} else if (this.logoDir.horDir == this.btnDir.horDir) {
						btnLoc.horizontal.y = Math.floor((logoLoc.topSpace + conLogo.height) * logoLoc.scale +
							(btnLoc.horSpace + conBtn.anchorOffsetY) * btnLoc.scale);
					} else {
						btnLoc.horizontal.y = Math.floor((btnLoc.topSpace + conBtn.anchorOffsetY) * btnLoc.scale);
					}
				} else {
					btnLoc.horizontal.y = Math.floor((this.height + btnLoc.horSpace) / 2 + btnLoc.centerOffset * baseScale);
				}
			}

			const bottomY: Function = () => {
				if (btnLoc.bottomSpace > 0 && btnLoc.bottomSpace < 1) {
					btnLoc.horizontal.y = Math.floor((1 - btnLoc.bottomSpace) * this.height - (conBtn.anchorOffsetY * btnLoc.scale));
				} else {
					btnLoc.horizontal.y = Math.floor(this.height - ((btnLoc.bottomSpace + conBtn.anchorOffsetY) * btnLoc.scale));
				}
			}

			switch (this.btnDir.horDir) {
				//左上 ↖
				case gConst.direction.LEFT_TOP:
					leftX.call(this);
					topY.call(this);
					break;

				//左下 ↙
				case gConst.direction.LEFT_BOTTOM:
					leftX.call(this);
					bottomY.call(this);
					break;

				//中上 ↑
				case gConst.direction.CENTER_TOP:
					centerX.call(this);
					topY.call(this);
					break;

				//中下 ↓
				case gConst.direction.CENTER_BOTTOM:
					centerX.call(this);
					bottomY.call(this);
					break;

				//右上 ↗
				case gConst.direction.RIGHT_TOP:
					rightX.call(this);
					topY.call(this);
					break;

				//右下 ↘
				case gConst.direction.RIGHT_BOTTOM:
					rightX.call(this);
					bottomY.call(this);
					break;
			}
		}

		/** 更新btn横屏位置 */
		private _updateBtnHor() {
			if (this.btnLoc.horRatio != void 0) {
				this.__updateBtnHorRatio();
			} else {
				this.__updateBtnHor();
			}
		}

		/** 更新btn竖屏位置(占比适配) */
		private __updateBtnVerRatio() {
			const conLogo = this.conLogo;
			const conBtn = this.conBtn;

			const logoLoc = this.logoLoc;
			const btnLoc = this.btnLoc;

			const leftX: Function = () => {
				if (btnLoc.leftSpace > 0 && btnLoc.leftSpace < 1) {
					btnLoc.vertical.x = Math.floor(btnLoc.leftSpace * btnLoc.scale * this.width +
						Math.max(conLogo.anchorOffsetX * logoLoc.scale, conBtn.anchorOffsetX * btnLoc.scale));
				} else {
					btnLoc.vertical.x = Math.floor(btnLoc.leftSpace * btnLoc.scale +
						Math.max(conLogo.anchorOffsetX * logoLoc.scale, conBtn.anchorOffsetX * btnLoc.scale));
				}
			}

			const centerX: Function = () => {
				btnLoc.vertical.x = Math.floor(this.width / 2);
			}

			const topY: Function = () => {
				const disY: number = Math.floor(this.height * btnLoc.verRatio / 100);
				if (this.logoDir.verDir == this.btnDir.verDir) {
					btnLoc.vertical.y = disY + Math.floor(btnLoc.verSpace / 2 + conBtn.anchorOffsetY) * btnLoc.scale;
				} else {
					btnLoc.vertical.y = disY;
				}
			}

			const bottomY: Function = () => {
				const disY: number = Math.floor(this.height * (1 - btnLoc.verRatio / 100));
				if (this.logoDir.verDir == this.btnDir.verDir) {
					btnLoc.vertical.y = disY + Math.floor(btnLoc.verSpace / 2 + conBtn.anchorOffsetY) * btnLoc.scale;
				} else {
					btnLoc.vertical.y = disY;
				}
			}

			switch (this.btnDir.verDir) {
				//左上 ↖
				case gConst.direction.LEFT_TOP:
					leftX.call(this);
					topY.call(this);
					break;

				//左下 ↙
				case gConst.direction.LEFT_BOTTOM:
					leftX.call(this);
					bottomY.call(this);
					break;

				//中上 ↑
				case gConst.direction.CENTER_TOP:
					centerX.call(this);
					topY.call(this);
					break;

				//中下 ↓
				case gConst.direction.CENTER_BOTTOM:
					centerX.call(this);
					bottomY.call(this);
					break;
			}
		}

		/** 更新btn竖屏位置(非占比适配) */
		private __updateBtnVer() {
			const conLogo = this.conLogo;
			const conBtn = this.conBtn;

			const logoLoc = this.logoLoc;
			const btnLoc = this.btnLoc;

			const leftX: Function = () => {
				if (btnLoc.leftSpace > 0 && btnLoc.leftSpace < 1) {
					btnLoc.vertical.x = Math.floor(btnLoc.leftSpace * btnLoc.scale * this.width +
						Math.max(conLogo.anchorOffsetX * logoLoc.scale, conBtn.anchorOffsetX * btnLoc.scale));
				} else if (this.logoDir.verDir == this.btnDir.verDir) {
					btnLoc.vertical.x = Math.floor(btnLoc.leftSpace * btnLoc.scale +
						Math.max(conLogo.anchorOffsetX * logoLoc.scale, conBtn.anchorOffsetX * btnLoc.scale));
				} else {
					btnLoc.vertical.x = Math.floor(btnLoc.leftSpace * btnLoc.scale + conBtn.anchorOffsetX * btnLoc.scale);
				}
			}

			const centerX: Function = () => {
				btnLoc.vertical.x = this.width / 2;
			}

			const rightX: Function = () => {
				if (btnLoc.rightSpace > 0 && btnLoc.rightSpace < 1) {
					btnLoc.vertical.x = Math.floor(this.width - (Math.max(conLogo.anchorOffsetX * logoLoc.scale, conBtn.anchorOffsetX * btnLoc.scale) +
						btnLoc.rightSpace * logoLoc.scale * this.width));
				} else if (this.logoDir.verDir == this.btnDir.verDir) {
					btnLoc.vertical.x = Math.floor(this.width - (Math.max(conLogo.anchorOffsetX * logoLoc.scale, conBtn.anchorOffsetX * btnLoc.scale) +
						btnLoc.rightSpace * btnLoc.scale));
				} else {
					btnLoc.vertical.x = Math.floor(this.width - (conBtn.anchorOffsetX * btnLoc.scale + btnLoc.rightSpace * btnLoc.scale));
				}
			}

			const topY: Function = () => {
				if (btnLoc.topSpace > 0 && btnLoc.topSpace < 1) {
					if (this.logoDir.verDir == this.btnDir.verDir) {
						btnLoc.vertical.y = Math.floor((logoLoc.topSpace * this.height) + conLogo.height * logoLoc.scale +
							btnLoc.verSpace + conBtn.anchorOffsetY * btnLoc.scale);
					} else {
						btnLoc.vertical.y = Math.floor(btnLoc.topSpace * this.height * btnLoc.scale + conBtn.anchorOffsetY * btnLoc.scale);
					}
				} else if (this.logoDir.verDir == this.btnDir.verDir) {
					btnLoc.vertical.y = Math.floor((logoLoc.topSpace + conLogo.height) * logoLoc.scale +
						(btnLoc.verSpace + conBtn.anchorOffsetY) * btnLoc.scale);
				} else {
					btnLoc.vertical.y = Math.floor((btnLoc.topSpace + conBtn.anchorOffsetY) * btnLoc.scale);
				}
			}

			const bottomY: Function = () => {
				if (btnLoc.bottomSpace > 0 && btnLoc.bottomSpace < 1) {
					btnLoc.vertical.y = Math.floor((1 - btnLoc.bottomSpace) * this.height - (conBtn.anchorOffsetY * btnLoc.scale));
				} else {
					btnLoc.vertical.y = Math.floor(this.height - ((btnLoc.bottomSpace + conBtn.anchorOffsetY) * btnLoc.scale));
				}
			}

			switch (this.btnDir.verDir) {
				//左上 ↖
				case gConst.direction.LEFT_TOP:
					leftX.call(this);
					topY.call(this);
					break;

				//左下 ↙
				case gConst.direction.LEFT_BOTTOM:
					leftX.call(this);
					bottomY.call(this);
					break;

				//中上 ↑
				case gConst.direction.CENTER_TOP:
					centerX.call(this);
					topY.call(this);
					break;

				//中下 ↓
				case gConst.direction.CENTER_BOTTOM:
					centerX.call(this);
					bottomY.call(this);
					break;

				//右上 ↗
				case gConst.direction.RIGHT_TOP:
					rightX.call(this);
					topY.call(this);
					break;

				//右下 ↘
				case gConst.direction.RIGHT_BOTTOM:
					rightX.call(this);
					bottomY.call(this);
					break;
			}
		}

		/** 更新btn竖屏位置 */
		private _updateBtnVer() {
			if (this.btnLoc.verRatio != void 0) {
				this.__updateBtnVerRatio();
			} else {
				this.__updateBtnVer();
			}
		}

		/** 更新btn横竖屏位置 */
		public updateBtnLoc(btnLoc?: data.FirstData) {
			if (btnLoc) {
				if (btnLoc.horizontal.x != void 0) { btnLoc.horizontal.x = btnLoc.horizontal.x; } //横屏x轴位置
				if (btnLoc.horizontal.y != void 0) { btnLoc.horizontal.y = btnLoc.horizontal.y; } //横屏y轴位置
				if (btnLoc.vertical.x != void 0) { btnLoc.vertical.x = btnLoc.vertical.x; } //竖屏x轴位置
				if (btnLoc.vertical.y != void 0) { btnLoc.vertical.y = btnLoc.vertical.y; } //竖屏y轴位置
			} else {
				if (!this.btnDir) {
					return;
				}
				this._updateBtnHor();
				this._updateBtnVer();
			}
		}

		/** 更新方位 */
		public updateDir(logoDir: { horDir: string, verDir: string }, btnDir: { horDir: string, verDir: string }, isYoyoBtn: boolean = false, update: boolean = false) {
			this.init(logoDir, btnDir, isYoyoBtn);
			if (update) {
				this.resizeView();
				this.rotateView();
			}
		}

		/** 按钮呼吸动画 */
		public yoyoBtn(isYoyoBtn: boolean = true) {
			if (gConst.notEffectModel || (window["MW_CONFIG"] && MW_CONFIG.channel == "google")) {
				return;
			}
			if (isYoyoBtn) {
				gTween.yoyoBtn(this.gBtn, void 0, void 0, { orgS: { x: this.initBtnS } });
			} else if (this.isYoyoBtn) {
				gTween.rmTweens(this.gBtn);
				this.gBtn.scaleX = this.gBtn.scaleY = 1;
			}
			this.isYoyoBtn = isYoyoBtn;
		}

		public gameEnd() {
			super.gameEnd();

			const conLogo = this.conLogo;
			const conBtn = this.conBtn;

			// conBtn.visible = this.screenType == gConst.screenType.VERTICAL && this.endShowBtn === "on";

			// if (this.btnTxt && this.btnTxt.visible) {
			// 	this.btnTxt.source = "lang_button2_png";
			// 	gComMgr.setItemAnchor(this.btn);
			// 	gComMgr.setItemAnchor(this.gBtn);
			// }

			// this.updateEndLoc();

			// let logo: { x?: number, y?: number } = {};
			// let btn: { x?: number, y?: number } = {};

			// if (this.screenType == gConst.screenType.VERTICAL) {
			// 	//竖屏
			// 	logo.x = logoLoc.vertical.x;
			// 	logo.y = logoLoc.vertical.y;
			// 	btn.x = btnLoc.vertical.x;
			// 	btn.y = btnLoc.vertical.y;
			// } else {
			// 	//横屏
			// 	logo.x = logoLoc.horizontal.x;
			// 	logo.y = logoLoc.horizontal.y;
			// 	btn.x = btnLoc.horizontal.x;
			// 	btn.y = btnLoc.horizontal.y;
			// }

			// gTween.tween(conLogo, void 0, {
			// 	props: {
			// 		x: logo.x,
			// 		y: logo.y,
			// 		scaleX: logoLoc.scale,
			// 		scaleY: logoLoc.scale,
			// 	},
			// 	duration: 300
			// });

			// gTween.tween(conBtn, void 0, {
			// 	props: {
			// 		x: btn.x,
			// 		y: btn.y,
			// 		scaleX: btnLoc.scale,
			// 		scaleY: btnLoc.scale,
			// 	},
			// 	duration: 300
			// });

			// this.yoyoBtn();
		}

		private updateEndLoc() {
			if (!GameMgr.isEnd) {
				return;
			}

			const baseScale: number = gConst.mobileByScale[this.screenType][this.mobileType];

			// this.initConLogoS = 1.2;
			// this.initConBtnS = 1.8;

			const logoLoc = this.logoLoc;
			const btnLoc = this.btnLoc;

			logoLoc.scale = this.initConLogoS * baseScale;

			logoLoc.bottomSpace = btnLoc.bottomSpace = .1;
			logoLoc.horRatio = btnLoc.horRatio = 25;
			logoLoc.horSpace = btnLoc.horSpace = 0;
			logoLoc.centerOffset = btnLoc.centerOffset = 140;

			if (this.screenType == gConst.screenType.VERTICAL) {
				//竖屏
				btnLoc.scale = this.initConBtnS * baseScale;

				logoLoc.center = btnLoc.center = null;

				this._updateLogoVer();
				this._updateBtnVer();

				switch (this.mobileType) {
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
				btnLoc.scale = this.initConBtnS * baseScale * .9;

				logoLoc.center = btnLoc.center = true;

				this._updateLogoHor();
				this._updateBtnHor();

				switch (this.mobileType) {
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

		private clickArticle(event: egret.TouchEvent) {
			// Mapi.sendAction(4);
			this.clickInstall(event);
		}
		/* =========== 业务代码-end =========== */
	}
}