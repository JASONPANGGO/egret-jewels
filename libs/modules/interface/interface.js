/**
 * 全局接口函数
 * @file {interface.js}
 */

/**
 * 埋点上报
 * @param {number} id 埋点记录ID
 * @description SDK: 上报需要，埋点上报
 */
function sendAction(id) {
    if (window.HttpAPI) {
        window.HttpAPI.sendPoint("action&action=" + id);
    }
    if (gConst.logModel) {
        util.printGreen("sendAction id = " + id);
    }
}

/**
 * 移除普通loading
 * @description 游戏开始时，移除普通Loaidng
 */
function removeLoading() {
    var loader = document.getElementById("loader-placeholder");
    if (loader) {
        loader.className = "f-dn";
    }
}

/**
 * 游戏开始
 * @description 本地: 作window.load()回调, SDK: 内部回调，游戏可以开始时通知
 */
function gameStart() {
    /** 移除普通loading */
    removeLoading();

    if (playEnterSound) {
        playEnterSound("resource/assets/sound/" + gConst.bgmName + ".mp3", arguments);
    }
    window.app.showGame();
    if (gConst.logModel) {
        util.printGreen("gameStart");
    }
}

/**
 * 窗口加载完毕回调
 * @description 此处一般用于调用: gameStart()
 */
(function () {
    if (!gConst.packModel) {
        window.onload = function () {
            gameStart();
        }
    }
})();

/**
 * 游戏关闭
 * @description SDK: 内部回调，关闭游戏时通知
 */
function gameClose() {
    if (destorySound) {
        destorySound();
    }
    if (gConst.logModel) {
        util.printGreen("gameClose");
    }
}

/**
 * 游戏准备完毕
 * @description SDK: 上报需要，游戏资源加载完成，准备启动游戏时调用
 */
function ready() {
    if (window.gameReady) {
        window.gameReady();
    }
    if (gConst.logModel) {
        util.printGreen("gameReady");
    }
}

/**
 * 游戏安装
 * @description SDK: 用户点击下载、安装游戏时调用
 */
function gameInstall() {
    if (window.install) {
        window.install();
    }
    if (gConst.logModel) {
        util.printGreen("install");
    }
}

/**
 * 游戏结束
 * @description SDK: 上报需要，游戏结束时调用
 */
function end() {
    if (window.gameEnd) {
        window.gameEnd();
    }
    if (gConst.logModel) {
        util.printGreen("gameEnd");
    }
}

/**
 * 游戏重玩
 * @description SDK: 上报需要，游戏重新开始的时候调用
 */
function retry() {
    if (window.gameRetry) {
        window.gameRetry();
    }
    if (gConst.logModel) {
        util.printGreen("gameRetry");
    }
}