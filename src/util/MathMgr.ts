namespace util {
    /**
     * 数学计算管理器
     */
    export class MathMgr {

        public constructor() {

        }

        /**
         * 随机返回一个浮点数
         * @param {number} max 最大值
         * @param {number} min 最小值
         * @returns {number} 返回一个随机浮点数（含小不含大）
         */
        public getRandom(max: number, min: number = 0): number {
            if (max == min) {
                return max;
            }
            return Math.random() * (max - min) + min;
        }

        /**
         * 随机返回一个整数
         * @param {number} max 最大值
         * @param {number} min 最小值
         * @returns {number} 返回一个随机整数（含小不含大）
         */
        public getRandomInteger(max: number, min: number = 0): number {
            return Math.floor(this.getRandom(max, min));
        }

        /**
         * 随机返回预选答案
         * @param {any[]} answers 预选答案
         * @returns {any} 从预选答案中随机返回一个
         */
        public getRandomAnswer(...answers: any[]) {
            if (!answers || answers.length == 0) {
                return;
            }
            const max: number = answers.length;
            const i: number = max == 1 ? 0 : this.getRandomInteger(max);
            return answers[i];
        }

        /**
         * N（正数 或 零）次方(n >= 0)
         * @param {number} val 根
         * @param {number} n N次方
         */
        private getSquarePositive(val: number, n: number = 2): number {
            if (n < 0) {
                console.warn("此接口一般不开放，如需要开负数次方，推荐使用：getSquare()");
                return;
            }
            let newVal: number = val;
            //val 的 (n + 1) 次方除以 val
            for (let i: number = 0; i < n; i++) {
                newVal *= val;
            }
            newVal /= val;
            return newVal;
        }

        /**
         * N次方
         * @param {number} val 根
         * @param {number} n N次方
         */
        public getSquare(val: number, n: number = 2): number {
            let newVal: number = val;
            // if (n >= 0) {
            //     newVal = this.getSquarePositive(val, n);
            // } else {
            //     newVal = this.getSquarePositive(1 / val, -n);
            // }
            newVal = Math.pow(val, n);
            return newVal;
        }

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
        public keepDecimal(val: number, n: number = 2): number {
            n = Math.max(0, n);
            const square = this.getSquare(10, n);
            return Math.round(val * square) / square; //Math.round(val * 100) / 100; //15.78
        }

        /**
         * 求两点间距离
         */
        public getDistance(x1: number, y1: number, x2: number, y2: number): number {
            let dist: number;
            // dist = Math.sqrt(this.getSquarePositive(x1 - x2) + this.getSquarePositive(y1 - y2));
            dist = egret.Point.distance({ x: x1, y: y1 } as egret.Point, { x: x2, y: y2 } as egret.Point);
            dist = Math.floor(dist);
            return dist;
        }

        /**
         * 转换数字
         * @param {number} num 待转换数字
         * @param {boolean} isComma 是否每3位加一个","
         * @param {number} min 是否限制最小位数，不够位数时补0
         */
        public switchNum(num: number, isComma?: boolean, min?: number): string {
            let str: string = num + "";
            if (min != void 0) {
                const diff: number = min - str.length;
                if (diff > 0) {
                    for (let i: number = 0; i < diff; i++) {
                        str = "0" + str;
                    }
                }
            }
            if (isComma) {
                // const arr: string[] = str.split(".");
                let str1: string = str//arr[0];
                // const str2: string = arr.length > 1 ? arr[1] : "";
                const rgx: RegExp = /(\d+)(\d{3})/;
                while (rgx.test(str1)) {
                    str1 = str1.replace(rgx, "$1" + "," + "$2");
                }
                str = str1// + str2;
            }
            return str;
        }

        /**
         * 通过速度求时间
         */
        public getTimeBySpeed(x1: number, y1: number, x2: number = x1, y2: number = y1, speed: number): number {
            return Math.ceil(gMath.getDistance(x1, y1, x2, y2) * 1000 / speed);
        }

        /**
         * 转换小时为 00:00 格式
         */
        public switchHour(hour: number, is24: boolean = true): string {
            let str: string;
            const max: number = is24 ? 23 : 11;
            if (hour > max) {
                hour %= (max + 1);
            }
            if (hour < 10) {
                str = `0${hour}:00`;
            } else {
                str = `${hour}:00`;
            }
            return str;
        }

        /**
         * 转换毫秒为 00:00 格式
         */
        public switchMinute(millisecond: number) {
            const second = this.keepDecimal(millisecond / 1000, 0);
            const mm = this.switchNum(Math.floor(second / 60), false, 2);
            const ss = this.switchNum(second % 60, false, 2);
            return `${mm}:${ss}`;
        }

        /**
         * 角度转换为方向
         * @param {number} rotate 当前角度
         */
        public rotateToDir(rotate: number) {
            return (rotate + 270) * Math.PI / 180;
        }

        /** 已知两点坐标，求角度 */
        public pointToRotate(x1: number, y1: number, x2: number, y2: number): number {
            const angle: number = Math.atan2((y2 - y1), (x2 - x1)); //弧度
            const theta: number = angle * (180 / Math.PI); //角度
            return theta + 90;
        }

        /**
         * 两点间按一定分割间距（密度）取出所有点
         * @param {number} x1 点1，X坐标
         * @param {number} y1 点1，Y坐标
         * @param {number} x2 点2，X坐标
         * @param {number} y2 点2，Y坐标
         * @param {number} density = 1 分割间距（密度）
         * @returns {{x?:number,y?:number}[]} 分割结果所有的点
         */
        public pointListByDensity(x1: number, y1: number, x2: number, y2: number, density: number = 1): { x?: number, y?: number }[] {
            let pos: { x?: number, y?: number };
            let insideNull: boolean; //其中一个点坐标为空
            if (x1 != void 0 && y1 != void 0) {
                pos = pos || {};
                pos.x = x1;
                pos.y = y1;
            } else {
                insideNull = true;
            }
            if (x2 != void 0 && y2 != void 0) {
                pos = pos || {};
                pos.x = x2;
                pos.y = y2;
            } else {
                insideNull = true;
            }

            if (!pos) {
                return;
            }
            let posList: { x?: number, y?: number }[] = [];
            if (insideNull) {
                posList.push(pos);
            } else {
                const dis = gMath.getDistance(x1, y1, x2, y2); //两点间距
                density = Math.min(density, dis); //分割间距（密度）
                const splitCnt = dis / density; //分割等份数

                for (let i: number = 1; i <= splitCnt; i++) {
                    const posX: number = Math.round(x1 - (x1 - x2) * i / splitCnt);
                    const posY: number = Math.round(y1 - (y1 - y2) * i / splitCnt);
                    posList.push({ x: posX, y: posY });
                }
                //按密度分割后，第一个点如果不是x1, y1，存进去
                const firstPos = posList[0];
                if (firstPos.x != x1 || firstPos.y != y1) {
                    posList.unshift({ x: x1, y: y1 });
                }
                //按密度分割后，最后一个点如果不是x2, y2，存进去
                const lastPos = posList[posList.length - 1];
                if (lastPos.x != x2 || lastPos.y != y2) {
                    posList.push({ x: x2, y: y2 });
                }
                // console.log(x1, y1, x2, y2, posList);
            }

            return posList;
        }
    }
}