/**
 * 打印工具
 * @file {print.d.ts}
 * @description 打印工具相关放这里
 */
declare namespace util {

    /** 打印绿色信息 */
    function printGreen(text: string);

    /** 打印蓝色信息 */
    function printBlue(text: string);

    /** 橙色信息 */
    function printOrange(text: string);

    /** 打印错误信息 */
    function printError(text: string);

    /** 打印彩色信息 */
    function printColor(text: string, color: string, bgColor: string);
}