namespace ui {
	/**
	 * 结束页面
	 */
    export class UiEnd extends ui.UiFile {
        public className: string; //不需要重写，自动设置
        public bg: eui.Image;
        public leaves1: eui.Image;
        public leaves2: eui.Image;
        public score_con: eui.Group;
        public star0: eui.Image;
        public star1: eui.Image;
        public star2: eui.Image;
        public score: eui.BitmapLabel;
        public btnCon: eui.Group;
        public btn: eui.Image;
        public logo: com.ComMovieClip;


        public constructor() {
            super();
            this.skinName = skins.UiEnd;
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
            this.enter()
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
            this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this)
        }

        /** 移除事件 */
        protected removeEvent() {
            // console.info("removeEvent");
            this.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this)
        }

        /** 窗口大小改变时调用 */
        protected resizeView(): void {
            // console.info("resizeView", this.width, this.height);

            this.bg.scaleX = this.bg.scaleY = Math.max(this.width / this.bg.width, this.height / this.bg.height)

            const baseScale: number = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];
            if (this.screenType == gConst.screenType.VERTICAL) {
                //竖屏


                this.leaves2.rotation = 0
                this.leaves2.top = 0
                this.leaves1.rotation = 0
                this.leaves1.bottom = 0

                this.logo.verticalCenter = this.logo.horizontalCenter = 0
                this.btnCon.bottom = 0.08 * this.height
                this.btnCon.horizontalCenter = 0
                this.btnCon.verticalCenter = NaN

                this.score_con.verticalCenter = NaN
                this.score_con.horizontalCenter = 0
                this.score_con.top = 0.08 * this.height

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

                this.leaves2.rotation = -90
                this.leaves2.left = 0
                this.leaves1.rotation = -90
                this.leaves1.right = 0

                this.logo.verticalCenter = -100
                this.btnCon.verticalCenter = 200
                this.btnCon.horizontalCenter = this.logo.horizontalCenter = 0.25 * this.width
                this.btnCon.bottom = NaN

                this.score_con.horizontalCenter = NaN
                this.score_con.verticalCenter = 0

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

            this.score_con.scaleX = this.score_con.scaleY = this.logo.scaleX = this.logo.scaleY = baseScale
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

        private enter() {
            for (let i = 0; i < 3; i++) {
                egret.setTimeout(function () {
                    gSoundMgr.playEff('sm_endstar')
                    gTween.toBigShow(this['star' + i], 400, void 0, void 0, egret.Ease.backOut)
                }, this, i * 500);
            }
            this.score.text = GameMgr.gameScene.ui_score_label.text
            this.logo.open()
            this.logo.setData([new data.McData('logo', 12, 'p_logo_{1}_png')])
            this.logo.gotoAndPlay('logo', 1)

            gSoundMgr.playEff('sm_score')

            gTween.loopScale(this.btn, 1.2, 400)
        }

        /* =========== 业务代码-end =========== */
    }
}