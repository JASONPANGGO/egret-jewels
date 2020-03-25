namespace com {
	/**
	 * 控件基础文件
	 */
	export abstract class ComFileBase extends eui.Component {
		public classId: number; //不需要重写，自动设置
		public className: string; //不需要重写，自动设置
		/**
		 * 初始化
		 * @param {any[]} args 构建传参会通过init()传过去
		 */
		protected abstract init(...args: any[]);
		protected abstract load(); //首次创建组件时调用
		protected abstract resizeView(event: egret.Event); //窗口大小改变时调用(每次打开界面会调用一次)
		protected abstract rotateView(event: egret.Event); //屏幕横竖屏转换时调用(每次打开界面会调用一次)
		protected abstract start(); //每次创建组件都会调用
		protected abstract stop(); //每次结束组件都会调用
		protected abstract update(); //监听组件，每帧都会调用
		protected abstract removeEvent(); //移除事件
		protected abstract addEvent(); //注册事件

		public isLoadRes: boolean = null; //是否已loadRes()资源
		public isFirstOpen: boolean = true; //是否第一次创建组件

		/**
		 * 构建组件
		 */
		public constructor() {
			super();
			this.classId = gAutoId.id;
			this.className = (this as any).__proto__.__class__.split(".")[1];
			this.isFirstOpen = true;
		}

		/**
		 * 打开组件
		 * @param {any[]} args open()传参会通过init()传过去
		 */
		public open(...args: any[]) {
			this.init(...args);
			if (!this.isLoadRes) {
				this.isLoadRes = true;
				this.load();
			}
			this._resizeView();
			GameMgr.gameScene.removeEventListener(gConst.eventType.RESIZE_VIEW, this._resizeView, this);
			GameMgr.gameScene.addEventListener(gConst.eventType.RESIZE_VIEW, this._resizeView, this);
			this._rotateView();
			GameMgr.gameScene.removeEventListener(gConst.eventType.ROTATE_VIEW, this._rotateView, this);
			GameMgr.gameScene.addEventListener(gConst.eventType.ROTATE_VIEW, this._rotateView, this);
			this.start();
			this.update();
			this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
			this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
			this.removeEvent();
			this.addEvent();
			if (this.isFirstOpen) {
				this.isFirstOpen = false;
			}
		}

		/** 关闭组件 */
		public close() {
			this.end();
			gComMgr.rmObj(this);
			this.dispatchEventWith(gConst.eventType.CLOSE);
		}

		/** 结束组件 */
		public end() {
			this.isLoadRes = false;
			GameMgr.gameScene.removeEventListener(gConst.eventType.RESIZE_VIEW, this._resizeView, this);
			GameMgr.gameScene.removeEventListener(gConst.eventType.ROTATE_VIEW, this._rotateView, this);
			this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
			this.removeEvent();
			// gComMgr.rmEvent(this);
			this.stop();
		}

		/** 显示组件 */
		public show() {
			this.visible = true;
		}

		/** 隐藏组件 */
		public hide() {
			this.visible = false;
		}

		/** 销毁组件 */
		public destroy(isAim?: boolean) {
			GameMgr.gameScene.removeEventListener(gConst.eventType.RESIZE_VIEW, this.resizeView, this);
			GameMgr.gameScene.removeEventListener(gConst.eventType.ROTATE_VIEW, this.rotateView, this);
			this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
			this.removeEvent();
			this.isFirstOpen = false;
			if (!isAim) {
				gComMgr.destory(this);
			} else {
				gComMgr.fadeOutDestory(this);
			}
		}

		/** 点击下载(用户点击下载，调用SDK函数) */
		public clickInstall(event?: egret.TouchEvent): void {
			if (event) {
				event.stopPropagation();
			}
			Mapi.install();
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

		/** 窗口大小改变时调用 */
		private _resizeView(event?: egret.Event) {
			this.resizeView(event);
			this.updataParticlesEmitter();
		}

		/** 屏幕横竖屏转换时调用 */
		private _rotateView(event?: egret.Event) {
			this.rotateView(event);
		}
	}
}