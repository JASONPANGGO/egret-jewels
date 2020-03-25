/**
 * 常量配置表 (业务层）描述文件
 * @file {const.d.ts}
 * @description 业务层常量配置放这里，方便：经常改动、开发时调整配置 (打包时直接替换文件即可)。
 * @description {G_Const.ts} 框架层常量配置放 G_Const.ts，一般改动不大，只做拓展多。
 */
declare namespace gConst {

    /** 全局可点模式，用于Ending时全局点击可上报安装 window.install() */
    const globalClick: boolean;

    /** 去除特效模式，默认为:false,  true: 去除特效，用于特殊平台需要去掉Ending按钮动画效果之类 */
    const notEffectModel: boolean;

    /** 默认背景音乐资源名 */
    const bgmName: string;

    /** 第一次引导时间 */
    const firstGuideTimer: number;

    /** 之后引导时间 */
    const afterGuideTimer: number;

    /** 玩家多久未操作，结束游戏 */
    const endToNoOperationTimer: number;

    /** 关闭开场界面倒计时 */
    const closeStartTimer: number;

    /** 快速切换金币最多次数 */
    const changeGoldTimes: number;

    /** 每次切换金币时间 */
    const changeGoldTimer: number;

    /** 关闭恭喜界面倒计时 */
    const closeCongratsTimer: number;

    /** 关闭过场界面倒计时 */
    const closeTranTimer: number;

    /** 失败多长时间进入Ending */
    const failInEndTimer: number;

    /** 胜利多长时间进入Ending */
    const victoryInEndTimer: number;

    /** 达到多少金币出现小车 */
    const showCarGold: number;

    /** 进度条最大值 */
    const barMaxVal: number;

    /** 每关失败可重玩次数 */
    const failCntByPass: number;

    /** 更新金币加速跑马灯多长时间 */
    const updateGoldLampTime: number;

    /** VIP跑马灯加速倍速 */
    const vipLampTimeScale: number;

    /** VIP获得金币加速倍速 */
    const vipGoldScale: number;

    /** 首次弹窗获得金币数 */
    const firstAddGold: number;

    /** VIP粒子间隔缩短倍数 */
    const vipPartilcleTimeScale: number;

    /** 获得红包自动打开时间 */
    const autoOpenRedPakeTime: number;
}