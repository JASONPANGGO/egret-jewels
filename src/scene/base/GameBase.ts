namespace scene {
	/**
	 * 游戏场景基础文件
	 */
	export abstract class GameBase extends eui.Component {
		public classId: number; //不需要重写，自动设置
		public className: string; //不需要重写，自动设置
		/**
		 * 初始化
		 * @param {any[]} args open()传参会通过init()传过去
		 */
		protected abstract init(...args: any[]);
		protected abstract load(); //首次打开界面时调用
		protected abstract start(); //每次打开界面都会调用
		protected abstract stop(); //每次结束界面都会调用
		protected abstract update(); //监听界面，每帧都会调用
		protected abstract removeEvent(); //移除事件
		protected abstract addEvent(); //注册事件
		protected abstract resizeView(); //窗口大小改变时调用(每次打开界面会调用一次)
		protected abstract rotateView(); //屏幕横竖屏转换时调用(每次打开界面会调用一次)

		public isLoadRes: boolean = null; //是否已loadRes()资源
		public isFirstOpen: boolean = true; //是否第一次打开界面
		public screenType: gConst.screenType = null; //横竖屏类型
		public mobileType: gConst.mobileType = null; //设备类型
		public firstTouch: boolean = null; //首次触摸

		private curW: number;
		private endDelay: number; //结束延迟

		private UiFirst: ui.UiFirst;

		public constructor() {
			super();
			this.classId = gAutoId.id;
			// this.className = (this as any).__proto__.__class__.split(".")[1];
			this.isFirstOpen = true;
		}

		/**
		 * 打开界面
		 * @param {any[]} args open()传参会通过init()传过去
		 */
		public open(...args: any[]) {
			const main = GameMgr.main;
			main.addChild(GameMgr.gameScene);

			this.init(...args);
			if (this.isFirstOpen) {
				this._initResizeView();
			}

			if (!this.isLoadRes) {
				this.isLoadRes = true;
				this.load();
			}
			this._resizeView();
			GameMgr.stage.removeEventListener(egret.Event.RESIZE, this._resizeView, this);
			GameMgr.stage.addEventListener(egret.Event.RESIZE, this._resizeView, this);
			this.start();
			this._update();
			this.removeEventListener(egret.Event.ENTER_FRAME, this._update, this);
			this.addEventListener(egret.Event.ENTER_FRAME, this._update, this);
			this.removeEvent();
			this.addEvent();
			if (this.isFirstOpen) {
				this.isFirstOpen = false;
			}
		}

		/** 关闭界面 */
		public close() {
			this.end();
			gComMgr.rmObj(this);
			this.dispatchEventWith(gConst.eventType.CLOSE);
		}

		/** 结束界面 */
		public end() {
			this.isLoadRes = false;
			GameMgr.stage.removeEventListener(egret.Event.RESIZE, this._resizeView, this);
			this.removeEventListener(egret.Event.ENTER_FRAME, this._update, this);
			this.removeEvent();
			gComMgr.rmEvent(this);
			this.stop();
		}

		/** 显示界面 */
		public show() {
			this.visible = true;
		}

		/** 隐藏界面 */
		public hide() {
			this.visible = false;
		}

		/** 点击重玩 */
		public clickReplay(event: egret.TouchEvent): void {
			event.stopPropagation();
			GameMgr.replay();
		}

		/** 游戏结束(SDK上报需要) */
		public gameEnd(): void {
			Mapi.gameEnd();
			// GameMgr.isEnd = true;

			this.UiFirst.updateDir(
				{
					horDir: gConst.direction.RIGHT_TOP,
					verDir: gConst.direction.CENTER_TOP
				}, {
					horDir: gConst.direction.RIGHT_TOP,
					verDir: gConst.direction.CENTER_BOTTOM
				}
			);

			this.UiFirst.gameEnd();
		}


		/** 重玩游戏 */
		public replay(): void {
			this.destroy();
			GameMgr.init();
			GameMgr.gameScene = new scene.GameScene();
			GameMgr.gameScene.open();

			if (this.parent) {
				this.parent.addChild(GameMgr.gameScene);
				this.parent.removeChild(this);
			}
			Mapi.gameRetry();
		}

		/** 销毁 */
		private destroy() {
			if (this.UiFirst) {
				this.UiFirst.destroy();
			}

			this.removeEvent();

			this.isLoadRes = null;
		}

		/** 点击下载(用户点击下载，调用SDK函数) */
		public clickInstall(event?: egret.TouchEvent): void {
			if (event) {
				event.stopPropagation();
			}
			Mapi.install();
		}

		/** 自动结束 */
		public autoEnd() {
			const autoEndTime: number = GameMgr.getConfig("autoEndTime");
			if (autoEndTime != void 0 && autoEndTime > 0) {
				egret.clearTimeout(this.endDelay);
				this.endDelay = egret.setTimeout(this.openEnd, this, autoEndTime * 1000);
			}
		}

		/* =========== 粒子代码-start =========== */
		private particleMgr: util.ParticleMgr;

		/**
		 * 创建所有粒子
		 * @param {egret.DisplayObjectContainer} parent 粒子父级
		 * @param {string[]} resName 粒子资源名称组
		 * @param {string} cfgName 粒子配置名称
		 * @param {number} idx 粒子层级
		 * @param {boolean} autoStart = true 粒子自动开始播放
		 * @param {number} x = 0 粒子X坐标
		 * @param {number} y = 0 粒子Y坐标
		 * @returns {number} 当前粒子ID
		 */
		public createParticles(parent: egret.DisplayObjectContainer, resName: string[], cfgName: string, idx?: number, autoStart: boolean = true, x: number = 0, y: number = 0): number {
			if (!this.particleMgr) {
				this.particleMgr = new util.ParticleMgr(this);
			}
			return this.particleMgr.createParticles(parent, resName, cfgName, idx, autoStart, x, y);
		}

		/**
		 * 获取粒子
		 * @param {number} id 粒子ID
		 */
		public getParticle(id: number) {
			if (!this.particleMgr) {
				return;
			}
			return this.particleMgr.getParticle(id);
		}

		/**
		 * 开始播放所有粒子
		 * @param {number} duration 粒子出现总时间
		 */
		public startParticles(duration?: number) {
			if (!this.particleMgr) {
				return;
			}
			this.particleMgr.startParticles(duration);
		}

		/**
		 * 开始播放粒子
		 * @param {number} id 当前粒子ID
		 * @param {number} duration 粒子出现总时间
		 */
		public startParticle(id: number | string, duration?: number) {
			if (!this.particleMgr) {
				return;
			}
			this.particleMgr.startParticle(id, duration);
		}

		/**
		 * 停止创建所有粒子
         * @param {boolean} clear 是否清除掉现有粒子
		 */
		public stopParticles(clear?: boolean) {
			if (!this.particleMgr) {
				return;
			}
			this.particleMgr.stopParticles(clear);
		}

		/**
		 * 停止创建粒子
		 * @param {number} id 当前粒子ID
         * @param {boolean} clear 是否清除掉现有粒子
		 */
		public stopParticle(id: number | string, clear?: boolean) {
			if (!this.particleMgr) {
				return;
			}
			this.particleMgr.stopParticle(id, clear);
		}

		/**
		 * 设置所有粒子层级
		 */
		public setParticlesIndex(idx: number) {
			if (!this.particleMgr) {
				return;
			}
			this.particleMgr.setParticlesIndex(idx);
		}

		/**
		 * 更新所有粒子发射位置
		 */
		private updataParticlesEmitter() {
			if (!this.particleMgr) {
				return;
			}
			this.particleMgr.updataParticlesEmitter();
		}

		/**
		 * 设置所有粒子位置
		 */
		public setParticlesPos(x: number = 0, y: number = 0) {
			if (!this.particleMgr) {
				return;
			}
			this.particleMgr.setParticlesPos(x, y);
		}

		/**
		 * 设置所有粒子系统最大粒子数，超过该数量将不会继续创建粒子，取值范围[1,Number.MAX_VALUE]
		 * @param {number} id 当前粒子ID
		 */
		public setMaxParticles(id: number | string, max: number) {
			if (!this.particleMgr) {
				return;
			}
			this.particleMgr.setMaxParticles(id, max);
		}
		/* =========== 粒子代码-end =========== */

		/* =========== 闪烁物代码-start =========== */
		private starMgr: util.StarMgr;
		/**
		 * 显示闪烁物
		 * @param {egret.DisplayObjectContainer} con 闪烁物容器
		 * @param {string[]} starAnswers 闪烁物资源名称配置
		 * @param {number} cfg.intervalMax 下次显示闪烁物，时间间隔范围，最大值
		 * @param {number} cfg.intervalMin 下次显示闪烁物，时间间隔范围，最小值
		 * @param {number} cfg.scaleMax 闪烁物缩放值范围，最大值
		 * @param {number} cfg.scaleMin 闪烁物缩放值范围，最小值
		 * @param {boolean} cfg.isRotate 闪烁物是否旋转
		 * @param {boolean} cfg.isAdaptiveScale 闪烁物是否自适应父级缩放
		 * @param {number} cfg.starMaxCnt 闪烁物是否自适应父级缩放
		 */
		public showStar(con: egret.DisplayObjectContainer, starAnswers?: string[], cfg?: { intervalMax?: number, intervalMin?: number, scaleMax?: number, scaleMin?: number, isRotate?: boolean, isAdaptiveScale?: boolean, starMaxCnt?: number }) {
			if (!this.starMgr) {
				this.starMgr = new util.StarMgr(con);
			}
			this.starMgr.show(starAnswers, cfg);
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
		 * @param {number} cfg.starMaxCnt 闪烁物是否自适应父级缩放
		 */
		public updateStarData(starAnswers?: string[], cfg?: { intervalMax?: number, intervalMin?: number, scaleMax?: number, scaleMin?: number, isRotate?: boolean, isAdaptiveScale?: boolean, starMaxCnt?: number }) {
			if (!this.starMgr) {
				return;
			}
			this.starMgr.updateData(starAnswers, cfg);
		}

		/**
		 * 隐藏闪烁物
		 * @param {boolean} clearAll = true 是否清除所有
		 */
		public hideStar(clearAll: boolean = true) {
			if (!this.starMgr) {
				return;
			}
			this.starMgr.hide(clearAll);
		}
		/* =========== 闪烁物代码-end =========== */

		/* =========== 漂浮物代码-start =========== */
		private floatMgr: util.FloatMgr;

		/**
		 * 显示漂浮物
		 * @param {egret.DisplayObjectContainer} con 漂浮物容器
		 * @param {...} cfg 漂浮物数据
		 */
		public showFloat(con: egret.DisplayObjectContainer, cfg?: { floatAnswers: string[], dires?: string[], speedMax?: number, speedMin?: number, rotateMax?: number, rotateMin?: number, rotateDiff?: number, alphaMax?: number, alphaMin?: number, alphaDiff?: number, scaleMax?: number, scaleMin?: number, scaleDiff?: number, isAllAlpha?: boolean, isAdaptiveScale?: boolean, floatMaxCnt?: number }) {
			if (!this.floatMgr) {
				this.floatMgr = new util.FloatMgr(con);
			}
			this.floatMgr.show(cfg);
		}

		/**
		 * 更新漂浮物数据
		 * @param {...} cfg 漂浮物数据
		 * @param {boolean} isInitDefault = true 是否初始化默认值
		 */
		public updateFloatData(cfg?: { floatAnswers: string[], dires?: string[], speedMax?: number, speedMin?: number, rotateMax?: number, rotateMin?: number, rotateDiff?: number, alphaMax?: number, alphaMin?: number, alphaDiff?: number, scaleMax?: number, scaleMin?: number, scaleDiff?: number, isAllAlpha?: boolean, isAdaptiveScale?: boolean, floatMaxCnt?: number }) {
			if (!this.floatMgr) {
				return;
			}
			this.floatMgr.updateData(cfg);
		}

		/**
		 * 隐藏漂浮物
		 * @param {boolean} clearAll = true 是否清除所有
		 */
		public hideFloat(clearAll: boolean = true) {
			if (!this.floatMgr) {
				return;
			}
			this.floatMgr.hide(clearAll);
		}
		/* =========== 漂浮物代码-end =========== */


		/* =========== 业务代码-start =========== */

		/** 打开顶层页面 */
		public openFirst() {
			this.UiFirst = gUiMgr.create(ui.UiFirst) as ui.UiFirst;
			this.UiFirst.open(
				{
					horDir: gConst.direction.RIGHT_CENTER,
					verDir: gConst.direction.CENTER_TOP
				}, {
					horDir: gConst.direction.RIGHT_CENTER,
					verDir: gConst.direction.CENTER_TOP
				}
			);
		}

		/** 关闭顶层页面 */
		public closeFirst() {
			if (!this.UiFirst) {
				return;
			}
			this.UiFirst.close();
		}

		/** 打开结束界面 */
		public openEnd(isShowEnd: boolean = true) {
			// console.info("openEnd");
			egret.clearTimeout(this.endDelay);
			if (GameMgr.isEnd) {
				return;
			}
			GameMgr.isEnd = true;
			this.hideGuide();

			this.removeEvent();
			Mapi.gameEnd();

			if (isShowEnd) {
				this.showEnd();
			}
		}

		/** 显示结束界面 */
		public showEnd() {
			this.gameEnd();

			this.showEndOther();
		}

		/** 结束界面其它元素展示 */
		public showEndOther() {
			// console.info("showEndOther");
			// if (!this.UiEnd) {
			// 	return;
			// }
			// this.UiEnd.showOther();
		}

		/** 关闭结束界面 */
		public closeEnd() {
			// if (!this.UiEnd) {
			// 	return;
			// }
			// this.UiEnd.close();
		}

		public guide: com.ComGuide; //引导组件
		public showGuided: boolean; //引导显示状态

		/** 显示引导 */
		public showGuide() {
			if (GameMgr.isEnd) {
				return;
			}
			if (this.showGuided) {
				return;
			}
			this.showGuided = true;

			if (!this.guide) {
				this.guide = new com.ComGuide();
				this.guide.open();
			}

			const time: number = this.firstTouch ? gConst.firstGuideTimer : gConst.afterGuideTimer;

			// this.guide.setData(time, { target1: this.item }, this);
			// this.guide.play();
		}

		/** 隐藏引导 */
		public hideGuide() {
			this.firstTouch = false;

			if (!this.guide) {
				return;
			}
			if (!this.showGuided) {
				return;
			}
			this.showGuided = false;
			this.guide.over();
		}
		/* =========== 业务代码-end =========== */

		private _update(event?: egret.Event): void {
			const winW: number = GameMgr.getWinW;
			if (this.curW != winW) {
				this._resizeView();
			}
			this.update();
		}

		/**
		 * 初始化窗口大小
		 * @param {boolean} rotate = void 0 是否转屏
		 */
		public _initResizeView(rotate?: boolean): boolean {
			const winW: number = GameMgr.getWinW;
			const winH: number = GameMgr.getWinH;
			let isRotate: boolean = GameMgr.screenType === null || rotate; //是否转屏
			let _r: number; //当前窗口宽高比
			if (GameMgr.stage.stageWidth < GameMgr.stage.stageHeight) {
				//竖屏
				if (GameMgr.screenType === gConst.screenType.HORIZONTAL) {
					isRotate = true;
				}
				GameMgr.screenType = gConst.screenType.VERTICAL;
				GameMgr.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
				_r = GameMgr.stage.stageWidth / GameMgr.stage.stageHeight;
			} else {
				//横屏
				if (GameMgr.screenType === gConst.screenType.VERTICAL) {
					isRotate = true;
				}
				GameMgr.screenType = gConst.screenType.HORIZONTAL;
				GameMgr.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
				_r = GameMgr.stage.stageHeight / GameMgr.stage.stageWidth;
			}
			GameMgr.mobileType = _r < 0.51 ? gConst.mobileType.IPHONE_X : _r < 0.65 ? gConst.mobileType.IPHONE_8 : gConst.mobileType.IPAD;

			this.curW = winW;
			let _w: number;
			let _h: number;
			if (winW > winH) {
				_h = gConst.screen.WIDTH;
				_w = gConst.screen.WIDTH / winH * winW;
				GameMgr.stage.orientation = egret.OrientationMode.LANDSCAPE;
			} else {
				_w = gConst.screen.WIDTH;
				_h = gConst.screen.WIDTH / winW * winH;
				GameMgr.stage.orientation = egret.OrientationMode.PORTRAIT;
			}
			if (GameMgr.gameScene) {
				GameMgr.gameScene.width = Math.ceil(_w);
				GameMgr.gameScene.height = Math.ceil(_h);
			}
			GameMgr.scale = 1;
			return isRotate;
		}

		/** 窗口大小改变时调用 */
		private _resizeView(event?: egret.Event) {
			const isRotate: boolean = this._initResizeView(); //是否第一次打开界面，或存在转屏
			this.resizeView();
			this.updataParticlesEmitter();
			if (isRotate) {
				this.rotateView();
			}
		}
	}
}