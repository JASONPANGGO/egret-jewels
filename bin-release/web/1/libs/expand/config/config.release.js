/**
 * 调试配置表（发布版）
 * @file {config.release.js}
 * @description 调试配置表（发布版）放这里，方便：区分调试、发布版本，无需重复手动修改配置
 */
var gConst;
(function (gConst) {
    /** 打印日志模式 */
    gConst.logModel = true;

    /** 打包提测模式，用于提测时需要规避的一些事情 */
    gConst.packModel = true;

    /** 调试模式 */
    gConst.debugModel = false;

})(gConst || (gConst = {}));