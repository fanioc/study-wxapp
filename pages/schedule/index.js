// pages/schedule/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    config: {
      tableHead: {
        week: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        date: [23, 24, 25, 26, 27, 28, 29],
        time: ["08:00", "09:00", "10:00", "11:00", "14:10", "15:10", "16:10", "17:10", "19:00", "20:00"]
      },
      currentWeek: 8,
    },
    color: ["ffcccc", '15a892', 'e6ccff', 'cce6ff', 'ffbf80','80bfff'],
    currentCourse:[{}]
  },
  
  //测试数据
  getTerm: {
    year: 2018,
    week: 8
  },
  getSche: [
    {
      'className': '高等数学',
      'time': [1, 1, 3],// 数据格式：星期,第几节,第几节课
      'week': [1, 18, 1],// 数据格式：所有单双周0 1 2,第几周,第几周
      'location': '一号教学楼101'
    }, {
      'className': '大学英语',
      'time': [2, 1, 2],
      'week': [2, 2, 18],
      'location': '一号教学楼101'
    }, {
      'className': '大学英语2',
      'time': [2, 3, 4],
      'week': [2, 2, 18],
      'location': '一号教学楼101'
    }, {
      'className': '大学英语2',
      'time': [2, 5, 7],
      'week': [2, 2, 18],
      'location': '一号教学楼101'
    }, {
      'className': '数据库概论',
      'time': [3, 4, 5],
      'week': [1, 1, 18],
      'location': '一号教学楼101'
    }, {
      'className': '形势政策',
      'time': [4, 5, 6],
      'week': [2, 5, 18],
      'location': '一号教学楼101'
    }, {
      'className': '计算机网络',
      'time': [5, 1, 2],
      'week': [0, 1, 9],
      'location': '一号教学楼101'
    }
  ],



  changeWeek: function () {

  },

  setCurrentSche: function (getSche) {
    var that = this
    that.data.currentCourse = new Array

    var i = 0;
    while ("undefined" != typeof getSche[i]) {
      var id = (getSche[i].time[0] ) * 10 + getSche[i].time[1] //表示课程id
      
      that.data.currentCourse[id]={
        'className': getSche[i].className,
        'time': getSche[i].time,
        'lengthTime': getSche[i].time[2] - getSche[i].time[1] + 1,
        'week': getSche[i].week,
        'location': getSche[i].location
      }
      i++;
    }
    this.setData({
      currentCourse: that.data.currentCourse
    })

    console.log(this.data.currentCourse)
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
    this.setCurrentSche(this.getSche)
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