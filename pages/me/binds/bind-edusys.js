var core = getApp().globalData.core;

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
    let Req = core.APIrequest('bindEduSys', {
      check_code: e.detail.value.check_code,
      xh: e.detail.value.xh,
      psd: e.detail.value.psd,
    })
    Req.then((result) => {
      if (typeof (result.name) != 'undefined') {
        wx.showToast({
          title: '绑定成功，欢迎' + result.name + '！',
          icon: "success",
          duration: 1000,
          mask: true
        })
        wx.navigateBack({
          delta: 1,
          success: () => {
            //TODO::更新绑定设置
          }
        })
      } else if (typeof (result.msg) != 'undefined') {
        this.changeCode()
        wx.showToast({
          title: result.msg,
          icon: "none",
          duration: 1000,
          mask: true
        })
      }
    }).catch((err) => {
      APIerrCode(err, 2)
    });
  },

  changeCode: function () {
    let Req = core.APIrequest('getCheckCode')
    Req.then((result) => {
      this.setData({
        check_code: result.check_code
      })
    }).catch((err) => {
      APIerrCode(err, 2)
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.changeCode()
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