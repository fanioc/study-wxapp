var core = getApp().globalData.core;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: {}
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

  getScore: function () {
    let Req = core.APIrequest('getUserScore', {
      xn: '2017-2018',
      xq: '1'
    })

    Req.then((result) => {
      this.setData({
        score: result
      })
    }).catch((err) => {
      if (err == 3107)
        this.updateScore()
    });
  },

  updateScore: function () {
    let Req = core.APIrequest('updateUserEduScore')
    Req.then((result) => {
      this.getScore()
    }).catch((err) => {
      core.APIerrCode(err, 2)
    });
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