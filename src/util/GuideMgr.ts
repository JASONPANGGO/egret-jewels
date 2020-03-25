namespace util {
	/**
	 * 引导组件管理器
	 * @description 引导组件相关配置、管理接口
	 */
	export class GuideMgr {
		public readonly maxStep: number = 2;

		public readonly delayTimer = 500;
		public readonly pressT = 100;
		public readonly liftT = 200;

		private firstGuideCfg: {};

		public guideObj: egret.DisplayObject | egret.DisplayObjectContainer;

		public constructor() {

		}

		public init() {
			this.stepId = 1;
			this.initGuide();
		}

		private _stepId: number = 1; //步骤ID

		/** 获取步骤ID */
		public get stepId(): number {
			return this._stepId;
		}
		/** 设置步骤ID */
		public set stepId(_stepId: number) {
			this._stepId = _stepId;
		}

		/** 引导配置 */
		private GuideCfg: {
			"1": { id: number, target: string[], lineGuide?: boolean, isHeadAndTail?: boolean, moveTime?: number, vertexTarget?: string[], items: any[], finish: boolean },
			"2": { id: number, target: string[], lineGuide?: boolean, isHeadAndTail?: boolean, moveTime?: number, vertexTarget?: string[], items: any[], finish: boolean },
		} = {
			"1": { id: 1, target: ["6_0", "0_0", "0_6"], moveTime: 500, vertexTarget: ["6_0", "0_6"], items: ["6_0", "5_0", "4_0", "3_0", "2_0", "1_0", "0_0", "0_1", "0_2", "0_3", "0_4", "0_5", "0_6"], finish: false },
			"2": { id: 2, target: ["1_0", "1_1", "0_1", "0_0", "1_0"], lineGuide: true, isHeadAndTail: true, moveTime: 200, items: ["1_0", "1_1", "0_1", "0_0"], finish: false },
		};

		private initGuide() {
			for (let key in this.GuideCfg) {
				let guide: { id: number, target: string[], lineGuide?: boolean, isHeadAndTail?: boolean, moveTime?: number, vertexTarget?: string[], items: any[], finish: boolean } = this.GuideCfg[key];
				if (!guide.finish) {
					continue;
				}
				guide.finish = false;
			}
		}

		/**
		 * 获取指定步骤引导数据
		 * @param {number} id 指定引导步骤ID
		 */
		public getGuideById(id: number): { id: number, target: string[], lineGuide?: boolean, isHeadAndTail?: boolean, moveTime?: number, vertexTarget?: string[], items: any[], finish: boolean } {
			if (id == void 0) {
				return;
			}
			return this.GuideCfg[id];
		}

		/**
		 * 完成指定步骤引导
		 * @param {number} id 指定引导步骤ID
		 */
		public finishGuide(id: number = this.stepId) {
			let guide: { id: number, target: string[], lineGuide?: boolean, isHeadAndTail?: boolean, moveTime?: number, vertexTarget?: string[], items: any[], finish: boolean } = this.getGuideById(id);
			if (!guide) {
				return;
			}
			guide.finish = true;
		}

		/** 最后一步引导是否完成 */
		public lastGuideFinish(): boolean {
			const guide = this.getGuideById(this.maxStep);
			if (!guide) {
				return;
			}
			return guide.finish;
		}

		public createHand(parent: egret.DisplayObjectContainer, exitAim?: { aimType?: number, wait?: number, time?: number } | boolean): com.ComBones {
			const hand: com.ComBones = new com.ComBones();
			hand.setData(parent, "guide", exitAim);
			hand.create();
			return hand;
		}
	}
}