namespace com {
	/**
	 * 珠宝grid组件
	 */
    export class ComGrid extends com.ComFile {

        public jewelIndex: number
        private propName: string
        public skill: string

        public con: eui.Group;
        public jewel: eui.Image;
        public prop: eui.Image;
        public skill_img: eui.Image;

        public POS: { collumn: number, row: number }


        public constructor() {
            super();
            this.skinName = skins.ComGrid;
        }

        /* =========== 框架结构代码-start =========== */
		/**
		 * 初始化
		 * @param {any[]} args 构建传参会通过init()传过去
		 */
        protected init(jewelIndex: number, collumn: number, row: number) {
            // console.info("init", ...args);
            this.jewelIndex = jewelIndex
            this.jewel.source = 'grid' + jewelIndex + '_png'
            gComMgr.setObjSize(this.jewel, true)
            gComMgr.setObjSize(this.con, true)
            this.anchorOffsetX = this.anchorOffsetY = gConst.gridSize.WIDTH / 2;
            this.POS = { collumn: collumn, row: row }
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
        /* =========== 框架结构代码-end =========== */


        /* =========== 业务代码-start =========== */

        private partical: com.ComParticle
        public hit(playPartical: boolean = true) {
            if (playPartical) {
                this.partical = new com.ComParticle()
                this.partical.setData(this.parent, 'grid' + this.jewelIndex, 'grid')
                this.partical.setPos(this.x, this.y)
                this.partical.start(1000)
                gTween.toSmallHide(this, 500, 1, 1, egret.Ease.quadOut, void 0, {
                    callback: () => {
                        this.close()
                    }
                })
            } else {
                this.close()
            }
        }

        public setProp(prop: string) {
            this.propName = prop
            this.prop.source = gConst.propType[prop]
        }

        public setPos(x: number, y: number) {
            this.x = x
            this.y = y
        }

        public setGridPos(collumn: number, row: number) {
            this.POS = { collumn: collumn, row: row }
        }

        public setSkill() {
            this.jewel.visible = false
            if (this.propName === 'STAR') {
                this.skill_img.source = `p_eff_${this.jewelIndex}_ball_png`
                gTween.toBigShow(this.skill_img, 500, void 0, void 0, egret.Ease.elasticOut)
            } else {
                this.skill_img.source = gConst.skillType[this.propName]
            }
            this.skill = this.propName
        }

        public upgradeSkill(skillName) {
            if (this.skill === 'STAR' && skillName === 'STAR') {
                this.skill_img.source = 'p_eff_0_ball_png'
                let mc = new com.ComMovieClip()
                const frameInterval = 40
                GameMgr.gameScene.addChild(mc)
                mc.open()
                mc.interval = 40
                mc.setData([new data.McData('ball', 20, 'p_ball_{1}_png')])
                mc.gotoAndPlay('ball', 1)
                egret.setTimeout(() => {
                    mc.dispose()
                    GameMgr.gameScene.breakAll(this.POS.collumn, this.POS.row)
                }, this, frameInterval * 20)
            } else if (this.skill === 'ROCKET' && skillName === 'BOMB') {

            } else if (this.skill === 'BOMB' && skillName === 'ROCKET') {

            }
        }

        /* =========== 业务代码-end =========== */
    }
}