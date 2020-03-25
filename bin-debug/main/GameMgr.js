var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏管理器
 * @description 主场景界面、游戏场景相关配置
 */
var GameMgr = (function () {
    function GameMgr() {
    }
    GameMgr.init = function () {
        gGuideMgr.init();
        this.isEnd = false;
        this.endType = null;
        this.auto = false;
    };
    /** 读取游戏动态参数配置 */
    GameMgr.getConfig = function (key) {
        var res = RES.getRes("gameConfig_json");
        if (res[key]) {
            return res[key];
        }
        if (res["gameConfig"] && res["gameConfig"][key]) {
            return res["gameConfig"][key];
        }
        var gameDifficulty = res.gameDifficulty; //当前难度
        var ob = res["gameConfig"][gameDifficulty];
        if (ob && ob[key]) {
            return ob[key];
        }
        return null;
    };
    Object.defineProperty(GameMgr, "getWinW", {
        /** 获取视口宽度 */
        get: function () {
            var winW = window["adWidth"] || window.innerWidth;
            if (window["MW_CONFIG"]) {
                if (MW_CONFIG.channel == "vungle") {
                    var body = document.body;
                    winW = body.offsetWidth;
                }
            }
            return winW;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameMgr, "getWinH", {
        get: function () {
            var winH = window["adHeight"] || window.innerHeight;
            if (window["MW_CONFIG"]) {
                if (MW_CONFIG.channel == "vungle") {
                    var body = document.body;
                    winH = body.offsetHeight;
                }
            }
            return winH;
        },
        enumerable: true,
        configurable: true
    });
    /** 重玩游戏 */
    GameMgr.replay = function () {
        // this.sendAction(5);
        this.isReplay = true;
        this.replayCnt++;
        this.gameScene.replay();
    };
    /** 是否显示重玩 */
    GameMgr.isShowReplay = function () {
        if (GameMgr.endType == 0 /* FAIL */) {
            //失败
            var playAgain = GameMgr.getConfig("playAgain");
            if (playAgain && (playAgain < 0 || GameMgr.replayCnt < playAgain)) {
                //配置重玩次数小于0，或当前重玩次数小于配置重玩次数
                return true;
            }
        }
        return false;
    };
    /** 重玩是否跳转商店 */
    GameMgr.replayInstall = function () {
        if (GameMgr.endType == 0 /* FAIL */) {
            //失败
            var playAgain = GameMgr.getConfig("playAgain");
            if (playAgain && (playAgain < 0 || GameMgr.replayCnt < playAgain)) {
                //配置重玩次数小于0，或当前重玩次数小于配置重玩次数
                return false;
            }
            return true;
        }
        return false;
    };
    Object.defineProperty(GameMgr, "isEnd", {
        /** 获取游戏是否结束 */
        get: function () {
            return this._isEnd;
        },
        /** 设置游戏是否结束 */
        set: function (_isEnd) {
            this._isEnd = _isEnd;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameMgr, "endType", {
        /**
         * 获取游戏结束类型
         * @returns {gConst.endType} 游戏结束类型 0:失败 1:胜利 2:初始化
         */
        get: function () {
            return this._endType;
        },
        /**
         * 设置游戏结束类型
         * @param {gConst.endType} type 游戏结束类型 0:失败 1:胜利 2:初始化
         */
        set: function (_endType) {
            this._endType = _endType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameMgr, "auto", {
        /** 获取自动游戏状态 */
        get: function () {
            return this._auto;
        },
        /** 设置自动游戏状态 */
        set: function (_auto) {
            this._auto = _auto;
        },
        enumerable: true,
        configurable: true
    });
    return GameMgr;
}());
GameMgr.screenType = null; //横竖屏类型
GameMgr.mobileType = null; //设备类型
GameMgr.lan = "us";
GameMgr.isReplay = false; //是否是重玩
GameMgr.replayCnt = 0; //重玩次数
GameMgr._isEnd = false; //游戏是否已结束
GameMgr._auto = false;
__reflect(GameMgr.prototype, "GameMgr");
//# sourceMappingURL=GameMgr.js.map