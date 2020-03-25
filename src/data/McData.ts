namespace data {
	/**
	 * 动画数据
	 */
	export class McData {
		public fName: string = "1"; //动作名称
		public frameCnt: number; //总帧数
		public frameName: string; //帧名字格式，framName{1}_png
		public backplay: boolean; //播放完成后，反向播放回来
		public firstIndex: number; //首帧下标
		public order: number[]; //需要时，可指定特殊顺序播放，如：[1, 2, 1, 3]
		public minBit: number; //是否限制最小位数，不够位数时补0

		/** 播放方向 1.正向 -1.反向 */
		public direct: number = 1;

		/**
		 * 构造动画数据
		 * @param {string} fName 动作名称
		 * @param {number} frameCnt 总帧数
		 * @param {string} frameName 帧名字格式，framName{1}_png
		 * @param {boolean} backplay 播放完成后，反向播放回来
		 * @param {number} firstIndex 首帧下标
		 * @param {number[]} order 需要时，可指定特殊顺序播放，如：[1, 2, 1, 3]
		 * @param {number} minBit 是否限制最小位数，不够位数时补0
		 */
		public constructor(fName: string, frameCnt: number, frameName: string, params: { backplay?: boolean, firstIndex?: number, order?: number[], minBit?: number } = {}) {
			this.fName = fName;
			this.frameCnt = frameCnt;
			this.frameName = frameName;
			this.backplay = params.backplay || false;
			this.firstIndex = params.firstIndex || 1;
			this.order = params.order;
			this.minBit = params.minBit;
		}
	}
}