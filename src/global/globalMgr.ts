/**
 * @file {globalMgr.ts}
 * 全局管理器
 */

/** 通用管理器 */
const gUiMgr: util.UiMgr = new util.UiMgr(); //Ui管理器
const gAutoId: util.AutoId = new util.AutoId(); //自动生成ID工具
const gComMgr: util.ComMgr = new util.ComMgr(); //组件管理器
const gGuideMgr: util.GuideMgr = new util.GuideMgr(); //引导组件管理器
const gSoundMgr: util.SoundMgr = new util.SoundMgr(); //音频管理器
const gTween: util.TweenMgr = new util.TweenMgr(); //缓动动画管理器
const gMath: util.MathMgr = new util.MathMgr(); //数学计算管理器
const gScreenMovies: util.ScreenMovies = new util.ScreenMovies(); //场景切换特效工具
const gDevelop: util.DevelopMgr = new util.DevelopMgr(); //拓展管理器

/** 业务管理器 */
