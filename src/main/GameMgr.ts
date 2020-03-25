/**
 * 游戏管理器
 * @description 主场景界面、游戏场景相关配置
 */
class GameMgr {
	public static main: Main;
	public static showRect: egret.Rectangle;
	public static stage: egret.Stage;

	public static screenType: gConst.screenType = null; //横竖屏类型
	public static mobileType: gConst.mobileType = null; //设备类型

	public static lan: string = "us";

	public static scale: number;

	public static gameScene: scene.GameScene;
	public static isReplay: boolean = false; //是否是重玩
	private static replayCnt: number = 0; //重玩次数

	private static _isEnd: boolean = false; //游戏是否已结束

	private static _endType: gConst.endType; //游戏结束类型 0:失败 1:胜利 2:初始化

	private static _auto: boolean = false;

	public constructor() {

	}

	public static init() {
		gGuideMgr.init();

		this.isEnd = false;
		this.endType = null;
		this.auto = false;
	}

	/** 读取游戏动态参数配置 */
	public static getConfig(key: string): any {
		const res: any = RES.getRes("gameConfig_json");
		if (res[key]) {
			return res[key];
		}

		if (res["gameConfig"] && res["gameConfig"][key]) { //无难度模式区分
			return res["gameConfig"][key];
		}

		const gameDifficulty: string = res.gameDifficulty; //当前难度
		const ob: any = res["gameConfig"][gameDifficulty];
		if (ob && ob[key]) {
			return ob[key];
		}
		return null;
	}

	/** 获取视口宽度 */
	public static get getWinW(): number {
		let winW: number = window["adWidth"] || window.innerWidth;
		if (window["MW_CONFIG"]) {
			if (MW_CONFIG.channel == "vungle") {
				const body = document.body as HTMLBodyElement;
				winW = body.offsetWidth;
			}
		}
		return winW;
	}

	public static get getWinH(): number {
		let winH: number = window["adHeight"] || window.innerHeight;
		if (window["MW_CONFIG"]) {
			if (MW_CONFIG.channel == "vungle") {
				const body = document.body as HTMLBodyElement;
				winH = body.offsetHeight;
			}
		}
		return winH;
	}

	/** 重玩游戏 */
	public static replay() {
		// this.sendAction(5);
		this.isReplay = true;
		this.replayCnt++;
		this.gameScene.replay();
	}

	/** 是否显示重玩 */
	public static isShowReplay(): boolean {
		if (GameMgr.endType == gConst.endType.FAIL) {
			//失败
			const playAgain: number = GameMgr.getConfig("playAgain");
			if (playAgain && (playAgain < 0 || GameMgr.replayCnt < playAgain)) {
				//配置重玩次数小于0，或当前重玩次数小于配置重玩次数
				return true;
			}
		}
		return false;
	}

	/** 重玩是否跳转商店 */
	public static replayInstall(): boolean {
		if (GameMgr.endType == gConst.endType.FAIL) {
			//失败
			const playAgain: number = GameMgr.getConfig("playAgain");
			if (playAgain && (playAgain < 0 || GameMgr.replayCnt < playAgain)) {
				//配置重玩次数小于0，或当前重玩次数小于配置重玩次数
				return false;
			}
			return true;
		}
		return false;
	}

	/** 获取游戏是否结束 */
	public static get isEnd(): boolean {
		return this._isEnd;
	}
	/** 设置游戏是否结束 */
	public static set isEnd(_isEnd: boolean) {
		this._isEnd = _isEnd;
	}

	/**
	 * 获取游戏结束类型
	 * @returns {gConst.endType} 游戏结束类型 0:失败 1:胜利 2:初始化
	 */
	public static get endType(): gConst.endType {
		return this._endType;
	}
	/**
	 * 设置游戏结束类型
	 * @param {gConst.endType} type 游戏结束类型 0:失败 1:胜利 2:初始化
	 */
	public static set endType(_endType: gConst.endType) {
		this._endType = _endType;
	}

	/** 获取自动游戏状态 */
	public static get auto(): boolean {
		return this._auto;
	}
	/** 设置自动游戏状态 */
	public static set auto(_auto: boolean) {
		this._auto = _auto;
	}
}