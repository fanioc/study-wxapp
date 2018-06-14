var core = getApp().globalData.core;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    theme: { nav: "xxx" }
  },

  toBindSys: function () {
    wx.navigateTo({
      url: 'binds/bind-edusys'

    })
  },

  toPersonal: function () {
    var that = this
    wx.navigateTo({
      url: '../personal_info/personal_info?uid=' + getApp().globalData.me.uid
    })
  },

  toScore: function () {
    wx.navigateTo({
      url: 'score/score'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ userInfo: core.userInfo[0] })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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