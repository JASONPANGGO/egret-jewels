namespace com {
	/**
	 * 动画组件
	 */
	export class ComMovieClip extends com.ComFileBase {
		private list: data.McData[]; //动画数据列表，可传多组动画
		public interval: number = 40; //播放间隔
		private nextUpdateTime: number; //下一次刷新动画的时间，取决于 interval 播放间隔
		public bm: eui.Image; //动画图片
		private currentFrameName: string; //当前动作名称
		/** 播放次数 -1为循环播放 */
		private playTime: number = -1;
		private currentData: data.McData; //当前动画数据
		private frameIndex: number; //当前帧，做帧图片纹理区分（1、2、3...）
		public isplay: boolean = false; //是否继续播放
		private backToFirst: boolean = true; //播放完成后是否回到第一帧

		/**
		 * 构造动画对象
		 */
		public constructor() {
			super();
			this.skinName = skins.ComEmpty;
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
			this.bm = new eui.Image();
			this.addChild(this.bm);
			// this.pixelHitTest(true);
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
		 * 设置动画数据
		 * @param {data.McData[]} ob 动画数据列表，可传多组动画
		 * @param {number} anchorOffsetX 动画图片锚点X轴
		 * @param {number} anchorOffsetY 动画图片锚点Y轴
		 */
		public setData(ob: data.McData[], anchorOffsetX: number = 0, anchorOffsetY: number = 0): void {
			this.list = ob;
			this.bm.anchorOffsetX = anchorOffsetX;
			this.bm.anchorOffsetY = anchorOffsetY;
		}

		/**
		 * 获取总帧数
		 */
		public frameCnt(): number {
			if (this.currentData.order && this.currentData.order.length > 0) {
				return this.currentData.order.length;
			} else {
				return this.currentData.frameCnt;
			}
		}

		public getCurIndex(): number {
			return this.frameIndex;
		}

		/** 根据当前帧，获取对应的帧数 */
		private getFrameIndexCnt(): number {
			if (this.currentData.order && this.currentData.order.length > 0) {
				return this.currentData.order[this.frameIndex - 1];
			} else {
				return this.frameIndex + this.currentData.firstIndex - 1;
			}
		}

		/** 根据当前帧，获取对应名称里的帧数 */
		private getFrameIndexName(): string {
			const index: number = this.getFrameIndexCnt();
			return gMath.switchNum(index, false, this.currentData.minBit);
		}

		/**
		 * 获取当前帧对应纹理名称
		 */
		public picName(): string {
			let searchIdx: number = this.currentData.frameName.indexOf("{1}");
			if (searchIdx > -1) {
				return this.currentData.frameName.replace("{1}", this.getFrameIndexName());
			} else {
				return this.currentData.frameName;
			}
		}

		/**
		 * 开启精准碰撞
		 * @param {boolean} pixelHitTest 是否开启精准碰撞
		 */
		public pixelHitTest(pixelHitTest: boolean): void {
			this.bm.pixelHitTest = pixelHitTest;
		}

		/**
		 * 停留在指定动作的某一帧
		 * @param {string} fName 动作名称
		 * @param {number} frameIndex 指定帧, 默认 1
		 */
		public gotoAndStop(fName: string, frameIndex: number = 1): void {
			if (this.isplay) {
				this.isplay = false;
				this.removeEventListener(egret.Event.ENTER_FRAME, this._update, this);
			}

			this.currentFrameName = fName;
			this.currentData = this.getMcDataByAction(fName);
			this.frameIndex = frameIndex;
			if (this.currentData) {
				this.bm.source = this.picName();
			}
		}

		/**
		 * 销毁
		 */
		public dispose(): void {
			this.pause();
			if (this.parent) {
				this.parent.removeChild(this);
			}
			this.removeChildren();
			this.list = null;
		}

		private isReverse: boolean = false;
		/**
		 * 反向播放
		 * @param {string} fName 动作名称
		 * @param {number} playTime = -1 播放次数
		 */
		public gotoAndReverse(fName: string, playTime: number = -1): void {
			this.isReverse = true;
			this.currentFrameName = fName;
			this.playTime = playTime;
			this.currentData = this.getMcDataByAction(fName);
			if (this.currentData) {
				this.nextUpdateTime = egret.getTimer() + this.interval;
				this.currentData.direct = -1;
				this.frameIndex = this.frameCnt();
				// console.log("this.frameIndex:" + this.frameIndex);
				this.bm.source = this.picName();
				if (!this.isplay) {
					this.isplay = true;
					this.addEventListener(egret.Event.ENTER_FRAME, this._update, this);
				}
			}
		}

		/**
		 * 正向播放
		 * @param {string} fName 动作名称
		 * @param {number} playTime = -1 播放次数
		 * @param {number} frameIndex = 1 从指定帧开始播放
		 * @param {boolean} backToFirst = true 播放完成后是否回到第一帧
		 */
		public gotoAndPlay(fName: string, playTime: number = -1, frameIndex: number = 1, backToFirst: boolean = true): void {
			this.isReverse = false;
			this.currentFrameName = fName;
			this.playTime = playTime;
			this.backToFirst = backToFirst;
			this.currentData = this.getMcDataByAction(fName);
			if (this.currentData) {
				this.nextUpdateTime = egret.getTimer() + this.interval;
				this.currentData.direct = 1;
				this.frameIndex = frameIndex;
				// console.log("this.frameIndex:" + this.frameIndex);
				this.bm.source = this.picName();
				if (!this.isplay) {
					this.isplay = true;
					this.addEventListener(egret.Event.ENTER_FRAME, this._update, this);
				}
			}
		}

		/**
		 * 按播放间隔刷新视频
		 * @example 每帧监听
		 * @param {egret.Event} event 动画对象自身事件源
		 */
		private _update(event: egret.Event): void {
			if (egret.getTimer() >= this.nextUpdateTime) {
				this.updateFrame();
			}
		}

		/**
		 * 刷新视频
		 */
		private updateFrame(): void {
			this.nextUpdateTime = egret.getTimer() + this.interval;

			this.dispatchEventWith(gConst.eventType.ONE_STEP_COMPLETE);
			if (this.isReverse && this.frameIndex < 1) {
				this.pause();
				this.dispatchEventWith(egret.Event.COMPLETE);
			}

			// console.log("this.frameIndex:" + this.frameIndex);
			this.bm.source = this.picName();
			this.frameIndex += this.currentData.direct;

			if (this.frameIndex > this.frameCnt()) {
				//正向播放到最后
				if (this.currentData.direct == 1 && this.currentData.backplay) {
					//改为反向播放
					this.frameIndex -= 2;
					this.currentData.direct = -1;
				} else {
					//无来回方向播放时，播放完成，停留在第一帧
					if (this.backToFirst) {
						this.frameIndex = 1;
					} else {
						//保持在最后一帧
						this.frameIndex--;
					}
				}

				if (this.playTime == -1) {
					//循环播放
					this.dispatchEventWith(gConst.eventType.ONCE_COMPLETE);
				} else if (!this.currentData.backplay || (this.currentData.backplay && this.isReverse)) {
					//正常播放的时候 播放到最后 次数减少一次
					//次数播放
					this.playTime--;
					this.dispatchEventWith(gConst.eventType.ONCE_COMPLETE);
					if (this.playTime == 0) {
						this.pause();
						this.dispatchEventWith(egret.Event.COMPLETE);
					}
				}
			} else if (this.frameIndex < 1) {
				//方向播放到最初
				if (this.currentData.direct == -1 && this.currentData.backplay) {
					//改为正向播放
					this.frameIndex += 2;
					this.currentData.direct = 1;
				}

				if (this.currentData.backplay && !this.isReverse) {
					//正常播放的时候 播放到最后 次数减少一次
					//次数播放
					this.playTime--;
					this.dispatchEventWith(gConst.eventType.ONCE_COMPLETE);
					if (this.playTime == 0) {
						this.pause();
						this.dispatchEventWith(egret.Event.COMPLETE);
					}
				}
			}
		}

		/**
		 * 暂停播放
		 */
		public pause(): void {
			if (this.isplay) {
				this.isplay = false;
				this.removeEventListener(egret.Event.ENTER_FRAME, this._update, this);
			}
		}

		/**
		 * 通过动作名称获取动画数据
		 * @param {string} fName 动作名称
		 */
		private getMcDataByAction(fName: string): data.McData {
			for (var i: number = 0; i < this.list.length; i++) {
				if (this.list[i].fName == fName) {
					return this.list[i];
				}
			}
			return null;
		}
		/* =========== 业务代码-end =========== */
	}
}