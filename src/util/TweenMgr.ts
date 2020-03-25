namespace util {
    /**
     * 缓动动画管理器
     */
    export class TweenMgr {

        /**
         * 改变高度
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} targetH 目标高度
         * @param {number} duration 持续时间
         * @param {number} orgH 原来的高度
         * @param {egret.Ease} ease 缓动算法
         * 
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
		 * 
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        public toHeight(target: egret.DisplayObject, targetH: number, duration?: number, orgH?: number, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            if (orgH != void 0) {
                target.height = orgH;
            } else {
                orgH = target.height;
            }
            this.tween(target, void 0, {
                props: {
                    height: targetH
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: call
            });
        }

        /**
         * 改变透明度
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} targetA 目标透明度
         * @param {number} duration 持续时间
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         * 
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
		 * 
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        public toAlpha(target: egret.DisplayObject, targetA: number, duration?: number, orgA?: number, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            if (orgA != void 0) {
                target.alpha = orgA;
            } else {
                orgA = target.alpha;
            }
            this.tween(target, void 0, {
                props: {
                    alpha: targetA
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: call
            });
        }

        /**
         * 改变缩放值
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} targetS 目标缩放值
         * @param {number} duration 持续时间
         * @param {number} orgS 原来的缩放值
         * @param {egret.Ease} ease 缓动算法
         * 
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
		 * 
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        public toScale(target: egret.DisplayObject, targetS: number, duration?: number, orgS?: number, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            if (orgS != void 0) {
                target.scaleX = target.scaleY = orgS;
            } else {
                orgS = target.scaleX;
            }
            this.tween(target, void 0, {
                props: {
                    scaleX: targetS,
                    scaleY: targetS
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: call
            });
        }

        /**
         * 改变X缩放值
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} targetS 目标X缩放值
         * @param {number} duration 持续时间
         * @param {number} orgS 原来的X缩放值
         * @param {egret.Ease} ease 缓动算法
         * 
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
		 * 
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        public toScaleX(target: egret.DisplayObject, targetS: number, duration?: number, orgS?: number, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            if (orgS != void 0) {
                target.scaleX = orgS;
            } else {
                orgS = target.scaleX;
            }
            this.tween(target, void 0, {
                props: {
                    scaleX: targetS
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: call
            });
        }

        /**
         * 改变Y缩放值
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} targetS 目标Y缩放值
         * @param {number} duration 持续时间
         * @param {number} orgS 原来的X缩放值
         * @param {egret.Ease} ease 缓动算法
         * 
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
		 * 
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        public toScaleY(target: egret.DisplayObject, targetS: number, duration?: number, orgS?: number, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            if (orgS != void 0) {
                target.scaleY = orgS;
            } else {
                orgS = target.scaleY;
            }
            this.tween(target, void 0, {
                props: {
                    scaleY: targetS
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: call
            });
        }

        /**
         * 平移
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} targetX 目标x轴
         * @param {number} targetY 目标y轴
         * @param {number} duration 持续时间
         * @param {number} orgX 原来的x轴
         * @param {number} orgY 原来的y轴
         * @param {egret.Ease} ease 缓动算法
         * 
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
		 * 
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        public toMove(target: egret.DisplayObject, targetX: number, targetY: number, duration?: { x: number, y?: number }, orgX?: number, orgY?: number, ease?: { x: Function, y?: Function },
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            if (orgX != void 0) {
                target.x = orgX;
            }
            if (orgY != void 0) {
                target.y = orgY;
            }
            if (ease) {
                if (ease.y == void 0) {
                    ease.y = ease.x;
                }
            } else {
                ease = { x: void 0, y: void 0 };
            }
            let callX: { callback: Function; thisObj?: any; params?: any[]; }, callY: { callback: Function; thisObj?: any; params?: any[]; };
            if (duration) {
                if (duration.y == void 0) {
                    duration.y = duration.x;
                    callX = call;
                } else {
                    if (duration.x > duration.y) {
                        callX = call;
                    } else {
                        callY = call;
                    }
                }
            }
            this.rmTweens(target);
            egret.Tween.get(target).to({ x: targetX }, duration.x, ease.x).wait(wait.duration, wait.passive).call(() => {
                if (callX && callX.callback) {
                    callX.callback.call(callX.thisObj, ...callX.params);
                }
            });
            egret.Tween.get(target).to({ y: targetY }, duration.y, ease.y).wait(wait.duration, wait.passive).call(() => {
                if (callY && callY.callback) {
                    callY.callback.call(callY.thisObj, ...callY.params);
                }
            });

            // this.tween(target, void 0, {
            //     props: {
            //         x: targetX
            //     },
            //     ease: ease.x,
            //     wait: wait,
            //     duration: duration.x,
            //     call: callX
            // }, {
            //         props: {
            //             y: targetY
            //         },
            //         ease: ease.y,
            //         wait: wait,
            //         duration: duration.y,
            //         call: callX
            //     }
            // );
        }

        /**
         * 平移，通过速度控制
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} targetX 目标x轴
         * @param {number} targetY 目标y轴
         * @param {number} speed 移动速度
         * @param {egret.Ease} ease 缓动算法
         * @param {Function} callback 回调方法
         * @param {any} thisObj 回调方法this作用域
         * @param {any[]} params 回调方法参数
         */
        public toMoveBySpeed(target: egret.DisplayObject, targetX: number = target.x, targetY: number = target.y, speed: number = 500, ease?: { x: Function, y?: Function }, callBack?: Function, thisObj?: any, ...params: any[]): number {
            //开始移动
            let time: number = gMath.getTimeBySpeed(target.x, target.y, targetX, targetY, speed);
            gTween.toMove(target, targetX, targetY, { x: time }, void 0, void 0, ease, void 0, {
                callback: () => {
                    if (callBack) {
                        callBack.call(thisObj, ...params);
                    }
                }
            });
            return time;
        }

        /**
         * X轴上移动
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} targetX 目标x轴
         * @param {number} duration 持续时间
         * @param {number} orgX 原来的x轴
         * @param {egret.Ease} ease 缓动算法
         * 
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
		 * 
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        public toMoveX(target: egret.DisplayObject, targetX: number, duration?: number, orgX?: number, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            if (orgX != void 0) {
                target.x = orgX;
            }
            this.tween(target, void 0, {
                props: {
                    x: targetX
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: call
            });
        }

        /**
         * Y轴上移动
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} targetY 目标y轴
         * @param {number} duration 持续时间
         * @param {number} orgY 原来的y轴
         * @param {egret.Ease} ease 缓动算法
         * 
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
		 * 
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        public toMoveY(target: egret.DisplayObject, targetY: number, duration?: number, orgY?: number, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            if (orgY != void 0) {
                target.y = orgY;
            }
            this.tween(target, void 0, {
                props: {
                    y: targetY
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: call
            });
        }

        /**
         * 向下显示
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} diffY 目标y轴差值
         * @param {number} orgY 原来的y轴
         * @param {number} orgY 原来的y轴
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         * 
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
		 * 
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        public toBottomShow(target: egret.DisplayObject, duration?: number, diffY: number = target.height, orgY: number = target.y, orgA: number = target.alpha, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            target.y -= diffY;
            target.alpha = 0;
            target.visible = true;
            this.tween(target, void 0, {
                props: {
                    y: orgY,
                    alpha: orgA
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: call
            });
        }

        /**
         * 向上隐藏
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} diffY 目标y轴差值
         * @param {number} orgY 原来的y轴
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         * 
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
		 * 
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        public toTopHide(target: egret.DisplayObject, duration?: number, diffY: number = target.height, orgY: number = target.y, orgA: number = target.alpha, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            this.tween(target, void 0, {
                props: {
                    y: orgY - diffY,
                    alpha: 0
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: {
                    callback: () => {
                        target.visible = false;
                        target.y = orgY;
                        target.alpha = orgA;
                        if (call && call.callback) {
                            call.callback.call(call.thisObj, ...call.params);
                        }
                    },
                    thisObj: this
                }
            });
        }

        /**
         * 向上显示
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} diffY 目标y轴差值
         * @param {number} orgY 原来的y轴
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法 ps: egret.Ease.backOut (仿物理性回弹效果)
         * 
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
		 * 
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        public toTopShow(target: egret.DisplayObject, duration?: number, diffY: number = target.height, orgY: number = target.y, orgA: number = target.alpha, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            target.y += diffY;
            target.alpha = 0;
            target.visible = true;
            this.tween(target, void 0, {
                props: {
                    y: orgY,
                    alpha: orgA
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: call
            });
        }

        /**
         * 向下隐藏
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} diffY 目标y轴差值
         * @param {number} orgY 原来的y轴
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         * 
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
		 * 
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        public toBottomHide(target: egret.DisplayObject, duration?: number, diffY: number = target.height, orgY: number = target.y, orgA: number = target.alpha, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            this.tween(target, void 0, {
                props: {
                    y: orgY + diffY,
                    alpha: 0
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: {
                    callback: () => {
                        target.visible = false;
                        target.y = orgY;
                        target.alpha = orgA;
                        if (call && call.callback) {
                            call.callback.call(call.thisObj, ...call.params);
                        }
                    },
                    thisObj: this
                }
            });
        }

        /**
         * 改变y轴（向上、下）显示(物理性回弹效果)
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} chgY 目标y轴变化值
         * @param {number} duration 持续时间
         * @param {number} diffY 目标y轴差值
         * @param {number} orgY 原来的y轴
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} easeOut = egret.Ease.sineOut 缓动算法(缓出)
         * @param {egret.Ease} easeIn = egret.Ease.sineIn 缓动算法(回弹)
         * 
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
		 * 
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        public toYShowPhy(target: egret.DisplayObject, chgY: number, duration?: number, diffY: number = target.height, orgY: number = target.y, orgA: number = target.alpha, easeOut: Function = egret.Ease.sineOut, easeIn: Function = egret.Ease.sineIn,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            target.y += diffY;
            target.alpha = 0;
            target.visible = true;
            egret.Tween.get(target)
                .to({ y: orgY - chgY, alpha: orgA }, Math.floor(duration / 2), easeOut)
                .to({ y: orgY }, Math.floor(duration / 4), easeIn)
                .to({ y: orgY - Math.floor(chgY / 6) }, Math.floor(duration / 8), easeOut)
                .to({ y: orgY }, Math.floor(duration / 8), easeIn)
                .wait(wait.duration, wait.passive).call(() => {
                    if (call && call.callback) {
                        call.callback.call(call.thisObj, ...call.params);
                    }
                }, this);
        }

        /**
         * 向右显示
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} diffX 目标x轴差值
         * @param {number} orgX 原来的x轴
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         * 
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
		 * 
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        public toRightShow(target: egret.DisplayObject, duration?: number, diffX: number = target.width, orgX: number = target.x, orgA: number = target.alpha, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            target.x -= diffX;
            target.alpha = 0;
            target.visible = true;
            this.tween(target, void 0, {
                props: {
                    x: orgX,
                    alpha: orgA
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: call
            });
        }

        /**
         * 向左隐藏
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} diffX 目标x轴差值
         * @param {number} orgX 原来的x轴
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         * 
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
		 * 
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        public toLeftHide(target: egret.DisplayObject, duration?: number, diffX: number = target.width, orgX: number = target.x, orgA: number = target.alpha, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            this.tween(target, void 0, {
                props: {
                    x: orgX - diffX,
                    alpha: 0
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: {
                    callback: () => {
                        target.visible = false;
                        target.x = orgX;
                        target.alpha = orgA;
                        if (call && call.callback) {
                            call.callback.call(call.thisObj, ...call.params);
                        }
                    },
                    thisObj: this
                }
            });
        }

        /**
         * 向左显示
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} diffX 目标x轴差值
         * @param {number} orgX 原来的x轴
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         * 
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
		 * 
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        public toLeftShow(target: egret.DisplayObject, duration?: number, diffX: number = target.width, orgX: number = target.x, orgA: number = target.alpha, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            target.x += diffX;
            target.alpha = 0;
            target.visible = true;
            this.tween(target, void 0, {
                props: {
                    x: orgX,
                    alpha: orgA
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: call
            });
        }

        /**
         * 向右隐藏
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} diffX 目标x轴差值
         * @param {number} orgX 原来的x轴
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         * 
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
		 * 
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        public toRightHide(target: egret.DisplayObject, duration?: number, diffX: number = target.width, orgX: number = target.x, orgA: number = target.alpha, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            this.tween(target, void 0, {
                props: {
                    x: orgX + diffX,
                    alpha: 0
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: {
                    callback: () => {
                        target.visible = false;
                        target.x = orgX;
                        target.alpha = orgA;
                        if (call && call.callback) {
                            call.callback.call(call.thisObj, ...call.params);
                        }
                    },
                    thisObj: this
                }
            });
        }

        /**
         * 改变x轴（向左、右）显示(物理性回弹效果)
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} chgX 目标x轴变化值
         * @param {number} duration 持续时间
         * @param {number} diffX 目标x轴差值
         * @param {number} orgX 原来的x轴
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} easeOut = egret.Ease.sineOut 缓动算法(缓出)
         * @param {egret.Ease} easeIn = egret.Ease.sineIn 缓动算法(回弹)
         * 
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
		 * 
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        public toXShowPhy(target: egret.DisplayObject, chgX: number, duration?: number, diffX: number = target.width, orgX: number = target.x, orgA: number = target.alpha, easeOut: Function = egret.Ease.sineOut, easeIn: Function = egret.Ease.sineIn,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            target.x += diffX;
            target.alpha = 0;
            target.visible = true;
            egret.Tween.get(target)
                .to({ x: orgX - chgX, alpha: orgA }, Math.floor(duration / 2), easeOut)
                .to({ x: orgX }, Math.floor(duration / 4), easeIn)
                .to({ x: orgX - Math.floor(chgX / 6) }, Math.floor(duration / 8), easeOut)
                .to({ x: orgX }, Math.floor(duration / 8), easeIn)
                .wait(wait.duration, wait.passive).call(() => {
                    if (call && call.callback) {
                        call.callback.call(call.thisObj, ...call.params);
                    }
                }, this);
        }

        /**
         * 放大显示 (冒现效果)
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} orgS 原来的缩放值
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法 ps: egret.Ease.bounceOut (果冻效果)
         * 
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
		 * 
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        public toBigShow(target: egret.DisplayObject, duration?: number, orgS: number = target.scaleX, orgA: number = target.alpha, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            target.scaleX = target.scaleY = 0;
            target.alpha = 0;
            target.visible = true;
            this.tween(target, void 0, {
                props: {
                    scaleX: orgS,
                    scaleY: orgS,
                    alpha: orgA
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: call
            });
        }

        /**
         * 冒泡显示效果
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} props.orgS 原来的缩放值
         * @param {number} props.orgA 原来的透明度
         * @param {egret.Ease} props.ease 缓动算法 ps: egret.Ease.bounceOut (果冻效果)
         * 
         * @param {Object} props.wait 等待指定毫秒后执行下一个动画
         * @param {number} props.wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} props.wait.passive 等待期间属性是否会更新
		 * 
         * @param {Function} callback 回调方法
         * @param {any} thisObj 回调方法this作用域
         * @param {any[]} params 回调方法参数
         * 
         * @param {boolean} floatBubble.isFloat 是否使用冒泡漂浮效果
         * @param {number} floatBubble.targetY 冒泡漂浮效果，目标y轴差值
         * @param {number} floatBubble.duration 冒泡漂浮效果，持续时间
         * @param {number} floatBubble.orgY 冒泡漂浮效果，原来的y轴
         * @param {egret.Ease} floatBubble.ease 冒泡漂浮效果，缓动算法
         */
        public showBubble(target: egret.DisplayObject, duration: number = 500,
            props?: { orgS?: number, orgA?: number, ease?: Function, wait?: { duration: number, passive?: boolean } },
            callback?: Function,
            thisObj?: any,
            params?: any[],
            floatBubble: { isFloat: boolean, targetY?: number, duration?: number, orgY?: number, ease?: Function } = { isFloat: true },
        ) {
            if (!props) {
                props = {};
            }
            props.orgS = props.orgS != void 0 ? props.orgS : target.scaleX;
            props.orgA = props.orgA != void 0 ? props.orgA : target.alpha;
            props.ease = props.ease != void 0 ? props.ease : egret.Ease.bounceOut;
            gTween.toBigShow(target, duration, props.orgS, props.orgA, props.ease, props.wait, {
                callback: () => {
                    if (floatBubble && floatBubble.isFloat === void 0) {
                        floatBubble.isFloat = true;
                    }
                    if (floatBubble.isFloat) {
                        this.floatBubble(target, floatBubble.targetY, floatBubble.duration, floatBubble.orgY, floatBubble.ease);
                    }
                    if (callback) {
                        callback.call(thisObj, params);
                    }
                }
            });
        }

        /**
         * 缩小隐藏
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} orgS 原来的缩放值
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         * 
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
		 * 
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        public toSmallHide(target: egret.DisplayObject, duration?: number, orgS?: number, orgA: number = target.alpha, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            if (orgS != void 0) {
                target.scaleX = target.scaleY = orgS;
            } else {
                orgS = target.scaleX;
            }
            this.tween(target, void 0, {
                props: {
                    scaleX: 0,
                    scaleY: 0,
                    alpha: 0
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: {
                    callback: () => {
                        target.visible = false;
                        target.scaleX = target.scaleY = orgS;
                        target.alpha = orgA;
                        if (call && call.callback) {
                            call.callback.call(call.thisObj, ...call.params);
                        }
                    },
                    thisObj: this
                }
            });
        }

        /**
         * 冒泡隐藏效果
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} props.orgS 原来的缩放值
         * @param {number} props.orgA 原来的透明度
         * @param {egret.Ease} props.ease 缓动算法 ps: egret.Ease.bounceOut (果冻效果)
         * 
         * @param {Object} props.wait 等待指定毫秒后执行下一个动画
         * @param {number} props.wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} props.wait.passive 等待期间属性是否会更新
		 * 
         * @param {Function} callback 回调方法
         * @param {any} thisObj 回调方法this作用域
         * @param {any[]} params 回调方法参数
         */
        public hideBubble(target: egret.DisplayObject, duration: number = 300,
            props?: { orgS?: number, orgA?: number, ease?: Function, wait?: { duration: number, passive?: boolean } },
            callback?: Function,
            thisObj?: any,
            params?: any[],
        ) {
            if (!props) {
                props = {};
            }
            props.orgS = props.orgS != void 0 ? props.orgS : target.scaleX;
            props.orgA = props.orgA != void 0 ? props.orgA : target.alpha;
            gTween.toSmallHide(target, duration, props.orgS, props.orgA, props.ease, props.wait, {
                callback: callback,
                thisObj: thisObj,
                params: params
            });
        }

        /**
         * 缩小显示 (盖章效果)
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} diffS 缩放差值
         * @param {number} duration 持续时间
         * @param {number} orgS 原来的缩放值
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         * 
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
		 * 
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        public toSmallShow(target: egret.DisplayObject, diffS: number, duration?: number, orgS?: number, orgA: number = target.alpha, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            if (orgS != void 0) {
                target.scaleX = target.scaleY = orgS;
            } else {
                orgS = target.scaleX;
            }
            target.scaleX = target.scaleY *= diffS;
            target.alpha = 0;
            target.visible = true;
            this.tween(target, void 0, {
                props: {
                    scaleX: orgS,
                    scaleY: orgS,
                    alpha: orgA
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: call
            });
        }

        /**
         * 放大隐藏
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} diffS 缩放差值
         * @param {number} duration 持续时间
         * @param {number} orgS 原来的缩放值
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         * 
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
		 * 
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        public toBigHide(target: egret.DisplayObject, diffS: number, duration?: number, orgS?: number, orgA: number = target.alpha, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            if (orgS != void 0) {
                target.scaleX = target.scaleY = orgS;
            } else {
                orgS = target.scaleX;
            }
            this.tween(target, void 0, {
                props: {
                    scaleX: target.scaleX * diffS,
                    scaleY: target.scaleX * diffS,
                    alpha: 0
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: {
                    callback: () => {
                        target.visible = false;
                        target.scaleX = target.scaleY = orgS;
                        target.alpha = orgA;
                        if (call && call.callback) {
                            call.callback.call(call.thisObj, ...call.params);
                        }
                    },
                    thisObj: this
                }
            });
        }

        /**
         * 递增宽度显示
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} orgW 原来的宽度
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         * 
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
		 * 
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        public toWidthAddShow(target: egret.DisplayObject, duration?: number, orgW: number = target.width, orgA: number = target.alpha, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            target.width = 0;
            target.alpha = 0;
            target.visible = true;
            this.tween(target, void 0, {
                props: {
                    width: orgW,
                    alpha: orgA
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: call
            });
        }

        /**
         * 递减宽度隐藏
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} orgW 原来的宽度
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         * 
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
		 * 
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        public toWidthCutHide(target: egret.DisplayObject, duration?: number, orgW: number = target.width, orgA: number = target.alpha, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            this.tween(target, void 0, {
                props: {
                    width: 0,
                    alpha: 0
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: {
                    callback: () => {
                        target.visible = false;
                        target.width = orgW;
                        target.alpha = orgA;
                        if (call && call.callback) {
                            call.callback.call(call.thisObj, ...call.params);
                        }
                    },
                    thisObj: this
                }
            });
        }

        /**
         * 递增高度显示
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} orgH 原来的高度
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         * 
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
		 * 
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        public toHeightAddShow(target: egret.DisplayObject, duration?: number, orgH: number = target.height, orgA: number = target.alpha, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            target.height = 0;
            target.alpha = 0;
            target.visible = true;
            this.tween(target, void 0, {
                props: {
                    height: orgH,
                    alpha: orgA
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: call
            });
        }

        /**
         * 递减高度隐藏
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} orgH 原来的高度
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         * 
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
		 * 
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        public toHeightCutHide(target: egret.DisplayObject, duration?: number, orgH: number = target.height, orgA: number = target.alpha, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            this.tween(target, void 0, {
                props: {
                    height: 0,
                    alpha: 0
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: {
                    callback: () => {
                        target.visible = false;
                        target.height = orgH;
                        target.alpha = orgA;
                        if (call && call.callback) {
                            call.callback.call(call.thisObj, ...call.params);
                        }
                    },
                    thisObj: this
                }
            });
        }

        /**
         * 递增、递减宽度
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} diffW 宽度差值
         * @param {number} orgW 原来的宽度
         * @param {egret.Ease} ease 缓动算法
         * 
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
		 * 
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        public toWidthChange(target: egret.DisplayObject, duration?: number, diffW?: number, orgW?: number, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            if (orgW != void 0) {
                target.width = orgW;
            }
            orgW = target.width; //原来的宽度
            target.visible = true;
            this.tween(target, void 0, {
                props: {
                    width: orgW + diffW
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: {
                    callback: () => {
                        if (target.width <= 0) {
                            target.width = 0;
                            target.visible = false;
                        }
                        if (call && call.callback) {
                            call.callback.call(call.thisObj, ...call.params);
                        }
                    },
                    thisObj: this
                }
            });
        }

        /**
         * 淡入显示
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         * 
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
		 * 
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        public fadeIn(target: egret.DisplayObject, duration?: number, orgA: number = target.alpha, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            target.alpha = 0;
            target.visible = true;
            this.tween(target, void 0, {
                props: {
                    alpha: orgA
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: call
            });
        }

        /**
         * 淡出隐藏
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         * 
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
		 * 
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        public fadeOut(target: egret.DisplayObject, duration?: number, orgA: number = target.alpha, ease?: Function,
            wait?: {
                duration: number;
                passive?: boolean;
            }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            this.tween(target, void 0, {
                props: {
                    alpha: 0
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: {
                    callback: () => {
                        target.visible = false;
                        target.alpha = orgA;
                        if (call && call.callback) {
                            call.callback.call(call.thisObj, ...call.params);
                        }
                    },
                    thisObj: this
                }
            });
        }

        /**
         * 持续漂浮，呼吸效果
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} diffY 目标y轴差值
         * @param {number} duration 持续时间
         * @param {number} orgY 原来的y轴
         * @param {egret.Ease} ease 缓动算法
         */
        public loopFloat(target: egret.DisplayObject, diffY: number = -20, duration: number = 500, orgY?: number, ease?: Function) {
            if (orgY != void 0) {
                target.y = orgY;
            } else {
                orgY = target.y; //原来的y轴
            }
            this.tween(target, { loop: true },
                {
                    props: { y: orgY + diffY },
                    duration: duration,
                    ease
                }, {
                    props: { y: orgY },
                    duration: duration,
                    ease
                }
            );
        }

        /**
         * 冒泡漂浮效果
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} targetY 目标y轴差值
         * @param {number} duration 持续时间
         * @param {number} orgY 原来的y轴
         * @param {egret.Ease} ease 缓动算法
         */
        public floatBubble(item: egret.DisplayObject | egret.DisplayObjectContainer, diffY: number = -20, duration: number = 500, orgY: number = item.y, ease?: Function) {
            gTween.loopFloat(item, diffY, duration, orgY, ease);
        }

        /**
         * 持续缩放，呼吸效果
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} targetS 目标缩放值
         * @param {number} duration 持续时间
         * @param {number} orgS 原来的缩放值
         * @param {egret.Ease} ease 缓动算法
         */
        public loopScale(target: egret.DisplayObject, targetS: number = .85, duration: number = 500, orgS?: number, ease?: Function) {
            if (orgS != void 0) {
                target.scaleX = target.scaleY = orgS;
            } else {
                orgS = target.scaleX; //原来的缩放值
            }
            this.tween(target, { loop: true },
                {
                    props: { scaleX: orgS * targetS, scaleY: orgS * targetS },
                    duration: duration,
                    ease
                }, {
                    props: { scaleX: orgS, scaleY: orgS },
                    duration: duration,
                    ease
                }
            );
        }

        /**
         * 持续X缩放值，呼吸效果
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} targetS 目标X缩放值
         * @param {number} duration 持续时间
         * @param {number} orgS 原来的X缩放值
         * @param {egret.Ease} ease 缓动算法
         */
        public loopScaleX(target: egret.DisplayObject, targetS: number = .85, duration: number = 500, orgS?: number, ease?: Function) {
            if (orgS != void 0) {
                target.scaleX = orgS;
            } else {
                orgS = target.scaleX; //原来的缩放值
            }
            this.tween(target, { loop: true },
                {
                    props: { scaleX: orgS * targetS },
                    duration: duration,
                    ease
                }, {
                    props: { scaleX: orgS },
                    duration: duration,
                    ease
                }
            );
        }

        /**
         * 持续Y缩放值，呼吸效果
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} targetS 目标Y缩放值
         * @param {number} duration 持续时间
         * @param {number} orgS 原来的Y缩放值
         * @param {egret.Ease} ease 缓动算法
         */
        public loopScaleY(target: egret.DisplayObject, targetS: number = .85, duration: number = 500, orgS?: number, ease?: Function) {
            if (orgS != void 0) {
                target.scaleY = orgS;
            } else {
                orgS = target.scaleY; //原来的缩放值
            }
            this.tween(target, { loop: true },
                {
                    props: { scaleY: orgS * targetS },
                    duration: duration,
                    ease
                }, {
                    props: { scaleY: orgS },
                    duration: duration,
                    ease
                }
            );
        }

        /** 按钮呼吸动画 */
        public yoyoBtn(target: egret.DisplayObject | egret.DisplayObjectContainer, restrictEff: boolean = true, playType: gConst.endBtnAimType = gConst.endBtnAimType.SCALE,
            props?: {
                targetS?: { x?: number, y?: number }, duration?: number, orgS?: { x?: number, y?: number }, diffR?: number, orgR?: number, diffS?: { x?: number, y?: number },
                times?: number, ease?: { in?: Function, out?: Function }, wait?: { duration?: number, passive?: boolean }
            }
        ) {
            if (restrictEff && (gConst.notEffectModel || (window["MW_CONFIG"] && MW_CONFIG.channel == "google"))) {
                return;
            }

            if (!props) {
                props = {};
            }
            //原来的缩放值
            if (!props.orgS) { props.orgS = {}; }

            if (props.orgS.x == void 0) {
                props.orgS.x = target.scaleX;
            } else {
                target.scaleX = props.orgS.x;
            }
            if (props.orgS.y == void 0) {
                props.orgS.y = target.scaleY;
            } else {
                target.scaleY = props.orgS.y;
            }

            //目标缩放值
            if (!props.targetS) { props.targetS = {}; }

            //缩放差值
            if (!props.diffS) { props.diffS = {}; }

            //缓动算法
            if (!props.ease) { props.ease = {}; }

            switch (playType) {
                //左右拉伸——上下拉伸
                case gConst.endBtnAimType.DRAWING:
                    gTween.drawing(target, props.targetS, props.duration, props.diffS, props.times, props.ease, props.wait);
                    break;
                //上下摇摆
                case gConst.endBtnAimType.SWING:
                    gTween.swing(target, props.diffR, props.duration, props.orgR, props.times, props.ease.in, props.wait);
                    break;
                //大小等比例缩放
                default:
                    gTween.loopScale(target, props.targetS.x, props.duration, props.orgS.x, props.ease.in);
                    break;
            }
        }

        /**
         * 持续改变透明度，呼吸效果
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} targetA 目标透明度
         * @param {number} duration 持续时间
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         */
        public loopAlpha(target: egret.DisplayObject, targetA: number = 0, duration: number = 500, orgA?: number, ease?: Function) {
            if (orgA != void 0) {
                target.alpha = orgA;
            }
            orgA = target.alpha; //原来的透明度
            this.tween(target, { loop: true },
                {
                    props: { alpha: orgA * targetA },
                    duration: duration,
                    ease
                }, {
                    props: { alpha: orgA },
                    duration: duration,
                    ease
                }
            );
        }

        /**
         * 持续旋转，呼吸效果
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} direction 旋转方向 1:顺时针 -1:逆时针
         * @param {number} duration 持续时间
         * @param {number} orgR 原来的角度
         * @param {egret.Ease} ease 缓动算法
         */
        public loopRotate(target: egret.DisplayObject, direction: 1 | -1 = 1, duration: number = 3600, orgR?: number, ease?: Function) {
            if (orgR != void 0) {
                target.rotation = orgR;
            }
            orgR = target.rotation; //原来的角度
            this.tween(target, { loop: true },
                {
                    props: { rotation: orgR + direction * 360 },
                    duration: duration,
                    ease
                }
            );
        }

        /**
         * 摇摆动画
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} diffR 目标角度差值
         * @param {number} duration 持续时间
         * @param {number} orgR 原来的角度
         * @param {number} times 摇摆次数
         * @param {egret.Ease} ease 缓动算法
         * 
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
         */
        public swing(target: egret.DisplayObject, diffR: number = 5, duration: number = 150, orgR?: number, times?: number, ease?: Function, wait: {
            duration?: number;
            passive?: boolean;
        } = { duration: 800 }, call?: {
            callback: Function;
            thisObj?: any;
            params?: any[];
        }) {
            if (orgR != void 0) {
                target.rotation = orgR;
            } else {
                orgR = target.rotation;
            }

            const start: Function = (loop?: boolean) => {
                if (!loop) {
                    if (times <= 0) {
                        if (call && call.callback) {
                            call.callback.call(call.thisObj, ...call.params);
                        }
                        return;
                    }
                }

                egret.Tween.get(target, { loop: loop })
                    .to({ rotation: orgR + diffR }, duration / 2, ease)
                    .to({ rotation: orgR - 2 * diffR }, duration, ease)
                    .to({ rotation: orgR }, duration / 2, ease)
                    .to({ rotation: orgR + diffR }, duration / 2, ease)
                    .to({ rotation: orgR - 2 * diffR }, duration, ease)
                    .to({ rotation: orgR }, duration / 2, ease)
                    .wait(wait.duration, wait.passive)
                    .call(() => {
                        if (!loop) {
                            times--;
                            start.call(this);
                        }
                    });
            };

            if (!times || times <= 0) {
                start.call(this, true);
            } else {
                start.call(this);
            }
        }

        /**
         * 左右拉伸——上下拉伸
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} diffS 缩放差值
         * @param {number} duration 持续时间
         * @param {number} orgS 原来的缩放值
         * @param {number} times 拉伸次数
         * @param {egret.Ease} ease 缓动算法
         * 
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
         */
        public drawing(target: egret.DisplayObject, diffS?: { x?: number, y?: number }, duration: number = 800, orgS: { x?: number, y?: number } = {}, times?: number, ease?: { in?: Function, out?: Function }, wait: {
            duration?: number;
            passive?: boolean;
        } = { duration: 0 }, call?: {
            callback: Function;
            thisObj?: any;
            params?: any[];
        }) {

            //目标缩放值
            if (!diffS) {
                diffS = {};
            }
            if (diffS.x == void 0) {
                diffS.x = .1;
            }
            if (diffS.y == void 0) {
                diffS.y = diffS.x;
            }

            //原来的缩放值
            if (!orgS) {
                orgS = {};
            }
            if (orgS.x == void 0) {
                orgS.x = target.scaleX;
            } else {
                target.scaleX = orgS.x;
            }
            if (orgS.y == void 0) {
                orgS.y = target.scaleY;
            } else {
                target.scaleY = orgS.y;
            }

            //缓动算法
            if (!ease) {
                ease = {};
            }
            if (ease.in == void 0) {
                ease.in = egret.Ease.quadOut;
            }
            if (ease.out == void 0) {
                ease.out = egret.Ease.quadIn;
            }

            const start: Function = (loop?: boolean) => {
                if (!loop) {
                    if (times <= 0) {
                        if (call && call.callback) {
                            call.callback.call(call.thisObj, ...call.params);
                        }
                        return;
                    }
                }

                egret.Tween.get(target, { loop: loop })
                    .to({ scaleX: orgS.x + diffS.x }, duration / 4, ease.in)
                    .to({ scaleX: orgS.x }, duration / 4, ease.out)
                    .to({ scaleX: orgS.x - diffS.x }, duration / 4, ease.in)
                    .to({ scaleX: orgS.x }, duration / 4, ease.out)

                egret.Tween.get(target, { loop: loop })
                    .to({ scaleY: orgS.y - diffS.y }, duration / 4, ease.in)
                    .to({ scaleY: orgS.y }, duration / 4, ease.out)
                    .to({ scaleY: orgS.y + diffS.y }, duration / 4, ease.in)
                    .to({ scaleY: orgS.y }, duration / 4, ease.out)
                    .wait(wait.duration, wait.passive)
                    .call(() => {
                        if (!loop) {
                            times--;
                            start.call(this);
                        }
                    });
            };

            if (!times || times <= 0) {
                start.call(this, true);
            } else {
                start.call(this);
            }
        }

		/**
         * 激活一个对象，对其添加 Tween 动画
         * @param {Object} target 要激活 Tween 的对象
         * @param {Object} props 参数，支持loop(循环播放) onChange(变化函数) onChangeObj(变化函数作用域)
         * @param {any} props.pluginData 暂未实现
         * @param {boolean} props.override 是否移除对象之前添加的tween，默认值false。
		 * 
         * @param {Object[]} toArg 将指定对象的属性修改为指定值参数列表
         * @param {Object} toArg.props 对象的属性集合
         * @param {number} toArg.duration 持续时间
         * @param {egret.Ease} toArg.ease 缓动算法
		 * 
         * @param {Object} toArg.wait 等待指定毫秒后执行下一个动画
         * @param {number} toArg.wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} toArg.wait.passive 等待期间属性是否会更新
		 * 
         * @param {Object} toArg.call 执行回调函数
         * @param {Function} toArg.call.callback 回调方法
         * @param {any} toArg.call.thisObj 回调方法this作用域
         * @param {any[]} toArg.call.params 回调方法参数
		 */
        public tween(
            target: any,
            props: {
                loop?: boolean; //循环播放
                onChange?: Function; //变化函数
                onChangeObj?: any; //变化函数作用域
                pluginData?: any; //暂未实现
                override?: boolean; //是否移除对象之前添加的tween，默认值false。
            } = {}, ...toArg: {
                props?: Object;
                duration?: number;
                ease?: Function;
                wait?: {
                    duration: number;
                    passive?: boolean;
                };
                call?: {
                    callback: Function;
                    thisObj?: any;
                    params?: any[];
                };

            }[]
        ): egret.Tween {
            this.rmTweens(target);
            let tween: egret.Tween = egret.Tween.get(target, props, props.pluginData, props.override); //缓动对象

            if (!toArg || toArg.length <= 0) {
                this.rmTweens(target);
                return tween;
            } else {
                let toIdx: number = 0;
                let tranTo: Function = () => {
                    let _to: {
                        props?: Object;
                        duration?: number;
                        ease?: Function;
                        wait?: {
                            duration: number;
                            passive?: boolean;
                        };
                        call?: {
                            callback: Function;
                            thisObj?: any;
                            params?: any[];
                        };

                    } = toArg[toIdx];

                    if (_to.wait) {
                        tween.to(_to.props, _to.duration, _to.ease).wait(_to.wait.duration, _to.wait.passive).call(() => {
                            if (_to.call && _to.call.callback) {
                                _to.call.callback.call(_to.call.thisObj, ..._to.call.params);
                            }
                            toIdx++;
                            if (toIdx >= toArg.length) {
                                // if (!props || !props.loop) {
                                // this.rmTweens(target);
                                // }
                                return tween;
                            } else {
                                tranTo();
                            }
                        }, this);
                    } else {
                        tween.to(_to.props, _to.duration, _to.ease).call(() => {
                            if (_to.call && _to.call.callback) {
                                _to.call.callback.call(_to.call.thisObj, ..._to.call.params);
                            }
                            toIdx++;
                            if (toIdx >= toArg.length) {
                                // if (!props || !props.loop) {
                                // this.rmTweens(target);
                                // }
                                return tween;
                            } else {
                                tranTo();
                            }
                        }, this);
                    }
                }

                tranTo();
            }
        }

		/**
		 * 移除缓动动画
		 * @param {egret.DisplayObject} obj 移除的对象
		 */
        public rmTweens(obj: egret.DisplayObject) {
            if (obj) {
                egret.Tween.removeTweens(obj);
            }
        }
    }
}