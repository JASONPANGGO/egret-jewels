namespace util {
	/**
	 * 漂浮物管理器
	 */
	export class FloatMgr {
		public con: egret.DisplayObjectContainer; //漂浮物容器

		private _floatPool: com.ComFloat[] = []; //漂浮物对象池
		private _curAllFloats: com.ComFloat[] = []; //当前漂浮物群

		private data: data.FloatData; //漂浮物数据

		public constructor(con: egret.DisplayObjectContainer) {
			this.con = con;
		}

		private update(timeStamp: number): boolean {
			this.addFloat();
			this.checkFloat();
			this.moveFloat();
			return;
		}

		private isShowed: boolean;

		/**
		 * 显示漂浮物
		 * @param {...} cfg 漂浮物数据
		 */
		public show(cfg?: { floatAnswers: string[], dires?: string[], speedMax?: number, speedMin?: number, rotateMax?: number, rotateMin?: number, rotateDiff?: number, alphaMax?: number, alphaMin?: number, alphaDiff?: number, scaleMax?: number, scaleMin?: number, scaleDiff?: number, isAllAlpha?: boolean, isAdaptiveScale?: boolean, floatMaxCnt?: number }) {
			if (!this.data) {
				this.data = new data.FloatData();
			}
			this.data.setData(cfg);

			this.isShowed = true;
			egret.startTick(this.update, this);
		}

		/**
		 * 更新漂浮物数据
		 * @param {...} cfg 漂浮物数据
		 * @param {boolean} isInitDefault = true 是否初始化默认值
		 */
		public updateData(cfg?: { floatAnswers: string[], dires?: string[], speedMax?: number, speedMin?: number, rotateMax?: number, rotateMin?: number, rotateDiff?: number, alphaMax?: number, alphaMin?: number, alphaDiff?: number, scaleMax?: number, scaleMin?: number, scaleDiff?: number, isAllAlpha?: boolean, isAdaptiveScale?: boolean, floatMaxCnt?: number }, isInitDefault: boolean = true) {
			if (!this.data) {
				this.data = new data.FloatData();
			}
			this.data.updateData(cfg, isInitDefault);
		}

		/**
		 * 隐藏漂浮物
		 * @param {boolean} clearAll = true 是否清除所有
		 */
		public hide(clearAll: boolean = true) {
			egret.stopTick(this.update, this);
			this.isShowed = false;
			if (clearAll) {
				const i: number = 0;
				const _curAllFloats = this._curAllFloats;
				let star = _curAllFloats.length > i ? _curAllFloats[i] : null;
				while (star) {
					this.removeFloat(star);
					star = _curAllFloats.length > i ? _curAllFloats[i] : null;
				}
			}
		}

		private addFloat() {
			if (this._curAllFloats.length >= this.data.floatMaxCnt) {
				return;
			}
			let float: com.ComFloat;
			if (this._floatPool && this._floatPool.length > 0) {
				float = this._floatPool.pop();
			} else {
				float = new com.ComFloat();
			}
			this.con.addChildAt(float, 0);
			float.open(this.data);

			//初始化漂浮物出生方向、角度
			const dire: string = gMath.getRandomAnswer(...this.data.dires); //出生方向
			float.dire(dire);
			const anchorX: number = float.anchorOffsetX;
			const anchorY: number = float.anchorOffsetY;
			const parentW: number = this.con.width;
			const parentH: number = this.con.height;
			switch (dire) {
				//上
				case gConst.direction.CENTER_TOP:
					float.x = gMath.getRandomInteger(parentW + anchorX, -anchorX);
					float.y = -anchorY;
					break;
				//下
				case gConst.direction.CENTER_BOTTOM:
					float.x = gMath.getRandomInteger(parentW + anchorX, -anchorX);
					float.y = parentH + anchorY;
					break;
				//左
				case gConst.direction.LEFT_CENTER:
					float.x = -anchorX;
					float.y = gMath.getRandomInteger(parentH + anchorY, -anchorY);
					break;
				//右
				case gConst.direction.RIGHT_CENTER:
					float.x = parentW + anchorX;
					float.y = gMath.getRandomInteger(parentH + anchorY, -anchorY);
					break;
			}
			this._curAllFloats.push(float);
		}

		private removeFloat(float: com.ComFloat) {
			gTween.rmTweens(float);
			gComMgr.rmObj(float);
			gDevelop.arrDelVal(this._curAllFloats, float);
			this._floatPool.push(float);
		}

		private checkFloat() {
			const parentW: number = this.con.width;
			const parentH: number = this.con.height;
			const excSpace: number = 10; //飞出多少距离

			for (let i: number = 0; i < this._curAllFloats.length;) {
				const float: com.ComFloat = this._curAllFloats[i];
				const anchorX: number = float.anchorOffsetX;
				const anchorY: number = float.anchorOffsetY;

				let isOut: boolean; //是否游出边界
				const dire = float.dire();
				switch (dire) {
					//上
					case gConst.direction.CENTER_TOP:
						isOut = float.y >= parentH + anchorY + excSpace;
						break;
					//下
					case gConst.direction.CENTER_BOTTOM:
						isOut = float.y <= -anchorY - excSpace;
						break;
					//左
					case gConst.direction.LEFT_CENTER:
						isOut = float.x >= parentW + anchorX + excSpace;
						break;
					//右
					case gConst.direction.RIGHT_CENTER:
						isOut = float.x <= -anchorX - excSpace;
						break;
				}

				if (isOut) {
					float.die(null);
					float.destroy();
					this._curAllFloats.splice(i, 1);
					this._floatPool.push(float);
				} else {
					i++;
				}
			}
		}

		private moveFloat() {
			const speedExceed: number = 3; //速度超过多少时使用缓动

			const moveX: Function = (speed: number, float: com.ComFloat, diffMove: number) => {
				if (speed > speedExceed) {
					gTween.toMoveX(float, diffMove, 60);
				} else {
					float.x = diffMove;
				}
			};

			const moveY: Function = (speed: number, float: com.ComFloat, diffMove: number) => {
				if (speed > speedExceed) {
					gTween.toMoveY(float, diffMove, 60);
				} else {
					float.y = diffMove;
				}
			};

			for (let float of this._curAllFloats) {
				if (!float.die()) {
					const speed = float.speed();
					let diffMove: number;
					const dire = float.dire();
					switch (dire) {
						//上
						case gConst.direction.CENTER_TOP:
							diffMove = float.y + speed;
							moveY.call(this, speed, float, diffMove);
							break;
						//下
						case gConst.direction.CENTER_BOTTOM:
							diffMove = float.y - speed;
							moveY.call(this, speed, float, diffMove);
							break;
						//左
						case gConst.direction.LEFT_CENTER:
							diffMove = float.x + speed;
							moveX.call(this, speed, float, diffMove);
							break;
						//右
						case gConst.direction.RIGHT_CENTER:
							diffMove = float.x - speed;
							moveX.call(this, speed, float, diffMove);
							break;
					}

				}
			}
		}
	}
}