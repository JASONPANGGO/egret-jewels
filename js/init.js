var closeTime = 15000;
var endscreen_type;
var cid;
var unit_id;
var deviceid;
var network_type;
var request_id;
var devicetype;
var adType;
// webview 展示的时候执行的事件，放引导方法、开场动画等等
function showView() {  
  setTimeout(function () {
    document.getElementById('loader-placeholder').className = 'f-dn'
  }, 2000);

  window["app"].showGame();
}
function gameEnd()
{

}

function fnAddLogo() {
  var div = document.createElement("div");
  div.id = "MV_logo";
  div.className = "loading";
  window.document.body.appendChild(div);
  var img = document.createElement("img");
  img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIkAAAAjCAYAAACgoylBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEIyMzJENEVGNDIwMTFFN0FGNEM5QzE2M0E1NjBBOEUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEIyMzJENERGNDIwMTFFN0FGNEM5QzE2M0E1NjBBOEUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5OENCMkUyQ0IyRTYxMUU3OTFBOEM0OTU1MDE4N0YyRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5OENCMkUyREIyRTYxMUU3OTFBOEM0OTU1MDE4N0YyRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PorMyaQAAA8oSURBVHja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";

  div.appendChild(img);
  img.width = 96;
  var style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = "#MV_logo {z-index: 9999;position: absolute;right:0px;bottom:0px;}#MV_logo.s-left {left:0px;right:auto;}#MV_logo.s-center {left:50%;margin-left:-48px;right:auto;}#MV_logo.s-alwaysRight{left:0;right:auto;bottom:96px;transform:rotate(90deg);transform-origin:0% 100%;-ms-transform:rotate(90deg);-ms-transform-origin:0% 100%;-webkit-transform:rotate(90deg);-webkit-transform-origin:0% 100%;-moz-transform:rotate(90deg);-moz-transform-origin:0% 100%;-o-transform:rotate(90deg);-o-transform-origin:0% 100%}#MV_logo.s-alwaysLeft{left:0;right:auto;bottom:auto;top:-30px;transform:rotate(90deg);transform-origin:0% 100%;-ms-transform:rotate(90deg);-ms-transform-origin:0% 100%;-webkit-transform:rotate(90deg);-webkit-transform-origin:0% 100%;-moz-transform:rotate(90deg);-moz-transform-origin:0% 100%;-o-transform:rotate(90deg);-o-transform-origin:0% 100%}#MV_logo.s-alwaysCenter{left:0;right:auto;bottom:50%;margin-bottom:48px;transform:rotate(90deg);transform-origin:0% 100%;-ms-transform:rotate(90deg);-ms-transform-origin:0% 100%;-webkit-transform:rotate(90deg);-webkit-transform-origin:0% 100%;-moz-transform:rotate(90deg);-moz-transform-origin:0% 100%;-o-transform:rotate(90deg);-o-transform-origin:0% 100%}";
  window.document.head.appendChild(style);
}

// logo放置左下角
function fnSetLogoLeft() {
  document.getElementById('MV_logo').className = 's-left';
}

// logo放置底部中间
function fnSetLogoCenter() {
  document.getElementById('MV_logo').className = 's-center';
}
/* logo强制放置的意思就是指某些特殊的情况：
 * 用户加载游戏的时候竖屏，游戏加载完之后内容会按照横屏的样式显示
 * 
*/
// logo强制放置右下角
function fnSetLogoAlwayRight() {
  if (fnIsPortrait()) {
    document.getElementById('MV_logo').className = 's-alwaysRight';
  }
}

// logo强制放置左下角
function fnSetLogoAlwayLeft() {
  if (fnIsPortrait()) {
    document.getElementById('MV_logo').className = 's-alwaysLeft';
  } else {
    fnSetLogoLeft()
  }
}

// logo强制放置底部中间
function fnSetLogoAlwayCenter() {
  if (fnIsPortrait()) {
    document.getElementById('MV_logo').className = 's-alwaysCenter';
  } else {
    fnSetLogoCenter()
  }
}

fnAddLogo()

document.addEventListener('DOMContentLoaded', function () {
  eventInit();
  toggleCloseBtn2();
  toggleBounces();
  showView();
}, false)


