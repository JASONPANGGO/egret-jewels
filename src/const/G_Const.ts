/**
 * 常量配置表 (框架层)
 * @file {G_Const.ts}
 * @description 框架层常量配置放这里，一般改动不大，只做拓展多。
 * @description {config.js} 业务层常量配置放 config.js，方便：经常改动、开发时调整配置 (打包时直接替换文件即可)。
 */

namespace gConst {
	/** 指派事件类型 */
	export const eventType = {
		/** 流程事件 */
		GAME_READY: "gameReady", //游戏准备开始
		GAME_START: "gameStart", //游戏开始
		GAME_RETRY: "gameRetry", //游戏重玩
		GAME_END: "gameEnd", //游戏结束
		GAME_CLOSE: "gameClose", //游戏关闭
		INSTALL: "install", //游戏安装

		/** 通用事件 */
		RESIZE_VIEW: "resizeView", //窗口大小改变
		ROTATE_VIEW: "rotateView", //屏幕横竖屏转换
		GUIDE_TOUCH_ONE: "guideTouchOne", //每引导按下一次
		GUIDE_STOP: "guideStop", //引导结束
		IN_COMPLETE: "inComplete", //进场完成
		IN_LOOP_COMPLETE: "inLoopComplete", //多个进场循环完成
		OUT_COMPLETE: "outComplete", //出场完成
		OUT_LOOP_COMPLETE: "outLoopComplete", //多个出场循环完成
		CHOOSE_COMPLETE: "chooseComplete", //切换状态完成
		CHOOSE_LOOP_COMPLETE: "chooseLoopComplete", //多个切换状态循环完成
		ONE_STEP_COMPLETE: "oneStepComplete", //单步完成
		ONE_STEP_FAIL: "oneStepFail", //单步失败
		ONCE_COMPLETE: "onceComplete", //单次完成
		ONCE_FAIL: "onceFail", //单次失败
		ALL_COMPLETE: "allComplete", //所有完成
		ALL_FAIL: "allFail", //所有失败
		USE_UP: "useUp", //次、步数消耗完
		TOUCH_TAP: "touchTap", //用于触发点击事件时，另行分发通知
		TOUCH_BEGIN: "touchBegin", //用于触发触摸事件时，另行分发通知
		TOUCH_MOVE: "touchMove", //用于触发触摸滑动事件时，另行分发通知
		TOUCH_END: "touchEnd", //用于触发触摸离开事件时，另行分发通知
		RIGHT_ANSWER: "rightAnswer", //正确答案
		SHOW_GUIDE: "showGuide", //显示引导
		HIDE_GUIDE: "hideGuide", //隐藏引导

		/** UI事件 */
		OPEN_TRAN: "openTran", //打开过场页面
		CLOSE_TRAN: "closeTran", //关闭过场页面
		OPEN_END: "openEnd", //打开结束界面
		CLOSE_END: "closeEnd", //关闭结束界面
		OPEN_PEOPLE: "openPeople", //打开人物页面
		CLOSE_PEOPLE: "closePeople", //关闭人物页面

		/** 游戏场景事件 */
		SHOW_BLACK: "showBlack", //显示黑色层
		HIDE_BLACK: "hideBlack", //隐藏黑色层
		SHOW_SCENE0: "showScene0", //显示子场景0组件
		HIDE_SCENE0: "hideScene0", //隐藏子场景0组件
		SHOW_SCENE1: "showScene1", //显示子场景1组件
		HIDE_SCENE1: "hideScene1", //隐藏子场景1组件
		SHOW_SCENE2: "showScene2", //显示子场景2组件
		HIDE_SCENE2: "hideScene2", //隐藏子场景2组件

		/** 对象事件 */
		CLOSE: "close", //关闭对象
		REMOVE_OBJ: "removeObj", //移除对象
		CLICK_OBJ: "clickObj", //点击对象

		/** 业务事件 */
		SHOW_CURTAIN_FULL: "showCurtainFull", //幕布满屏时
		SHOW_CAR_START: "showCarStart", //开始出现小车
		FEED_COMPLETE: "feedComplete", //饲养完成
		BAR_COVER_IN_GIRL: "barCoverInGirl", //进度条走完，女孩进场
		SHOW_ITEMS: "showItems", //显示所有选项
		ADD_PATTERN: "addPattern", //添加图案
		UPDATE_GOLD: "updateGold", //更新金币
		LV_TO_MAX: "lvToMax", //升至最高级时
		START_PARTILCLE: "startPartilcle", //开始粒子
		START_PLAY_KEY: "startPlayKey", //开始播放钥匙
		MOVE_KEY: "moveKey", //移动钥匙
	}

	/** 方位 */
	export const direction = {
		CENTER_CENTER: "centerCenter", //中心 ※
		LEFT_TOP: "leftTop",			//左上 ↖
		CENTER_TOP: "centerTop",		//中上 ↑
		RIGHT_TOP: "rightTop",			//右上 ↗
		RIGHT_CENTER: "rightCenter",	//右中 →
		RIGHT_BOTTOM: "rightBottom",	//右下 ↘
		CENTER_BOTTOM: "centerBottom",	//中下 ↓
		LEFT_BOTTOM: "leftBottom",		//左下 ↙
		LEFT_CENTER: "leftCenter",		//左中 ←
	}

