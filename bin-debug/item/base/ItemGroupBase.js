var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var item;
(function (item) {
    /**
     * 组基础文件
     */
    var ItemGroupBase = (function (_super) {
        __extends(ItemGroupBase, _super);
        function ItemGroupBase() {
            var _this = _super.call(this) || this;
            _this.init();
            return _this;
        }
        /** 初始化 */
        ItemGroupBase.prototype.init = function () {
            // this.pixelHitTest = true;
            this.initScaleX = this.scaleX;
            this.initScaleY = this.scaleY;
        };
        /** 设置or获取ID */
        ItemGroupBase.prototype.id = function (id) {
            if (id != void 0) {
                this._id = id;
            }
            else {
                return this._id;
            }
        };
        /** 设置or获取关卡ID */
        ItemGroupBase.prototype.passId = function (passId) {
            if (passId != void 0) {
                this._passId = passId;
            }
            else {
                return this._passId;
            }
        };
        /** 设置or获取当前项ID */
        ItemGroupBase.prototype.itemId = function (itemId) {
            if (itemId != void 0) {
                this._itemId = itemId;
            }
            else {
                return this._itemId;
            }
        };
        /** 设置or获取当前关联项ID */
        ItemGroupBase.prototype.relateId = function (relateId) {
            if (relateId != void 0) {
                this._relateId = relateId;
            }
            else {
                return this._relateId;
            }
        };
        /** 设置or获取当前项是否完成 */
        ItemGroupBase.prototype.finish = function (finish) {
            if (finish != void 0) {
                this._finish = finish;
            }
            else {
                return this._finish;
            }
        };
        /** 设置or获取对应指引方向 */
        ItemGroupBase.prototype.guideDir = function (guideDir) {
            if (guideDir != void 0) {
                this._guideDir = guideDir;
            }
            else {
                return this._guideDir;
            }
        };
        /** 设置or获取当前等级 */
        ItemGroupBase.prototype.level = function (level) {
            if (level != void 0) {
                this._level = level;
            }
            else {
                return this._level;
            }
        };
        /** 设置or获取是否已触发 */
        ItemGroupBase.prototype.triggered = function (triggered) {
            if (triggered != void 0) {
                this._triggered = triggered;
            }
            else {
                return this._triggered;
            }
        };
        return ItemGroupBase;
    }(eui.Group));
    item.ItemGroupBase = ItemGroupBase;
    __reflect(ItemGroupBase.prototype, "item.ItemGroupBase");
})(item || (item = {}));
//# sourceMappingURL=ItemGroupBase.js.map