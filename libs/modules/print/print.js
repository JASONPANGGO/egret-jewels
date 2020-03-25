/**
 * 打印工具
 * @file {print.js}
 * @description 打印工具相关放这里
 */
var util;
(function (util) {

    /** 打印绿色信息 */
    util.printGreen = function (text) {
        util.printColor(" " + text + " ", "white", "#00bb00");
    }

    /** 打印蓝色信息 */
    util.printBlue = function (text) {
        util.printColor(" " + text + " ", "white", "#00aaaa");
    }

    /** 橙色信息 */
    util.printOrange = function (text) {
        util.printColor(" " + text + " ", "white", "#ff8800");
    }

    /** 打印错误信息 */
    util.printError = function (text) {
        util.printColor(" " + text + " ", "white", "#bb0000");
    }

    /** 打印彩色信息 */
    util.printColor = function (text, color, bgColor) {
        if (bgColor === void 0) {
            bgColor = "white";
        }
        console.log("%c" + text, "color:" + color + ";background:" + bgColor + ";");
    }

})(util || (util = {}));