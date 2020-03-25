var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var util;
(function (util) {
    /**
     * 组件管理器
     */
    var ComMgr = (function () {
        function ComMgr() {
        }
        /**
         * 点击效果
         * @param {egret.DisplayObject} obj 做效果对象
         * @param {gConst.clkAimType} aimType 效果类型 0:隐藏 1:缩放
         */
        ComMgr.prototype.clickAim = function (obj, aimType, orgS) {
            if (aimType === void 0) { aimType = 1 /* SCALE */; }
            gTween.rmTweens(obj);
            switch (aimType) {
                //隐藏
                case 0 /* HIDE */:
                    var initA_1 = obj.alpha; //初始透明度
                    gTween.tween(obj, void 0, {
                        props: { alpha: 0 },
                        duration: 200,
                        call: {
                            callback: function () {
                                obj.visible = false;
                                obj.alpha = initA_1;
                            },
                            thisObj: this
                        }
                    });
                    break;
                //缩放
                case 1 /* SCALE */:
                    var orgSX = orgS && orgS.x ? orgS.x : obj.scaleX;
                    var orgSY = orgS && orgS.y ? orgS.y : obj.scaleY;
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
        };
        /**
         * 移除对象
         * @param {egret.DisplayObject|egret.DisplayObjectContainer} obj 移除的对象
         */
        ComMgr.prototype.rmObj = function (obj) {
            if (obj && obj.parent) {
                obj.parent.removeChild(obj);
            }
            return null;
        };
        /**
         * 移除所有监听
         * @param {egret.DisplayObject|egret.DisplayObjectContainer} obj 移除的对象
         */
        ComMgr.prototype.rmEvent = function (obj) {
            //移除不使用捕获的所有监听
            this.destoryEvent(obj.$getEventMap());
            //移除使用捕获的所有监听
            this.destoryEvent(obj.$getEventMap(true));
        };
        /**
         * 设置对象宽高
         * @param {eui.Image|egret.DisplayObject|egret.DisplayObjectContainer} obj 图片、显示对象、显示对象容器
         * @param {boolean} isInitParent = false 是否初始化元素父级
         */
        ComMgr.prototype.setObjSize = function (obj, isInitParent) {
            if (isInitParent === void 0) { isInitParent = false; }
            //获取资源，设置宽高
            var pic = RES.getRes(obj.source);
            if (pic) {
                obj.width = pic.textureWidth;
                obj.height = pic.textureHeight;
            }
            if (isInitParent) {
                var parent_1 = obj.parent;
                if (parent_1) {
                    parent_1.width = obj.width * obj.scaleX;
                    parent_1.height = obj.height * obj.scaleY;
                }
            }
        };
        /**
         * 设置对象锚点为中心点
         * @param {eui.Image|egret.DisplayObject|egret.DisplayObjectContainer} obj 图片、显示对象、显示对象容器
         * @param {boolean} isInitParent = false 是否初始化元素父级
         */
        ComMgr.prototype.setObjAnchor = function (obj, isInitParent) {
            if (isInitParent === void 0) { isInitParent = false; }
            this.setObjSize(obj, isInitParent);
            //获取中心点
            var halfW = obj.width / 2;
            var halfH = obj.height / 2;
            //设置锚点、位置
            obj.anchorOffsetX = halfW;
            obj.anchorOffsetY = halfH;
        };
        /**
         * 初始化元素
         * @param {egret.DisplayObject} item 初始化的元素
         * @param {boolean} isInitParent = true 是否初始化元素父级
         */
        ComMgr.prototype.setItemAnchor = function (item, isInitParent, isInitParentAnchor) {
            if (isInitParent === void 0) { isInitParent = true; }
            if (isInitParentAnchor === void 0) { isInitParentAnchor = true; }
            if (!item) {
                return;
            }
            //获取资源，设置宽高
            var pic = RES.getRes(item.source);
            if (pic) {
                item.width = pic.textureWidth;
                item.height = pic.textureHeight;
            }
            //获取中心点
            var halfW = item.width / 2;
            var halfH = item.height / 2;
            //设置锚点、位置
            item.anchorOffsetX = halfW;
            item.anchorOffsetY = halfH;
            var scaleX = Math.abs(item.scaleX);
            var scaleY = Math.abs(item.scaleY);
            if (isInitParent) {
                var parent_2 = item.parent;
                if (parent_2) {
                    parent_2.width = item.width * scaleX;
                    parent_2.height = item.height * scaleY;
                    if (isInitParentAnchor) {
                        parent_2.anchorOffsetX = item.anchorOffsetX * scaleX;
                        parent_2.anchorOffsetY = item.anchorOffsetY * scaleY;
                    }
                }
            }
            item.x = halfW * scaleX;
            item.y = halfH * scaleY;
        };
        /** 销毁 */
        ComMgr.prototype.destory = function (obj) {
            this.rmEvent(obj);
            gTween.rmTweens(obj);
            this.rmObj(obj);
            return null;
        };
        /** 渐变销毁 */
        ComMgr.prototype.fadeOutDestory = function (obj, duration, callback, thisObj) {
            var _this = this;
            if (duration === void 0) { duration = 300; }
            var arg = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                arg[_i - 4] = arguments[_i];
            }
            gTween.fadeOut(obj, duration, void 0, void 0, void 0, {
                callback: function () {
                    _this.destory(obj);
                    if (callback) {
                        callback.call.apply(callback, [thisObj].concat(arg));
                    }
                }
            });
        };
        /**
         * 移除事件映射所有监听
         * @param {any} eventMap 事件映射
         */
        ComMgr.prototype.destoryEvent = function (eventMap) {
            if (!eventMap) {
                return;
            }
            for (var type in eventMap) {
                var list = eventMap[type];
                if (!list) {
                    continue;
                }
                while (list.length) {
                    var eventBin = list.pop();
                    eventBin.target.removeEventListener(eventBin.type, eventBin.listener, eventBin.thisObject, eventBin.useCapture);
                }
            }
        };
        /**
         * 转换本地坐标
         * @param {egret.DisplayObject|egret.DisplayObjectContainer} obj 转换对象
         * @param {number} x X坐标
         * @param {number} y Y坐标
         * @param {egret.Point} pos 一个用于存储结果的可复用 Point 实例，传入此参数能够减少内部创建对象的次数，从而获得更高的运行性能。
         * @returns {egret.Point} 转换为本地坐标点
         */
        ComMgr.prototype.toLocal = function (obj, x, y, pos) {
            if (!obj) {
                return;
            }
            x = x != void 0 ? x : obj.x;
            y = y != void 0 ? y : obj.y;
            return obj.globalToLocal(x, y, pos);
        };
        /**
         * 转换舞台坐标
         * @param {egret.DisplayObject|egret.DisplayObjectContainer} obj 转换对象
         * @param {number} x X坐标
         * @param {number} y Y坐标
         * @param {egret.Point} pos 一个用于存储结果的可复用 Point 实例，传入此参数能够减少内部创建对象的次数，从而获得更高的运行性能。
         * @returns {egret.Point} 转换为舞台坐标点
         */
        ComMgr.prototype.toGlobal = function (obj, x, y, pos) {
            if (!obj) {
                return;
            }
            if (!obj.parent) {
                x = x != void 0 ? x : 0;
                y = y != void 0 ? y : 0;
                return obj.localToGlobal(x, y, pos);
            }
            else {
                x = x != void 0 ? x : obj.x;
                y = y != void 0 ? y : obj.y;
                return obj.parent.localToGlobal(x, y, pos);
            }
        };
        // [mw_shl_code=javascript,true]
        ComMgr.prototype.hitTestObj = function (obj1, obj2, diff1, diff2) {
            if (diff1 === void 0) { diff1 = { x: 0, y: 0 }; }
            if (diff2 === void 0) { diff2 = { x: 0, y: 0 }; }
            if (!obj1 || !obj2) {
                return;
            }
            var rect1 = obj1.getBounds(); //获取显示对象的测量边界
            var rect2 = obj2.getBounds();
            rect1.x = obj1.x + (diff1.x || 0);
            rect1.y = obj1.y + (diff1.y || 0);
            rect2.x = obj2.x + (diff2.x || 0);
            rect2.y = obj2.y + (diff2.y || 0);
            //此方法检查指定的 Rectangle 对象的 x、y、width 和 height 属性，以查看它是否与此 Rectangle 对象相交。
            return rect1.intersects(rect2);
        };
        return ComMgr;
    }());
    util.ComMgr = ComMgr;
    __reflect(ComMgr.prototype, "util.ComMgr");
})(util || (util = {}));
//# sourceMappingURL=ComMgr.js.map