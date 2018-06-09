// pages/me/bind-edusys/bind-edusys.js
var _CONSTANT = require('../../../util/constant.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    check_code: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },



  formSubmit: function (e) {
    console.log(e)
    wx.request({
      url: _CONSTANT.API.bindEduSys,
      data: {
        check_code: e.detail.value.check_code,
        xh: e.detail.value.xh,
        psd: e.detail.value.psd,
        session: wx.getStorageSync('session')
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        
        if(res.data.errCode!=0){
          console.log(res)
          wx.showToast({
            title: res.data.data.errMsg,
            icon:"none",
            duration: 1000,
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
        else{
          wx.showToast({
            title: '绑定成功',
            duration: 1000,
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        } 
      },
      fail: function (res) {
        // console.log(res)
        // fail
      },
      complete: function (res) {
        console.log(res)
        // complete
      }
    })
  },

  changeCode:function(){
    var that = this
    wx.request({
      url: _CONSTANT.API.getCheckCode,
      data: {
        session: wx.getStorageSync('session')
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res)
        that.setData({
          check_code: res.data.data.check_code
        })
        console.log(that.data.check_code)
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.request({
      url: _CONSTANT.API.getCheckCode,
      data: {
        session: wx.getStorageSync('session')
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res)
        that.setData({
          check_code: res.data.data.check_code
        })
        console.log(that.data.check_code)
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})