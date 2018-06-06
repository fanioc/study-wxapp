const CONSTANT = getApp().globalData.CONSTANT
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: 0,
    userInfo: {

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.uid)
    this.getUserInfo(options.uid)
  },

  getUserInfo(uid) {
    var that = this
    this.setData({ uid: uid })
    wx.request({
      url: CONSTANT.API.getUserBasicInfo,
      data: {
        session: wx.getStorageSync('session'),
        other_uid: uid
      },
      success: function (res) {
        console.log(res)
        if (res.data.errCode == 0)
          that.setData({
            userInfo: res.data.data
          })
      }
    })
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