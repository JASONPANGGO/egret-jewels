namespace util {
	/**
	 * 摄像机管理器
	 */
	export class CameraMgr {
		public scene: egret.DisplayObject | egret.DisplayObjectContainer;

		public constructor(scene: egret.DisplayObject | egret.DisplayObjectContainer) {
			this.scene = scene;
			this.init();
		}

		private init() {
			const initS: number = this.scene.scaleX;
			this.scene.width = this.scene.width * initS;
			this.scene.height = this.scene.height * initS;
			this.scene.scaleX = this.scene.scaleY = 1;
		}

		private lookPot: { x?: number, y?: number }; //镜头看的位置
		//设置镜头看的位置
		private setLookPot(pot?: { x: number, y: number }): void {
			if (!pot) {
				return;
			}
			if (!this.lookPot) {
				this.lookPot = {};
			}
			this.lookPot.x = pot.x;
			this.lookPot.y = pot.y;
		}

		private baseScale: number;
		private upBaseScale(): void {
			const s1: number = GameMgr.gameScene.width / gConst.screen.HEIGHT;
			const s2: number = GameMgr.gameScene.height / gConst.screen.HEIGHT;
			this.baseScale = Math.max(s1, s2);
		}

		/**
		 * 检查摄像机缩放值
		 */
		private checkCameraScale(scale?: number): number {
			var _scale: number;
			if (scale == void 0) {
				_scale = 1/*this.baseScale*/ * this.partScale;
			} else {
				_scale = 1/*this.baseScale*/ * scale;
				this.partScale = scale;
			}
			return _scale;
		}

		/**
		 * 检查摄像机所看点
		 */
		private checkCameraPot(pot?: { x: number, y: number }): { x: number, y: number } {
			var _x: number;
			var _y: number;
			if (!pot) {
				if (!this.lookPot) {
					return;
				}
				_x = this.lookPot.x;
				_y = this.lookPot.y;
			} else {
				_x = pot.x;
				_y = pot.y;
			}
			return { x: _x, y: _y };
		}

		/**
		 * 摄像机所看点转换成的X、Y
		 */
		private tranCameraLoc(pot?: { x: number, y: number }, scale?: number): { x: number, y: number } {
			pot = this.checkCameraPot(pot);
			if (!pot) {
				return;
			}
			const _scale: number = this.checkCameraScale(scale);
			const parent: egret.DisplayObjectContainer = this.scene.parent;

			let locX: number = parent.width / 2 - pot.x * _scale;
			let locY: number = parent.height / 2 - pot.y * _scale;

			const pParent = parent.parent || GameMgr.gameScene;

			//X边界
			const maxX: number = (parent.width * parent.scaleX - pParent.width) / 2;
			if (locX > maxX) {
				locX = maxX;
			} else {
				const minX: number = pParent.width - this.scene.width * _scale * parent.scaleX // Math.max(parent.scaleX, 1);
				if (locX < minX) {
					locX = minX;
				}
			}
			//Y边界
			const maxY: number = (parent.height * parent.scaleY - pParent.height) / 2;
			if (locY > maxY) {
				locY = maxY;
			} else {
				// const minY: number = parent.height * parent.scaleY - this.scene.height * _scale * this.scene.scaleY;
				const minY: number = pParent.height - this.scene.height * _scale * parent.scaleY // * Math.max(parent.scaleY, 1);
				if (locY < minY) {
					locY = minY;
				}
			}
			return { x: locX, y: locY };
		}

		private partScale: number = 1;
		/**
		 * 更新摄像机
		 */
		public upCamera(isAni: boolean = true, pot?: { x: number, y: number }, scale?: number, callBack?: Function, callThis?: any, ...callArg: any[]): void {
			pot = this.checkCameraPot(pot);
			if (!pot) {
				return;
			}
			this.setLookPot(pot);

			var _scale: number = this.checkCameraScale(scale);
			this.upBaseScale();

			var locXY: { x: number, y: number } = this.tranCameraLoc(pot, scale);

			//看的位置居中！
			if (isAni) {
				gTween.tween(this.scene, void 0, {
					props: {
						x: locXY.x,
						y: locXY.y,
						scaleX: _scale,
						scaleY: _scale
					}, duration: 500,
					call: {
						callback: () => {
							if (callBack) {
								callBack.call(callThis, ...callArg);
							}
						}
					}
				});
			} else {
				this.scene.x = locXY.x;
				this.scene.y = locXY.y;
				this.scene.scaleX = _scale;
				this.scene.scaleY = _scale;
			}
		}
	}
}