var _CONSTANT = require("./util/constant.js");
var _util= require("./util/util.js");
var _components = require("./util/component.js");

App({
  //
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    //若无缓存的主题参数，初始化为 黑色，白色，浅灰色，顺序码0
    if (!wx.getStorageSync('theme')) {
      _util.setTheme("#000000", "#ffffff", "#e6e6e6", "0");
      console.log("setTheme");
    }

    var that = this;
    
    //登入校验
    wx.checkSession({
      fail: function (e) {
        wx.login({
          success: function (res) {
            console.log(res)
          // _util.API.loginStudy(res.code)
          wx.setStorageSync('session','0d8f73928bc5b28d45730b0d6ddcc169')
          _util.API.bindEduSys('1605990711','Cj147258!')
          }
        })
      }
    })
  },
  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  },

  //全局变量
  globalData: {
    util: _util,
    components: _components,
    CONSTANT: _CONSTANT
  }
})
