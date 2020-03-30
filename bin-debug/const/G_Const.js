/**
 * 常量配置表 (框架层)
 * @file {G_Const.ts}
 * @description 框架层常量配置放这里，一般改动不大，只做拓展多。
 * @description {config.js} 业务层常量配置放 config.js，方便：经常改动、开发时调整配置 (打包时直接替换文件即可)。
 */
var gConst;
(function (gConst) {
    /** 指派事件类型 */
    gConst.eventType = {
        /** 流程事件 */
        GAME_READY: "gameReady",
        GAME_START: "gameStart",
        GAME_RETRY: "gameRetry",
        GAME_END: "gameEnd",
        GAME_CLOSE: "gameClose",
        INSTALL: "install",
        /** 通用事件 */
        RESIZE_VIEW: "resizeView",
        ROTATE_VIEW: "rotateView",
        GUIDE_TOUCH_ONE: "guideTouchOne",
        GUIDE_STOP: "guideStop",
        IN_COMPLETE: "inComplete",
        IN_LOOP_COMPLETE: "inLoopComplete",
        OUT_COMPLETE: "outComplete",
        OUT_LOOP_COMPLETE: "outLoopComplete",
        CHOOSE_COMPLETE: "chooseComplete",
        CHOOSE_LOOP_COMPLETE: "chooseLoopComplete",
        ONE_STEP_COMPLETE: "oneStepComplete",
        ONE_STEP_FAIL: "oneStepFail",
        ONCE_COMPLETE: "onceComplete",
        ONCE_FAIL: "onceFail",
        ALL_COMPLETE: "allComplete",
        ALL_FAIL: "allFail",
        USE_UP: "useUp",
        TOUCH_TAP: "touchTap",
        TOUCH_BEGIN: "touchBegin",
        TOUCH_MOVE: "touchMove",
        TOUCH_END: "touchEnd",
        RIGHT_ANSWER: "rightAnswer",
        SHOW_GUIDE: "showGuide",
        HIDE_GUIDE: "hideGuide",
        /** UI事件 */
        OPEN_TRAN: "openTran",
        CLOSE_TRAN: "closeTran",
        OPEN_END: "openEnd",
        CLOSE_END: "closeEnd",
        OPEN_PEOPLE: "openPeople",
        CLOSE_PEOPLE: "closePeople",
        /** 游戏场景事件 */
        SHOW_BLACK: "showBlack",
        HIDE_BLACK: "hideBlack",
        SHOW_SCENE0: "showScene0",
        HIDE_SCENE0: "hideScene0",
        SHOW_SCENE1: "showScene1",
        HIDE_SCENE1: "hideScene1",
        SHOW_SCENE2: "showScene2",
        HIDE_SCENE2: "hideScene2",
        /** 对象事件 */
        CLOSE: "close",
        REMOVE_OBJ: "removeObj",
        CLICK_OBJ: "clickObj",
        /** 业务事件 */
        SHOW_CURTAIN_FULL: "showCurtainFull",
        SHOW_CAR_START: "showCarStart",
        FEED_COMPLETE: "feedComplete",
        BAR_COVER_IN_GIRL: "barCoverInGirl",
        SHOW_ITEMS: "showItems",
        ADD_PATTERN: "addPattern",
        UPDATE_GOLD: "updateGold",
        LV_TO_MAX: "lvToMax",
        START_PARTILCLE: "startPartilcle",
        START_PLAY_KEY: "startPlayKey",
        MOVE_KEY: "moveKey",
    };
    /** 方位 */
    gConst.direction = {
        CENTER_CENTER: "centerCenter",
        LEFT_TOP: "leftTop",
        CENTER_TOP: "centerTop",
        RIGHT_TOP: "rightTop",
        RIGHT_CENTER: "rightCenter",
        RIGHT_BOTTOM: "rightBottom",
        CENTER_BOTTOM: "centerBottom",
        LEFT_BOTTOM: "leftBottom",
        LEFT_CENTER: "leftCenter",
    };
    /** 设备类型对应整体缩放倍数 */
    gConst.mobileByScale = (_a = {},
        //竖屏
        _a[1 /* VERTICAL */] = (_b = {},
            _b[1 /* IPHONE_X */] = 1,
            _b[2 /* IPHONE_8 */] = 1,
            _b[3 /* IPAD */] = 0.8,
            _b),
        //横屏
        _a[0 /* HORIZONTAL */] = (_c = {},
            _c[1 /* IPHONE_X */] = 1,
            _c[2 /* IPHONE_8 */] = 1,
            _c[3 /* IPAD */] = 0.8,
            _c),
        _a);
    /** 单元格皮肤 */
    gConst.cellSkin = (_d = {},
        _d[1 /* RED */] = "Red",
        _d[2 /* YELLOW */] = "Yellow",
        _d[3 /* GREEN */] = "Green",
        _d[4 /* BLUE */] = "Blue",
        _d);
    /** 单元格名称 */
    gConst.cellName = (_e = {},
        _e[1 /* RED */] = "red",
        _e[2 /* YELLOW */] = "yellow",
        _e[3 /* GREEN */] = "green",
        _e[4 /* BLUE */] = "blue",
        _e);
    /** 单元格颜色 */
    gConst.cellColor = (_f = {},
        _f[1 /* RED */] = 0xFF505C,
        _f[2 /* YELLOW */] = 0xFFCE64,
        _f[3 /* GREEN */] = 0x63CE81,
        _f[4 /* BLUE */] = 0x6E8CBD,
        _f);
    gConst.jewelTypes = {
        BLUE: 'grid1_png',
        GREEN: 'grid2_png',
        RED: 'grid3_png',
        ORANGE: 'grid4_png',
        PURPLE: 'grid5_png',
        YELLOW: 'grid6_png'
    };
    gConst.propType = {
        BOMB: 'p_g_bomb_png',
        ROCKET: 'p_g_rocket_png',
        STAR: 'p_g_star_png'
    };
    gConst.skillType = {
        BOMB: 'p_eff_bomb_png',
        ROCKET: 'p_eff_rocket_png'
    };
    gConst.gridSize = {
        WIDTH: 83,
        HEIGHT: 99
    };
    gConst.game0 = [
        [2, 2, 3, 1, 2],
        [2, 6, 3, 1, 1, 2],
        [4, 6, 5, 6, 3, 3],
        [5, 4, 3, 5, 6],
        [5, 2, 6, 3, 5]
    ];
    gConst.game1 = [
        [2, 6, 6, 6, 3, 3, 3, 6],
        [2, 2, 6, 6, 6, 3, 3, 2, 3],
        [2, 2, 2, 6, 6, 6, 3, 2, 6, 2],
        [1, 2, 2, 2, 6, 6, 6, 3, 6, 6, 3],
        [1, 1, 2, 2, 2, 6, 6, 1, 3, 6, 2, 6],
        [1, 1, 1, 2, 2, 2, 6, 6, 6, 2, 1, 3],
        [1, 1, 1, 1, 2, 2, 2, 6, 1, 1, 1, 2, 3]
    ];
    gConst.game2 = [
        [2, 2, 2, 6, 2, 2, 2, 2, 1, 1],
        [2, 1, 1, 6, 1, 1, 2, 3, 6, 3],
        [2, 1, 3, 3, 3, 1, 2, 1, 6, 3, 6, 3],
        [6, 6, 3, 6, 3, 6, 6, 2, 1],
        [2, 1, 3, 3, 3, 1, 2, 2, 3, 2],
        [2, 1, 1, 6, 1, 1, 2, 3, 6, 3],
        [2, 2, 2, 6, 2, 2, 2, 2, 1, 1],
    ];
    gConst.goals1 = [
        {
            jewel: 3,
            value: 25
        }
    ];
    gConst.goals2 = [
        {
            jewel: 3,
            value: 15
        },
        {
            jewel: 1,
            value: 10
        },
        {
            jewel: 2,
            value: 10
        }
    ];
    gConst.bonus = [
        [1, 'x1', 'x1', 'y0', 'x1', 'y1', 4],
        ['x1', 'y1', 4, 2, 'y0', 3, 4],
        ['x0', 1, 6, 5, 'y0', 'y1', 4],
        ['y1', 'x0', 6, 'y0', 3, 2, 3],
        [2, 'y1', 5, 'x1', 3, 2, 'y0'],
        [1, 4, 5, 5, 'y1', 'y0', 3],
        [1, 'y1', 'y0', 'x0', 3, 'x0', 'x0'],
    ];
    var _a, _b, _c, _d, _e, _f;
})(gConst || (gConst = {}));
//# sourceMappingURL=G_Const.js.map