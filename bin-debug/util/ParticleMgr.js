var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var util;
(function (util) {
    /**
     * 粒子管理器
     */
    var ParticleMgr = (function () {
        function ParticleMgr(main) {
            this.main = main;
        }
        Object.defineProperty(ParticleMgr.prototype, "particles", {
            get: function () {
                return this._particles;
            },
            set: function (particle) {
                this._particles = particle;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 获取粒子
         * @param {number} id 粒子ID
         */
        ParticleMgr.prototype.getParticle = function (id) {
            if (id == void 0) {
                return;
            }
            var particles = this.particles;
            if (!particles) {
                return;
            }
            var particle = particles[id];
            if (!particle) {
                particle = { id: Number(id) };
            }
            return particle;
        };
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
        ParticleMgr.prototype.createParticles = function (parent, resName, cfgName, idx, autoStart, x, y) {
            if (autoStart === void 0) { autoStart = true; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (!this.particles) {
                this.particles = {};
            }
            var id = gAutoId.id;
            var particle = this.getParticle(id);
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
            for (var i = 0; i < resName.length; i++) {
                var comParticle = this.createParticle(id, resName[i], cfgName, i, autoStart);
                this.updataParticleEmitter(parent, comParticle);
                this.setParticleIndex(comParticle, idx);
                this.setParticlePos(comParticle, x, y);
            }
            return id;
        };
        /**
         * 开始播放所有粒子
         * @param {number} duration 粒子出现总时间
         */
        ParticleMgr.prototype.startParticles = function (duration) {
            var particles = this.particles;
            if (!particles) {
                return;
            }
            for (var id in particles) {
                this.startParticle(id, duration);
            }
        };
        /**
         * 开始播放粒子
         * @param {number} id 当前粒子ID
         * @param {number} duration 粒子出现总时间
         */
        ParticleMgr.prototype.startParticle = function (id, duration) {
            if (id == void 0) {
                return;
            }
            var particle = this.getParticle(id);
            if (!particle) {
                return;
            }
            var particleObj = particle.particleObj;
            if (!particleObj) {
                return;
            }
            for (var key in particleObj) {
                particleObj[key].start(duration);
            }
        };
        /**
         * 停止创建所有粒子
         * @param {boolean} clear 是否清除掉现有粒子
         */
        ParticleMgr.prototype.stopParticles = function (clear) {
            var particles = this.particles;
            if (!particles) {
                return;
            }
            for (var id in particles) {
                this.stopParticle(id, clear);
            }
        };
        /**
         * 停止创建粒子
         * @param {number} id 当前粒子ID
         * @param {boolean} clear 是否清除掉现有粒子
         */
        ParticleMgr.prototype.stopParticle = function (id, clear) {
            if (id == void 0) {
                return;
            }
            var particle = this.getParticle(id);
            if (!particle) {
                return;
            }
            var particleObj = particle.particleObj;
            if (!particleObj) {
                return;
            }
            for (var key in particleObj) {
                particleObj[key].stop(clear);
            }
        };
        /**
         * 设置所有粒子层级
         */
        ParticleMgr.prototype.setParticlesIndex = function (idx) {
            var particles = this.particles;
            if (!particles) {
                return;
            }
            for (var id in particles) {
                var particle_1 = this.getParticle(id);
                var particleObj = particle_1.particleObj;
                if (!particleObj) {
                    continue;
                }
                for (var key in particleObj) {
                    this.setParticleIndex(particleObj[key], idx);
                }
            }
        };
        /**
         * 设置所有粒子位置
         */
        ParticleMgr.prototype.setParticlesPos = function (x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var particles = this.particles;
            if (!particles) {
                return;
            }
            for (var id in particles) {
                var particle_2 = this.getParticle(id);
                var particleObj = particle_2.particleObj;
                if (!particleObj) {
                    continue;
                }
                for (var key in particleObj) {
                    this.setParticlePos(particleObj[key], x, y);
                }
            }
        };
        /**
         * 更新所有粒子发射位置
         */
        ParticleMgr.prototype.updataParticlesEmitter = function () {
            var particles = this.particles;
            if (!particles) {
                return;
            }
            for (var id in particles) {
                var particle_3 = this.getParticle(id);
                var particleObj = particle_3.particleObj;
                if (!particleObj) {
                    continue;
                }
                for (var key in particleObj) {
                    this.updataParticleEmitter(particle_3.parent, particleObj[key]);
                }
            }
        };
        /**
         * 设置所有粒子系统最大粒子数，超过该数量将不会继续创建粒子，取值范围[1,Number.MAX_VALUE]
         * @param {number} id 当前粒子ID
         */
        ParticleMgr.prototype.setMaxParticles = function (id, max) {
            if (id == void 0) {
                return;
            }
            var particle = this.getParticle(id);
            if (!particle) {
                return;
            }
            var particleObj = particle.particleObj;
            if (!particleObj) {
                return;
            }
            for (var key in particleObj) {
                particleObj[key].setMaxParticle(max);
            }
        };
        /**
         * 更新粒子发射位置
         */
        ParticleMgr.prototype.updataParticleEmitter = function (parent, comParticle) {
            if (!comParticle || !parent) {
                return;
            }
            comParticle.updateEmitterX(parent.width / 2);
        };
        /**
         * 设置粒子层级
         */
        ParticleMgr.prototype.setParticleIndex = function (comParticle, idx) {
            if (!comParticle) {
                return;
            }
            comParticle.setIndex(idx);
        };
        /**
         * 设置粒子位置
         */
        ParticleMgr.prototype.setParticlePos = function (comParticle, x, y) {
            if (!comParticle) {
                return;
            }
            comParticle.setPos(x, y);
        };
        /**
         * 设置粒子系统最大粒子数，超过该数量将不会继续创建粒子，取值范围[1,Number.MAX_VALUE]
         */
        ParticleMgr.prototype.setMaxParticle = function (comParticle, max) {
            if (!comParticle) {
                return;
            }
            comParticle.setMaxParticle(max);
        };
        /**
         * 创建粒子
         */
        ParticleMgr.prototype.createParticle = function (id, resName, cfgName, key, autoStart) {
            var particle = this.getParticle(id);
            if (!particle) {
                return;
            }
            if (!particle.particleObj) {
                particle.particleObj = {};
            }
            var comParticle = this.retParticle(particle.parent, particle.particleObj[key], resName, cfgName, autoStart);
            particle.particleObj[key] = comParticle;
            return comParticle;
        };
        /**
         * 返回粒子
         * @param {string} resName 资源名称
         */
        ParticleMgr.prototype.retParticle = function (parent, partic, resName, cfgName, autoStart) {
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
        };
        return ParticleMgr;
    }());
    util.ParticleMgr = ParticleMgr;
    __reflect(ParticleMgr.prototype, "util.ParticleMgr");
})(util || (util = {}));
//# sourceMappingURL=ParticleMgr.js.map