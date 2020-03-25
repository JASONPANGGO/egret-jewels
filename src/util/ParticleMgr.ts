namespace util {
	/**
	 * 粒子管理器
	 */
	export class ParticleMgr {
		private main: scene.GameBase | ui.UiFileBase | com.ComFileBase;

		public constructor(main: scene.GameBase | ui.UiFileBase | com.ComFileBase) {
			this.main = main;
		}

		private _particles: {};

		private get particles() {
			return this._particles;
		}
		private set particles(particle: {}) {
			this._particles = particle;
		}

		/**
		 * 获取粒子
		 * @param {number} id 粒子ID
		 */
		public getParticle(id: number | string): { id: number, parent?: egret.DisplayObjectContainer, resName?: string[], cfgName?: string, particleObj?: {}, idx?: number } {
			if (id == void 0) {
				return;
			}
			const particles = this.particles;
			if (!particles) {
				return;
			}
			let particle: { id: number, parent?: egret.DisplayObjectContainer, resName?: string[], cfgName?: string, particleObj?: {}, idx?: number } = particles[id];
			if (!particle) {
				particle = { id: Number(id) };
			}
			return particle;
		}

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
			if (!this.particles) {
				this.particles = {};
			}
			const id: number = gAutoId.id;
			const particle = this.getParticle(id);
			if (!particle) {
				return;
			}
			if (!parent || !resName || !cfgName) {
				return;
			}
			particle.parent = parent;
			particle.resName = resName;
			particle.cfgName = cfgName;
			if (idx == void 0) {
				idx = parent.numChildren;
			}
			particle.idx = idx;
			this.particles[id] = particle;

			for (let i: number = 0; i < resName.length; i++) {
				const comParticle = this.createParticle(id, resName[i], cfgName, i, autoStart);
				this.updataParticleEmitter(parent, comParticle);
				this.setParticleIndex(comParticle, idx);
				this.setParticlePos(comParticle, x, y);
			}
			return id;
		}

		/**
		 * 开始播放所有粒子
		 * @param {number} duration 粒子出现总时间
		 */
		public startParticles(duration?: number) {
			const particles = this.particles;
			if (!particles) {
				return;
			}
			for (const id in particles) {
				this.startParticle(id, duration);
			}
		}

		/**
		 * 开始播放粒子
		 * @param {number} id 当前粒子ID
		 * @param {number} duration 粒子出现总时间
		 */
		public startParticle(id: number | string, duration?: number) {
			if (id == void 0) {
				return;
			}
			const particle = this.getParticle(id);
			if (!particle) {
				return;
			}
			let particleObj = particle.particleObj;
			if (!particleObj) {
				return;
			}
			for (const key in particleObj) {
				(particleObj[key] as com.ComParticle).start(duration);
			}
		}

		/**
		 * 停止创建所有粒子
         * @param {boolean} clear 是否清除掉现有粒子
		 */
		public stopParticles(clear?: boolean) {
			const particles = this.particles;
			if (!particles) {
				return;
			}
			for (const id in particles) {
				this.stopParticle(id, clear);
			}
		}

		/**
		 * 停止创建粒子
		 * @param {number} id 当前粒子ID
         * @param {boolean} clear 是否清除掉现有粒子
		 */
		public stopParticle(id: number | string, clear?: boolean) {
			if (id == void 0) {
				return;
			}
			const particle = this.getParticle(id);
			if (!particle) {
				return;
			}
			let particleObj = particle.particleObj;
			if (!particleObj) {
				return;
			}
			for (const key in particleObj) {
				(particleObj[key] as com.ComParticle).stop(clear);
			}
		}

		/**
		 * 设置所有粒子层级
		 */
		public setParticlesIndex(idx: number) {
			const particles = this.particles;
			if (!particles) {
				return;
			}
			for (const id in particles) {
				const particle = this.getParticle(id);
				let particleObj = particle.particleObj;
				if (!particleObj) {
					continue;
				}
				for (const key in particleObj) {
					this.setParticleIndex(particleObj[key], idx);
				}
			}
		}

		/**
		 * 设置所有粒子位置
		 */
		public setParticlesPos(x: number = 0, y: number = 0) {
			const particles = this.particles;
			if (!particles) {
				return;
			}
			for (const id in particles) {
				const particle = this.getParticle(id);
				let particleObj = particle.particleObj;
				if (!particleObj) {
					continue;
				}
				for (const key in particleObj) {
					this.setParticlePos(particleObj[key], x, y);
				}
			}
		}

		/**
		 * 更新所有粒子发射位置
		 */
		public updataParticlesEmitter() {
			const particles = this.particles;
			if (!particles) {
				return;
			}
			for (const id in particles) {
				const particle = this.getParticle(id);
				let particleObj = particle.particleObj;
				if (!particleObj) {
					continue;
				}
				for (const key in particleObj) {
					this.updataParticleEmitter(particle.parent, particleObj[key]);
				}
			}
		}

		/**
		 * 设置所有粒子系统最大粒子数，超过该数量将不会继续创建粒子，取值范围[1,Number.MAX_VALUE]
		 * @param {number} id 当前粒子ID
		 */
		public setMaxParticles(id: number | string, max: number) {
			if (id == void 0) {
				return;
			}
			const particle = this.getParticle(id);
			if (!particle) {
				return;
			}
			let particleObj = particle.particleObj;
			if (!particleObj) {
				return;
			}
			for (const key in particleObj) {
				(particleObj[key] as com.ComParticle).setMaxParticle(max);
			}
		}

		/**
		 * 更新粒子发射位置
		 */
		private updataParticleEmitter(parent: egret.DisplayObjectContainer, comParticle: com.ComParticle) {
			if (!comParticle || !parent) {
				return;
			}
			comParticle.updateEmitterX(parent.width / 2);
		}

		/**
		 * 设置粒子层级
		 */
		private setParticleIndex(comParticle: com.ComParticle, idx: number) {
			if (!comParticle) {
				return;
			}
			comParticle.setIndex(idx);
		}

		/**
		 * 设置粒子位置
		 */
		private setParticlePos(comParticle: com.ComParticle, x: number, y: number) {
			if (!comParticle) {
				return;
			}
			comParticle.setPos(x, y);
		}

		/**
		 * 设置粒子系统最大粒子数，超过该数量将不会继续创建粒子，取值范围[1,Number.MAX_VALUE]
		 */
		private setMaxParticle(comParticle: com.ComParticle, max: number) {
			if (!comParticle) {
				return;
			}
			comParticle.setMaxParticle(max);
		}

		/**
		 * 创建粒子
		 */
		private createParticle(id: number, resName: string, cfgName: string, key: number, autoStart: boolean): com.ComParticle {
			const particle = this.getParticle(id);
			if (!particle) {
				return;
			}
			if (!particle.particleObj) {
				particle.particleObj = {};
			}
			const comParticle = this.retParticle(particle.parent, particle.particleObj[key], resName, cfgName, autoStart);
			particle.particleObj[key] = comParticle;
			return comParticle;
		}

		/**
		 * 返回粒子
		 * @param {string} resName 资源名称
		 */
		private retParticle(parent: egret.DisplayObjectContainer, partic: com.ComParticle, resName: string, cfgName: string, autoStart: boolean): com.ComParticle {
			if (!parent || !resName || !cfgName) {
				return;
			}
			if (!partic) {
				partic = new com.ComParticle();
				partic.setData(parent, resName, cfgName);
				if (autoStart) {
					partic.start();
				}
			}
			return partic;
		}
	}
}