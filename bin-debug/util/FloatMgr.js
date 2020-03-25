var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var util;
(function (util) {
    /**
     * 漂浮物管理器
     */
    var FloatMgr = (function () {
        function FloatMgr(con) {
            this._floatPool = []; //漂浮物对象池
            this._curAllFloats = []; //当前漂浮物群
            this.con = con;
        }
        FloatMgr.prototype.update = function (timeStamp) {
            this.addFloat();
            this.checkFloat();
            this.moveFloat();
            return;
        };
        /**
         * 显示漂浮物
         * @param {...} cfg 漂浮物数据
         */
        FloatMgr.prototype.show = function (cfg) {
            if (!this.data) {
                this.data = new data.FloatData();
            }
            this.data.setData(cfg);
            this.isShowed = true;
            egret.startTick(this.update, this);
        };
        /**
         * 更新漂浮物数据
         * @param {...} cfg 漂浮物数据
         * @param {boolean} isInitDefault = true 是否初始化默认值
         */
        FloatMgr.prototype.updateData = function (cfg, isInitDefault) {
            if (isInitDefault === void 0) { isInitDefault = true; }
            if (!this.data) {
                this.data = new data.FloatData();
            }
            this.data.updateData(cfg, isInitDefault);
        };
        /**
         * 隐藏漂浮物
         * @param {boolean} clearAll = true 是否清除所有
         */
        FloatMgr.prototype.hide = function (clearAll) {
            if (clearAll === void 0) { clearAll = true; }
            egret.stopTick(this.update, this);
            this.isShowed = false;
            if (clearAll) {
                var i = 0;
                var _curAllFloats = this._curAllFloats;
                var star = _curAllFloats.length > i ? _curAllFloats[i] : null;
                while (star) {
                    this.removeFloat(star);
                    star = _curAllFloats.length > i ? _curAllFloats[i] : null;
                }
            }
        };
        FloatMgr.prototype.addFloat = function () {
            if (this._curAllFloats.length >= this.data.floatMaxCnt) {
                return;
            }
            var float;
            if (this._floatPool && this._floatPool.length > 0) {
                float = this._floatPool.pop();
            }
            else {
                float = new com.ComFloat();
            }
            this.con.addChildAt(float, 0);
            float.open(this.data);
            //初始化漂浮物出生方向、角度
            var dire = gMath.getRandomAnswer.apply(gMath, this.data.dires); //出生方向
            float.dire(dire);
            var anchorX = float.anchorOffsetX;
            var anchorY = float.anchorOffsetY;
            var parentW = this.con.width;
            var parentH = this.con.height;
            switch (dire) {
                //上
                case gConst.direction.CENTER_TOP:
                    float.x = gMath.getRandomInteger(parentW + anchorX, -anchorX);
                    float.y = -anchorY;
                    break;
                //下
                case gConst.direction.CENTER_BOTTOM:
                    float.x = gMath.getRandomInteger(parentW + anchorX, -anchorX);
                    float.y = parentH + anchorY;
                    break;
                //左
                case gConst.direction.LEFT_CENTER:
                    float.x = -anchorX;
                    float.y = gMath.getRandomInteger(parentH + anchorY, -anchorY);
                    break;
                //右
                case gConst.direction.RIGHT_CENTER:
                    float.x = parentW + anchorX;
                    float.y = gMath.getRandomInteger(parentH + anchorY, -anchorY);
                    break;
            }
            this._curAllFloats.push(float);
        };
        FloatMgr.prototype.removeFloat = function (float) {
            gTween.rmTweens(float);
            gComMgr.rmObj(float);
            gDevelop.arrDelVal(this._curAllFloats, float);
            this._floatPool.push(float);
        };
        FloatMgr.prototype.checkFloat = function () {
            var parentW = this.con.width;
            var parentH = this.con.height;
            var excSpace = 10; //飞出多少距离
            for (var i = 0; i < this._curAllFloats.length;) {
                var float = this._curAllFloats[i];
                var anchorX = float.anchorOffsetX;
                var anchorY = float.anchorOffsetY;
                var isOut = void 0; //是否游出边界
                var dire = float.dire();
                switch (dire) {
                    //上
                    case gConst.direction.CENTER_TOP:
                        isOut = float.y >= parentH + anchorY + excSpace;
                        break;
                    //下
                    case gConst.direction.CENTER_BOTTOM:
                        isOut = float.y <= -anchorY - excSpace;
                        break;
                    //左
                    case gConst.direction.LEFT_CENTER:
                        isOut = float.x >= parentW + anchorX + excSpace;
                        break;
                    //右
                    case gConst.direction.RIGHT_CENTER:
                        isOut = float.x <= -anchorX - excSpace;
                        break;
                }
                if (isOut) {
                    float.die(null);
                    float.destroy();
                    this._curAllFloats.splice(i, 1);
                    this._floatPool.push(float);
                }
                else {
                    i++;
                }
            }
        };
        FloatMgr.prototype.moveFloat = function () {
            var speedExceed = 3; //速度超过多少时使用缓动
            var moveX = function (speed, float, diffMove) {
                if (speed > speedExceed) {
                    gTween.toMoveX(float, diffMove, 60);
                }
                else {
                    float.x = diffMove;
                }
            };
            var moveY = function (speed, float, diffMove) {
                if (speed > speedExceed) {
                    gTween.toMoveY(float, diffMove, 60);
                }
                else {
                    float.y = diffMove;
                }
            };
            for (var _i = 0, _a = this._curAllFloats; _i < _a.length; _i++) {
                var float = _a[_i];
                if (!float.die()) {
                    var speed = float.speed();
                    var diffMove = void 0;
                    var dire = float.dire();
                    switch (dire) {
                        //上
                        case gConst.direction.CENTER_TOP:
                            diffMove = float.y + speed;
                            moveY.call(this, speed, float, diffMove);
                            break;
                        //下
                        case gConst.direction.CENTER_BOTTOM:
                            diffMove = float.y - speed;
                            moveY.call(this, speed, float, diffMove);
                            break;
                        //左
                        case gConst.direction.LEFT_CENTER:
                            diffMove = float.x + speed;
                            moveX.call(this, speed, float, diffMove);
                            break;
                        //右
                        case gConst.direction.RIGHT_CENTER:
                            diffMove = float.x - speed;
                            moveX.call(this, speed, float, diffMove);
                            break;
                    }
                }
            }
        };
        return FloatMgr;
    }());
    util.FloatMgr = FloatMgr;
    __reflect(FloatMgr.prototype, "util.FloatMgr");
})(util || (util = {}));
//# sourceMappingURL=FloatMgr.js.map