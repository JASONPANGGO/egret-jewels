namespace com {
	/**
	 * 粒子对象
	 */
	export class ComParticle {
		public id: number;
		private parent: egret.DisplayObjectContainer; //父级对象容器
		private cfgName: string; //配置名称
		private resName: string; //资源名称
		public system: particle.GravityParticleSystem;

		/**
		 * 构造一个粒子对象
		 */
		public constructor() {

		}

		/**
		 * 创建粒子
		 */
		private create() {
			if (!this.system) {
				const texture: egret.Texture = RES.getRes(this.resName + "_png");
				const config: Object = RES.getRes(this.cfgName + "_json");
				this.system = new particle.GravityParticleSystem(texture, config);
				this.system.touchEnabled = false;
				this.setPos();
			}
			this.parent.addChild(this.system);
		}

		/**
		 * 设置数据
		 * @param {egret.DisplayObjectContainer} parent 父级对象容器
		 * @param {string} resName 资源名称
		 */
		public setData(parent: egret.DisplayObjectContainer, resName: string, cfgName?: string) {
			this.parent = parent;
			this.resName = resName;
			this.cfgName = cfgName || resName;
			this.create();
		}

		/**
		 * 开始播放粒子
         * @param {number} duration 粒子出现总时间
		 */
		public start(duration?: number) {
			this.system.start(duration);
		}

        /**
         * 停止创建粒子
         * @param {boolean} clear 是否清除掉现有粒子
         */
		public stop(clear?: boolean) {
			this.system.stop(clear);
		}

        /**
         * 更换粒子纹理
		 * @param {string} resName 资源名称
         */
		public change(resName: string) {
			this.resName = resName;
			const texture: egret.Texture = RES.getRes(this.resName + "_png");
			this.system.changeTexture(texture);
		}

		/** 
		 * 设置层级
		 */
		public setIndex(index: number) {
			if (!this.system || !this.system.parent) {
				return;
			}
			this.system.parent.setChildIndex(this.system, index);
		}

		/**
		 * 设置粒子位置
		 */
		public setPos(x: number = 0, y: number = 0) {
			this.system.x = x;
			this.system.y = y;
		}

		/**
		 * 设置粒子系统最大粒子数，超过该数量将不会继续创建粒子，取值范围[1,Number.MAX_VALUE]
		 */
		public setMaxParticle(max: number) {
			this.system.maxParticles = max;
		}

		/**
		 * 设置缩放值
		 */
		public setScale(x: number = 1, y: number = 1) {
			this.system.scaleX = x;
			this.system.scaleY = y;
		}

		/**
		 * 设置角度
		 */
		public setRotation(rotation: number = 0) {
			this.system.rotation = rotation;
		}

		/**
		 * 更新粒子发射位置x
		 */
		public updateEmitterX(x: number) {
			this.system.emitterX = x;
		}

		/**
		 * 更新粒子发射位置y
		 */
		public updateEmitterY(y: number) {
			this.system.emitterY = y;
		}
	}
}