// pages/order-study/order_operate/operate.js
var _components = getApp().globalData.components;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataContent: [{ tag: 'hah', singleItems: [{ title: '我送草拟吗啊' }] }],
    marker: [
      {

        id: 1,
        latitude: 34.113893,
        longitude: 108.937504,
        width: 50,
        height: 50,
        iconPath: '/image/1.png',
        callout: { content: '第一教学楼', color: '#f85f48', bgColor: '#F5F5F5', display: 'ALWAYS' },
      },
      {

        id: 2,
        latitude: 34.115739,
        longitude: 108.932906,
        width: 50,
        height: 50,
        iconPath: '/image/2.png',
        callout: { content: '第二教学楼', color: '#f85f48', bgColor: '#F5F5F5', display: 'ALWAYS' },

      },
      {

        id: 3,
        latitude: 34.114509,
        longitude: 108.933170,
        width: 50,
        height: 50,
        iconPath: '/image/3.png',
        callout: { content: '第三教学楼', color: '#f85f48', bgColor: '#F5F5F5', display: 'ALWAYS' }
      },
      {

        id: 4,
        latitude: 34.114529,
        longitude: 108.936024,
        width: 50,
        height: 50,
        iconPath: '/image/4.png',
        callout: { content: '图书馆', color: '#f85f48', bgColor: '#F5F5F5', display: 'ALWAYS' },

      },
    ],//lly_improve
    hidden_map:false
  },
  //------------自定义部分
  markertap: function (e) {
    //console.log(e.markerId)
    var that = this;
    this.setData({hidden_map:true});
    _components.show_modal(that, 'leave_message', this.post_leave_message, '留言ing', '发送', true);
  },
  //----------------------
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