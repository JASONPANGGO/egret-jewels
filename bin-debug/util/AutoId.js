var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var util;
(function (util) {
    /**
     * 自动生成ID
     */
    var AutoId = (function () {
        function AutoId() {
            this.newId = 0;
        }
        Object.defineProperty(AutoId.prototype, "id", {
            get: function () {
                this.newId++;
                return this.newId;
            },
            enumerable: true,
            configurable: true
        });
        return AutoId;
    }());
    util.AutoId = AutoId;
    __reflect(AutoId.prototype, "util.AutoId");
})(util || (util = {}));
//# sourceMappingURL=AutoId.js.map