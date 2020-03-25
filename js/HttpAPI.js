var __reflect = (this && this.__reflect) || function (p, c, t) {
  p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
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
    var self = this;
    if (param === void 0) { param = null; }
    var rid = window["request_id"];
    if (rid == undefined) {
      return;
    }
    var unit_id = window["unit_id"];
    var network_type = window["network_type"];
    var cid = window["cid"];
    var endscreen_type = window["endscreen_type"];
    var deviceid = window["deviceid"];
    var devicetype = window["devicetype"];
    var paramstr = "";

    var sScreenSize = window.screen.width + 'x' + window.screen.height;

    function getUrlName() {
      var aPath = location.pathname.split('/'),
        nLength = aPath.length;
      return aPath[nLength - 1].replace('.html', '');
    }
    
    try {
      var sUrlName = MTGMaterialUUID;
    } catch (error) {
      var sUrlName = getUrlName();
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
            sec: nTime * 3
          }
          aPoints = []
          HttpAPI.HttpGET("http://playable-stats.mintegral.com/click", obj2query(oPostData));
        }
      }, 3000)
    } else {
      var params = "point=" + pointName + paramstr + "&mid=" + sUrlName + "&rid=" + rid + "&key=" + devicetype + "&unit_id=" + unit_id + "&network_type=" + network_type + "&cid=" + cid + "&endscreen_type=" + endscreen_type + "&deviceid=" + deviceid;
      HttpAPI.HttpGET("http://playable-stats.mintegral.com", params);
    }
  };

  return HttpAPI;
}());
__reflect(HttpAPI.prototype, "HttpAPI");
//# sourceMappingURL=HttpAPI.js.map