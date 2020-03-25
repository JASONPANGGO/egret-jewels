namespace com {
    /**
     * 刀痕
     */
    export class ComScar extends com.ComFile {

        private moveCount: number = 0; //记录鼠标移动事件触发次数
        private hasThrow: boolean = false; //是否触发挥刀音效

        //上一次mousemove事件是的触摸点位置
        private prePointX: number = -1;
        private prePointY: number = -1;

		/**
		 * 构造动画对象
		 */
        public constructor() {
            super();
			// this.skinName = skins.ComEmpty;
        }

        /* =========== 框架结构代码-start =========== */
		/**
		 * 初始化
		 * @param {any[]} args 构建传参会通过init()传过去
		 */
        protected init(...args: any[]) {
            // console.info("init", ...args);
            this.touchEnabled = this.touchChildren = false;
            // this.filters = [new egret.GlowFilter(0x923500,0.5,0.4,0.4)];
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
            GameMgr.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.addScar, this);
            GameMgr.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.moveEnd, this);
        }

        /** 移除事件 */
        protected removeEvent() {
            // console.info("removeEvent");
            GameMgr.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.addScar, this);
            GameMgr.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.moveEnd, this);
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
        /* =========== 框架结构代码-end =========== */


        /* =========== 业务代码-start =========== */
        private touchPointID: number; //触控ID

        /**
         * 添加刀痕方法
         */
        public addScar(event: egret.TouchEvent) {
            //去掉多点触控
            if (this.touchPointID && this.touchPointID != event.touchPointID) {
                return;
            }
            this.touchPointID = event.touchPointID;

            /**
             * 添加音效
             */
            this.moveCount++;
            if (!this.hasThrow && this.moveCount > 10) {
                // const soundThrow: egret.Sound = RES.getRes("throw_mp3");
                // const channelThrow = soundThrow.play(0, 1);
                this.hasThrow = true;
            }
            const stx: number = event.stageX;
            const sty: number = event.stageY;
            /**
             * 添加刀痕
             */
            if (this.prePointX > 0 && this.prePointY > 0) {

                let len = Math.floor(Math.sqrt((this.prePointY - sty) * (this.prePointY - sty) + (this.prePointX - stx) * (this.prePointX - stx)));
                const theta = Math.atan((sty - this.prePointY) / (stx - this.prePointX)) * 57.3;
                if (this.prePointX <= stx) {
                    len *= -1;
                }
                let scar = new egret.Shape();
                const ra: number = 30;
                scar.graphics.lineStyle(ra, 0xFFFFFF);
                scar.graphics.moveTo(0, 0);
                scar.graphics.lineTo(len, 0);
                scar.graphics.endFill();

                this.addChild(scar);
                // let lPos: egret.Point = scar.parent.globalToLocal(stx, sty);
                scar.x = stx //lPos.x;
                scar.y = sty //lPos.y;
                scar.anchorOffsetX = 4.5;
                scar.rotation = theta;

                gTween.tween(scar, void 0, {
                    props: { scaleY: 0 /* , alpha: 0 */ }, duration: 300, call: {
                        callback: () => {
                            scar = gComMgr.rmObj(scar);
                        }
                    }
                });
            }
            this.prePointX = stx;
            this.prePointY = sty;
        }

        /**
         * 抬起手之后的处理
         */
        private moveEnd(event: egret.TouchEvent) {
            this.touchPointID = null;
            this.prePointX = -1;
            this.prePointY = -1;
            this.moveCount = 0;
            this.hasThrow = false;
        }
        /* =========== 业务代码-end =========== */
    }
}