/**
 * 调试配置表（调试、发布版本用）描述文件
 * @file {config.d.ts}
 */
declare namespace gConst {
    /** 打印日志模式 */
    const logModel: boolean;

    /** 打包提测模式，用于提测时需要规避的一些事情 */
    const packModel: boolean;

    /** 调试模式 */
    const debugModel: boolean;
}