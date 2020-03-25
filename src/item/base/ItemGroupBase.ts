namespace item {
	/**
	 * 组基础文件
	 */
	export class ItemGroupBase extends eui.Group {
		public initX: number;
		public initY: number;
		public initIdx: number;
		public initParent: egret.DisplayObjectContainer;
		public initScaleX: number;
		public initScaleY: number;

		private _id: number;
		private _passId: number;
		private _itemId: number;
		private _relateId: number;
		private _finish: boolean;
		private _guideDir: 1 | 2;
		private _level: number;

		private _triggered: boolean;

		public constructor() {
			super();
			this.init();
		}

		/** 初始化 */
		public init() {
			// this.pixelHitTest = true;
			this.initScaleX = this.scaleX;
			this.initScaleY = this.scaleY;
		}

		/** 设置or获取ID */
		public id(id?: number): number {
			if (id != void 0) {
				this._id = id;
			} else {
				return this._id;
			}
		}

		/** 设置or获取关卡ID */
		public passId(passId?: number): number {
			if (passId != void 0) {
				this._passId = passId;
			} else {
				return this._passId;
			}
		}

		/** 设置or获取当前项ID */
		public itemId(itemId?: number): number {
			if (itemId != void 0) {
				this._itemId = itemId;
			} else {
				return this._itemId;
			}
		}

		/** 设置or获取当前关联项ID */
		public relateId(relateId?: number): number {
			if (relateId != void 0) {
				this._relateId = relateId;
			} else {
				return this._relateId;
			}
		}

		/** 设置or获取当前项是否完成 */
		public finish(finish?: boolean): boolean {
			if (finish != void 0) {
				this._finish = finish;
			} else {
				return this._finish;
			}
		}

		/** 设置or获取对应指引方向 */
		public guideDir(guideDir?: 1 | 2): 1 | 2 {
			if (guideDir != void 0) {
				this._guideDir = guideDir;
			} else {
				return this._guideDir;
			}
		}

		/** 设置or获取当前等级 */
		public level(level?: number): number {
			if (level != void 0) {
				this._level = level;
			} else {
				return this._level;
			}
		}

		/** 设置or获取是否已触发 */
		public triggered(triggered?: boolean): boolean {
			if (triggered != void 0) {
				this._triggered = triggered;
			} else {
				return this._triggered;
			}
		}
	}
}