function getAdType()
{
	//MTG_AD_TYPE_UNKNOWN = 0,
    //MTG_AD_TYPE_BANNER = 2,
    //MTG_AD_TYPE_APPWALL = 3,
    //MTG_AD_TYPE_INTERSITIAL = 29,
    //MTG_AD_TYPE_NATIVE = 42,
    //MTG_AD_TYPE_REWARDVIDEO = 94,
    //MTG_AD_TYPE_OFFERWALL = 278,
    //MTG_AD_TYPE_INTERSITIAL_SDK = 279,
    //MTG_AD_TYPE_INTERSITIAL_VIDEO = 287,
    //MTG_AD_TYPE_INTERACTIVE = 288,
	if(adType)
	{
		return adType;
	}
	return 0;
}

var campaignMap = {}
function eventInit() {
  //alert("初始化");
  console.log("初始化")

  mv_utils.hybirdEvent({
    sClass: 'RewardJs',
    hybirdFn: 'getEndScreenInfo',
    params: {
      pageNo: 1,
      exclude_ids: []
    },
    succ: function (res) {
      //alert("初始化成功");
      if (res.campaignList && res.campaignList.length) {
        if (location.protocol === 'https:') {
          mv_utils.http2https(res);
        }
        var campaign = res.campaignList[0];
        campaignMap[campaign['id']] = campaign;
		adType = campaign.adType;
        document.body.setAttribute('campaignId', campaign.id);

        var device = res.device;
        endscreen_type = "H5";
        cid = campaign.id;
        unit_id = res.unit_id;
        var urlob = urlParse(campaign.notice_url);
        if (urlob) {
          request_id = urlob.k;//再解析
        }
        if (device) {
          network_type = device.network_type;
          deviceid = device.idfa;
          devicetype = device.plantform;
        } else {
          devicetype = "android";
        }
      } else {
        // me.noData()
      }
    },
    err: function (err) {
      // me.noData()
    }
  })

  document.addEventListener('webviewshow', function () {
    console.log("30秒后关闭按钮出现")
    HttpAPI.sendPoint("start");
    HttpAPI.sendPoint('heatmap');
    showView()
    setTimeout(function () {
      toggleCloseBtn();
    }, closeTime);
  }, false)
}

function urlParse(url) {
  var arr = [], obj = {};
  if (url.indexOf('?') != -1) {
    var parseStr = url.split("?")[1];
    if (parseStr.indexOf("&") != -1) {
      arr = parseStr.split("&");
      for (var i = 0; i < arr.length; i++) {
        obj[arr[i].split("=")[0]] = arr[i].split("=")[1];
      }
    } else {
      obj[parseStr.split("=")[0]] = parseStr.split("=")[1];
    }
  }
  return obj;
}

function toggleCloseBtn2() {
  console.log("提示sdk不要出现关闭按钮")
  mv_utils.hybirdEvent({
    sClass: 'RewardJs',
    hybirdFn: 'toggleCloseBtn',
    params: {
      "state": 2 // 不出现
    },
    succ: function (res) {

    },
    err: function () {
      // util.tips('Sorry, network error...');
    }
  })
}

function install() {
  HttpAPI.sendPoint("click_install");
  console.log("安装软件")
  var campaignId = document.body.getAttribute('campaignId')
  mv_utils.hybirdEvent({
    sClass: 'RewardJs',
    hybirdFn: 'install',
    params: campaignMap[campaignId], // offerId
    succ: function (res) {
      console.log(res)

    },
    err: function () {
      // util.tips('Sorry, network error...');
    }
  })
}

function toggleBounces() {
  console.log("toggleBounces")
  mv_utils.hybirdEvent({
    sClass: 'RewardJs',
    hybirdFn: 'toggleBounces',
    params: {
      "state": 0
    },
    succ: function (res) {

    },
    err: function () {
      // util.tips('Sorry, network error...');
    }
  })
}

function toggleCloseBtn() {

  console.log("出现关闭按钮")
  mv_utils.hybirdEvent({
    sClass: 'RewardJs',
    hybirdFn: 'toggleCloseBtn',
    params: {
      "state": 1 // 出现
    },
    succ: function (res) {

    },
    err: function () {
      // util.tips('Sorry, network error...');
    }
  })
}

//覆盖原始方法
function doSomething() {
  install()
}

//移除关闭按钮方法
(function () {
  //关闭按钮dom汇总
  var closeDom = ['#mintegral-close', '.exit-button-clickable-area']
  for (var i = 0; i < closeDom.length; i++) {
    var self = document.querySelector(closeDom[i])
    self && self.parentElement.removeChild(self)
  }

  //移除replay按钮，脚页内容，信息容器等
  var replayDom = ['#mintegral-replay', "#mintegral-footer", ".message-container"]
  for (var i = 0; i < replayDom.length; i++) {
    var self = document.querySelector(replayDom[i])
    self && self.parentElement.removeChild(self)
  }
})()