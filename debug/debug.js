var core = getApp().globalData.core;

Page({

  /**
   * 页面的初始数据
   */
  data: {
 
  },
  //-------------
  asd: function () {
    // getCurrentPages();
    //var asda = this.bindItemTap;
    _components.show_mToast('完成评价');
    //this.lly(asda);
    //this.a(asda);

    //getCurrentPages()[0].setData({ hah:  function () { console.log('asda');return true; } });
    //getCurrentPages()[0].data.hah();
    //console.log(this.data.hah());
    //console.log(getCurrentPages()[0].a);
  },
  lly: function (call) {
    call();
  },
  bindItemTap: function () {
    wx.navigateTo({
      url: '../answer/answer'
    })
  },
  a: function () {
    console.log('llllly', getCurrentPages());
    wx.navigateTo({
      url: '/pages/community/index'
    })

  },
  //------------
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    let me = core.getUserConfig();
    me.then(res => { console.log(' 666', res) });
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
    this.setData({
      study_fresh: !this.data.study_fresh
    });

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