namespace com {
	/**
	 * 控件文件
	 */
	export abstract class ComFile extends com.ComFileBase {

		public constructor() {
			super();
		}

		/**
		 * 初始化
		 * @param {any[]} args 构建传参会通过init()传过去
		 */
		protected init(...args: any[]) {
			// console.info("init", ...args);
		}

		/** 首次创建组件时调用 */
		protected load() {
			// console.info("load");
		}

		/** 每次创建组件都会调用 */
		protected start() {
			// console.info("start");
		}

		/** 每次结束组件都会调用 */
		protected stop() {
			// console.info("stop");
		}

		/** 监听组件，每帧都会调用 */
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
		protected resizeView(event?: egret.Event) {
			// console.info("resizeView", event, GameMgr.gameview.width, GameMgr.gameview.height);

			if (GameMgr.screenType == gConst.screenType.VERTICAL) {
				//竖屏
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
		}

		/** 屏幕横竖屏转换时调用 */
		protected rotateView(event: egret.Event) {
			// console.info("rotateView", event, GameMgr.screenType, GameMgr.mobileType);
			if (GameMgr.screenType == gConst.screenType.VERTICAL) {
				//竖屏
			} else {
				//横屏
			}
		}

		/** 显示组件 */
		public show() {
			super.show();
		}

		/** 隐藏组件 */
		public hide() {
			super.hide();
		}

		/** 销毁组件 */
		public destroy(isAim?: boolean) {
			super.destroy(isAim);
		}
	}
}