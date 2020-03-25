//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {
    /**
     * 加载进度界面
     * loading process interface
     */
    // private loadingView: LoadingUI;

    private gameScene: scene.GameScene;
    // public static Scale: number;
    private canshow: boolean = false;
    private showGameed: boolean; //游戏是否已展示

    protected createChildren(): void {
        super.createChildren();
        //inject the custom material parser
        //注入自定义的素材解析器
        window["app"] = GameMgr.main = this;
        this.createGame();
    }

    //webviewshow通知展示游戏
    private showGame(): void {
        if (this.showGameed) {
            return;
        }
        this.showGameed = true;
        // gSoundMgr.ding();
        this.canshow = true;
        if (this.isThemeLoadEnd && this.isResourceLoadEnd && this.canshow) {
            this.startCreateScene();
        }
    }

    private createGame(): void {
        gSoundMgr.init();
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        //Config loading process interface
        //设置加载进度界面
        // this.loadingView = new LoadingUI();
        //this.stage.addChild(this.loadingView);
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
        GameMgr.stage = this.stage;
        var lan: string = egret.getOption("lan");
        if (lan) {
            GameMgr.lan = lan;
        }
    }

    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        let theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
        // RES.setMaxLoadingThread(4);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        // RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
        // RES.loadGroup("preload_1");
    }
    private isThemeLoadEnd: boolean = false;
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the 
     */
    private onThemeLoadComplete(): void {
        this.isThemeLoadEnd = true;
        this.createScene();
    }
    private isResourceLoadEnd: boolean = false;
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.isResourceLoadEnd = true;
            this.createScene();
            // } else if (event.groupName == "preload_1") {
            // this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            // RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        }
    }
    private createScene() {
        if (this.isThemeLoadEnd && this.isResourceLoadEnd) {
            Mapi.gameReady();
            if (this.canshow) {
                this.startCreateScene();
            }
        }
    }
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent): void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    // private onResourceProgress(event: RES.ResourceEvent): void {
    //     // if (event.groupName == "preload") {
    //         // this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
    //     // }
    // }
    // private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected startCreateScene(): void {
        if (!this.gameScene) {
            GameMgr.init();
            GameMgr.gameScene = this.gameScene = new scene.GameScene();
            this.gameScene.open();
        }
        // Mapi.gameRetry();

        // gSoundMgr.playBgMusic();
        // gSoundMgr.regEvent();    

        // egret.startTick(this.dbrun, this);
    }

    // private dbrun(timeStamp: number): boolean {
    //     dragonBones.WorldClock.clock.advanceTime(0.02);
    //     return true;
    // }
}