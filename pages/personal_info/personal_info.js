var core = getApp().globalData.core;

var mtabW;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: 0,
    userInfo: {},
    activeIndex: 0,
    slideOffset: 0,
    tabW: 0
  },
  tabClick: function (e) {
    if (this.data.activeIndex != e.currentTarget.id)
      this.setData({
        activeIndex: e.currentTarget.id,
        slideOffset: e.currentTarget.offsetLeft
      })
  },

  tabChange: function (e) {
    var current = e.detail.current;
    var offsetW = current * mtabW; //2种方法获取距离文档左边有多少距离
    this.setData({
      activeIndex: current,
      slideOffset: offsetW
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        mtabW = res.windowWidth / 3; //设置tab的宽度
        console.log(res)
        that.setData({
          tabW: mtabW
        })
      }
    });

    this.getUserInfo(options.uid)
  },

  getUserInfo(uid = 0) {
    if (uid == core.userInfo[0].uid)
      uid = 0
    let Info = core.getUserInfo(uid)
    Info.then(userInfo => {
      console.log(userInfo)
      this.setData({
        userInfo: userInfo
      })
    }).catch(err => {
      core.APIerrCode(err, 2)
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