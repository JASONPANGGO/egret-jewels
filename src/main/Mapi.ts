/**
 * MTG API接口
 */
class Mapi {
	private static actionedLog: Object = {}; //已埋点记录
	private static gameReadyed: boolean; //是否已上报游戏准备完毕
	private static gameEnded: boolean; //是否已上报游戏结束

	public constructor() {

	}

	/**
	 * 埋点上报
	 * @param {number} id 埋点记录ID
	 * @param {boolean} dedup = true 埋点是否去重
	 * @description SDK: 上报需要，埋点上报
	 */
	public static sendAction(id: number, dedup: boolean = true) {
		if (dedup == void 0) {
			dedup = true;
		}
		if (dedup && this.actionedLog[id]) {
			return;
		}
		this.actionedLog[id] = true;
		sendAction(id);
	}

	/**
	 * 游戏准备完毕
	 * @description SDK: 上报需要，游戏资源加载完成，准备启动游戏时调用
	 */
	public static gameReady() {
		if (this.gameReadyed) {
			return;
		}
		this.gameReadyed = true;
		ready();
	}

	/**
	 * 游戏安装
	 * @description SDK: 用户点击下载、安装游戏时调用
	 */
	public static install() {
		gameInstall();
	}

	/**
	 * 游戏结束
	 * @description SDK: 上报需要，游戏结束时调用
	 */
	public static gameEnd() {
		if (this.gameEnded) {
			return;
		}
		this.gameEnded = true;
		end();
	}

	/**
	 * 游戏重玩
	 * @description SDK: 上报需要，游戏重新开始的时候调用
	 */
	public static gameRetry() {
		this.gameEnded = false;
		retry();
	}
}