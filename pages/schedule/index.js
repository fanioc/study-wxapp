// pages/schedule/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //测试数据
    term: {
      year: 2018,
      week: 8
    },
    sche: [
      {
        'className': '高等数学',
        'timeable': '1|1-2',// 数据格式：星期|第几节-第几节课
        'week': '1-18|0',// 数据格式：第几周-第几周|所有单双周0 1 2
        'location': '一号教学楼101'
      }, {
        'className': '大学英语',
        'timeable': '2|1-2',
        'week': '2-18|2',
        'location': '一号教学楼101'
      }, {
        'className': '数据库概论',
        'timeable': '3|1-2',
        'week': '1-18|1',
        'location': '一号教学楼101'
      }, {
        'className': '形势政策',
        'timeable': '4|1-2',
        'week': '5-18|2',
        'location': '一号教学楼101'
      }, {
        'className': '计算机网络',
        'timeable': '5|1-2',
        'week': '1-9|8',
        'location': '一号教学楼101'
      }
    ],


  },
  changeWeek: function () {

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