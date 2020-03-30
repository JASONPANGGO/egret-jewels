var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scene;
(function (scene) {
    /**
     * 游戏场景
     */
    var GameScene = (function (_super) {
        __extends(GameScene, _super);
        function GameScene() {
            var _this = _super.call(this) || this;
            _this.steps = 24;
            _this.currentLevelIndex = 1;
            _this.goals = [];
            _this.game = [];
            _this.gameSize = 7;
            // 当前动作还剩余的要移动的方块数量
            _this.gridToMoveNum = 0;
            _this.skinName = skins.GameScene;
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args open()传参会通过init()传过去
         */
        GameScene.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // console.info("init", ...args);
        };
        /** 首次打开场景时调用 */
        GameScene.prototype.load = function () {
            // console.info("load");
        };
        /** 每次打开场景都会调用 */
        GameScene.prototype.start = function () {
            // console.info("start");
            this.openFirst();
            this.openStart();
        };
        /** 每次结束场景都会调用 */
        GameScene.prototype.stop = function () {
            // console.info("stop");
        };
        /** 每帧都会调用 */
        GameScene.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        GameScene.prototype.addEvent = function () {
            // console.info("addEvent");
        };
        /** 移除事件 */
        GameScene.prototype.removeEvent = function () {
            // console.info("removeEvent");
        };
        /** 窗口大小改变时调用 */
        GameScene.prototype.resizeView = function () {
            // console.info("resizeView", this.width, this.height, GameMgr.screenType, GameMgr.mobileType);
            this.dispatchEventWith(gConst.eventType.RESIZE_VIEW);
            var baseScale = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];
            this.bg.scaleX = this.bg.scaleY = Math.max(this.width / this.bg.width, this.height / this.bg.height);
            if (GameMgr.screenType == 1 /* VERTICAL */) {
                //竖屏
                this.ui_grass.scaleX = this.ui_grass.scaleY = this.ui_con.scaleX = this.ui_con.scaleY = this.width / this.ui_con.width;
                this.ui_goals_title.rotation = this.ui_score.rotation = this.ui_steps.rotation = this.ui_con.rotation = 0;
                this.ui_goals_title.verticalCenter = NaN;
                this.ui_goals_title.top = 0;
                this.ui_goals_title.horizontalCenter = 0;
                this.ui_grass.rotation = 0;
                this.ui_grass.bottom = this.ui_con.height * this.ui_con.scaleY;
                this.main_con.horizontalCenter = 0;
                this.goal0.rotation = 0;
                this.goal1.rotation = 0;
                this.goal2.rotation = 0;
                switch (GameMgr.mobileType) {
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
                this.ui_grass.scaleX = this.ui_grass.scaleY = this.ui_con.scaleX = this.ui_con.scaleY = this.height / this.ui_con.width;
                this.ui_con.rotation = 90;
                this.ui_score.rotation = this.ui_steps.rotation = -90;
                this.ui_goals_title.top = NaN;
                this.ui_goals_title.rotation = -90;
                this.ui_goals_title.horizontalCenter = NaN;
                this.ui_goals_title.verticalCenter = 0;
                this.ui_goals_title.x = 0;
                this.ui_grass.bottom = 0;
                this.ui_grass.rotation = -90;
                this.main_con.horizontalCenter = -70;
                this.goal0.rotation = -90;
                this.goal1.rotation = -90;
                this.goal2.rotation = -90;
                switch (GameMgr.mobileType) {
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
            this.main_con.scaleX = this.main_con.scaleY = baseScale;
        };
        /** 屏幕横竖屏转换时调用 */
        GameScene.prototype.rotateView = function () {
            // console.info("GameScene.rotateView", GameMgr.screenType);
            this.dispatchEventWith(gConst.eventType.ROTATE_VIEW);
            if (GameMgr.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        /* =========== 框架结构代码-end =========== */
        /* =========== 业务代码-start =========== */
        GameScene.prototype.openStart = function () {
            this.UiStart = gUiMgr.create(ui.UiStart);
            this.UiStart.open();
        };
        GameScene.prototype.loadGame = function () {
            this.initGame(this.game, gConst['game' + this.currentLevelIndex]);
            this.initUI(this.currentLevelIndex);
            this.setSteps(this.steps);
        };
        GameScene.prototype.initUI = function (levelIndex) {
            this.goals = gConst.goals1;
            for (var i = 0; i < this.goals.length; i++) {
                this['goal' + i + '_jewel'].source = "grid" + this.goals[i].jewel + "_png";
                this['goal' + i + '_value'].text = "" + this.goals[i].value;
            }
        };
        GameScene.prototype.onTap = function (evt) {
            var gridPos = evt.currentTarget.POS;
            var gridProp = evt.currentTarget.propName;
            console.log(gridPos, gridProp);
            if (this.gridToMoveNum > 0)
                return; // 方块还在移动的时候不可操作
            if (this.useSteps()) {
                this.hitGrid(gridPos.collumn, gridPos.row, gridProp);
            }
            else {
                console.log('步数用完');
            }
        };
        GameScene.prototype.useSteps = function () {
            if (this.steps > 0) {
                this.steps--;
                this.setSteps(this.steps);
                return true;
            }
            else {
                return false;
            }
        };
        GameScene.prototype.setSteps = function (steps) {
            this.ui_steps_label.text = "" + steps;
        };
        /**
         * 通过方块的逻辑坐标获取容器中的位置坐标X和Y
         * @param {number} collumn 逻辑坐标X
         * @param {number} row 逻辑坐标Y
         */
        GameScene.prototype.getXY = function (collumn, row) {
            return {
                x: this.getX(collumn),
                y: this.getY(row)
            };
        };
        /**
         * 通过方块的逻辑坐标获取容器中的位置坐标Y
         * @param {number} row 逻辑坐标Y
         */
        GameScene.prototype.getY = function (row) {
            return this.main_grid.height - row * gConst.gridSize.WIDTH + 0.5 * gConst.gridSize.WIDTH - gConst.gridSize.HEIGHT;
        };
        /**
         * 通过方块的逻辑坐标获取容器中的位置坐标X
         * @param {number} collumn 逻辑坐标X
         */
        GameScene.prototype.getX = function (collumn) {
            return collumn * gConst.gridSize.WIDTH + 0.5 * gConst.gridSize.WIDTH;
        };
        // 初始化游戏方格矩阵
        GameScene.prototype.initGame = function (game, gameGrid) {
            this.grid = gameGrid;
            for (var collumn = 0; collumn < this.gameSize; collumn++) {
                game.push([]);
                for (var row = 0; row < this.gameSize; row++) {
                    var comGrid = new com.ComGrid();
                    comGrid.open(this.grid[collumn].shift(), collumn, row);
                    var gridXY = this.getXY(collumn, row);
                    comGrid.setPos(gridXY.x, gridXY.y);
                    game[collumn].push(comGrid);
                    this.main_grid.addChild(comGrid);
                    comGrid.visible = false;
                    comGrid.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
                    this.moveGrid(comGrid, { collumn: collumn, row: this.gameSize }, { collumn: collumn, row: row }, 100 * row); // 初始化跌落效果
                }
            }
            this.deepSetProp(game);
        };
        // 遍历设置属性
        GameScene.prototype.deepSetProp = function (game) {
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
        // 检查是否已经遍历过
        GameScene.prototype.isFound = function (arr, x, y) {
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var p = arr_1[_i];
                if (p.x === x && p.y === y)
                    return true;
            }
            return false;
        };
        GameScene.prototype.transferToGrid = function (arr, game) {
            return arr.map(function (p) { return game[p.x][p.y]; });
        };
        /**
         * 从一个点递归搜索与之相邻相同方块
         * @param {Array} arr 当前的游戏方块矩阵
         * @param {number} x 被点击的方块逻辑坐标x (collumn)
         * @param {number} y 被点击的方块逻辑坐标y (row)
         */
        GameScene.prototype.find = function (arr, x, y) {
            if (arr === void 0) { arr = []; }
            var count = 0;
            var targetValue;
            var sameGrid = [];
            var found = [];
            var skillMode = false;
            // 如果点击的方块是功能方块
            if (arr[x][y].skill) {
                skillMode = true;
            }
            deepFind(x, y);
            function deepFind(x, y) {
                if (x >= arr.length || y >= arr[x].length)
                    return;
                for (var i = 0; i < found.length; i++) {
                    if (found[i].x === x && found[i].y === y)
                        return;
                }
                found.push({
                    x: x,
                    y: y
                });
                if (skillMode) {
                    // 比较功能是否一样
                    if (!targetValue)
                        targetValue = arr[x][y].skill;
                    if (targetValue !== arr[x][y].skill)
                        return;
                }
                else {
                    // 比较jewelIndex即宝石颜色是否一样
                    if (!targetValue)
                        targetValue = arr[x][y].jewelIndex;
                    if (targetValue !== arr[x][y].jewelIndex)
                        return;
                }
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
            return sameGrid;
        };
        /**
         * 击中方块的处理，获取将要破碎的方块
         * @param {number} gridCollumn 被点击的方块逻辑坐标Collum
         * @param {number} gridRow 被点击的方块逻辑坐标Row
         */
        GameScene.prototype.hitGrid = function (gridCollumn, gridRow, propName) {
            var toBreak = this.find(this.game, gridCollumn, gridRow);
            switch (propName) {
                case 'STAR':
                case 'ROCKET':
                case 'BOMB':
                    this.comboBreak(this.game, toBreak, propName, gridCollumn, gridRow);
                    break;
                default:
                    this.gridBreak(this.game, toBreak);
                    break;
            }
        };
        /**
         * 方块破碎并更新方块矩阵
         * @param {Array} toBreak 将要被击碎的方块的显示对象数组
         */
        GameScene.prototype.gridBreak = function (game, toBreak) {
            var _this = this;
            var gridToBreak = this.transferToGrid(toBreak, this.game);
            gridToBreak.forEach(function (grid, i) {
                var goalIndex = _this.checkGoals(grid.jewelIndex);
                if (goalIndex !== 0 && !goalIndex) {
                    grid.hit();
                }
                else {
                    _this.moveGridToGoal(grid, goalIndex);
                }
                game[toBreak[i].x][toBreak[i].y] = 0; // 矩阵元素赋值为0标记为已破碎
            });
            this.updateGrid(this.game);
        };
        GameScene.prototype.moveGridToGoal = function (grid, goalIndex) {
            var _this = this;
            var moveTime = 600;
            var gp = gComMgr.toGlobal(grid);
            var goal_gp = gComMgr.toGlobal(this['goal' + goalIndex]);
            GameMgr.gameScene.addChild(grid);
            grid.x = gp.x;
            grid.y = gp.y;
            gTween.toMove(grid, goal_gp.x, goal_gp.y, { x: 600, y: 600 }, gp.x, gp.y, { x: egret.Ease.backIn, y: egret.Ease.backIn }, void 0, {
                callback: function () {
                    grid.close();
                    _this.goals[goalIndex].value--;
                    var value = _this.goals[goalIndex].value;
                    _this['goal' + goalIndex + '_value'].text = "" + value;
                }
            });
        };
        GameScene.prototype.checkGoals = function (jewelIndex) {
            var goals = this.goals;
            for (var i = 0; i < goals.length; i++) {
                if (goals[i].jewel === jewelIndex)
                    return i;
            }
            return false;
        };
        GameScene.prototype.breakAll = function (collumn, row) {
            var count = 0;
            var game = this.game;
            for (var y = 0; y < game.length; y++) {
                if (y === 0)
                    breakRow(row);
                else {
                    if (row + y < game.length) {
                        breakRow(row + y);
                    }
                    if (row - y > 0) {
                        breakRow(row - y);
                    }
                }
            }
            function breakRow(row) {
                count++;
                var _loop_2 = function (c) {
                    egret.setTimeout(function () {
                        var goalIndex = GameMgr.gameScene.checkGoals(game[c][row].jewelIndex);
                        if (goalIndex !== 0 && !goalIndex) {
                            game[c][row].hit();
                        }
                        else {
                            GameMgr.gameScene.moveGridToGoal(game[c][row], goalIndex);
                        }
                        if (count - game.length - 1 === 0) {
                            GameMgr.gameScene.bonus();
                        }
                    }, this_2, count * 100);
                };
                var this_2 = this;
                for (var c = 0; c < game.length; c++) {
                    _loop_2(c);
                }
            }
        };
        GameScene.prototype.bonus = function () {
        };
        /**
         * 连击破碎，有属性的方块破碎时调用
         * @param {Array} toBreak 将要被击碎的方块逻辑坐标数组
         */
        GameScene.prototype.comboBreak = function (game, toBreak, propName, gridCollumn, gridRow) {
            var _this = this;
            var gridToBreak = this.transferToGrid(toBreak, this.game);
            var targetXY = this.getXY(gridCollumn, gridRow);
            var moveTime = 400;
            var hitTarget = game[gridCollumn][gridRow];
            switch (propName) {
                case 'STAR':
                    gridToBreak.forEach(function (grid, i) {
                        if (grid.POS.collumn === gridCollumn && grid.POS.row === gridRow) {
                            egret.setTimeout(function () {
                                if (grid.skill) {
                                    grid.upgradeSkill('STAR');
                                }
                                else {
                                    grid.setSkill();
                                }
                            }, _this, 200);
                        }
                        else {
                            gTween.toMove(grid, targetXY.x, targetXY.y, { x: moveTime, y: moveTime }, void 0, void 0, { x: egret.Ease.backIn, y: egret.Ease.backIn }, void 0, {
                                callback: function () {
                                    grid.hit(false);
                                    if (i === gridToBreak.length - 1)
                                        _this.updateGrid(game);
                                }
                            });
                            game[grid.POS.collumn][grid.POS.row] = 0;
                        }
                    });
                    break;
                case 'BOMB':
                    break;
                case 'ROCKET':
                    break;
                default:
                    break;
            }
        };
        /**
         * 根据要破碎的方块数获取功能属性
         * @param {number} toBreakNum 将要被击碎的方块的数量
         */
        GameScene.prototype.getProp = function (toBreakNum) {
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
        GameScene.prototype.updateGrid = function (game) {
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
                            game[collumn][row].setGridPos(collumn, toRow);
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
                    this.main_grid.addChild(newGrid);
                    newGrid.visible = false;
                    moveGridDelay += 50;
                    newGrid.setGridPos(collumn, toFillIndex[fillRow]);
                    newGrid.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
                    this.moveGrid(newGrid, { collumn: collumn, row: fillRow + this.gameSize }, { collumn: collumn, row: toFillIndex[fillRow] }, moveGridDelay);
                    game[collumn][toFillIndex[fillRow]] = newGrid;
                }
            }
            this.deepSetProp(game);
        };
        /**
         * 移动单个方块到目标位置
         * @param {com.ComGrid} grid 要被移动的方块
         * @param {Object} from 移动起始点
         * @param {Object} to 移动终点
        */
        GameScene.prototype.moveGrid = function (grid, from, to, delay) {
            var _this = this;
            var perMoveTime = 400; // 移动单个方格所需时间
            this.gridToMoveNum++;
            egret.setTimeout(function () {
                grid.visible = true;
                gTween.toMoveY(grid, _this.getY(to.row), perMoveTime, _this.getY(from.row), egret.Ease.backOut, void 0, {
                    callback: function () {
                        _this.gridToMoveNum--;
                        if (_this.gridToMoveNum <= 0)
                            _this.finishMove();
                    }
                });
                if (from.row > _this.gameSize - 1) {
                    grid.alpha = 0;
                    egret.Tween.get(grid).to({
                        alpha: 1
                    }, perMoveTime);
                }
            }, this, delay);
        };
        // 完成单次操作之后会调用此函数
        GameScene.prototype.finishMove = function () {
        };
        return GameScene;
    }(scene.GameBase));
    scene.GameScene = GameScene;
    __reflect(GameScene.prototype, "scene.GameScene");
})(scene || (scene = {}));
//# sourceMappingURL=GameScene.js.map