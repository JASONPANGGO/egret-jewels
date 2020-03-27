
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/expand/config/config.js",
	"libs/expand/const/const.js",
	"libs/modules/print/print.js",
	"libs/modules/interface_ahead/interface_ahead.js",
	"libs/modules/webaudio/webaudio.js",
	"libs/modules/interface/interface.js",
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"libs/modules/game/game.js",
	"libs/modules/particle/particle.js",
	"libs/modules/dragonBones/dragonBones.js",
	"bin-debug/com/base/ComFileBase.js",
	"bin-debug/ui/base/UiFileBase.js",
	"bin-debug/util/GuideMgr.js",
	"bin-debug/scene/base/GameBase.js",
	"bin-debug/util/UiMgr.js",
	"bin-debug/util/AutoId.js",
	"bin-debug/com/base/ComFile.js",
	"bin-debug/util/ComMgr.js",
	"bin-debug/ui/base/UiFile.js",
	"bin-debug/util/MathMgr.js",
	"bin-debug/util/ScreenMovies.js",
	"bin-debug/util/SoundMgr.js",
	"bin-debug/util/TweenMgr.js",
	"bin-debug/util/DevelopMgr.js",
	"bin-debug/com/inherent/ComLight.js",
	"bin-debug/com/inherent/ComProgress.js",
	"bin-debug/const/G_Const.js",
	"bin-debug/data/FirstData.js",
	"bin-debug/data/FloatData.js",
	"bin-debug/data/McData.js",
	"bin-debug/global/globalMgr.js",
	"bin-debug/item/base/ItemGroupBase.js",
	"bin-debug/item/base/ItemImgBase.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/main/GameMgr.js",
	"bin-debug/main/Mapi.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/scene/inherent/GameScene.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/ui/base/UiEmpty.js",
	"bin-debug/com/ComGrid.js",
	"bin-debug/com/common/ComBones.js",
	"bin-debug/ui/inherent/UiFirst.js",
	"bin-debug/ui/inherent/UiStart.js",
	"bin-debug/com/common/ComLightMask.js",
	"bin-debug/util/CameraMgr.js",
	"bin-debug/util/CollisionUitls.js",
	"bin-debug/com/common/ComMovieClip.js",
	"bin-debug/com/common/ComParticle.js",
	"bin-debug/util/FloatMgr.js",
	"bin-debug/com/common/ComParticleImitate.js",
	"bin-debug/com/common/ComScar.js",
	"bin-debug/util/P2DebugDraw.js",
	"bin-debug/util/ParticleMgr.js",
	"bin-debug/com/inherent/ComBubble.js",
	"bin-debug/util/ShakeTool.js",
	"bin-debug/com/inherent/ComFloat.js",
	"bin-debug/util/StarMgr.js",
	"bin-debug/com/inherent/ComGuide.js",
	"bin-debug/com/base/ComEmpty.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 60,
		scaleMode: "fixedWidth",
		contentWidth: 750,
		contentHeight: 750,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:16,textColor:0xffffff,bgAlpha:0.3",
		showLog: false,
		logFilter: "",
		maxTouches: 1,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};