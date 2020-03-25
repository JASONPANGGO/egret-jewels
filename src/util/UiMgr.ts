namespace util {
    /**
     * Ui管理器
     */
    export class UiMgr {
        private uiFilePool: { string?: ui.UiFileBase } = {}; //Ui界面池

        private uiEmpty: ui.UiEmpty;

        /**
         * 创建界面
         * @param {string|ui.UiFile|ui.UiFileBase} UiFile 文件类名
         */
        public create(UiFile): ui.UiFileBase {
            if (typeof (UiFile) === "string") {
                return this.UiFileEmpty;
            }
            const className: string = gDevelop.classToString(UiFile);
            if (!ui[className]) {
                return this.UiFileEmpty;
            } else {
                let uiFile: ui.UiFileBase = this.getByClassName(className);
                if (!uiFile) {
                    uiFile = new ui[className]();
                    uiFile.className = className;
                    this.uiFilePool[className] = uiFile;
                }
                return uiFile;
            }
        }

        /**
         * 获取界面
         * @param {ui.UiFile|ui.UiFileBase} UiFile 文件类名
         */
        public get(UiFile): ui.UiFileBase {
            const className: string = gDevelop.classToString(UiFile);
            if (!ui[className]) {
                return;
            } else {
                return this.uiFilePool[className];
            }
        }

        /**
         * 通过className获取界面
         * @param {string} className 文件类名
         */
        public getByClassName(className: string): ui.UiFileBase {
            return this.uiFilePool[className];
        }

        /**
         * 销毁界面
         * @param {string} className 文件类名
         */
        public destroy(className: string) {
            this.uiFilePool[className] = null;
        }

        /**
         * 获取一个UI文件（空）
         */
        private get UiFileEmpty(): ui.UiEmpty {
            if (!this.uiEmpty) {
                this.uiEmpty = new ui.UiEmpty();
            }
            return this.uiEmpty;
        }
    }
}