	/** 屏幕尺寸 */
	export const enum screen {
		WIDTH = 750, //宽度
		HEIGHT = 1334, //高度
	}

	/** 屏幕类型 */
	export const enum screenType {
		HORIZONTAL = 0, //横屏
		VERTICAL = 1, //竖屏
	}

	/** 设备类型 */
	export const enum mobileType {
		IPHONE_X = 1, //iPhoneX或以上
		IPHONE_8 = 2, //iPhone8或以下
		IPAD = 3, //iPad或其它
	}

	/** 设备类型对应整体缩放倍数 */
	export const mobileByScale = {
		//竖屏
		[gConst.screenType.VERTICAL]: {
			[gConst.mobileType.IPHONE_X]: 1, //iPhoneX或以上
			[gConst.mobileType.IPHONE_8]: 1, //iPhone8或以下
			[gConst.mobileType.IPAD]: 0.8, //iPad或其它
		},
		//横屏
		[gConst.screenType.HORIZONTAL]: {
			[gConst.mobileType.IPHONE_X]: 1, //iPhoneX或以上
			[gConst.mobileType.IPHONE_8]: 1, //iPhone8或以下
			[gConst.mobileType.IPAD]: 0.8, //iPad或其它
		}
	}

	/** 点击动画类型 */
	export const enum clkAimType {
		HIDE = 0, //隐藏
		SCALE = 1, //缩放
	}

	/** 结束页类型 */
	export const enum endType {
		FAIL = 0, //失败
		VICTORY = 1, //胜利
		INIT = 2, //初始化
	}

	/** 单元格ID */
	export const enum cellId {
		RED = 1, //红
		YELLOW = 2, //黄
		GREEN = 3, //绿
		BLUE = 4, //蓝
	}

	/** 单元格皮肤 */
	export const cellSkin = {
		[gConst.cellId.RED]: "Red", //红
		[gConst.cellId.YELLOW]: "Yellow", //黄
		[gConst.cellId.GREEN]: "Green", //绿
		[gConst.cellId.BLUE]: "Blue", //蓝
	}

	/** 单元格名称 */
	export const cellName = {
		[gConst.cellId.RED]: "red", //红
		[gConst.cellId.YELLOW]: "yellow", //黄
		[gConst.cellId.GREEN]: "green", //绿
		[gConst.cellId.BLUE]: "blue", //蓝
	}

	/** 单元格颜色 */
	export const cellColor = {
		[gConst.cellId.RED]: 0xFF505C, //红
		[gConst.cellId.YELLOW]: 0xFFCE64, //黄
		[gConst.cellId.GREEN]: 0x63CE81, //绿
		[gConst.cellId.BLUE]: 0x6E8CBD, //蓝
	}

	/**
	 * 结束按钮动画类型
	 */
	export const enum endBtnAimType {
		SCALE = 1, //大小等比例缩放
		DRAWING = 2, //左右拉伸——上下拉伸
		SWING = 3, //上下摆动
	}


	export const jewelTypes = {
		BLUE: 'grid1_png',
		GREEN: 'grid2_png',
		RED: 'grid3_png',
		ORANGE: 'grid4_png',
		PURPLE: 'grid5_png',
		YELLOW: 'grid6_png'
	}

	export const propType = {
		BOMB: 'p_g_bomb_png',
		ROCKET: 'p_g_rocket_png',
		STAR: 'p_g_star_png'
	}

	export const skillType = {
		BOMB: 'p_eff_bomb_png',
		ROCKET: 'p_eff_rocket_png'
	}

	export const gridSize = {
		WIDTH: 83,
		HEIGHT: 99
	}

	export const game0 = [
		[2, 2, 3, 1, 2],
		[2, 6, 3, 1, 1, 2],
		[4, 6, 5, 6, 3, 3], // 5
		[5, 4, 3, 5, 6], // 3
		[5, 2, 6, 3, 5]
	]

	export const game1 = [
		[2, 6, 6, 6, 3, 3, 3, 6],
		[2, 2, 6, 6, 6, 3, 3, 2, 3],
		[2, 2, 2, 6, 6, 6, 3, 2, 6, 2],
		[1, 2, 2, 2, 6, 6, 6, 3, 6, 6, 2],
		[1, 1, 2, 2, 2, 6, 6, 1, 3, 6, 2, 6],
		[1, 1, 1, 2, 2, 2, 6, 6, 6, 2, 1, 3],
		[1, 1, 1, 1, 2, 2, 2, 6, 1, 1, 1, 2, 3]
	]

	export const goals1 = [
		{
			jewel: 3,
			value: 25
		}
	]

	export const goals2 = [
		{
			jewel: 3,
			value: 15
		},
		{
			jewel: 1,
			value: 10
		}, {
			jewel: 2,
			value: 10
		}
	]

}