var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var util;
(function (util) {
    /**
     * 数学计算管理器
     */
    var MathMgr = (function () {
        function MathMgr() {
        }
        /**
         * 随机返回一个浮点数
         * @param {number} max 最大值
         * @param {number} min 最小值
         * @returns {number} 返回一个随机浮点数（含小不含大）
         */
        MathMgr.prototype.getRandom = function (max, min) {
            if (min === void 0) { min = 0; }
            if (max == min) {
                return max;
            }
            return Math.random() * (max - min) + min;
        };
        /**
         * 随机返回一个整数
         * @param {number} max 最大值
         * @param {number} min 最小值
         * @returns {number} 返回一个随机整数（含小不含大）
         */
        MathMgr.prototype.getRandomInteger = function (max, min) {
            if (min === void 0) { min = 0; }
            return Math.floor(this.getRandom(max, min));
        };
        /**
         * 随机返回预选答案
         * @param {any[]} answers 预选答案
         * @returns {any} 从预选答案中随机返回一个
         */
        MathMgr.prototype.getRandomAnswer = function () {
            var answers = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                answers[_i] = arguments[_i];
            }
            if (!answers || answers.length == 0) {
                return;
            }
            var max = answers.length;
            var i = max == 1 ? 0 : this.getRandomInteger(max);
            return answers[i];
        };
        /**
         * N（正数 或 零）次方(n >= 0)
         * @param {number} val 根
         * @param {number} n N次方
         */
        MathMgr.prototype.getSquarePositive = function (val, n) {
            if (n === void 0) { n = 2; }
            if (n < 0) {
                console.warn("此接口一般不开放，如需要开负数次方，推荐使用：getSquare()");
                return;
            }
            var newVal = val;
            //val 的 (n + 1) 次方除以 val
            for (var i = 0; i < n; i++) {
                newVal *= val;
            }
            newVal /= val;
            return newVal;
        };
        /**
         * N次方
         * @param {number} val 根
         * @param {number} n N次方
         */
        MathMgr.prototype.getSquare = function (val, n) {
            if (n === void 0) { n = 2; }
            var newVal = val;
            // if (n >= 0) {
            //     newVal = this.getSquarePositive(val, n);
            // } else {
            //     newVal = this.getSquarePositive(1 / val, -n);
            // }
            newVal = Math.pow(val, n);
            return newVal;
        };
        /**
         * 保留N位小数（四舍五入）
         * @param {number} val 待修改值
         * @param {number} n = 2 N位小数，大于等于0
         * @returns {number} 保留N位小数后的结果
         *
         * @description
         * round() 方法可把一个数字舍入为最接近的整数。
         * 例如：Math.round(x)，则是将x取其最接近的整数。
         * 其取舍的方法使用的是四舍五入中的方法，符合数学中取舍的规则。
         *
         * @description
         * toFixed() 方法可把 Number 四舍五入为指定小数位数的数字。
         * 例如将数据Num保留2位小数，则表示为：toFixed(Num)；
         * 但是其四舍五入的规则与数学中的规则不同，使用的是银行家舍入规则，
         * 银行家舍入：所谓银行家舍入法，其实质是一种四舍六入五取偶（又称四舍六入五留双）法
         */
        MathMgr.prototype.keepDecimal = function (val, n) {
            if (n === void 0) { n = 2; }
            n = Math.max(0, n);
            var square = this.getSquare(10, n);
            return Math.round(val * square) / square; //Math.round(val * 100) / 100; //15.78
        };
        /**
         * 求两点间距离
         */
        MathMgr.prototype.getDistance = function (x1, y1, x2, y2) {
            var dist;
            // dist = Math.sqrt(this.getSquarePositive(x1 - x2) + this.getSquarePositive(y1 - y2));
            dist = egret.Point.distance({ x: x1, y: y1 }, { x: x2, y: y2 });
            dist = Math.floor(dist);
            return dist;
        };
        /**
         * 转换数字
         * @param {number} num 待转换数字
         * @param {boolean} isComma 是否每3位加一个","
         * @param {number} min 是否限制最小位数，不够位数时补0
         */
        MathMgr.prototype.switchNum = function (num, isComma, min) {
            var str = num + "";
            if (min != void 0) {
                var diff = min - str.length;
                if (diff > 0) {
                    for (var i = 0; i < diff; i++) {
                        str = "0" + str;
                    }
                }
            }
            if (isComma) {
                // const arr: string[] = str.split(".");
                var str1 = str; //arr[0];
                // const str2: string = arr.length > 1 ? arr[1] : "";
                var rgx = /(\d+)(\d{3})/;
                while (rgx.test(str1)) {
                    str1 = str1.replace(rgx, "$1" + "," + "$2");
                }
                str = str1; // + str2;
            }
            return str;
        };
        /**
         * 通过速度求时间
         */
        MathMgr.prototype.getTimeBySpeed = function (x1, y1, x2, y2, speed) {
            if (x2 === void 0) { x2 = x1; }
            if (y2 === void 0) { y2 = y1; }
            return Math.ceil(gMath.getDistance(x1, y1, x2, y2) * 1000 / speed);
        };
        /**
         * 转换小时为 00:00 格式
         */
        MathMgr.prototype.switchHour = function (hour, is24) {
            if (is24 === void 0) { is24 = true; }
            var str;
            var max = is24 ? 23 : 11;
            if (hour > max) {
                hour %= (max + 1);
            }
            if (hour < 10) {
                str = "0" + hour + ":00";
            }
            else {
                str = hour + ":00";
            }
            return str;
        };
        /**
         * 转换毫秒为 00:00 格式
         */
        MathMgr.prototype.switchMinute = function (millisecond) {
            var second = this.keepDecimal(millisecond / 1000, 0);
            var mm = this.switchNum(Math.floor(second / 60), false, 2);
            var ss = this.switchNum(second % 60, false, 2);
            return mm + ":" + ss;
        };
        /**
         * 角度转换为方向
         * @param {number} rotate 当前角度
         */
        MathMgr.prototype.rotateToDir = function (rotate) {
            return (rotate + 270) * Math.PI / 180;
        };
        /** 已知两点坐标，求角度 */
        MathMgr.prototype.pointToRotate = function (x1, y1, x2, y2) {
            var angle = Math.atan2((y2 - y1), (x2 - x1)); //弧度
            var theta = angle * (180 / Math.PI); //角度
            return theta + 90;
        };
        /**
         * 两点间按一定分割间距（密度）取出所有点
         * @param {number} x1 点1，X坐标
         * @param {number} y1 点1，Y坐标
         * @param {number} x2 点2，X坐标
         * @param {number} y2 点2，Y坐标
         * @param {number} density = 1 分割间距（密度）
         * @returns {{x?:number,y?:number}[]} 分割结果所有的点
         */
        MathMgr.prototype.pointListByDensity = function (x1, y1, x2, y2, density) {
            if (density === void 0) { density = 1; }
            var pos;
            var insideNull; //其中一个点坐标为空
            if (x1 != void 0 && y1 != void 0) {
                pos = pos || {};
                pos.x = x1;
                pos.y = y1;
            }
            else {
                insideNull = true;
            }
            if (x2 != void 0 && y2 != void 0) {
                pos = pos || {};
                pos.x = x2;
                pos.y = y2;
            }
            else {
                insideNull = true;
            }
            if (!pos) {
                return;
            }
            var posList = [];
            if (insideNull) {
                posList.push(pos);
            }
            else {
                var dis = gMath.getDistance(x1, y1, x2, y2); //两点间距
                density = Math.min(density, dis); //分割间距（密度）
                var splitCnt = dis / density; //分割等份数
                for (var i = 1; i <= splitCnt; i++) {
                    var posX = Math.round(x1 - (x1 - x2) * i / splitCnt);
                    var posY = Math.round(y1 - (y1 - y2) * i / splitCnt);
                    posList.push({ x: posX, y: posY });
                }
                //按密度分割后，第一个点如果不是x1, y1，存进去
                var firstPos = posList[0];
                if (firstPos.x != x1 || firstPos.y != y1) {
                    posList.unshift({ x: x1, y: y1 });
                }
                //按密度分割后，最后一个点如果不是x2, y2，存进去
                var lastPos = posList[posList.length - 1];
                if (lastPos.x != x2 || lastPos.y != y2) {
                    posList.push({ x: x2, y: y2 });
                }
            }
            return posList;
        };
        return MathMgr;
    }());
    util.MathMgr = MathMgr;
    __reflect(MathMgr.prototype, "util.MathMgr");
})(util || (util = {}));
//# sourceMappingURL=MathMgr.js.map