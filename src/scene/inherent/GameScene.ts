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



		/* =========== 业务代码-end =========== */
	}
}