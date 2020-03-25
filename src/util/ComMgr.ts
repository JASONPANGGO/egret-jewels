namespace util {
    /**
     * 组件管理器
     */
    export class ComMgr {

        public constructor() {

        }

		/**
		 * 点击效果
		 * @param {egret.DisplayObject} obj 做效果对象
		 * @param {gConst.clkAimType} aimType 效果类型 0:隐藏 1:缩放
		 */
        public clickAim(obj: egret.DisplayObject, aimType: gConst.clkAimType = gConst.clkAimType.SCALE, orgS?: { x: number, y: number }) {
            gTween.rmTweens(obj);
            switch (aimType) {
                //隐藏
                case gConst.clkAimType.HIDE:
                    let initA: number = obj.alpha; //初始透明度
                    gTween.tween(obj, void 0, {
                        props: { alpha: 0 },
                        duration: 200,
                        call: {
                            callback: () => {
                                obj.visible = false;
                                obj.alpha = initA;
                            },
                            thisObj: this
                        }
                    });
                    break;
                //缩放
                case gConst.clkAimType.SCALE:
                    let orgSX: number = orgS && orgS.x ? orgS.x : obj.scaleX;
                    let orgSY: number = orgS && orgS.y ? orgS.y : obj.scaleY;
                    // gTween.tween(obj, void 0, {
                    //     props: { scaleX: orgSX * 0.85, scaleY: orgSY * 0.85 },
                    //     duration: 200
                    // }, {
                    //         props: { scaleX: orgSX, scaleY: orgSY },
                    //         duration: 200
                    //     }
                    // );
                    egret.Tween.get(obj).to({ scaleX: orgSX * 0.85, scaleY: orgSY * 0.85 }, 200).to({ scaleX: orgSX, scaleY: orgSY }, 200);

                    // gTween.loopScale(obj, 0.8, 200, obj.scaleX);
                    break;
            }
        }

		/**
		 * 移除对象
		 * @param {egret.DisplayObject|egret.DisplayObjectContainer} obj 移除的对象
		 */
        public rmObj(obj: egret.DisplayObject | egret.DisplayObjectContainer): null {
            if (obj && obj.parent) {
                obj.parent.removeChild(obj);
            }
            return null;
        }

        /**
         * 移除所有监听
		 * @param {egret.DisplayObject|egret.DisplayObjectContainer} obj 移除的对象
         */
        public rmEvent(obj: egret.DisplayObject | egret.DisplayObjectContainer) {
            //移除不使用捕获的所有监听
            this.destoryEvent(obj.$getEventMap());
            //移除使用捕获的所有监听
            this.destoryEvent(obj.$getEventMap(true));
        }

        /**
         * 设置对象宽高
		 * @param {eui.Image|egret.DisplayObject|egret.DisplayObjectContainer} obj 图片、显示对象、显示对象容器
		 * @param {boolean} isInitParent = false 是否初始化元素父级
		 */
        public setObjSize(obj: eui.Image | egret.DisplayObject | egret.DisplayObjectContainer, isInitParent: boolean = false) {
            //获取资源，设置宽高
            const pic: egret.Texture = RES.getRes((obj as eui.Image).source as string);
            if (pic) {
                obj.width = pic.textureWidth;
                obj.height = pic.textureHeight;
            }
            if (isInitParent) {
                const parent = obj.parent;
                if (parent) {
                    parent.width = obj.width * obj.scaleX;
                    parent.height = obj.height * obj.scaleY;
                }
            }
        }

        /**
         * 设置对象锚点为中心点
		 * @param {eui.Image|egret.DisplayObject|egret.DisplayObjectContainer} obj 图片、显示对象、显示对象容器
		 * @param {boolean} isInitParent = false 是否初始化元素父级
		 */
        public setObjAnchor(obj: eui.Image | egret.DisplayObject | egret.DisplayObjectContainer, isInitParent: boolean = false) {
            this.setObjSize(obj, isInitParent);
            //获取中心点
            const halfW: number = obj.width / 2;
            const halfH: number = obj.height / 2;
            //设置锚点、位置
            obj.anchorOffsetX = halfW;
            obj.anchorOffsetY = halfH;
        }

		/**
		 * 初始化元素
		 * @param {egret.DisplayObject} item 初始化的元素
		 * @param {boolean} isInitParent = true 是否初始化元素父级
		 */
        public setItemAnchor(item: eui.Image | egret.DisplayObject | egret.DisplayObjectContainer, isInitParent: boolean = true, isInitParentAnchor: boolean = true) {
            if (!item) {
                return;
            }
            //获取资源，设置宽高
            const pic: egret.Texture = RES.getRes((item as eui.Image).source as string);
            if (pic) {
                item.width = pic.textureWidth;
                item.height = pic.textureHeight;
            }
            //获取中心点
            const halfW: number = item.width / 2;
            const halfH: number = item.height / 2;
            //设置锚点、位置
            item.anchorOffsetX = halfW;
            item.anchorOffsetY = halfH;

            const scaleX = Math.abs(item.scaleX);
            const scaleY = Math.abs(item.scaleY);

            if (isInitParent) {
                const parent = item.parent;
                if (parent) {
                    parent.width = item.width * scaleX;
                    parent.height = item.height * scaleY;
                    if (isInitParentAnchor) {
                        parent.anchorOffsetX = item.anchorOffsetX * scaleX;
                        parent.anchorOffsetY = item.anchorOffsetY * scaleY;
                    }
                }
            }

            item.x = halfW * scaleX;
            item.y = halfH * scaleY;
        }

        /** 销毁 */
        public destory(obj: egret.DisplayObject | egret.DisplayObjectContainer): null {
            this.rmEvent(obj);
            gTween.rmTweens(obj);
            this.rmObj(obj);
            return null;
        }

        /** 渐变销毁 */
        public fadeOutDestory(obj: egret.DisplayObject | egret.DisplayObjectContainer, duration: number = 300, callback?: Function, thisObj?: any, ...arg: any[]) {
            gTween.fadeOut(obj, duration, void 0, void 0, void 0, {
                callback: () => {
                    this.destory(obj);
                    if (callback) {
                        callback.call(thisObj, ...arg);
                    }
                }
            });
        }

        /**
         * 移除事件映射所有监听
         * @param {any} eventMap 事件映射
         */
        private destoryEvent(eventMap: any) {
            if (!eventMap) {
                return;
            }
            for (let type in eventMap) {
                const list: { type: string, listener: Function, thisObject: any, useCapture?: boolean, target: any }[] = eventMap[type];
                if (!list) {
                    continue;
                }
                while (list.length) {
                    var eventBin = list.pop();
                    eventBin.target.removeEventListener(eventBin.type, eventBin.listener, eventBin.thisObject, eventBin.useCapture);
                }
            }
        }

        /**
         * 转换本地坐标
         * @param {egret.DisplayObject|egret.DisplayObjectContainer} obj 转换对象
         * @param {number} x X坐标
         * @param {number} y Y坐标
         * @param {egret.Point} pos 一个用于存储结果的可复用 Point 实例，传入此参数能够减少内部创建对象的次数，从而获得更高的运行性能。
         * @returns {egret.Point} 转换为本地坐标点
         */
        toLocal(obj: egret.DisplayObject | egret.DisplayObjectContainer, x?: number, y?: number, pos?: egret.Point): egret.Point {
            if (!obj) {
                return;
            }
            x = x != void 0 ? x : obj.x;
            y = y != void 0 ? y : obj.y;
            return obj.globalToLocal(x, y, pos);
        }

        /**
         * 转换舞台坐标
         * @param {egret.DisplayObject|egret.DisplayObjectContainer} obj 转换对象
         * @param {number} x X坐标
         * @param {number} y Y坐标
         * @param {egret.Point} pos 一个用于存储结果的可复用 Point 实例，传入此参数能够减少内部创建对象的次数，从而获得更高的运行性能。
         * @returns {egret.Point} 转换为舞台坐标点
         */
        toGlobal(obj: egret.DisplayObject | egret.DisplayObjectContainer, x?: number, y?: number, pos?: egret.Point): egret.Point {
            if (!obj) {
                return;
            }
            if (!obj.parent) {
                x = x != void 0 ? x : 0;
                y = y != void 0 ? y : 0;
                return obj.localToGlobal(x, y, pos);
            } else {
                x = x != void 0 ? x : obj.x;
                y = y != void 0 ? y : obj.y;
                return obj.parent.localToGlobal(x, y, pos);
            }
        }

        // [mw_shl_code=javascript,true]
        public hitTestObj(obj1: egret.DisplayObject, obj2: egret.DisplayObject, diff1: { x?: number, y?: number } = { x: 0, y: 0 }, diff2: { x?: number, y?: number } = { x: 0, y: 0 }): boolean {
            if (!obj1 || !obj2) {
                return;
            }
            const rect1: egret.Rectangle = obj1.getBounds();//获取显示对象的测量边界
            const rect2: egret.Rectangle = obj2.getBounds();
            rect1.x = obj1.x + (diff1.x || 0);
            rect1.y = obj1.y + (diff1.y || 0);
            rect2.x = obj2.x + (diff2.x || 0);
            rect2.y = obj2.y + (diff2.y || 0);
            //此方法检查指定的 Rectangle 对象的 x、y、width 和 height 属性，以查看它是否与此 Rectangle 对象相交。
            return rect1.intersects(rect2);
        }
        // [/mw_shl_code]
    }
}