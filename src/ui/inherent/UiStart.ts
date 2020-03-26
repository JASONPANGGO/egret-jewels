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
            this.initGame()

            this.showGuide()
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
        }

        /** 移除事件 */
        protected removeEvent() {
            // console.info("removeEvent");
        }

        /** 窗口大小改变时调用 */
        protected resizeView(): void {
            // console.info("resizeView", this.width, this.height);
            // var s1: number = this.width / this.con.width;
            // var s2: number = this.height / this.con.height;
            // this.con.scaleX = this.con.scaleY = Math.max(s1, s2);

            this.black_bg.width = this.width
            this.black_bg.height = this.height

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

        private grid: number[][]
        private game: Array<Array<com.ComGrid | any>> = []
        private gameSize: number = 5

        private getXY(collumn: number, row: number) {
            return {
                x: collumn * gConst.gridSize.WIDTH + 0.5 * gConst.gridSize.WIDTH,
                y: row * gConst.gridSize.WIDTH + 0.5 * gConst.gridSize.WIDTH + gConst.gridSize.HEIGHT - gConst.gridSize.WIDTH
            }
        }

        private initGame() {
            this.grid = gConst.game0
            for (let collumn = 0; collumn < this.gameSize; collumn++) {
                this.game.push([])
                for (let row = 0; row < this.gameSize; row++) {
                    const comGrid: com.ComGrid = new com.ComGrid()
                    comGrid.open(this.grid[collumn].shift())
                    const gridXY = this.getXY(collumn, row)
                    comGrid.x = gridXY.x
                    comGrid.y = this.main_con.height - gridXY.y
                    this.game[collumn].push(comGrid)
                    this.main_con.addChild(comGrid)
                }
            }
            console.log(this.grid)
        }



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

            if (!this.guide) {
                this.guide = new com.ComGuide();
                this.guide.open();
            }

            this.guide.setData(1000, { target1: this.game[1][1] }, this.main_con, {
                pressT: 500,
                liftT: 500
            });
            this.guide.play();
            egret.setTimeout(() => {
                this.guide.over()
            }, this, 2000)

            egret.setTimeout(() => {
                this.guideHit()
            }, this, 1500)
        }

        private guideHit() {
            this.hitGrid(1, 1)
            // this.game[2][1].hit()
        }

        // private gridsToHit: Array<Array<com.ComGrid | any>> = []
        private hitGrid(gridCollumn: number, gridRow: number) {
            let toBreak = this.find(this.game, gridCollumn, gridRow)
            this.gridBreak()
            // this.game[gridCollumn][gridRow].hit()
            // this.game[gridCollumn][gridRow] = 0
        }

        private find(arr: Array<Array<com.ComGrid | any>> = [], x, y) {
            let count = 0
            let targetValue
            let toBreak = []
            let found = []
            deepFind(x, y)
            function deepFind(x, y) {
                console.log(toBreak)
                if (x >= arr.length || y >= arr[x].length) returnm
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
                    toBreak.push(arr[x][y])
                    arr[x][y] = 0
                    if (x - 1 >= 0) deepFind(x - 1, y)
                    if (x + 1 < arr.length) deepFind(x + 1, y)
                    if (y - 1 >= 0) deepFind(x, y - 1)
                    if (y + 1 < arr[x].length) deepFind(x, y + 1)
                }
            }
            return toBreak
        }

        private gridBreak(arr: com.ComGrid[], prop: string) {
            arr.forEach(grid => {
                grid.hit(prop)
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