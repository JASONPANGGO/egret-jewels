var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var util;
(function (util) {
    /**
     * 摄像机管理器
     */
    var CameraMgr = (function () {
        function CameraMgr(scene) {
            this.partScale = 1;
            this.scene = scene;
            this.init();
        }
        CameraMgr.prototype.init = function () {
            var initS = this.scene.scaleX;
            this.scene.width = this.scene.width * initS;
            this.scene.height = this.scene.height * initS;
            this.scene.scaleX = this.scene.scaleY = 1;
        };
        //设置镜头看的位置
        CameraMgr.prototype.setLookPot = function (pot) {
            if (!pot) {
                return;
            }
            if (!this.lookPot) {
                this.lookPot = {};
            }
            this.lookPot.x = pot.x;
            this.lookPot.y = pot.y;
        };
        CameraMgr.prototype.upBaseScale = function () {
            var s1 = GameMgr.gameScene.width / 1334 /* HEIGHT */;
            var s2 = GameMgr.gameScene.height / 1334 /* HEIGHT */;
            this.baseScale = Math.max(s1, s2);
        };
        /**
         * 检查摄像机缩放值
         */
        CameraMgr.prototype.checkCameraScale = function (scale) {
            var _scale;
            if (scale == void 0) {
                _scale = 1 /*this.baseScale*/ * this.partScale;
            }
            else {
                _scale = 1 /*this.baseScale*/ * scale;
                this.partScale = scale;
            }
            return _scale;
        };
        /**
         * 检查摄像机所看点
         */
        CameraMgr.prototype.checkCameraPot = function (pot) {
            var _x;
            var _y;
            if (!pot) {
                if (!this.lookPot) {
                    return;
                }
                _x = this.lookPot.x;
                _y = this.lookPot.y;
            }
            else {
                _x = pot.x;
                _y = pot.y;
            }
            return { x: _x, y: _y };
        };
        /**
         * 摄像机所看点转换成的X、Y
         */
        CameraMgr.prototype.tranCameraLoc = function (pot, scale) {
            pot = this.checkCameraPot(pot);
            if (!pot) {
                return;
            }
            var _scale = this.checkCameraScale(scale);
            var parent = this.scene.parent;
            var locX = parent.width / 2 - pot.x * _scale;
            var locY = parent.height / 2 - pot.y * _scale;
            var pParent = parent.parent || GameMgr.gameScene;
            //X边界
            var maxX = (parent.width * parent.scaleX - pParent.width) / 2;
            if (locX > maxX) {
                locX = maxX;
            }
            else {
                var minX = pParent.width - this.scene.width * _scale * parent.scaleX; // Math.max(parent.scaleX, 1);
                if (locX < minX) {
                    locX = minX;
                }
            }
            //Y边界
            var maxY = (parent.height * parent.scaleY - pParent.height) / 2;
            if (locY > maxY) {
                locY = maxY;
            }
            else {
                // const minY: number = parent.height * parent.scaleY - this.scene.height * _scale * this.scene.scaleY;
                var minY = pParent.height - this.scene.height * _scale * parent.scaleY; // * Math.max(parent.scaleY, 1);
                if (locY < minY) {
                    locY = minY;
                }
            }
            return { x: locX, y: locY };
        };
        /**
         * 更新摄像机
         */
        CameraMgr.prototype.upCamera = function (isAni, pot, scale, callBack, callThis) {
            if (isAni === void 0) { isAni = true; }
            var callArg = [];
            for (var _i = 5; _i < arguments.length; _i++) {
                callArg[_i - 5] = arguments[_i];
            }
            pot = this.checkCameraPot(pot);
            if (!pot) {
                return;
            }
            this.setLookPot(pot);
            var _scale = this.checkCameraScale(scale);
            this.upBaseScale();
            var locXY = this.tranCameraLoc(pot, scale);
            //看的位置居中！
            if (isAni) {
                gTween.tween(this.scene, void 0, {
                    props: {
                        x: locXY.x,
                        y: locXY.y,
                        scaleX: _scale,
                        scaleY: _scale
                    }, duration: 500,
                    call: {
                        callback: function () {
                            if (callBack) {
                                callBack.call.apply(callBack, [callThis].concat(callArg));
                            }
                        }
                    }
                });
            }
            else {
                this.scene.x = locXY.x;
                this.scene.y = locXY.y;
                this.scene.scaleX = _scale;
                this.scene.scaleY = _scale;
            }
        };
        return CameraMgr;
    }());
    util.CameraMgr = CameraMgr;
    __reflect(CameraMgr.prototype, "util.CameraMgr");
})(util || (util = {}));
//# sourceMappingURL=CameraMgr.js.map