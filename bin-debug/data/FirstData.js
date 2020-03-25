var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var data;
(function (data) {
    /**
     * 顶层页面数据
     */
    var FirstData = (function () {
        function FirstData() {
            this.init();
        }
        FirstData.prototype.init = function () {
            this.horizontal = { x: 0, y: 0 }; //横屏位置
            this.vertical = { x: 0, y: 0 }; //竖屏位置
            this.topSpace = .03; //上间距
            this.rightSpace = 0; //右间距
            this.bottomSpace = .001; //下间距
            this.leftSpace = .01; //左间距
            this.horRatio = 20; //横屏占比(%) (有赋值时使用占比适配)
            this.verRatio = null; //竖屏占比(%) (有赋值时使用占比适配)
            this.horSpace = null; //logo与btn横屏间距
            this.verSpace = null; //logo与btn竖屏间距
            this.center = null; //中间布局
            this.centerOffset = null; //中间布局偏移
            this.scale = 1; //缩放值
        };
        return FirstData;
    }());
    data.FirstData = FirstData;
    __reflect(FirstData.prototype, "data.FirstData");
})(data || (data = {}));
//# sourceMappingURL=FirstData.js.map