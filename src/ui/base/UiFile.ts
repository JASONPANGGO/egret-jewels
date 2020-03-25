namespace ui {
	/**
	 * UI文件
	 */
	export abstract class UiFile extends ui.UiFileBase {
		public isUiFirstLimit: boolean = true; //是否受UiFirstView限制  默认为true:保证 UiFirstView 在最顶层，false: 打开放最顶层

		public constructor() {
			super();
		}

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

		/**
		 * 打开界面
		 * @param {any[]} args open()传参会通过init()传过去
		 */
		public open(...args: any[]) {
			super.open(...args);
		}

		/** 关闭界面 */
		public close() {
			super.close();
		}

		/** 显示界面 */
		public show() {
			super.show();
		}

		/** 隐藏界面 */
		public hide() {
			super.hide();
		}

		/** 销毁界面 */
		public destroy(isAim?: boolean) {
			super.destroy(isAim);
		}

		/** 窗口大小改变时调用 */
		protected resizeView(): void {
			// console.info("resizeView", this.width, this.height);
			// var s1: number = this.width / this.con.width;
			// var s2: number = this.height / this.con.height;
			// this.con.scaleX = this.con.scaleY = Math.max(s1, s2);

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
	}
}