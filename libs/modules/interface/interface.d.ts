/**
 * 全局接口函数描述文件
 * @file {interface.d.ts}
 */

/**
 * 埋点上报
 * @param {number} id action.json 上配置的 action[id]
 * @param {boolean} dedup = true 埋点是否去重
 * @description 本地调用: SDK内部函数
 * @file {action.json}
 */
declare function sendAction(id: number, dedup?: boolean): void;
/**
 * 游戏开始
 * @description 本地: 作window.load()回调, SDK: 内部回调，游戏可以开始时通知
 */
declare function gameStart(): void;
/**
 * 游戏关闭
 * @description SDK: 内部回调，关闭游戏时通知
 */
declare function gameClose(): void;
/**
 * 游戏准备开始
 * @description SDK: 上报需要，游戏资源加载完成，准备启动游戏时调用
 */
declare function ready(): void;
/**
 * 游戏安装
 * @description SDK: 用户点击下载、安装游戏时调用
 */
declare function gameInstall(): void;
/**
 * 游戏结束
 * @description SDK: 上报需要，游戏结束时调用
 */
declare function end(): void;
/**
 * 游戏重玩
 * @description SDK: 上报需要，游戏重新开始的时候调用
 */
declare function retry(): void;