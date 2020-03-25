namespace util {
    /**
     * 拓展管理器
     */
    export class DevelopMgr {

        public constructor() {

        }

        /** 
         * 检测对象是否为空
         * @param {Object} obj 待检测对象
         * @returns {boolean} 对象是否为空（包含{}、对象里所有val都为空）
         */
        public objIsNull(obj: Object): boolean {
            if (!obj) {
                return true;
            }
            for (const key in obj) {
                const val = obj[key];
                if (val != void 0) {
                    return false;
                }
            }
            return true;
        }

        /**
         * 检测数组中是否包含指定值
         * @param {any[]} arr 待检测数组
         * @param {any} val 是否包含的指定值
         * @returns {boolean} 该数组中是否包含指定值
         */
        public arrHasVal(arr: any[] | any, val: any): boolean {
            if (arr === val) {
                return true;
            }
            if (!arr || arr.length <= 0) {
                return;
            }
            for (const _val of arr) {
                if (_val === val) {
                    return true;
                } else {
                    if (_val.length && _val.length > 0 && val.length && val.length) {
                        let hasVal: boolean = true;
                        for (let i: number = 0; i < val.length; i++) {
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
        }

        /**
         * 删除数组中是指定值
         * @param {any[]} arr 待检测数组
         * @param {any} val 待删除的指定值
         */
        public arrDelVal(arr: any[], val: any): void {
            if (!arr || arr.length <= 0) {
                return;
            }
            for (let i: number = 0; i < arr.length; i++) {
                const _val = arr[i];
                if (_val === val) {
                    arr.splice(i, 1);
                    break;
                }
            }
        }

        /**
         * Class类名转成String
         */
        public classToString(className: any): string {
            // console.info("classToString className ==", className);
            if (!className) {
                return;
            }
            const strArr: string[] = className.prototype.__class__.split(".");
            const len: number = strArr.length;
            // console.info("classToString strArr ==", strArr);
            if (!strArr || len <= 0) {
                return;
            }
            const str = strArr[len - 1];
            // console.info("classToString str ==", str);
            return str;
        }
    }
}