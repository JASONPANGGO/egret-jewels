var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var util;
(function (util) {
    /**
     * 拓展管理器
     */
    var DevelopMgr = (function () {
        function DevelopMgr() {
        }
        /**
         * 检测对象是否为空
         * @param {Object} obj 待检测对象
         * @returns {boolean} 对象是否为空（包含{}、对象里所有val都为空）
         */
        DevelopMgr.prototype.objIsNull = function (obj) {
            if (!obj) {
                return true;
            }
            for (var key in obj) {
                var val = obj[key];
                if (val != void 0) {
                    return false;
                }
            }
            return true;
        };
        /**
         * 检测数组中是否包含指定值
         * @param {any[]} arr 待检测数组
         * @param {any} val 是否包含的指定值
         * @returns {boolean} 该数组中是否包含指定值
         */
        DevelopMgr.prototype.arrHasVal = function (arr, val) {
            if (arr === val) {
                return true;
            }
            if (!arr || arr.length <= 0) {
                return;
            }
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var _val = arr_1[_i];
                if (_val === val) {
                    return true;
                }
                else {
                    if (_val.length && _val.length > 0 && val.length && val.length) {
                        var hasVal = true;
                        for (var i = 0; i < val.length; i++) {
                            if (!this.arrHasVal(_val[i], val[i])) {
                                hasVal = false;
                                break;
                            }
                        }
                        if (hasVal) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        /**
         * 删除数组中是指定值
         * @param {any[]} arr 待检测数组
         * @param {any} val 待删除的指定值
         */
        DevelopMgr.prototype.arrDelVal = function (arr, val) {
            if (!arr || arr.length <= 0) {
                return;
            }
            for (var i = 0; i < arr.length; i++) {
                var _val = arr[i];
                if (_val === val) {
                    arr.splice(i, 1);
                    break;
                }
            }
        };
        /**
         * Class类名转成String
         */
        DevelopMgr.prototype.classToString = function (className) {
            // console.info("classToString className ==", className);
            if (!className) {
                return;
            }
            var strArr = className.prototype.__class__.split(".");
            var len = strArr.length;
            // console.info("classToString strArr ==", strArr);
            if (!strArr || len <= 0) {
                return;
            }
            var str = strArr[len - 1];
            // console.info("classToString str ==", str);
            return str;
        };
        return DevelopMgr;
    }());
    util.DevelopMgr = DevelopMgr;
    __reflect(DevelopMgr.prototype, "util.DevelopMgr");
})(util || (util = {}));
//# sourceMappingURL=DevelopMgr.js.map