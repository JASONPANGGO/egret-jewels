/**
 * 多语言响应式接口管理器
 * @version 当前版本: 1.1
 * @description 多语言自适应Playable，所有处理接口管理器
 * @author JingBin.Zhu
 */
var languagesMgr;

(function (languagesMgr) {

    /** 打印版本信息 */
    var version = "1.1";
    var args = [
        '%c %c %c languagesMgr v' + version + ' %c %c ',
        'background: #6fbf64',
        'background: #4aa23e',
        'color: #ffffff; background: #0f7817;',
        'background: #4aa23e',
        'background: #6fbf64'
    ];
    console.log.apply(console, args);

    /** 当前使用语言 */
    languagesMgr.language = window.navigator.language.toLowerCase();

	/**
	 * 获取资源
	 */
    languagesMgr.getRes = function () {
        var res;
        if (window["RES"] && RES.getRes) {
            //Egret
            res = RES.getRes("languages_json");
        } else if (window["Laya"] && Laya.loader && Laya.loader.getRes) {
            //Laya
            res = Laya.loader.getRes("resource/config/languages.json");
        } else if (window["game"] && game.cache && game.cache.getJSON) {
            //PlaySmart | Phaser
            res = game.cache.getJSON("languages");
        } else {
            if (lang.search("zh") !== -1) {
                console.warn('未找到获取JSON资源接口函数！');
            } else {
                console.warn('The fetch JSON resource interface function was not found!');
            }
        }
        return res;
    };

	/** 
	 * 获取对应语言版本文案
	 * @param {string} key 对应文案，配置中的key
	 * @param {string} lang 语言
	 */
    languagesMgr.getLangCfg = function (key, lang) {
        var res = languagesMgr.getRes();

        if (!res) {
            return;
        }
        var languages = res.languages;
        if (!languages) {
            return;
        }
        var cfg = languages[lang];
        if (!cfg) {
            //使用简写语言
            var idx = lang.indexOf("-");
            if (idx !== -1) {
                //使用简写语言
                //截取简写语言，如：cn-zh ==> cn
                var _lang = lang.slice(0, idx);

                if (lang.search("zh") !== -1) {
                    console.info('没有对应“' + lang + '”语言配置！使用“' + _lang + '”语言配置');
                } else {
                    console.info('There is no corresponding "' + lang + '" language configuration! Use the "' + _lang + '" language configuration.');
                }

                cfg = languages[_lang];
            }
        }
        if (!cfg) {
            return;
        }
        return cfg[key];
    };

	/** 
	 * 获取当前语言版本文案
	 * @param {string} key 对应文案，配置中的key
	 */
    languagesMgr.getCfg = function (key) {
        var language = languagesMgr.language;
        var cfg = languagesMgr.getLangCfg(key, language);

        if (!cfg) {
            //使用默认语言
            if (language.search("zh") != -1) {
                console.info('没有对应“' + language + '”语言配置，或配置有误！使用“默认”语言配置。');
            } else {
                console.info('There is no corresponding "' + language + '" language configuration, or the configuration is wrong! Use the "default" language configuration.');
            }

            var res = languagesMgr.getRes();
            cfg = languagesMgr.getLangCfg(key, res.fallbackLocale);
        }
        if (!cfg || typeof cfg !== "object") {
            if (language.search("zh") != -1) {
                console.error('没有对应“' + language + '”语言配置有误！请检查配置文件中 Key 为 ' + key + ' 的配置。');
            } else {
                console.error('There is no corresponding "' + language + '" language configuration error! Please check the configuration file for Key ' + key + '.');
            }
            return;
        }
        return cfg;
    };

	/**
	 * 根据配置中的key，更新当前文本标签
	 * @param {eui.Label} label 需要更新的文本标签
	 * @param {string} key 对应文案，配置中的key
	 */
    languagesMgr.updateLabel = function (label, key) {
        if (!label) {
            return;
        }
        var cfg = languagesMgr.getCfg(key);
        if (!cfg) {
            return;
        }

        /* =========== 文本值-start =========== */
        //Egret | Laya | PlaySmart | Phaser
        label.text = cfg.value;
        /* =========== 文本值-start =========== */

        /* =========== 文本样式-start =========== */
        var style = cfg.style;
        if (!style) {
            return;
        }

        //字体大小
        var fontSize = style.fontSize;
        if (fontSize != void 0) {
            fontSize = Math.max(fontSize, 0);
            if (typeof label.size === "number") {
                //Egret
                label.size = fontSize;
            } else if (typeof label.fontSize === "number") {
                //Laya | PlaySmart | Phaser
                label.fontSize = fontSize;
            }
        }
        //字体颜色
        var color = style.color;
        if (color != void 0) {
            if (typeof label.textColor === "number") {
                //Egret
                var colorNum = parseInt(color.slice(1), 16);
                if (colorNum != void 0) {
                    label.textColor = colorNum;
                }
            } else if (typeof label.color === "string") {
                //Laya
                label.color = color;
            } else if (typeof label.color === "object" && qc && qc.Color) {
                //PlaySmart
                label.color = new qc.Color(color);
            } else if (typeof label.fill === "string") {
                //Phaser
                label.fill = color;
            }
        }
        //边框大小
        var stroke = style.stroke;
        if (stroke != void 0) {
            stroke = Math.max(stroke, 0);
            if (typeof label.stroke === "number") {
                //Egret | Laya
                label.stroke = stroke;
            } else if (typeof label.strokeThickness === "number") {
                //PlaySmart | Phaser
                label.strokeThickness = stroke;
            }
        }
        //边框颜色
        var strokeColor = style.strokeColor;
        if (strokeColor != void 0) {
            if (typeof label.strokeColor === "number") {
                //Egret
                var strokeColorNum = parseInt(strokeColor.slice(1), 16);
                if (strokeColorNum != void 0) {
                    label.strokeColor = strokeColorNum;
                }
            } else if (typeof label.strokeColor === "string") {
                //Laya
                label.strokeColor = strokeColor;
            } else if (typeof label.stroke === "object" && qc && qc.Color) {
                //PlaySmart
                label.stroke = new qc.Color(strokeColor);
            } else if (typeof label.stroke === "string") {
                //Phaser
                label.stroke = strokeColor;
            }
        }
        /* =========== 文本样式-end =========== */
    };

})(languagesMgr || (languagesMgr = {}));