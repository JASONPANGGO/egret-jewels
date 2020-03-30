namespace scene {
	/**
	 * 游戏场景
	 */
	export class GameScene extends scene.GameBase {

		public bg: eui.Image;

		// UI
		public ui_con: eui.Group;
		public ui_grass: eui.Image;
		public ui_frame: eui.Image;
		public ui_round: eui.Group;
		public ui_steps: eui.Group;
		public ui_steps_title: eui.Image;
		public ui_steps_label: eui.BitmapLabel;
		public ui_star1: eui.Image;
		public ui_star2: eui.Image;
		public ui_star3: eui.Image;
		public ui_text: eui.Group;
		public ui_score: eui.Group;
		public ui_score_label: eui.BitmapLabel;
		public ui_goals: eui.Group;
		public ui_goals_title: eui.Image;

		// 游戏主体
		public main_con: eui.Group;
		public main_frame: eui.Image;
		public main_grid: eui.Group;

		// 目标
		public goals_con: eui.Group;
		public goal0: eui.Group;
		public goal0_jewel: eui.Image;
		public goal0_value: eui.BitmapLabel;
		public goal1: eui.Group;
		public goal1_jewel: eui.Image;
		public goal1_value: eui.BitmapLabel;
		public goal2: eui.Group;
		public goal2_jewel: eui.Image;
		public goal2_value: eui.BitmapLabel;


		// 教程游戏
		private UiStart: ui.UiStart


		public constructor() {
			super();
			this.skinName = skins.GameScene;
		}

		/* =========== 框架结构代码-start =========== */
		/**
		 * 初始化
		 * @param {any[]} args open()传参会通过init()传过去
		 */
		public init(...args: any[]) {
			// console.info("init", ...args);
		}

		/** 首次打开场景时调用 */
		protected load() {
			// console.info("load");
		}

		/** 每次打开场景都会调用 */
		protected start() {
			// console.info("start");
			this.openFirst();
			this.openStart()
		}

		/** 每次结束场景都会调用 */
		protected stop() {
			// console.info("stop");
		}

		/** 每帧都会调用 */
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
		public resizeView(): void {
			// console.info("resizeView", this.width, this.height, GameMgr.screenType, GameMgr.mobileType);
			this.dispatchEventWith(gConst.eventType.RESIZE_VIEW);

			const baseScale: number = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];
			this.bg.scaleX = this.bg.scaleY = Math.max(this.width / this.bg.width, this.height / this.bg.height)

			if (GameMgr.screenType == gConst.screenType.VERTICAL) {
				//竖屏
				this.ui_grass.scaleX = this.ui_grass.scaleY = this.ui_con.scaleX = this.ui_con.scaleY = this.width / this.ui_con.width

				this.ui_goals_title.rotation = this.ui_score.rotation = this.ui_steps.rotation = this.ui_con.rotation = 0
				this.ui_goals_title.verticalCenter = NaN
				this.ui_goals_title.top = 0
				this.ui_goals_title.horizontalCenter = 0

				this.ui_grass.rotation = 0
				this.ui_grass.bottom = this.ui_con.height * this.ui_con.scaleY

				this.main_con.horizontalCenter = 0

				this.goal0.rotation = 0
				this.goal1.rotation = 0
				this.goal2.rotation = 0

				switch (GameMgr.mobileType) {
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
				this.ui_grass.scaleX = this.ui_grass.scaleY = this.ui_con.scaleX = this.ui_con.scaleY = this.height / this.ui_con.width

				this.ui_con.rotation = 90
				this.ui_score.rotation = this.ui_steps.rotation = -90
				this.ui_goals_title.top = NaN
				this.ui_goals_title.rotation = -90
				this.ui_goals_title.horizontalCenter = NaN
				this.ui_goals_title.verticalCenter = 0
				this.ui_goals_title.x = 0

				this.ui_grass.bottom = 0
				this.ui_grass.rotation = -90

				this.main_con.horizontalCenter = -70

				this.goal0.rotation = -90
				this.goal1.rotation = -90
				this.goal2.rotation = -90

				switch (GameMgr.mobileType) {
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

			this.main_con.scaleX = this.main_con.scaleY = baseScale
		}

		/** 屏幕横竖屏转换时调用 */
		public rotateView() {
			// console.info("GameScene.rotateView", GameMgr.screenType);
			this.dispatchEventWith(gConst.eventType.ROTATE_VIEW);

			if (GameMgr.screenType == gConst.screenType.VERTICAL) {
				//竖屏
			} else {
				//横屏
			}
		}
		/* =========== 框架结构代码-end =========== */


		/* =========== 业务代码-start =========== */

		private openStart() {
			this.UiStart = gUiMgr.create(ui.UiStart) as ui.UiStart
			this.UiStart.open()
		}

		private steps: number = 24
		private currentLevelIndex: number = 1
		private goals: { jewel: number, value: number }[] = []

		public loadGame() {
			this.initGame(this.game, gConst['game' + this.currentLevelIndex])
			this.initUI(this.currentLevelIndex)
			this.setSteps(this.steps)
		}

		private initUI(levelIndex) {
			this.goals = gConst.goals1
			for (let i = 0; i < this.goals.length; i++) {
				this['goal' + i + '_jewel'].source = `grid${this.goals[i].jewel}_png`
				this['goal' + i + '_value'].text = `${this.goals[i].value}`
			}
		}

		private onTap(evt: egret.TouchEvent) {
			const gridPos = evt.currentTarget.POS
			const gridProp = evt.currentTarget.propName
			console.log(gridPos, gridProp);
			if (this.gridToMoveNum > 0) return // 方块还在移动的时候不可操作
			if (this.useSteps()) {
				this.hitGrid(gridPos.collumn, gridPos.row, gridProp)
			} else {
				console.log('步数用完');
			}
		}


		private useSteps() {

			if (this.steps > 0) {
				this.steps--
				this.setSteps(this.steps)
				return true
			} else {
				return false
			}
		}

		private setSteps(steps: number) {
			this.ui_steps_label.text = `${steps}`
		}


		/** ========== 消消乐游戏方块核心逻辑代码-start ========== */

		private grid: number[][]
		private game: Array<Array<com.ComGrid | any>> = []
		private gameSize: number = 7

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
			return this.main_grid.height - row * gConst.gridSize.WIDTH + 0.5 * gConst.gridSize.WIDTH - gConst.gridSize.HEIGHT
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
					this.main_grid.addChild(comGrid)
					comGrid.visible = false
					comGrid.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this)
					this.moveGrid(comGrid, { collumn: collumn, row: this.gameSize }, { collumn: collumn, row: row }, 100 * row) // 初始化跌落效果
				}
			}
			this.deepSetProp(game)
		}

		// 遍历设置属性
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

		// 检查是否已经遍历过
		public isFound(arr: { x: number, y: number }[], x, y) {
			for (let p of arr) {
				if (p.x === x && p.y === y) return true
			}
			return false
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
			let sameGrid: { x: number, y: number }[] = []
			let found: { x: number, y: number }[] = []

			let skillMode: boolean = false

			// 如果点击的方块是功能方块
			if (arr[x][y].skill) {
				skillMode = true
			}

			deepFind(x, y)
			function deepFind(x, y): void {
				if (x >= arr.length || y >= arr[x].length) return
				for (let i = 0; i < found.length; i++) {
					if (found[i].x === x && found[i].y === y) return
				}
				found.push({
					x: x,
					y: y
				})

				if (skillMode) {
					// 比较功能是否一样
					if (!targetValue) targetValue = arr[x][y].skill
					if (targetValue !== arr[x][y].skill) return
				} else {
					// 比较jewelIndex即宝石颜色是否一样
					if (!targetValue) targetValue = arr[x][y].jewelIndex
					if (targetValue !== arr[x][y].jewelIndex) return
				}

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

			return sameGrid
		}


        /**
         * 击中方块的处理，获取将要破碎的方块
         * @param {number} gridCollumn 被点击的方块逻辑坐标Collum
         * @param {number} gridRow 被点击的方块逻辑坐标Row
         */
		private hitGrid(gridCollumn: number, gridRow: number, propName: string): void {
			const toBreak: { x: number, y: number }[] = this.find(this.game, gridCollumn, gridRow)

			switch (propName) {
				case 'STAR':
				case 'ROCKET':
				case 'BOMB':
					this.comboBreak(this.game, toBreak, propName, gridCollumn, gridRow)
					break;
				default:
					this.gridBreak(this.game, toBreak)
					break;
			}
		}

        /**
         * 方块破碎并更新方块矩阵
         * @param {Array} toBreak 将要被击碎的方块的显示对象数组 
         */
		private gridBreak(game: Array<Array<com.ComGrid | any>>, toBreak: { x: number, y: number }[]) {
			const gridToBreak = this.transferToGrid(toBreak, this.game)

			gridToBreak.forEach((grid, i) => {
				const goalIndex = this.checkGoals(grid.jewelIndex)

				if (goalIndex !== 0 && !goalIndex) {
					grid.hit()
				} else {
					this.moveGridToGoal(grid, goalIndex)
				}
				game[toBreak[i].x][toBreak[i].y] = 0 // 矩阵元素赋值为0标记为已破碎
			})
			this.updateGrid(this.game)
		}

		private moveGridToGoal(grid: com.ComGrid, goalIndex: number) {
			const moveTime = 600
			const gp = gComMgr.toGlobal(grid)
			const goal_gp = gComMgr.toGlobal(this['goal' + goalIndex])
			GameMgr.gameScene.addChild(grid)
			grid.x = gp.x
			grid.y = gp.y
			gTween.toMove(grid, goal_gp.x, goal_gp.y, { x: 600, y: 600 }, gp.x, gp.y, { x: egret.Ease.backIn, y: egret.Ease.backIn }, void 0, {
				callback: () => {
					grid.close()
					this.goals[goalIndex].value--
					const value = this.goals[goalIndex].value
					this['goal' + goalIndex + '_value'].text = `${value}`
				}
			})
		}


		private checkGoals(jewelIndex: number) {
			const goals = this.goals


			for (let i = 0; i < goals.length; i++) {
				if (goals[i].jewel === jewelIndex) return i
			}
			return false
		}

		// 被技能击碎全部，从参数位置开始
		public breakAll(collumn: number, row: number) {
			let count: number = 0
			const game: Array<Array<com.ComGrid | any>> = this.game

			for (let y: number = 0; y < game.length; y++) {
				if (y === 0) breakRow(row)
				else {
					if (row + y < game.length) {
						breakRow(row + y)
					}
					if (row - y > 0) {
						breakRow(row - y)
					}
				}
			}

			function breakRow(row: number) {
				count++
				for (let c: number = 0; c < game.length; c++) {
					egret.setTimeout(() => {
						const goalIndex = GameMgr.gameScene.checkGoals(game[c][row].jewelIndex)
						if (goalIndex !== 0 && !goalIndex) {
							game[c][row].hit()
						} else {
							GameMgr.gameScene.moveGridToGoal(game[c][row], goalIndex)
						}
						if (count - game.length - 1 === 0) {
							GameMgr.gameScene.bonus()
						}
					}, this, count * 100)
				}
			}

		}

		public bonus() {
			
		}

		/**
		 * 连击破碎，有属性的方块破碎时调用
		 * @param {Array} toBreak 将要被击碎的方块逻辑坐标数组 
		 */
		private comboBreak(game: Array<Array<com.ComGrid | any>>, toBreak: { x: number, y: number }[], propName: string, gridCollumn: number, gridRow: number) {
			const gridToBreak = this.transferToGrid(toBreak, this.game)
			const targetXY = this.getXY(gridCollumn, gridRow)
			const moveTime = 400

			const hitTarget: com.ComGrid = game[gridCollumn][gridRow]

			switch (propName) {
				case 'STAR':
					gridToBreak.forEach((grid, i) => {
						if (grid.POS.collumn === gridCollumn && grid.POS.row === gridRow) {

							egret.setTimeout(() => {
								if (grid.skill) {
									grid.upgradeSkill('STAR')

								} else {
									grid.setSkill()
								}
							}, this, 200)
						} else {
							gTween.toMove(grid, targetXY.x, targetXY.y, { x: moveTime, y: moveTime }, void 0, void 0, { x: egret.Ease.backIn, y: egret.Ease.backIn }, void 0, {
								callback: () => {
									grid.hit(false)
									if (i === gridToBreak.length - 1) this.updateGrid(game)
								}
							})
							game[grid.POS.collumn][grid.POS.row] = 0
						}
					})
					break;
				case 'BOMB':

					break;
				case 'ROCKET':

					break;
				default:
					break;
			}


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
							game[collumn][row].setGridPos(collumn, toRow)
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
					this.main_grid.addChild(newGrid)
					newGrid.visible = false
					moveGridDelay += 50
					newGrid.setGridPos(collumn, toFillIndex[fillRow])
					newGrid.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this)
					this.moveGrid(newGrid, { collumn: collumn, row: fillRow + this.gameSize }, { collumn: collumn, row: toFillIndex[fillRow] }, moveGridDelay)
					game[collumn][toFillIndex[fillRow]] = newGrid
				}
			}
			this.deepSetProp(game)
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
				grid.visible = true

				gTween.toMoveY(grid, this.getY(to.row), perMoveTime, this.getY(from.row), egret.Ease.backOut, void 0, {
					callback: () => {
						this.gridToMoveNum--
						if (this.gridToMoveNum <= 0) this.finishMove()
					}
				})

				if (from.row > this.gameSize - 1) {

					grid.alpha = 0
					egret.Tween.get(grid).to({
						alpha: 1
					}, perMoveTime)

				}


			}, this, delay)
		}

		// 完成单次操作之后会调用此函数
		private finishMove(): void {

		}

		/** ========== 消消乐游戏方块核心逻辑代码-start ========== */

		/* =========== 业务代码-end =========== */
	}
}