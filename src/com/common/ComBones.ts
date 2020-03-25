namespace com {
	/**
	 * 骨骼对象
	 */
	export class ComBones {
		public parent: egret.DisplayObjectContainer; //父级对象容器
		public resName: string; //资源名称
		private exitAim: { aimType?: number, wait?: number, time?: number }; //退场动画配置
		public armatureName: string; //骨架数据名称
		public dragonBonesName: string; //指定的龙骨数据名称

		public factory: dragonBones.EgretFactory;
		public armature: dragonBones.Armature; //骨架
		public armatureDisplay: dragonBones.EgretArmatureDisplay; //骨架的显示容器

		public waitScale: { x: number, y: number }; //是否等待设置的缩放值
		public waitPos: { x: number, y: number }; //是否等待设置的坐标
		public waitIndex: number; //是否等待设置的层级
		public orgAlpha: number; //是否等待设置的透明度

		public initPos: { x: number, y: number }; //初始位置坐标（用于记录原始坐标，方便特殊情况偏移、恢复位置）
		public diffPos: { hor: { x: number, y: number }, ver: { x: number, y: number } }; //初始偏移位置坐标（用于记录偏移坐标，方便特殊情况偏移、恢复位置）

		private _guideDir: 1 | 2;
		private _screenType: "heng" | "shu";

		/**
		 * 构造一个骨骼对象
		 */
		public constructor() {

		}

		/**
		 * 设置数据
		 * @param {egret.DisplayObjectContainer} parent 父级对象容器
		 * @param {string} resName 资源名称
		 * @param {Object} exitAim 退场动画配置
		 * @param {string} armatureName = "Armature" 骨架数据名称
		 * @param {string} dragonBonesName 为数据提供一个名称，以便可以通过这个名称获取数据，如果未设置，则使用数据中的名称。
		 */
		public setData(parent: egret.DisplayObjectContainer, resName: string, exitAim?: { aimType?: number, wait?: number, time?: number } | boolean, armatureName: string = "Armature", dragonBonesName?: string) {
			this.parent = parent;
			this.resName = resName;
			if (exitAim) {
				this.exitAim = {};
				if (typeof exitAim === "boolean") {
					exitAim = {};
				}
				this.exitAim.aimType = exitAim.aimType != void 0 ? exitAim.aimType : 0; //动画类型 0:原地消失 1:放大消失 2:缩小消失
				this.exitAim.wait = exitAim.wait != void 0 ? exitAim.wait : 0; //等待多长时间播放动画
				this.exitAim.time = exitAim.time != void 0 ? exitAim.time : 300; //动画所用时间
			}
			this.armatureName = armatureName;
			this.dragonBonesName = dragonBonesName;
		}

		private isComRemve: boolean; //播放完成是否移除
		/**
		 * 播放骨骼动画
		 * @param {string} animationName = "Armature" 动画数据名称，如果未设置，则播放默认动画，或将暂停状态切换为播放状态，或重新播放上一个正在播放的动画。
		 * @param {number} playTimes 播放次数。= 1 [-1: 使用动画数据默认值, 0: 无限循环播放, [1~N]: 循环播放 N 次]
		 * @param {boolean} isComRemve 播放完成是否自动移除
		 */
		public play(animationName: string = "Armature", playTimes: number = 1, isComRemve?: boolean): dragonBones.AnimationState {
			this.isComRemve = isComRemve;
			if (!this.init()) {
				return;
			}
			// if (this.waitIndex != void 0) {
			// this.waitIndex = null;
			// }
			this.armatureDisplay.removeEvent(dragonBones.EgretEvent.COMPLETE, this.playComplete, this);
			this.armatureDisplay.addEvent(dragonBones.EgretEvent.COMPLETE, this.playComplete, this);
			return this.armatureDisplay.animation.play(animationName, playTimes);
		}

        /**
         * 暂停播放动画。
         * @param {string} animationName 动画状态的名称，如果未设置，则暂停所有动画状态。
         * @version DragonBones 3.0
         */
		public stop(animationName?: string): void {
			if (!this.init()) {
				return;
			}
			this.armatureDisplay.animation.stop(animationName);
		}

        /**
         * 将动画停止到指定时间。
         * @param {string} clipName 动画剪辑的名称。
         * @param {number} time 指定时间。（以秒为单位）
         * @version DragonBones 4.7
         */
		public gotoAndStop(clipName: string, time: number): void {
			if (!this.init()) {
				return;
			}
			this.armatureDisplay.animation.gotoAndStop(clipName, time);
		}

        /**
         * 将动画停止到指定的时间。
         * @param {string} animationName 动画数据的名称。
         * @param {number} time 时间。（以秒为单位）
         * @returns 对应的动画状态。
         * @see dragonBones.AnimationState
         * @version DragonBones 4.5
         */
		public gotoAndStopByTime(animationName: string, time?: number): dragonBones.AnimationState {
			if (!this.init()) {
				return;
			}
			return this.armatureDisplay.animation.gotoAndStopByTime(animationName, time);
		}

		/**
		 * 设置缩放值
		 */
		public setScale(x: number, y?: number) {
			if (x == void 0) {
				return;
			}
			x = x || 0;
			y = y || x;
			if (!this.armatureDisplay) {
				this.waitScale = { x: x, y: y };
				return;
			}
			this.armatureDisplay.scaleX = x;
			this.armatureDisplay.scaleY = y;
			this.waitScale = null;
		}

		/**
		 * 设置位置
		 */
		public setPos(pos: { x: number, y: number }) {
			if (!pos) {
				return;
			}
			pos.x = pos.x || 0;
			pos.y = pos.y || 0;
			this.waitPos = { x: pos.x, y: pos.y };
			if (!this.armatureDisplay) {
				return;
			}
			this.armatureDisplay.x = pos.x // * this.armatureDisplay.scaleX;
			this.armatureDisplay.y = pos.y // * this.armatureDisplay.scaleY;
		}

		/**
		 * 设置初始位置
		 */
		public setInitPos(pos: { x: number, y: number }) {
			if (!pos) {
				return;
			}
			pos.x = pos.x || 0;
			pos.y = pos.y || 0;
			this.initPos = { x: pos.x, y: pos.y };
		}

		/**
		 * 设置初始位置
		 */
		public setDiffPos(pos: { hor: { x: number, y: number }, ver: { x: number, y: number } }) {
			if (!pos) {
				return;
			}
			pos.hor.x = pos.hor.x || 0;
			pos.hor.y = pos.hor.y || 0;
			pos.ver.x = pos.ver.x || 0;
			pos.ver.y = pos.ver.y || 0;
			this.diffPos = pos;
		}

		/**
		 * 设置层级
		 */
		public setIndex(index: number) {
			if (index == void 0) {
				return;
			}
			index = index || 0;
			if (!this.parent || !this.armatureDisplay) {
				this.waitIndex = index;
				return;
			}
			this.parent.setChildIndex(this.armatureDisplay, index);
		}

		/** 设置遮罩 */
		public setMask(mask: egret.DisplayObject | egret.DisplayObjectContainer) {
			if (!this.armatureDisplay) {
				return;
			}
			this.armatureDisplay.mask = mask;
		}

		/** 设置透明度 */
		public setAlpha(alpha: number) {
			if (alpha == void 0) {
				return;
			}
			if (!this.parent || !this.armatureDisplay) {
				this.orgAlpha = alpha;
				return;
			}
			this.orgAlpha = alpha;
			this.armatureDisplay.alpha = alpha;
		}

		/** 显示 */
		public show() {
			if (!this.armatureDisplay) {
				return;
			}
			this.armatureDisplay.visible = true;
		}

		/** 隐藏 */
		public hide() {
			if (!this.armatureDisplay) {
				return;
			}
			this.armatureDisplay.visible = false;
		}

		/**
		 * 播放完成
		 */
		public playComplete() {
			this.armatureDisplay.removeEvent(dragonBones.EgretEvent.COMPLETE, this.playComplete, this);
			if (this.exitAim) {
				this.playOutAim();
			} else {
				this.armatureDisplay.dispatchEventWith(egret.Event.COMPLETE);
				if (this.isComRemve) {
					this.remove();
				}
			}
		}

		/**
		 * 播放退场动画
		 */
		private playOutAim() {
			let _props: Object;
			switch (this.exitAim.aimType) {
				//原地消失
				case 0:
					_props = { alpha: 0 };
					break;
				//放大消失
				case 1:
					_props = { scaleX: 5, scaleY: 5, alpha: 0 };
					break;
				//缩小消失
				case 2:
					_props = { scaleX: 0, scaleY: 0, alpha: 0 };
					break;
			}

			egret.setTimeout(() => {
				gTween.tween(this.armatureDisplay, void 0, {
					props: _props,
					duration: this.exitAim.time,
					call: {
						callback: () => {
							this.armatureDisplay.dispatchEventWith(egret.Event.COMPLETE);
							if (this.isComRemve) {
								this.remove();
							}
						},
						thisObj: this
					}
				});
			}, this, this.exitAim.wait);
		}

		/**
		 * 移除骨骼的显示容器
		 */
		public remove() {
			gComMgr.rmObj(this.armatureDisplay);
		}

		/**
		 * 创建骨架的显示容器
		 */
		public create() {
			if (!this.resName) {
				return;
			}
			const rawData = RES.getRes(this.resName + "_ske_json");
			const textureAtlas = RES.getRes(this.resName + "_tex_json");
			const texture = RES.getRes(this.resName + "_tex_png");

			// this.factory = dragonBones.EgretFactory.factory;
			this.factory = new dragonBones.EgretFactory();
			this.factory.autoSearch = true;
			//engine v5.0
			this.factory.addDragonBonesData(this.factory.parseDragonBonesData(rawData));
			this.factory.addTextureAtlasData(this.factory.parseTextureAtlasData(textureAtlas, texture));

			// factory.parseDragonBonesData(rawData);
			// factory.parseTextureAtlasData(textureAtlas, texture);

			this.armature = this.factory.buildArmature(this.armatureName);
			this.armatureDisplay = this.factory.buildArmatureDisplay(this.armatureName);
		}

		/** 初始化 */
		private init(): boolean {
			if (!this.armatureDisplay) {
				this.create();
				if (!this.armatureDisplay) {
					return;
				}
			}
			if (!this.parent) {
				return;
			}
			this.parent.addChild(this.armatureDisplay);
			if (this.waitScale) {
				this.setScale(this.waitScale.x, this.waitScale.y);
			}
			if (!this.waitPos) {
				this.setPos({ x: this.parent.width / 2, y: this.parent.height / 2 });
			} else {
				this.setPos(this.waitPos);
				// this.waitPos = null;
			}
			this.setIndex(this.waitIndex);
			this.setAlpha(this.orgAlpha || this.armatureDisplay.alpha);
			this.show();
			return true;
		}

		/**
		 * 切换显示资源
		 * @param {string} resName 资源名称
		 * @param {string} dragonBonesName 指定的龙骨数据名称。
		 * @param {string} armatureName 指定的骨架名称。
		 * @param {string} slotName 指定的插槽名称。
		 * @param {string} displayName 指定的显示对象名称。
		 * @param {string} olgSlotName 指定替换的旧插槽名称。
		 * @param {number} displayIndex 要替换的显示对象的索引，如果未设置，则替换当前正在显示的显示对象。
		 */
		public replaceDisplay(resName: string, dragonBonesName: string, armatureName: string, slotName: string, displayName: string, olgSlotName: string, displayIndex?: number) {
			this.factory.parseDragonBonesData(RES.getRes(resName + "_ske_json"));
			this.factory.parseTextureAtlasData(RES.getRes(resName + "_tex_json"), RES.getRes(resName + "_tex_png"));

			const slot: dragonBones.Slot = this.armatureDisplay.armature.getSlot(olgSlotName);
			this.factory.replaceSlotDisplay(dragonBonesName, armatureName, slotName, displayName, slot, displayIndex);
		}

		/**
		 * 销毁龙骨
		 */
		public dispose() {
			const armature = this.armature;

			dragonBones.WorldClock.clock.remove(armature);
			this.remove();
			armature.dispose();
		}

		/** 设置or获取对应指引方向 */
		public guideDir(guideDir?: 1 | 2): 1 | 2 {
			if (guideDir != void 0) {
				this._guideDir = guideDir;
			} else {
				return this._guideDir;
			}
		}

		/** 设置or获取对应指引方向 */
		public screenType(screenType?: "heng" | "shu"): "heng" | "shu" {
			if (screenType != void 0) {
				this._screenType = screenType;
			} else {
				return this._screenType;
			}
		}

		/** 获取宽 */
		public getWidth() {
			if (!this.armatureDisplay) {
				return;
			}
			return this.armatureDisplay.width;
		}

		/** 获取高 */
		public getHeight() {
			if (!this.armatureDisplay) {
				return;
			}
			return this.armatureDisplay.height;
		}
	}
}