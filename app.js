var _CONSTANT = require("./util/constant.js");
var _util = require("./util/util.js");
var _components = require("./util/component.js");
const Towxml = require('/towxml/main'); //引入towxml库

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
    // wx.checkSession({
    //   fail: function (e) {
    wx.login({
      success: function (res) {
        wx.request({
          url: _CONSTANT.API.loginStudy,
          data: {
            code: res.code
          },
          method: 'GET',
          success: function (res) {
            console.log(res)
            wx.setStorageSync('session', res.data.data.session)
          },
          fail: function () {
            console.log("登入失败")
          },
          complete: function () {
            // complete
          }
        })
      }
    })
    //   }
    // })
  },


  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    // 登入校验
    wx.checkSession({
      fail: function (e) {
        wx.login({
          success: function (res) {
            wx.request({
              url: _CONSTANT.API.loginStudy,
              data: {
                code: res.code
              },
              method: 'GET',
              success: function (res) {
                console.log(res)
                wx.setStorageSync('session', res.data.data.session)
              },
              fail: function () {
                console.log("登入失败")
              },
              complete: function () {
                // complete
              }
            })
          }
        })
      }
    })

  },
  /**
   * markdown html 转换为wxml
   */
  towxml: new Towxml(),
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