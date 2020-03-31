namespace ui {
	/**
	 * 教程画面
	 */
    export class UiStart extends ui.UiFile {
        public className: string; //不需要重写，自动设置
        public black_bg: eui.Rect;

        public con: eui.Group;
        public bg: eui.Image;
        public main_bg: eui.Image;
        public main_con: eui.Group;


        public constructor() {
            super();
            this.skinName = skins.UiStart;
        }

        /* =========== 框架结构代码-start =========== */
		/**
		 * 初始化
		 * @param {any[]} args open()传参会通过init()传过去
		 */
        protected init(...args: any[]) {
            // console.info("init", ...args);
        }

        /** 首次打开界面时调用 */
        protected load() {
            // console.info("load");
        }

        /** 每次打开界面都会调用 */
        protected start() {
            // console.info("start");
            GameMgr.gameScene.setChildIndex(this, -1)
            this.enter()
            this.initGame(this.game, gConst.game0)
        }

        /** 每次结束界面都会调用 */
        protected stop() {
            // console.info("stop");
        }

        /** 监听界面，每帧都会调用 */
        protected update() {
            // console.info("update");
        }

        /** 注册事件 */
        protected addEvent() {
            // console.info("addEvent");
            this.con.addEventListener(egret.TouchEvent.TOUCH_TAP, this.exit, this)
        }

        /** 移除事件 */
        protected removeEvent() {
            // console.info("removeEvent");
            this.con.addEventListener(egret.TouchEvent.TOUCH_TAP, this.exit, this)
        }

        /** 窗口大小改变时调用 */
        protected resizeView(): void {
            // console.info("resizeView", this.width, this.height);
            // var s1: number = this.width / this.con.width;
            // var s2: number = this.height / this.con.height;
            // this.con.scaleX = this.con.scaleY = Math.max(s1, s2);

            this.black_bg.width = this.width
            this.black_bg.height = this.height
            this.con.y = 0.5 * this.height

            if (this.screenType == gConst.screenType.VERTICAL) {
                //竖屏
                switch (this.mobileType) {
                    //iPhoneX或以上
                    case gConst.mobileType.IPHONE_X:
                        break;
                    //iPhone8或以下
                    case gConst.mobileType.IPHONE_8:
                        break;
                    //iPad或其它
                    case gConst.mobileType.IPAD:
                        break;
                }
            } else {
                //横屏
                switch (this.mobileType) {
                    //iPhoneX或以上
                    case gConst.mobileType.IPHONE_X:
                        break;
                    //iPhone8或以下
                    case gConst.mobileType.IPHONE_8:
                        break;
                    //iPad或其它
                    case gConst.mobileType.IPAD:
                        break;
                }
            }
        }

        /** 屏幕横竖屏转换时调用 */
        protected rotateView(): void {
            // console.info("rotateView", this.screenType);
            if (this.screenType == gConst.screenType.VERTICAL) {
                //竖屏
            } else {
                //横屏
            }
        }
        /* =========== 框架结构代码-end =========== */


        /* =========== 业务代码-start =========== */
        private guideGrid: { collumn: number, row: number } = { collumn: 2, row: 1 }

        // 引导手击中方块
        private guideHit() {
            this.hitGrid(this.guideGrid.collumn, this.guideGrid.row)
            gSoundMgr.playEff('sm_break_crown')
        }

        private enter() {
            gTween.toTopShow(this.con, 800, .5 * this.height, void 0, void 0, egret.Ease.elasticOut, void 0, {
                callback: () => {
                    this.showGuide()
                }
            })
        }

        private isEnd: boolean = false
        private exit() {
            if (this.isEnd) return
            this.isEnd = true
            gTween.fadeOut(this.black_bg, 300)
            gTween.toBottomHide(this.con, 500, 0.5 * this.height, void 0, void 0, void 0, void 0, {
                callback: () => {
                    this.close()
                    GameMgr.gameScene.loadGame()
                }
            })

        }


        /** ========== 消消乐游戏方块核心逻辑代码-start ========== */

        private grid: number[][]
        private game: Array<Array<com.ComGrid | any>> = []
        private gameSize: number = 5
        /**
         * 通过方块的逻辑坐标获取容器中的位置坐标X和Y
         * @param {number} collumn 逻辑坐标X
         * @param {number} row 逻辑坐标Y
         */
        private getXY(collumn: number, row: number): { x: number, y: number } {
            return {
                x: this.getX(collumn),
                y: this.getY(row)
            }
        }

        /**
         * 通过方块的逻辑坐标获取容器中的位置坐标Y
         * @param {number} row 逻辑坐标Y
         */
        private getY(row: number): number {
            return this.main_con.height - row * gConst.gridSize.WIDTH + 0.5 * gConst.gridSize.WIDTH - gConst.gridSize.HEIGHT
        }


        /**
         * 通过方块的逻辑坐标获取容器中的位置坐标X
         * @param {number} collumn 逻辑坐标X
         */
        private getX(collumn: number): number {
            return collumn * gConst.gridSize.WIDTH + 0.5 * gConst.gridSize.WIDTH
        }

        // 初始化游戏方格矩阵
        private initGame(game: Array<Array<com.ComGrid | any>>, gameGrid: number[][]): void {
            this.grid = gameGrid
            for (let collumn = 0; collumn < this.gameSize; collumn++) {
                game.push([])
                for (let row = 0; row < this.gameSize; row++) {
                    const comGrid: com.ComGrid = new com.ComGrid()
                    comGrid.open(this.grid[collumn].shift(), collumn, row)
                    const gridXY = this.getXY(collumn, row)
                    comGrid.setPos(gridXY.x, gridXY.y)
                    game[collumn].push(comGrid)
                    this.main_con.addChild(comGrid)
                }
            }
            this.deepSetProp(game)
        }

        private deepSetProp(game: Array<Array<com.ComGrid | any>>) {
            const foundGrid: { x: number, y: number }[] = []
            for (let collumn: number = 0; collumn < game.length; collumn++) {
                for (let row: number = 0; row < game[collumn].length; row++) {
                    if (!this.isFound(foundGrid, com, row)) {
                        const sameGridXY: { x: number, y: number }[] = this.find(game, collumn, row)
                        const prop: string = this.getProp(sameGridXY.length)
                        if (prop) {
                            const sameGrid: com.ComGrid[] = this.transferToGrid(sameGridXY, game)
                            sameGrid.forEach(grid => {
                                grid.setProp(prop)
                            })
                        }
                        foundGrid.concat(sameGridXY)
                    }
                }
            }
        }

        private isFound(arr: { x: number, y: number }[], x, y) {
            for (let p of arr) {
                if (p.x === x && p.y === y) return true
            }
            return false
        }

        /**
         * 击中方块的处理，获取将要破碎的方块
         * @param {number} gridCollumn 被点击的方块逻辑坐标Collum
         * @param {number} gridRow 被点击的方块逻辑坐标Row
         */
        private hitGrid(gridCollumn: number, gridRow: number): void {
            const toBreak: { x: number, y: number }[] = this.find(this.game, gridCollumn, gridRow)
            this.gridBreak(this.game, toBreak)
        }

        private transferToGrid(arr: { x: number, y: number }[], game: Array<Array<com.ComGrid | any>>): com.ComGrid[] {
            return arr.map(p => game[p.x][p.y])
        }

        /**
         * 从一个点递归搜索与之相邻相同方块
         * @param {Array} arr 当前的游戏方块矩阵
         * @param {number} x 被点击的方块逻辑坐标x (collumn)
         * @param {number} y 被点击的方块逻辑坐标y (row)
         */
        private find(arr: Array<Array<com.ComGrid | any>> = [], x, y): { x: number, y: number }[] {
            let count = 0
            let targetValue
            let sameGrid = []
            let found = []
            deepFind(x, y)
            function deepFind(x, y): void {
                if (x >= arr.length || y >= arr[x].length) return
                if (!targetValue) targetValue = arr[x][y].jewelIndex
                for (let i = 0; i < found.length; i++) {
                    if (found[i].x === x && found[i].y === y) return
                }
                found.push({
                    x: x,
                    y: y
                })
                if (targetValue !== arr[x][y].jewelIndex) return
                else {
                    count++
                    sameGrid.push({
                        x: x,
                        y: y
                    })

                    if (x - 1 >= 0) deepFind(x - 1, y)
                    if (x + 1 < arr.length) deepFind(x + 1, y)
                    if (y - 1 >= 0) deepFind(x, y - 1)
                    if (y + 1 < arr[x].length) deepFind(x, y + 1)
                }
            }

            return sameGrid
        }

        /**
         * 方块破碎并更新方块矩阵
         * @param {Array} toBreak 将要被击碎的方块的显示对象数组 
         */
        private gridBreak(game: Array<Array<com.ComGrid | any>>, toBreak: { x: number, y: number }[]) {
            const gridToBreak = this.transferToGrid(toBreak, this.game)
            gridToBreak.forEach((grid, i) => {
                grid.hit()
                game[toBreak[i].x][toBreak[i].y] = 0 // 矩阵元素赋值为0标记为已破碎
            })
            this.updateGrid(this.game)
        }


        /**
         * 根据要破碎的方块数获取功能属性
         * @param {number} toBreakNum 将要被击碎的方块的数量 
         */
        private getProp(toBreakNum: number): string {
            if (toBreakNum >= 9) return 'STAR'
            if (toBreakNum >= 7) return 'BOMB'
            if (toBreakNum >= 5) return 'ROCKET'
            else return ''
        }


        /**
         * 填补破碎后的矩阵
         * @param {Array} game 当前的游戏方块矩阵
        */
        private updateGrid(game): void {
            for (let collumn: number = 0; collumn < game.length; collumn++) {
                let row: number = 0
                let toFillIndex: number[] = [] // 需要填充的索引
                let moveGridDelay: number = 0 // 跌落延迟，造成错落效果
                while (row < game[collumn].length) {
                    if (game[collumn][row] !== 0) { // 当前位置有方块
                        if (toFillIndex.length > 0) {
                            const toRow: number = toFillIndex.shift()
                            game[collumn][toRow] = game[collumn][row] // 矩阵移动
                            moveGridDelay += 50
                            this.moveGrid(game[collumn][row], { collumn: collumn, row: row }, { collumn: collumn, row: toRow }, moveGridDelay) // 移动的动画
                            game[collumn][row] = 0
                            toFillIndex.push(row)
                        }
                    } else { // 当前位置无方块
                        toFillIndex.push(row)
                    }
                    row++
                }
                for (let fillRow: number = 0; fillRow < toFillIndex.length; fillRow++) {
                    const newGrid: com.ComGrid = new com.ComGrid()
                    newGrid.open(this.grid[collumn][fillRow])
                    newGrid.x = this.getX(collumn)
                    newGrid.y = this.getY(fillRow + this.gameSize)//从上面掉下来
                    this.main_con.addChild(newGrid)
                    moveGridDelay += 50
                    this.moveGrid(newGrid, { collumn: collumn, row: fillRow + this.gameSize }, { collumn: collumn, row: toFillIndex[fillRow] }, moveGridDelay)
                    game[collumn][toFillIndex[fillRow]] = newGrid
                }
            }

        }

        // 当前动作还剩余的要移动的方块数量
        private gridToMoveNum: number = 0
        /**
         * 移动单个方块到目标位置
         * @param {com.ComGrid} grid 要被移动的方块
         * @param {Object} from 移动起始点
         * @param {Object} to 移动终点
        */
        private moveGrid(grid: com.ComGrid, from: { collumn: number, row: number }, to: { collumn: number, row: number }, delay: number): void {
            const perMoveTime: number = 400 // 移动单个方格所需时间
            this.gridToMoveNum++
            egret.setTimeout(() => {
                gTween.toMoveY(grid, this.getY(to.row), (from.row - to.row) * perMoveTime, this.getY(from.row), egret.Ease.backOut, void 0, {
                    callback: () => {
                        this.gridToMoveNum--
                        if (this.gridToMoveNum <= 0) this.finishHit()
                    }
                })

            }, this, delay)
        }

        // 完成单次操作之后会调用此函数
        private finishHit(): void {
            egret.setTimeout(() => {
                this.exit()
            }, this, 1000)
        }

        /** ========== 消消乐游戏方块核心逻辑代码-start ========== */


        public guide: com.ComGuide; //引导组件
        public showGuided: boolean; //引导显示状态

        /** 显示引导 */
        public showGuide() {
            if (GameMgr.isEnd) {
                return;
            }
            if (this.showGuided) {
                return;
            }
            this.showGuided = true;

            // if (!this.guide) {
            //     this.guide = new com.ComGuide();
            //     this.guide.open();
            // }

            const guidePoint = this.game[this.guideGrid.collumn][this.guideGrid.row]
            const guidePoint2 = this.game[this.guideGrid.collumn + 1][this.guideGrid.row + 1]
            // this.main_con.addChild(this.guide)
            // this.guide.x = guidePoint2.x
            // this.guide.y = guidePoint2.y

            let guide: eui.Component = new eui.Component()
            guide.skinName = skins.ComGuide
            this.main_con.addChild(guide)
            guide.x = guidePoint2.x
            guide.y = guidePoint2.y
            gTween.fadeIn(guide, 300, void 0, void 0, void 0, {
                callback: () => {
                    gTween.toMove(guide, guidePoint.x, guidePoint.y, { x: 300, y: 300 }, void 0, void 0, void 0, { duration: 200 }, {
                        callback: () => {
                            egret.Tween.get(guide).to({
                                y: guide.y - 20,
                                scaleX: 0.9,
                                scaleY: 0.9
                            }, 150).call(() => {
                                egret.Tween.get(guide).to({
                                    y: guide.y + 20,
                                    scaleX: 1,
                                    scaleY: 1
                                }, 150).call(() => {
                                    gTween.fadeOut(guide)
                                    this.guideHit()
                                })
                            })
                        }
                    })
                }
            })


        }


        /** 隐藏引导 */
        public hideGuide() {

            if (!this.guide) {
                return;
            }
            if (!this.showGuided) {
                return;
            }
            this.showGuided = false;
            this.guide.over();
        }

        /* =========== 业务代码-end =========== */
    }
}