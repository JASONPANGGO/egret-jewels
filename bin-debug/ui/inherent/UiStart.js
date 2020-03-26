var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ui;
(function (ui) {
    /**
     * 教程画面
     */
    var UiStart = (function (_super) {
        __extends(UiStart, _super);
        function UiStart() {
            var _this = _super.call(this) || this;
            _this.game = [];
            _this.gameSize = 5;
            _this.skinName = skins.UiStart;
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args open()传参会通过init()传过去
         */
        UiStart.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // console.info("init", ...args);
        };
        /** 首次打开界面时调用 */
        UiStart.prototype.load = function () {
            // console.info("load");
        };
        /** 每次打开界面都会调用 */
        UiStart.prototype.start = function () {
            // console.info("start");
            GameMgr.gameScene.setChildIndex(this, -1);
            this.initGame();
            this.showGuide();
        };
        /** 每次结束界面都会调用 */
        UiStart.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听界面，每帧都会调用 */
        UiStart.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        UiStart.prototype.addEvent = function () {
            // console.info("addEvent");
        };
        /** 移除事件 */
        UiStart.prototype.removeEvent = function () {
            // console.info("removeEvent");
        };
        /** 窗口大小改变时调用 */
        UiStart.prototype.resizeView = function () {
            // console.info("resizeView", this.width, this.height);
            // var s1: number = this.width / this.con.width;
            // var s2: number = this.height / this.con.height;
            // this.con.scaleX = this.con.scaleY = Math.max(s1, s2);
            this.black_bg.width = this.width;
            this.black_bg.height = this.height;
            if (this.screenType == 1 /* VERTICAL */) {
                //竖屏
                switch (this.mobileType) {
                    //iPhoneX或以上
                    case 1 /* IPHONE_X */:
                        break;
                    //iPhone8或以下
                    case 2 /* IPHONE_8 */:
                        break;
                    //iPad或其它
                    case 3 /* IPAD */:
                        break;
                }
            }
            else {
                //横屏
                switch (this.mobileType) {
                    //iPhoneX或以上
                    case 1 /* IPHONE_X */:
                        break;
                    //iPhone8或以下
                    case 2 /* IPHONE_8 */:
                        break;
                    //iPad或其它
                    case 3 /* IPAD */:
                        break;
                }
            }
        };
        /** 屏幕横竖屏转换时调用 */
        UiStart.prototype.rotateView = function () {
            // console.info("rotateView", this.screenType);
            if (this.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        UiStart.prototype.getXY = function (collumn, row) {
            return {
                x: collumn * gConst.gridSize.WIDTH + 0.5 * gConst.gridSize.WIDTH,
                y: row * gConst.gridSize.WIDTH + 0.5 * gConst.gridSize.WIDTH + gConst.gridSize.HEIGHT - gConst.gridSize.WIDTH
            };
        };
        UiStart.prototype.initGame = function () {
            this.grid = gConst.game0;
            for (var collumn = 0; collumn < this.gameSize; collumn++) {
                this.game.push([]);
                for (var row = 0; row < this.gameSize; row++) {
                    var comGrid = new com.ComGrid();
                    comGrid.open(this.grid[collumn].shift());
                    var gridXY = this.getXY(collumn, row);
                    comGrid.x = gridXY.x;
                    comGrid.y = this.main_con.height - gridXY.y;
                    this.game[collumn].push(comGrid);
                    this.main_con.addChild(comGrid);
                }
            }
            console.log(this.grid);
        };
        /** 显示引导 */
        UiStart.prototype.showGuide = function () {
            var _this = this;
            if (GameMgr.isEnd) {
                return;
            }
            if (this.showGuided) {
                return;
            }
            this.showGuided = true;
            if (!this.guide) {
                this.guide = new com.ComGuide();
                this.guide.open();
            }
            this.guide.setData(1000, { target1: this.game[1][1] }, this.main_con, {
                pressT: 500,
                liftT: 500
            });
            this.guide.play();
            egret.setTimeout(function () {
                _this.guide.over();
            }, this, 2000);
            egret.setTimeout(function () {
                _this.guideHit();
            }, this, 1500);
        };
        UiStart.prototype.guideHit = function () {
            this.hitGrid(1, 1);
            // this.game[2][1].hit()
        };
        // private gridsToHit: Array<Array<com.ComGrid | any>> = []
        UiStart.prototype.hitGrid = function (gridCollumn, gridRow) {
            var result = this.find(this.game, gridCollumn, gridRow);
            console.log(result);
            if (result)
                this.gridBreak(result.toBreak, result.prop);
            // this.game[gridCollumn][gridRow].hit()
            // this.game[gridCollumn][gridRow] = 0
        };
        UiStart.prototype.find = function (arr, x, y) {
            if (arr === void 0) { arr = []; }
            var count = 0;
            var targetValue;
            var toBreak = [];
            var found = [];
            deepFind(x, y);
            function deepFind(x, y) {
                console.log(toBreak);
                if (x >= arr.length || y >= arr[x].length)
                    return;
                if (!targetValue)
                    targetValue = arr[x][y].jewelIndex;
                for (var i = 0; i < found.length; i++) {
                    if (found[i].x === x && found[i].y === y)
                        return;
                }
                found.push({
                    x: x,
                    y: y
                });
                if (targetValue !== arr[x][y].jewelIndex)
                    return;
                else {
                    count++;
                    toBreak.push(arr[x][y]);
                    arr[x][y] = 0;
                    if (x - 1 >= 0)
                        deepFind(x - 1, y);
                    if (x + 1 < arr.length)
                        deepFind(x + 1, y);
                    if (y - 1 >= 0)
                        deepFind(x, y - 1);
                    if (y + 1 < arr[x].length)
                        deepFind(x, y + 1);
                }
            }
            if (count >= 9)
                return { prop: 'START', toBreak: toBreak };
            if (count >= 7)
                return { prop: 'BOMB', toBreak: toBreak };
            if (count >= 5)
                return { prop: 'ROCKET', toBreak: toBreak };
            if (count > 1)
                return { toBreak: toBreak };
            else
                return;
        };
        UiStart.prototype.gridBreak = function (arr, prop) {
            arr.forEach(function (grid) {
                grid.hit(prop);
            });
        };
        /** 隐藏引导 */
        UiStart.prototype.hideGuide = function () {
            if (!this.guide) {
                return;
            }
            if (!this.showGuided) {
                return;
            }
            this.showGuided = false;
            this.guide.over();
        };
        return UiStart;
    }(ui.UiFile));
    ui.UiStart = UiStart;
    __reflect(UiStart.prototype, "ui.UiStart");
})(ui || (ui = {}));
//# sourceMappingURL=UiStart.js.map