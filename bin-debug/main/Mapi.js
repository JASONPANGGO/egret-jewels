var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * MTG API接口
 */
var Mapi = (function () {
    function Mapi() {
    }
    /**
     * 埋点上报
     * @param {number} id 埋点记录ID
     * @param {boolean} dedup = true 埋点是否去重
     * @description SDK: 上报需要，埋点上报
     */
    Mapi.sendAction = function (id, dedup) {
        if (dedup === void 0) { dedup = true; }
        if (dedup == void 0) {
            dedup = true;
        }
        if (dedup && this.actionedLog[id]) {
            return;
        }
        this.actionedLog[id] = true;
        sendAction(id);
    };
    /**
     * 游戏准备完毕
     * @description SDK: 上报需要，游戏资源加载完成，准备启动游戏时调用
     */
    Mapi.gameReady = function () {
        if (this.gameReadyed) {
            return;
        }
        this.gameReadyed = true;
        ready();
    };
    /**
     * 游戏安装
     * @description SDK: 用户点击下载、安装游戏时调用
     */
    Mapi.install = function () {
        gameInstall();
    };
    /**
     * 游戏结束
     * @description SDK: 上报需要，游戏结束时调用
     */
    Mapi.gameEnd = function () {
        if (this.gameEnded) {
            return;
        }
        this.gameEnded = true;
        end();
    };
    /**
     * 游戏重玩
     * @description SDK: 上报需要，游戏重新开始的时候调用
     */
    Mapi.gameRetry = function () {
        this.gameEnded = false;
        retry();
    };
    return Mapi;
}());
Mapi.actionedLog = {}; //已埋点记录
__reflect(Mapi.prototype, "Mapi");
//# sourceMappingURL=Mapi.js.map