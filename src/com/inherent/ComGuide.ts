namespace com {
	/**
	 * 引导组件
	 */
	export class ComGuide extends com.ComFile {
		public hand: eui.Image | com.ComMovieClip; //指引手
		private isMC: boolean; //是否为帧动画
		private playCnt: number; //帧动画播放次数
		private fName: string;
		private frameCnt: number;
		public light: eui.Image;

		private delayTimer: number; //延迟显示时间
		private target1: egret.DisplayObject; //指引目标对象1
		private target2: egret.DisplayObject; //指引目标对象2
		private target3: egret.DisplayObject; //指引目标对象3
		private target4: egret.DisplayObject; //指引目标对象4
		private target5: egret.DisplayObject; //指引目标对象5
		private moveTime: number; //目标1移动到目标2时间
		private isReturn: boolean; //是否做返回运动
		private parentObj: egret.DisplayObjectContainer; //父级显示容器
		private diffX: number; //x轴差值
		private diffY: number; //y轴差值
		private diffS: number; //缩放差值
		private pressT: number; //手指按下时间
		private liftT: number; //手指抬起时间
		private waitT: number; //手指等待下次按下时间
		private direction: string; //手指处于目标方位
		private offX: number; //x轴偏移值(特殊处理用)
		private offY: number; //y轴偏移值(特殊处理用)
		private offR: number; //角度r偏移值(特殊处理用)
		private offS: number; //缩放s偏移值(特殊处理用)

		private isBack: boolean; //是否相反方向指引

		private initHandX: number; //指引手x轴初始值
		private initHandY: number; //指引手y轴初始值

		private guideDelay: number; //指引延迟key
		private isGuide: boolean = false; //是否存在引导

		public constructor() {
			super();
			this.skinName = skins.ComGuide;
		}

		/* =========== 框架结构代码-start =========== */
		/**
		 * 初始化
		 * @param {any[]} args 构建传参会通过init()传过去
		 */
		protected init(...args: any[]) {
			// console.info("init", ...args);
			this.isMC = false;
			this.touchEnabled = this.touchChildren = false;
			this.hideLight();
		}

		/** 首次创建组件时调用 */
		protected load() {
			// console.info("load");
		}

		/** 每次创建组件都会调用 */
		protected start() {
			// console.info("start");
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

			const baseScale: number = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];

			this.scaleX = this.scaleY = baseScale * this.offS;

			if (this.isGuide) {
				// this.playGuide();
				egret.clearTimeout(this.guideDelay);
				this.guideDelay = egret.setTimeout(this.playGuide, this, 100);
			}

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
		/**
		 * 设置帧动画数据
		 */
		public setMcData(ob: data.McData[], playCnt: number = 1, anchorOffsetX: number = 0, anchorOffsetY: number = 0) {
			this.isMC = true;
			this.playCnt = playCnt;
			(this.hand as com.ComMovieClip).open();
			(this.hand as com.ComMovieClip).setData(ob, anchorOffsetX, anchorOffsetY);
			this.fName = ob[0].fName;
			this.frameCnt = ob[0].frameCnt;
			(this.hand as com.ComMovieClip).gotoAndStop(this.fName);
		}

		/**
		 * 设置数据
		 * @param {number} delayTimer 延迟显示时间
		 * @param {egret.DisplayObject} targetArg.target1 指引目标对象1
		 * @param {egret.DisplayObject} targetArg.target2 指引目标对象2
		 * @param {egret.DisplayObject} targetArg.target3 指引目标对象3
		 * @param {egret.DisplayObject} targetArg.target4 指引目标对象4
		 * @param {egret.DisplayObject} targetArg.target5 指引目标对象5
		 * @param {number} moveTime 目标1移动到目标2时间
		 * @param {boolean} isReturn 是否做返回运动
		 * @param {egret.DisplayObjectContainer} parentObj 父级显示容器
		 * @param {number} prop.diffX = 0 x轴差值
		 * @param {number} prop.diffY = 20 y轴差值
		 * @param {number} prop.diffS = 0.9 缩放差值
		 * @param {number} prop.pressT = 300 手指按下时间
		 * @param {number} prop.liftT = 800 手指抬起时间
		 * @param {number} prop.waitT = 500 手指等待下次按下时间
		 * @param {number} prop.direction = "center_center" 手指处于目标方位
		 * @param {number} prop.offX = 0 x轴偏移值(特殊处理用)
		 * @param {number} prop.offY = 0 y轴偏移值(特殊处理用)
		 * @param {number} prop.offR = 0 角度r偏移值(特殊处理用)
		 * @param {number} prop.offS = 1 缩放s偏移值(特殊处理用)
		 * @param {boolean} prop.isBack 是否相反方向指引
		 */
		public setData(
			delayTimer: number, targetArg: { target1: egret.DisplayObject, target2?: egret.DisplayObject, target3?: egret.DisplayObject, target4?: egret.DisplayObject, target5?: egret.DisplayObject, moveTime?: number, isReturn?: boolean }, parentObj: egret.DisplayObjectContainer, prop: {
				diffX?: number; //x轴差值
				diffY?: number; //y轴差值
				diffS?: number; //缩放差值
				pressT?: number; //手指按下时间
				liftT?: number; //手指抬起时间
				waitT?: number; //手指等待下次按下时间
				direction?: string; //手指处于目标方位
				offX?: number; //x轴偏移值(特殊处理用)
				offY?: number; //y轴偏移值(特殊处理用)
				offR?: number; //角度r偏移值(特殊处理用)
				offS?: number; //缩放s偏移值(特殊处理用)
				isBack?: boolean; //是否相反方向指引
			} = {}) {
			this.delayTimer = delayTimer; //延迟显示时间
			this.target1 = targetArg.target1; //指引目标对象1
			this.target2 = targetArg.target2; //指引目标对象2
			this.target3 = targetArg.target3; //指引目标对象3
			this.target4 = targetArg.target4; //指引目标对象4
			this.target5 = targetArg.target5; //指引目标对象5
			this.moveTime = targetArg.moveTime; //目标1移动到目标2时间
			this.isReturn = targetArg.isReturn; //是否做返回运动
			this.parentObj = parentObj; //父级显示容器

			this.diffX = prop.diffX != void 0 ? prop.diffX : 0; //x轴差值
			this.diffY = prop.diffY != void 0 ? prop.diffY : 20; //y轴差值
			this.diffS = prop.diffS != void 0 ? prop.diffS : 0.9; //缩放差值
			this.pressT = prop.pressT != void 0 ? prop.pressT : 300; //手指按下时间
			this.liftT = prop.liftT != void 0 ? prop.liftT : 800; //手指抬起时间
			this.waitT = prop.waitT != void 0 ? prop.waitT : 500; //手指等待下次按下时间
			this.direction = prop.direction != void 0 ? prop.direction : gConst.direction.CENTER_CENTER; //手指处于目标方位
			this.offX = prop.offX != void 0 ? prop.offX : 0; //x轴偏移值(特殊处理用)
			this.offY = prop.offY != void 0 ? prop.offY : 0; //y轴偏移值(特殊处理用)
			this.offR = prop.offR != void 0 ? prop.offR : 0; //角度r偏移值(特殊处理用)
			this.offS = prop.offS != void 0 ? prop.offS : 1; //缩放s偏移值(特殊处理用)
			this.isBack = prop.isBack != void 0 ? prop.isBack : false; //是否相反方向指引
		}

		/**
		 * 更新数据
		 * @param {number} config.delayTimer 延迟显示时间
		 * @param {egret.DisplayObject} config.targetArg.target1 指引目标对象1
		 * @param {egret.DisplayObject} config.targetArg.target2 指引目标对象2
		 * @param {egret.DisplayObject} config.targetArg.target3 指引目标对象3
		 * @param {egret.DisplayObject} config.targetArg.target4 指引目标对象4
		 * @param {egret.DisplayObject} config.targetArg.target5 指引目标对象5
		 * @param {number} moveTime 目标1移动到目标2时间
		 * @param {boolean} isReturn 是否做返回运动
		 * @param {egret.DisplayObjectContainer} config.parentObj 父级显示容器
		 * @param {number} config.diffX x轴差值
		 * @param {number} config.diffY y轴差值
		 * @param {number} config.diffS 缩放差值
		 * @param {number} pressT 手指按下时间
		 * @param {number} liftT 手指抬起时间
		 * @param {number} waitT 手指等待下次按下时间
		 * @param {number} direction 手指处于目标方位
		 * @param {number} offX x轴偏移值(特殊处理用)
		 * @param {number} offY y轴偏移值(特殊处理用)
		 * @param {number} offR 角度r偏移值(特殊处理用)
		 * @param {number} offS 缩放s偏移值(特殊处理用)
		 * @param {boolean} isBack 是否相反方向指引
		 */
		public updateData(config?: {
			delayTimer?: number; //延迟显示时间
			targetArg: { target1: egret.DisplayObject, target2?: egret.DisplayObject, target3?: egret.DisplayObject, target4?: egret.DisplayObject, target5?: egret.DisplayObject, moveTime?: number, isReturn?: boolean }; //指引目标对象
			parentObj?: egret.DisplayObjectContainer; //父级显示容器
			prop: {
				diffX?: number; //x轴差值
				diffY?: number; //y轴差值
				diffS?: number; //缩放差值
				pressT?: number; //手指按下时间
				liftT?: number; //手指抬起时间
				waitT?: number; //手指等待下次按下时间
				direction?: string; //手指处于目标方位
				offX?: number; //x轴偏移值(特殊处理用)
				offY?: number; //y轴偏移值(特殊处理用)
				offR?: number; //角度r偏移值(特殊处理用)
				offS?: number; //缩放s偏移值(特殊处理用)
				isBack?: boolean; //是否相反方向指引
			}
		}) {
			if (config.delayTimer != void 0) { this.delayTimer = config.delayTimer; } //延迟显示时间
			if (config.targetArg.target1 != void 0) { this.target1 = config.targetArg.target1; } //指引目标对象1
			if (config.targetArg.target2 != void 0) { this.target2 = config.targetArg.target2; } //指引目标对象2
			if (config.targetArg.target3 != void 0) { this.target3 = config.targetArg.target3; } //指引目标对象3
			if (config.targetArg.target4 != void 0) { this.target4 = config.targetArg.target4; } //指引目标对象4
			if (config.targetArg.target5 != void 0) { this.target5 = config.targetArg.target5; } //指引目标对象5
			if (config.targetArg.moveTime != void 0) { this.moveTime = config.targetArg.moveTime; } //目标1移动到目标2时间
			if (config.targetArg.isReturn != void 0) { this.isReturn = config.targetArg.isReturn; } //是否做返回运动
			if (config.parentObj != void 0) { this.parentObj = config.parentObj; } //父级显示容器
			if (config.prop != void 0) {
				if (config.prop.diffX != void 0) { this.diffX = config.prop.diffX; } //x轴差值
				if (config.prop.diffY != void 0) { this.diffY = config.prop.diffY; } //y轴差值
				if (config.prop.diffS != void 0) { this.diffS = config.prop.diffS; } //缩放差值
				if (config.prop.pressT != void 0) { this.pressT = config.prop.pressT; } //手指按下时间
				if (config.prop.liftT != void 0) { this.liftT = config.prop.liftT; } //手指抬起时间
				if (config.prop.waitT != void 0) { this.waitT = config.prop.waitT; } //手指等待下次按下时间
				if (config.prop.direction != void 0) { this.direction = config.prop.direction; } //手指处于目标方位
				if (config.prop.offX != void 0) { this.offX = config.prop.offX; } //x轴偏移值(特殊处理用)
				if (config.prop.offY != void 0) { this.offY = config.prop.offY; } //y轴偏移值(特殊处理用)
				if (config.prop.offR != void 0) { this.offR = config.prop.offR; } //角度r偏移值(特殊处理用)
				if (config.prop.offS != void 0) { this.offS = config.prop.offS; } //缩放s偏移值(特殊处理用)
				if (config.prop.isBack != void 0) { this.isBack = config.prop.isBack; } //是否相反方向指引
			}
		}

		/**
		 * 播放
		 */
		public play() {
			egret.clearTimeout(this.guideDelay);
			this.guideDelay = egret.setTimeout(this.playGuide, this, this.delayTimer);
		}

		/**
		 * 结束
		 */
		public over() {
			egret.clearTimeout(this.guideDelay);
			if (!this.isGuide) {
				return;
			}
			if (!this || !this.parent) {
				return;
			}
			this.isGuide = false;
			this.hideLight(true);
			gTween.fadeOut(this.hand, 300, 1, void 0, void 0, {
				callback: () => {
					gTween.rmTweens(this.hand);
					gComMgr.rmObj(this);
					this.hand.alpha = 1;
					this.dispatchEventWith(gConst.eventType.GUIDE_STOP);
				}
			});
		}

		/** 结束帧动画 */
		private stopMC() {
			if (!this.isMC) {
				return;
			}
			(this.hand as com.ComMovieClip).pause();
		}

		/**
		 * 重置 (立马结束，重新开始)
		 */
		public reset() {
			this.once(gConst.eventType.GUIDE_STOP, this.start, this);
			this.over();
		}

		/**
		 * 显示光圈提示
		 */
		private showLight() {
			if (!this.light) {
				return;
			}
			this.light.x = this.initHandX;
			this.light.y = this.initHandY;
			this.light.scaleX = this.light.scaleY = 1;
			gTween.fadeIn(this.light, 300, 1, void 0, void 0, {
				callback: () => {
					gTween.loopScale(this.light, 0.65, (this.pressT + this.liftT + this.waitT) / 2, 1);
				}
			});
		}

		/**
		 * 隐藏光圈提示
		 */
		private hideLight(isAim: boolean = false) {
			if (!this.light) {
				return;
			}
			if (!isAim) {
				this.light.visible = false;
			} else {
				gTween.fadeOut(this.light, 300, 1);
			}
		}

		/**
		 * 显示引导
		 */
		private showGuide() {
			if (this.isMC) {
				(this.hand as com.ComMovieClip).gotoAndStop(this.fName);
			}
			this.show();
			this.hand.alpha = 1;
			this.parentObj.addChild(this);
			this.updateGuideLoc();
		}

		/**
		 * 更新引导位置
		 */
		private updateGuideLoc(target: egret.DisplayObject = this.target1) {
			if (!this || !this.parent) {
				return;
			}
			var _x: number = target.x - target.anchorOffsetX * target.scaleX; //x原点
			var _y: number = target.y - target.anchorOffsetY * target.scaleX; //y原点
			var _w: number = target.width * target.scaleX; //宽度
			var _h: number = target.height * target.scaleX; //高度
			switch (this.direction) {
				//左上 ↖
				case gConst.direction.LEFT_TOP:
					//左上就在原点
					this.rotation = 135;
					break;

				//中上 ↑
				case gConst.direction.CENTER_TOP:
					_x += _w / 2;
					this.rotation = 180;
					break;

				//右上 ↗
				case gConst.direction.RIGHT_TOP:
					_x += _w;
					this.rotation = -135;
					break;

				//右中 →
				case gConst.direction.RIGHT_CENTER:
					_x += _w;
					_y += _h / 2;
					this.rotation = -90;
					break;

				//右下 ↘
				case gConst.direction.RIGHT_BOTTOM:
					_x += _w / 2;
					_y += _h / 2;
					this.rotation = -45;
					break;

				//中下 ↓
				case gConst.direction.CENTER_BOTTOM:
					_x += _w / 2;
					_y += _h;
					this.rotation = 0;
					break;

				//左下 ↙
				case gConst.direction.LEFT_BOTTOM:
					_y += _h;
					this.rotation = 45;
					break;

				//左中 ←
				case gConst.direction.LEFT_CENTER:
					_y += _h / 2;
					this.rotation = 90;
					break;

				//默认 中心
				default:
					_x += _w / 2;
					_y += _h / 2;
					this.rotation = 0;
					break;
			}
			_x += (this.offX * target.scaleX);
			_y += (this.offY * target.scaleX);
			this.rotation += this.offR;

			const baseScale: number = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];

			this.scaleX = this.scaleY = baseScale * this.offS;
			var gPot: egret.Point = target.parent.localToGlobal(_x, _y);
			var lPot: egret.Point = this.globalToLocal(gPot.x, gPot.y, gPot);

			this.initHandX = this.hand.x = lPot.x;
			this.initHandY = this.hand.y = lPot.y;
		}

		/**
		 * 播放引导
		 */
		private playGuide() {
			this.showGuide();
			this.isGuide = true;
			gTween.rmTweens(this.hand);
			this.hand.alpha = 0;
			this.hand.scaleX = this.hand.scaleY = 1;
			this.hand.visible = true;
			this.showLight();
			if (!this.target2) {
				if (!this.isBack) {
					this.hand.x = this.initHandX + this.diffX;
					this.hand.y = this.initHandY + this.diffY;
					egret.Tween.get(this.hand).to({ alpha: 1 }, 300).call(() => {
						if (!this.isMC) {
							egret.Tween.get(this.hand, { loop: true }).to({
								scaleX: this.diffS,
								scaleY: this.diffS,
								x: this.initHandX,
								y: this.initHandY
							}, this.pressT).call(this.dispatchEventWith, this, [gConst.eventType.GUIDE_TOUCH_ONE]).to({
								scaleX: 1,
								scaleY: 1,
								x: this.initHandX + this.diffX,
								y: this.initHandY + this.diffY
							}, this.liftT).wait(this.waitT);
						} else {
							if (this.playCnt > -1) {
								let playCnt: number = this.playCnt;
								egret.Tween.get(this.hand, { loop: true }).call(() => {
									(this.hand as com.ComMovieClip).interval = this.pressT;
									(this.hand as com.ComMovieClip).gotoAndPlay(this.fName, this.playCnt);
								}, this).wait(this.pressT * this.playCnt * (this.frameCnt * 2)).call(() => {
									(this.hand as com.ComMovieClip).gotoAndStop(this.fName);
								}, this).call(() => {
									this.dispatchEventWith.call(this, gConst.eventType.GUIDE_TOUCH_ONE);
									playCnt--;
									if (playCnt <= 0) {
										this.over();
										return;
									}
								}).wait(this.waitT);
							} else {
								(this.hand as com.ComMovieClip).interval = this.pressT;
								(this.hand as com.ComMovieClip).gotoAndPlay(this.fName, this.playCnt);
							}
						}
					}, this);
				} else {
					this.hand.x = this.initHandX;
					this.hand.y = this.initHandY;
					egret.Tween.get(this.hand).to({ alpha: 1 }, 300).call(() => {
						if (!this.isMC) {
							egret.Tween.get(this.hand, { loop: true }).to({
								scaleX: 1,
								scaleY: 1,
								x: this.initHandX + this.diffX,
								y: this.initHandY + this.diffY
							}, this.liftT).wait(this.waitT).to({
								scaleX: this.diffS,
								scaleY: this.diffS,
								x: this.initHandX,
								y: this.initHandY
							}, this.pressT).call(this.dispatchEventWith, this, [gConst.eventType.GUIDE_TOUCH_ONE]);
						} else {
							egret.Tween.get(this.hand, { loop: true }).call(() => {
								(this.hand as com.ComMovieClip).gotoAndStop(this.fName, 2);
							}, this).wait(this.liftT + this.waitT).call(() => {
								(this.hand as com.ComMovieClip).interval = this.pressT;
								(this.hand as com.ComMovieClip).gotoAndReverse(this.fName, this.playCnt);
							}, this).wait(this.pressT * this.playCnt * (this.frameCnt + 3)).call(() => {
								(this.hand as com.ComMovieClip).gotoAndStop(this.fName, 2);
							}, this).call(this.dispatchEventWith, this, [gConst.eventType.GUIDE_TOUCH_ONE]);
						}
					}, this);
				}
			} else {
				if (!this.target3) {
					const initHandX_1: number = this.initHandX;
					const initHandY_1: number = this.initHandY;
					this.updateGuideLoc(this.target2);
					const initHandX_2: number = this.initHandX;
					const initHandY_2: number = this.initHandY;

					this.hand.x = initHandX_1 + this.diffX;
					this.hand.y = initHandY_1 + this.diffY;
					if (this.moveTime == void 0) {
						this.moveTime = 100;
					}
					let returnProps: Object;
					if (this.isReturn) {
						returnProps = {
							x: initHandX_1 + this.diffX,
							y: initHandY_1 + this.diffY
						}
					} else {
						returnProps = {
							alpha: 0
						}
					}

					egret.Tween.get(this.hand).to({ alpha: 1 }, 300).call(() => {
						if (!this.isMC) {
							egret.Tween.get(this.hand, { loop: true }).to({
								scaleX: this.diffS,
								scaleY: this.diffS,
								x: initHandX_1,
								y: initHandY_1,
								alpha: 1
							}, this.pressT).call(this.dispatchEventWith, this, [gConst.eventType.GUIDE_TOUCH_ONE]).to({
								scaleX: 1,
								scaleY: 1,
								x: initHandX_1 + this.diffX,
								y: initHandY_1 + this.diffY
							}, this.liftT).to({
								x: initHandX_2 + this.diffX,
								y: initHandY_2 + this.diffY
							}, this.moveTime).to({
								scaleX: this.diffS,
								scaleY: this.diffS,
								x: initHandX_2,
								y: initHandY_2
							}, this.pressT).call(this.dispatchEventWith, this, [gConst.eventType.GUIDE_TOUCH_ONE]).to({
								scaleX: 1,
								scaleY: 1,
								x: initHandX_2 + this.diffX,
								y: initHandY_2 + this.diffY
							}, this.liftT).wait(this.waitT).to(returnProps, this.isReturn ? this.moveTime : this.waitT);
						} else {
							egret.Tween.get(this.hand, { loop: true }).call(() => {
								(this.hand as com.ComMovieClip).interval = this.pressT;
								(this.hand as com.ComMovieClip).gotoAndPlay(this.fName, this.playCnt);
							}, this).wait(this.pressT * this.playCnt * (this.frameCnt + 3)).call(() => {
								(this.hand as com.ComMovieClip).gotoAndStop(this.fName);
							}, this).call(this.dispatchEventWith, this, [gConst.eventType.GUIDE_TOUCH_ONE]).wait(this.liftT).to({
								x: initHandX_2,
								y: initHandY_2
							}, this.moveTime).call(() => {
								(this.hand as com.ComMovieClip).interval = this.pressT;
								(this.hand as com.ComMovieClip).gotoAndPlay(this.fName, this.playCnt);
							}, this).wait(this.pressT * this.playCnt * (this.frameCnt + 3)).call(() => {
								(this.hand as com.ComMovieClip).gotoAndStop(this.fName);
							}, this).call(this.dispatchEventWith, this, [gConst.eventType.GUIDE_TOUCH_ONE])
								.wait(this.liftT).wait(this.waitT).to(returnProps, this.isReturn ? this.moveTime : this.waitT);
						}
					}, this);
				} else {
					if (!this.target4) {
						const initHandX_1: number = this.initHandX;
						const initHandY_1: number = this.initHandY;
						this.updateGuideLoc(this.target2);
						const initHandX_2: number = this.initHandX;
						const initHandY_2: number = this.initHandY;
						this.updateGuideLoc(this.target3);
						const initHandX_3: number = this.initHandX;
						const initHandY_3: number = this.initHandY;

						this.hand.x = initHandX_1 + this.diffX;
						this.hand.y = initHandY_1 + this.diffY;
						if (this.moveTime == void 0) {
							this.moveTime = 100;
						}
						let returnProps: Object;
						if (this.isReturn) {
							returnProps = {
								x: initHandX_1 + this.diffX,
								y: initHandY_1 + this.diffY
							}
						} else {
							returnProps = {
								alpha: 0
							}
						}

						egret.Tween.get(this.hand).to({ alpha: 1 }, 300).call(() => {
							if (!this.isMC) {
								egret.Tween.get(this.hand, { loop: true }).to({
									scaleX: this.diffS,
									scaleY: this.diffS,
									x: initHandX_1,
									y: initHandY_1,
									alpha: 1
								}, this.pressT).call(this.dispatchEventWith, this, [gConst.eventType.GUIDE_TOUCH_ONE]).to({
									scaleX: 1,
									scaleY: 1,
									x: initHandX_1 + this.diffX,
									y: initHandY_1 + this.diffY
								}, this.liftT).to({
									x: initHandX_2 + this.diffX,
									y: initHandY_2 + this.diffY
								}, this.moveTime).to({
									scaleX: this.diffS,
									scaleY: this.diffS,
									x: initHandX_2,
									y: initHandY_2
								}, this.pressT).call(this.dispatchEventWith, this, [gConst.eventType.GUIDE_TOUCH_ONE]).to({
									scaleX: 1,
									scaleY: 1,
									x: initHandX_2 + this.diffX,
									y: initHandY_2 + this.diffY
								}, this.liftT).to({
									x: initHandX_3 + this.diffX,
									y: initHandY_3 + this.diffY
								}, this.moveTime).to({
									scaleX: this.diffS,
									scaleY: this.diffS,
									x: initHandX_3,
									y: initHandY_3
								}, this.pressT).call(this.dispatchEventWith, this, [gConst.eventType.GUIDE_TOUCH_ONE]).to({
									scaleX: 1,
									scaleY: 1,
									x: initHandX_3 + this.diffX,
									y: initHandY_3 + this.diffY
								}, this.liftT).wait(this.waitT).to(returnProps, this.isReturn ? this.moveTime * 2 : this.waitT);
							} else {
								egret.Tween.get(this.hand, { loop: true }).call(() => {
									(this.hand as com.ComMovieClip).interval = this.pressT;
									(this.hand as com.ComMovieClip).gotoAndPlay(this.fName, this.playCnt);
								}, this).wait(this.pressT * this.playCnt * (this.frameCnt + 3)).call(() => {
									(this.hand as com.ComMovieClip).gotoAndStop(this.fName);
								}, this).call(this.dispatchEventWith, this, [gConst.eventType.GUIDE_TOUCH_ONE]).wait(this.liftT).to({
									x: initHandX_2,
									y: initHandY_2
								}, this.moveTime).call(() => {
									(this.hand as com.ComMovieClip).interval = this.pressT;
									(this.hand as com.ComMovieClip).gotoAndPlay(this.fName, this.playCnt);
								}, this).wait(this.pressT * this.playCnt * (this.frameCnt + 3)).call(() => {
									(this.hand as com.ComMovieClip).gotoAndStop(this.fName);
								}, this).call(this.dispatchEventWith, this, [gConst.eventType.GUIDE_TOUCH_ONE]).wait(this.liftT).to({
									x: initHandX_3,
									y: initHandY_3
								}, this.moveTime).call(() => {
									(this.hand as com.ComMovieClip).interval = this.pressT;
									(this.hand as com.ComMovieClip).gotoAndPlay(this.fName, this.playCnt);
								}, this).wait(this.pressT * this.playCnt * (this.frameCnt + 3)).call(() => {
									(this.hand as com.ComMovieClip).gotoAndStop(this.fName);
								}, this).call(this.dispatchEventWith, this, [gConst.eventType.GUIDE_TOUCH_ONE])
									.wait(this.liftT).wait(this.waitT).to(returnProps, this.isReturn ? this.moveTime : this.waitT);
							}
						}, this);
					} else {
						if (!this.target5) {
							const initHandX_1: number = this.initHandX;
							const initHandY_1: number = this.initHandY;
							this.updateGuideLoc(this.target2);
							const initHandX_2: number = this.initHandX;
							const initHandY_2: number = this.initHandY;
							this.updateGuideLoc(this.target3);
							const initHandX_3: number = this.initHandX;
							const initHandY_3: number = this.initHandY;
							this.updateGuideLoc(this.target4);
							const initHandX_4: number = this.initHandX;
							const initHandY_4: number = this.initHandY;

							this.hand.x = initHandX_1 + this.diffX;
							this.hand.y = initHandY_1 + this.diffY;
							if (this.moveTime == void 0) {
								this.moveTime = 100;
							}
							let returnProps: Object;
							if (this.isReturn) {
								returnProps = {
									x: initHandX_1 + this.diffX,
									y: initHandY_1 + this.diffY
								}
							} else {
								returnProps = {
									alpha: 0
								}
							}

							egret.Tween.get(this.hand).to({ alpha: 1 }, 300).call(() => {
								if (!this.isMC) {
									egret.Tween.get(this.hand, { loop: true }).to({
										scaleX: this.diffS,
										scaleY: this.diffS,
										x: initHandX_1,
										y: initHandY_1,
										alpha: 1
									}, this.pressT).call(this.dispatchEventWith, this, [gConst.eventType.GUIDE_TOUCH_ONE]).to({
										scaleX: 1,
										scaleY: 1,
										x: initHandX_1 + this.diffX,
										y: initHandY_1 + this.diffY
									}, this.liftT).to({
										x: initHandX_2 + this.diffX,
										y: initHandY_2 + this.diffY
									}, this.moveTime).to({
										scaleX: this.diffS,
										scaleY: this.diffS,
										x: initHandX_2,
										y: initHandY_2
									}, this.pressT).call(this.dispatchEventWith, this, [gConst.eventType.GUIDE_TOUCH_ONE]).to({
										scaleX: 1,
										scaleY: 1,
										x: initHandX_2 + this.diffX,
										y: initHandY_2 + this.diffY
									}, this.liftT).to({
										x: initHandX_3 + this.diffX,
										y: initHandY_3 + this.diffY
									}, this.moveTime).to({
										scaleX: this.diffS,
										scaleY: this.diffS,
										x: initHandX_3,
										y: initHandY_3
									}, this.pressT).call(this.dispatchEventWith, this, [gConst.eventType.GUIDE_TOUCH_ONE]).to({
										scaleX: 1,
										scaleY: 1,
										x: initHandX_3 + this.diffX,
										y: initHandY_3 + this.diffY
									}, this.liftT).to({
										x: initHandX_4 + this.diffX,
										y: initHandY_4 + this.diffY
									}, this.moveTime).to({
										scaleX: this.diffS,
										scaleY: this.diffS,
										x: initHandX_4,
										y: initHandY_4
									}, this.pressT).call(this.dispatchEventWith, this, [gConst.eventType.GUIDE_TOUCH_ONE]).to({
										scaleX: 1,
										scaleY: 1,
										x: initHandX_4 + this.diffX,
										y: initHandY_4 + this.diffY
									}, this.liftT).wait(this.waitT).to(returnProps, this.isReturn ? this.moveTime * 3 : this.waitT);
								} else {
									egret.Tween.get(this.hand, { loop: true }).call(() => {
										(this.hand as com.ComMovieClip).interval = this.pressT;
										(this.hand as com.ComMovieClip).gotoAndPlay(this.fName, this.playCnt);
									}, this).wait(this.pressT * this.playCnt * (this.frameCnt + 3)).call(() => {
										(this.hand as com.ComMovieClip).gotoAndStop(this.fName);
									}, this).call(this.dispatchEventWith, this, [gConst.eventType.GUIDE_TOUCH_ONE]).wait(this.liftT).to({
										x: initHandX_2,
										y: initHandY_2
									}, this.moveTime).call(() => {
										(this.hand as com.ComMovieClip).interval = this.pressT;
										(this.hand as com.ComMovieClip).gotoAndPlay(this.fName, this.playCnt);
									}, this).wait(this.pressT * this.playCnt * (this.frameCnt + 3)).call(() => {
										(this.hand as com.ComMovieClip).gotoAndStop(this.fName);
									}, this).call(this.dispatchEventWith, this, [gConst.eventType.GUIDE_TOUCH_ONE]).wait(this.liftT).to({
										x: initHandX_3,
										y: initHandY_3
									}, this.moveTime).call(() => {
										(this.hand as com.ComMovieClip).interval = this.pressT;
										(this.hand as com.ComMovieClip).gotoAndPlay(this.fName, this.playCnt);
									}, this).wait(this.pressT * this.playCnt * (this.frameCnt + 3)).call(() => {
										(this.hand as com.ComMovieClip).gotoAndStop(this.fName);
									}, this).call(this.dispatchEventWith, this, [gConst.eventType.GUIDE_TOUCH_ONE]).wait(this.liftT).to({
										x: initHandX_4,
										y: initHandY_4
									}, this.moveTime).call(() => {
										(this.hand as com.ComMovieClip).interval = this.pressT;
										(this.hand as com.ComMovieClip).gotoAndPlay(this.fName, this.playCnt);
									}, this).wait(this.pressT * this.playCnt * (this.frameCnt + 3)).call(() => {
										(this.hand as com.ComMovieClip).gotoAndStop(this.fName);
									}, this).call(this.dispatchEventWith, this, [gConst.eventType.GUIDE_TOUCH_ONE])
										.wait(this.liftT).wait(this.waitT).to(returnProps, this.isReturn ? this.moveTime : this.waitT);
								}
							}, this);
						} else {
							const initHandX_1: number = this.initHandX;
							const initHandY_1: number = this.initHandY;
							this.updateGuideLoc(this.target2);
							const initHandX_2: number = this.initHandX;
							const initHandY_2: number = this.initHandY;
							this.updateGuideLoc(this.target3);
							const initHandX_3: number = this.initHandX;
							const initHandY_3: number = this.initHandY;
							this.updateGuideLoc(this.target4);
							const initHandX_4: number = this.initHandX;
							const initHandY_4: number = this.initHandY;
							this.updateGuideLoc(this.target5);
							const initHandX_5: number = this.initHandX;
							const initHandY_5: number = this.initHandY;

							this.hand.x = initHandX_1 + this.diffX;
							this.hand.y = initHandY_1 + this.diffY;
							if (this.moveTime == void 0) {
								this.moveTime = 100;
							}
							let returnProps: Object;
							if (this.isReturn) {
								returnProps = {
									x: initHandX_1 + this.diffX,
									y: initHandY_1 + this.diffY
								}
							} else {
								returnProps = {
									alpha: 0
								}
							}

							egret.Tween.get(this.hand).to({ alpha: 1 }, 300).call(() => {
								if (!this.isMC) {
									egret.Tween.get(this.hand, { loop: true }).to({
										scaleX: this.diffS,
										scaleY: this.diffS,
										x: initHandX_1,
										y: initHandY_1,
										alpha: 1
									}, this.pressT).call(this.dispatchEventWith, this, [gConst.eventType.GUIDE_TOUCH_ONE]).to({
										scaleX: 1,
										scaleY: 1,
										x: initHandX_1 + this.diffX,
										y: initHandY_1 + this.diffY
									}, this.liftT).to({
										x: initHandX_2 + this.diffX,
										y: initHandY_2 + this.diffY
									}, this.moveTime).to({
										scaleX: this.diffS,
										scaleY: this.diffS,
										x: initHandX_2,
										y: initHandY_2
									}, this.pressT).call(this.dispatchEventWith, this, [gConst.eventType.GUIDE_TOUCH_ONE]).to({
										scaleX: 1,
										scaleY: 1,
										x: initHandX_2 + this.diffX,
										y: initHandY_2 + this.diffY
									}, this.liftT).to({
										x: initHandX_3 + this.diffX,
										y: initHandY_3 + this.diffY
									}, this.moveTime).to({
										scaleX: this.diffS,
										scaleY: this.diffS,
										x: initHandX_3,
										y: initHandY_3
									}, this.pressT).call(this.dispatchEventWith, this, [gConst.eventType.GUIDE_TOUCH_ONE]).to({
										scaleX: 1,
										scaleY: 1,
										x: initHandX_3 + this.diffX,
										y: initHandY_3 + this.diffY
									}, this.liftT).to({
										x: initHandX_4 + this.diffX,
										y: initHandY_4 + this.diffY
									}, this.moveTime).to({
										scaleX: this.diffS,
										scaleY: this.diffS,
										x: initHandX_4,
										y: initHandY_4
									}, this.pressT).call(this.dispatchEventWith, this, [gConst.eventType.GUIDE_TOUCH_ONE]).to({
										scaleX: 1,
										scaleY: 1,
										x: initHandX_4 + this.diffX,
										y: initHandY_4 + this.diffY
									}, this.liftT).to({
										x: initHandX_5 + this.diffX,
										y: initHandY_5 + this.diffY
									}, this.moveTime).to({
										scaleX: this.diffS,
										scaleY: this.diffS,
										x: initHandX_5,
										y: initHandY_5
									}, this.pressT).call(this.dispatchEventWith, this, [gConst.eventType.GUIDE_TOUCH_ONE]).to({
										scaleX: 1,
										scaleY: 1,
										x: initHandX_5 + this.diffX,
										y: initHandY_5 + this.diffY
									}, this.liftT).wait(this.waitT).to(returnProps, this.isReturn ? this.moveTime * 4 : this.waitT);
								} else {
									egret.Tween.get(this.hand, { loop: true }).call(() => {
										(this.hand as com.ComMovieClip).interval = this.pressT;
										(this.hand as com.ComMovieClip).gotoAndPlay(this.fName, this.playCnt);
									}, this).wait(this.pressT * this.playCnt * (this.frameCnt + 3)).call(() => {
										(this.hand as com.ComMovieClip).gotoAndStop(this.fName);
									}, this).call(this.dispatchEventWith, this, [gConst.eventType.GUIDE_TOUCH_ONE]).wait(this.liftT).to({
										x: initHandX_2,
										y: initHandY_2
									}, this.moveTime).call(() => {
										(this.hand as com.ComMovieClip).interval = this.pressT;
										(this.hand as com.ComMovieClip).gotoAndPlay(this.fName, this.playCnt);
									}, this).wait(this.pressT * this.playCnt * (this.frameCnt + 3)).call(() => {
										(this.hand as com.ComMovieClip).gotoAndStop(this.fName);
									}, this).call(this.dispatchEventWith, this, [gConst.eventType.GUIDE_TOUCH_ONE]).wait(this.liftT).to({
										x: initHandX_3,
										y: initHandY_3
									}, this.moveTime).call(() => {
										(this.hand as com.ComMovieClip).interval = this.pressT;
										(this.hand as com.ComMovieClip).gotoAndPlay(this.fName, this.playCnt);
									}, this).wait(this.pressT * this.playCnt * (this.frameCnt + 3)).call(() => {
										(this.hand as com.ComMovieClip).gotoAndStop(this.fName);
									}, this).call(this.dispatchEventWith, this, [gConst.eventType.GUIDE_TOUCH_ONE]).wait(this.liftT).to({
										x: initHandX_4,
										y: initHandY_4
									}, this.moveTime).call(() => {
										(this.hand as com.ComMovieClip).interval = this.pressT;
										(this.hand as com.ComMovieClip).gotoAndPlay(this.fName, this.playCnt);
									}, this).wait(this.pressT * this.playCnt * (this.frameCnt + 3)).call(() => {
										(this.hand as com.ComMovieClip).gotoAndStop(this.fName);
									}, this).call(this.dispatchEventWith, this, [gConst.eventType.GUIDE_TOUCH_ONE]).wait(this.liftT).to({
										x: initHandX_5,
										y: initHandY_5
									}, this.moveTime).call(() => {
										(this.hand as com.ComMovieClip).interval = this.pressT;
										(this.hand as com.ComMovieClip).gotoAndPlay(this.fName, this.playCnt);
									}, this).wait(this.pressT * this.playCnt * (this.frameCnt + 3)).call(() => {
										(this.hand as com.ComMovieClip).gotoAndStop(this.fName);
									}, this).call(this.dispatchEventWith, this, [gConst.eventType.GUIDE_TOUCH_ONE])
										.wait(this.liftT).wait(this.waitT).to(returnProps, this.isReturn ? this.moveTime : this.waitT);
								}
							}, this);
						}
					}
				}
			}
		}
		/* =========== 业务代码-end =========== */
	}
}