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
            /* =========== 框架结构代码-end =========== */
            /* =========== 业务代码-start =========== */
            _this.guideGrid = { collumn: 2, row: 1 };
            _this.isEnd = false;
            _this.game = [];
            _this.gameSize = 5;
            // 当前动作还剩余的要移动的方块数量
            _this.gridToMoveNum = 0;
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
            this.enter();
            this.initGame(this.game, gConst.game0);
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
            this.con.addEventListener(egret.TouchEvent.TOUCH_TAP, this.exit, this);
        };
        /** 移除事件 */
        UiStart.prototype.removeEvent = function () {
            // console.info("removeEvent");
            this.con.addEventListener(egret.TouchEvent.TOUCH_TAP, this.exit, this);
        };
        /** 窗口大小改变时调用 */
        UiStart.prototype.resizeView = function () {
            // console.info("resizeView", this.width, this.height);
            // var s1: number = this.width / this.con.width;
            // var s2: number = this.height / this.con.height;
            // this.con.scaleX = this.con.scaleY = Math.max(s1, s2);
            this.black_bg.width = this.width;
            this.black_bg.height = this.height;
            this.con.y = 0.5 * this.height;
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
        // 引导手击中方块
        UiStart.prototype.guideHit = function () {
            this.hitGrid(this.guideGrid.collumn, this.guideGrid.row);
        };
        UiStart.prototype.enter = function () {
            var _this = this;
            gTween.toTopShow(this.con, 800, .5 * this.height, void 0, void 0, egret.Ease.elasticOut, void 0, {
                callback: function () {
                    _this.showGuide();
                }
            });
        };
        UiStart.prototype.exit = function () {
            var _this = this;
            if (this.isEnd)
                return;
            this.isEnd = true;
            gTween.fadeOut(this.black_bg, 300);
            gTween.toBottomHide(this.con, 500, 0.5 * this.height, void 0, void 0, void 0, void 0, {
                callback: function () {
                    _this.close();
                    GameMgr.gameScene.loadGame();
                }
            });
        };
        /**
         * 通过方块的逻辑坐标获取容器中的位置坐标X和Y
         * @param {number} collumn 逻辑坐标X
         * @param {number} row 逻辑坐标Y
         */
        UiStart.prototype.getXY = function (collumn, row) {
            return {
                x: this.getX(collumn),
                y: this.getY(row)
            };
        };
        /**
         * 通过方块的逻辑坐标获取容器中的位置坐标Y
         * @param {number} row 逻辑坐标Y
         */
        UiStart.prototype.getY = function (row) {
            return this.main_con.height - row * gConst.gridSize.WIDTH + 0.5 * gConst.gridSize.WIDTH - gConst.gridSize.HEIGHT;
        };
        /**
         * 通过方块的逻辑坐标获取容器中的位置坐标X
         * @param {number} collumn 逻辑坐标X
         */
        UiStart.prototype.getX = function (collumn) {
            return collumn * gConst.gridSize.WIDTH + 0.5 * gConst.gridSize.WIDTH;
        };
        // 初始化游戏方格矩阵
        UiStart.prototype.initGame = function (game, gameGrid) {
            this.grid = gameGrid;
            for (var collumn = 0; collumn < this.gameSize; collumn++) {
                game.push([]);
                for (var row = 0; row < this.gameSize; row++) {
                    var comGrid = new com.ComGrid();
                    comGrid.open(this.grid[collumn].shift(), collumn, row);
                    var gridXY = this.getXY(collumn, row);
                    comGrid.setPos(gridXY.x, gridXY.y);
                    game[collumn].push(comGrid);
                    this.main_con.addChild(comGrid);
                }
            }
            this.deepSetProp(game);
        };
        UiStart.prototype.deepSetProp = function (game) {
            var foundGrid = [];
            for (var collumn = 0; collumn < game.length; collumn++) {
                var _loop_1 = function (row) {
                    if (!this_1.isFound(foundGrid, com, row)) {
                        var sameGridXY = this_1.find(game, collumn, row);
                        var prop_1 = this_1.getProp(sameGridXY.length);
                        if (prop_1) {
                            var sameGrid = this_1.transferToGrid(sameGridXY, game);
                            sameGrid.forEach(function (grid) {
                                grid.setProp(prop_1);
                            });
                        }
                        foundGrid.concat(sameGridXY);
                    }
                };
                var this_1 = this;
                for (var row = 0; row < game[collumn].length; row++) {
                    _loop_1(row);
                }
            }
        };
        UiStart.prototype.isFound = function (arr, x, y) {
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var p = arr_1[_i];
                if (p.x === x && p.y === y)
                    return true;
            }
            return false;
        };
        /**
         * 击中方块的处理，获取将要破碎的方块
         * @param {number} gridCollumn 被点击的方块逻辑坐标Collum
         * @param {number} gridRow 被点击的方块逻辑坐标Row
         */
        UiStart.prototype.hitGrid = function (gridCollumn, gridRow) {
            var toBreak = this.find(this.game, gridCollumn, gridRow);
            this.gridBreak(this.game, toBreak);
        };
        UiStart.prototype.transferToGrid = function (arr, game) {
            return arr.map(function (p) { return game[p.x][p.y]; });
        };
        /**
         * 从一个点递归搜索与之相邻相同方块
         * @param {Array} arr 当前的游戏方块矩阵
         * @param {number} x 被点击的方块逻辑坐标x (collumn)
         * @param {number} y 被点击的方块逻辑坐标y (row)
         */
        UiStart.prototype.find = function (arr, x, y) {
            if (arr === void 0) { arr = []; }
            var count = 0;
            var targetValue;
            var sameGrid = [];
            var found = [];
            deepFind(x, y);
            function deepFind(x, y) {
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
                    sameGrid.push({
                        x: x,
                        y: y
                    });
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
            return sameGrid;
        };
        /**
         * 方块破碎并更新方块矩阵
         * @param {Array} toBreak 将要被击碎的方块的显示对象数组
         */
        UiStart.prototype.gridBreak = function (game, toBreak) {
            var gridToBreak = this.transferToGrid(toBreak, this.game);
            gridToBreak.forEach(function (grid, i) {
                grid.hit();
                game[toBreak[i].x][toBreak[i].y] = 0; // 矩阵元素赋值为0标记为已破碎
            });
            this.updateGrid(this.game);
        };
        /**
         * 根据要破碎的方块数获取功能属性
         * @param {number} toBreakNum 将要被击碎的方块的数量
         */
        UiStart.prototype.getProp = function (toBreakNum) {
            if (toBreakNum >= 9)
                return 'STAR';
            if (toBreakNum >= 7)
                return 'BOMB';
            if (toBreakNum >= 5)
                return 'ROCKET';
            else
                return '';
        };
        /**
         * 填补破碎后的矩阵
         * @param {Array} game 当前的游戏方块矩阵
        */
        UiStart.prototype.updateGrid = function (game) {
            for (var collumn = 0; collumn < game.length; collumn++) {
                var row = 0;
                var toFillIndex = []; // 需要填充的索引
                var moveGridDelay = 0; // 跌落延迟，造成错落效果
                while (row < game[collumn].length) {
                    if (game[collumn][row] !== 0) {
                        if (toFillIndex.length > 0) {
                            var toRow = toFillIndex.shift();
                            game[collumn][toRow] = game[collumn][row]; // 矩阵移动
                            moveGridDelay += 50;
                            this.moveGrid(game[collumn][row], { collumn: collumn, row: row }, { collumn: collumn, row: toRow }, moveGridDelay); // 移动的动画
                            game[collumn][row] = 0;
                            toFillIndex.push(row);
                        }
                    }
                    else {
                        toFillIndex.push(row);
                    }
                    row++;
                }
                for (var fillRow = 0; fillRow < toFillIndex.length; fillRow++) {
                    var newGrid = new com.ComGrid();
                    newGrid.open(this.grid[collumn][fillRow]);
                    newGrid.x = this.getX(collumn);
                    newGrid.y = this.getY(fillRow + this.gameSize); //从上面掉下来
                    this.main_con.addChild(newGrid);
                    moveGridDelay += 50;
                    this.moveGrid(newGrid, { collumn: collumn, row: fillRow + this.gameSize }, { collumn: collumn, row: toFillIndex[fillRow] }, moveGridDelay);
                    game[collumn][toFillIndex[fillRow]] = newGrid;
                }
            }
        };
        /**
         * 移动单个方块到目标位置
         * @param {com.ComGrid} grid 要被移动的方块
         * @param {Object} from 移动起始点
         * @param {Object} to 移动终点
        */
        UiStart.prototype.moveGrid = function (grid, from, to, delay) {
            var _this = this;
            var perMoveTime = 400; // 移动单个方格所需时间
            this.gridToMoveNum++;
            egret.setTimeout(function () {
                gTween.toMoveY(grid, _this.getY(to.row), (from.row - to.row) * perMoveTime, _this.getY(from.row), egret.Ease.backOut, void 0, {
                    callback: function () {
                        _this.gridToMoveNum--;
                        if (_this.gridToMoveNum <= 0)
                            _this.finishHit();
                    }
                });
            }, this, delay);
        };
        // 完成单次操作之后会调用此函数
        UiStart.prototype.finishHit = function () {
            var _this = this;
            egret.setTimeout(function () {
                _this.exit();
            }, this, 1000);
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
            var guidePoint = this.game[this.guideGrid.collumn][this.guideGrid.row];
            var guidePoint2 = this.game[this.guideGrid.collumn + 1][this.guideGrid.row + 1];
            this.main_con.addChild(this.guide);
            this.guide.x = guidePoint2.x;
            this.guide.y = guidePoint2.y;
            gTween.fadeIn(this.guide, 300, void 0, void 0, void 0, {
                callback: function () {
                    gTween.toMove(_this.guide, guidePoint.x, guidePoint.y, { x: 300, y: 300 }, void 0, void 0, void 0, void 0, {
                        callback: function () {
                            gTween.toScale(_this.guide, 0.8, 200, 1, void 0, void 0, {
                                callback: function () {
                                    _this.guideHit();
                                    gTween.fadeOut(_this.guide);
                                }
                            });
                        }
                    });
                }
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