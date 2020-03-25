var sLoadingSrc = "js/loading.gif";

function addPlaceholder() {
  var div = document.createElement("div");
  div.id = "loader-placeholder";
  window.document.body.appendChild(div);
}

function fnGetScale() {
  if (document.getElementsByTagName('meta') && document.getElementsByTagName('meta').viewport && document.getElementsByTagName('meta').viewport.content) {
    if (document.getElementsByTagName('meta').viewport.content.replace(/ /g, '').indexOf('initial-scale=0.5') !== -1) {
      return 2;
    } 
    else 
    {
      return 1;
    }
  } else {
    return 1;
  }
}

// 增加占位符
addPlaceholder();
/*正常情况下调用addECLoading(); 
如果是某些特殊的竖屏的界面就调用addECLoading_forcePortrait();
addECLoading();和addECLoading_forcePortrait();调用其中一个即可
*/
addECLoading();
//addECLoading_forcePortrait();

function fnIsPortrait() {
  var isOrientation = ('orientation' in window && 'onorientationchange' in window),
    meta = ''
  if (isOrientation) {
    if (orientation === 180 || orientation === 0) {
      meta = 'portrait';
    }
    if (orientation === 90 || orientation === -90) {
      meta = 'landscape';
    }
  } else {
    if (window.innerWidth > window.innerHeight) {//初始化判断
      meta = 'landscape';
    } else {
      meta = 'portrait';
    }
  }
  return meta === 'portrait';
}

function addECLoading(forcePortrait) {
  var div = document.createElement("div");
  div.id = "newloader";
  div.className = "loading";
  window.document.getElementById('loader-placeholder').appendChild(div);
  var img = document.createElement("img");
  img.src = sLoadingSrc;
  var _w = 100 * fnGetScale();
  img.width = _w;
  img.height = _w;
  
  div.appendChild(img);
  var span = document.createElement('span');
  span.innerHTML = 'Loading...';
  div.appendChild(span);
  var style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = "#loader-placeholder.f-dn{display:none}#loader-placeholder{z-index:100000;position:fixed;left:0;right:0;top:0;bottom:0;background:#000;-webkit-transition:opacity 1s ease-in-out;-moz-transition:opacity 1s ease-in-out;-ms-transition:opacity 1s ease-in-out;-o-transition:opacity 1s ease-in-out;opacity:1}#loader-placeholder.s-hide{opacity:0}#newloader{width:230px;height:246px;position:absolute;top:50%;left:50%;margin-left:-115px;margin-top:-123px;z-index:1;color:#fff;font-weight:700;font-family:Arial,sans-serif;font-size:20px}#newloader img{width:"+_w+"px}#newloader *{display:block;margin:20px auto}#newloader .fallback,#newloader .icon{border-radius:10px;width:122px;height:122px}#newloader .fallback{background-size:122px 122px}#newloader .icon{background-size:122px 122px}#newloader span{text-align:center}#loader{display:none}.eCLoading_forcePortrait{margin-left: -123px; margin-top: -115px;transform:rotate(90deg);-ms-transform:rotate(90deg);-webkit-transform:rotate(90deg);-moz-transform:rotate(90deg);-o-transform:rotate(90deg);}";
  window.document.head.appendChild(style);
  if (!forcePortrait) {

  } else {
    document.getElementById('newloader').className = 'eCLoading_forcePortrait';
  }
}

function addECLoading_forcePortrait() {
  var forcePortrait = fnIsPortrait() == true ? true : false;
  addECLoading(forcePortrait);
}

/**
 * http API 上报逻辑代码
 */
