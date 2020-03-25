/**
 * 常量配置表 (业务层）
 * @file {const.js}
 * @description 业务层常量配置放这里，方便：经常改动、开发时调整配置 (打包时直接替换文件即可)。
 * @description {G_Const.ts} 框架层常量配置放 G_Const.ts，一般改动不大，只做拓展多。
 */
var gConst;
(function (gConst) {

    /** 全局可点模式，用于Ending时全局点击可上报安装 window.install() */
    gConst.globalClick = false;

    /** 去除特效模式，默认为:false,  true: 去除特效，用于特殊平台需要去掉Ending按钮动画效果之类 */
    gConst.notEffectModel = false;

    /** 默认背景音乐资源名 */
    gConst.bgmName = "bm_bgm";

    /** 第一次引导时间 */
    gConst.firstGuideTimer = 500;

    /** 之后引导时间 */
    gConst.afterGuideTimer = 4000;

    /** 玩家多久未操作，结束游戏 */
    gConst.endToNoOperationTimer = 10000;

    /** 关闭开场界面倒计时 */
    gConst.closeStartTimer = 5000;

    /** 快速切换金币最多次数 */
    gConst.changeGoldTimes = 6;

    /** 每次切换金币时间 */
    gConst.changeGoldTimer = 20;

    /** 关闭恭喜界面倒计时 */
    gConst.closeCongratsTimer = 3000;

    /** 关闭过场界面倒计时 */
    gConst.closeTranTimer = 800;

    /** 失败多长时间进入Ending */
    gConst.failInEndTimer = 2000;

    /** 胜利多长时间进入Ending */
    gConst.victoryInEndTimer = 2000;

    /** 达到多少金币出现小车 */
    gConst.showCarGold = 4000;

    /** 进度条最大值 */
    gConst.barMaxVal = 60;

    /** 每关失败可重玩次数 */
    gConst.failCntByPass = 1;

    /** 更新金币加速跑马灯多长时间 */
    gConst.updateGoldLampTime = 1000;

    /** VIP跑马灯加速倍速 */
    gConst.vipLampTimeScale = 3;

    /** VIP获得金币加速倍速 */
    gConst.vipGoldScale = 18;

    /** 首次弹窗获得金币数 */
    gConst.firstAddGold = 5000;

    /** VIP粒子间隔缩短倍数 */
    gConst.vipPartilcleTimeScale = 2;

    /** 获得红包自动打开时间 */
    gConst.autoOpenRedPakeTime = 800;

})(gConst || (gConst = {}));