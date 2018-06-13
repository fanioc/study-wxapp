var core = getApp().globalData.core;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    score:{}
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
    this.getScore()
  },
  
  getScore:function(){
    var that = this;
    wx.request({
      url: CONSTANT.API.getUserScore,
      data: {
        session: wx.getStorageSync('session'),
        xn: '2017-2018',
        xq: '1'
      },
      success: function (res) {
        if (res.data.errCode > 0){
          that.updateScore();
          return;
        }
          that.setData({
            score: res.data.data
          })
      }

    })
  },

  updateScore:function(){
    var that = this;
    wx.request({
      url: CONSTANT.API.updateUserEduScore,
      data: {
        session: wx.getStorageSync('session')
      },
      success: function () {
        that.getScore()
      }
    })
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