var HttpAPI = (function () {
  function HttpAPI() {
  }
  /**
   * HTTP GET
   * @param path          请求路径
   * @param param         参数列表
   * @param onComplete    请求成功回调
   * @param onIOError     请求失败回调
   * @param thisObj       this目标
   */
  HttpAPI.HttpGET = function (path, param) {
    var url = param ? path + "?" + param : path;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  };

  /****
   * @param pointName 埋点类型
   * @param param 携带数据 如果没有就为空 格式：{stay_length：123,action:3}
   */
  HttpAPI.sendPoint = function (pointName, param) {
    if (param === void 0) { param = null; }
    var rid = window["request_id"];
    var cid = window["cid"];
    if (cid == undefined && pointName !== 'error' && pointName !== 'pv' && pointName !== 'errorstart') {
      return;
    }
    var unit_id = window["unit_id"];
    var network_type = window["network_type"];

    var endscreen_type = window["endscreen_type"];
    var deviceid = window["deviceid"];
    var devicetype = window["devicetype"];
    var paramstr = "";
    var playable_ads_video_status = window.playable_ads_without_video

    var sScreenSize = window.screen.width + 'x' + window.screen.height;

    try {
      var sUrlName = MTGMaterialUUID;
    } catch (error) {
      var sUrlName = false;
    }

    function obj2query(obj) {
      var arr = [];
      for (var key in obj) {
        arr.push(key + '=' + encodeURIComponent(obj[key] || ''))
      }
      return arr.join('&')
    }

    if (param != null) {
      for (var key in param) {
        paramstr += "&" + key + "=" + param[key];
      }
    }
    // 判断是否是sdk的环境
    function checkIsSDK() {
      var boolean = false;
      if (location.href.indexOf('qa_task') === -1 && sUrlName) {
        boolean = true
      }
      return boolean
    }
    // 只有存在MTGMaterialUUID的值才会上报
    if (checkIsSDK()) {
      if (pointName === 'heatmap') {
        var aPoints = []
        document.addEventListener('touchstart', function (e) {
          var x = e.changedTouches[0].clientX,
            y = e.changedTouches[0].clientY;
          aPoints.push(x + ',' + y)
        }, true)
        var nTime = 0;
        setInterval(function () {
          nTime++
          if (aPoints.length) {
            var oPostData = {
              size: sScreenSize,
              points: aPoints.join('|'),
              pf: devicetype,
              network_type: network_type,
              cid: cid,
              mid: sUrlName,
              sec: nTime * 2
            }
            aPoints = []
            HttpAPI.HttpGET("http://playable-stats.mintegral.com/click", obj2query(oPostData));
          }
        }, 2000)
      } else {
        if (pointName === 'error') {
          window.addEventListener('error', function (event) {
            var oMsg = {
              mid: sUrlName,
              message: event.message,
              url: location.href,
              line: event.lineno,
              col: event.colno,
              error: event.error ? event.error.stack : ''
            }
            HttpAPI.HttpGET("http://playable-stats.mintegral.com/err-report", obj2query(oMsg));
            return false;
          }, false)
        } else if (pointName === 'pv') {
          var oMsg = {
            point: 'pv',
            mid: sUrlName
          }
          HttpAPI.HttpGET("http://playable-stats.mintegral.com/pv", obj2query(oMsg));
        } else if (pointName === 'errorstart') {
          var oMsg = {
            point: 'errorstart',
            mid: sUrlName
          }
          HttpAPI.HttpGET("http://playable-stats.mintegral.com/err-report", obj2query(oMsg));
        } else {
          var params = "point=" + pointName + paramstr + '&playable_ads_without_video=' + playable_ads_video_status + "&mid=" + sUrlName + "&rid=" + rid + "&key=" + devicetype + "&unit_id=" + unit_id + "&network_type=" + network_type + "&cid=" + cid + "&endscreen_type=" + endscreen_type + "&deviceid=" + deviceid;
          HttpAPI.HttpGET("http://playable-stats.mintegral.com", params);
        }
      }
    }
  };
  return HttpAPI;
}());

// 为window.error绑定error事件
HttpAPI.sendPoint("error");
HttpAPI.sendPoint("pv");
