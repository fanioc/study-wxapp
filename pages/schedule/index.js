// pages/schedule/index.js
var util = getApp().globalData.util;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    config: {
      tableHead: {
        week: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        date: [28, 29, 30, 31, 1, 2, 3],
        time: ["08:00", "09:00", "10:00", "11:00", "14:10", "15:10", "16:10", "17:10", "19:00", "20:00"]
      },
      currentWeek: 15,
    },
    color: ["ffcccc", '15a892', 'e6ccff', 'cce6ff', 'ffbf80', '80bfff'],
    currentCourse: [{}],

    //测试数据
    getTerm: {
      year: 2018,
      week: 14
    },
    getSche: [
      {
        'class_name': '高等数学',
        'time': [1, 1, 3],// 数据格式：星期,第几节,第几节课
        'week': [1, 18, 1],// 数据格式：所有单双周0 1 2,第几周,第几周
        'teacher': "陈靖",
        'location': '一号教学楼101'
      }, {
        'class_name': '大学英语',
        'time': [2, 1, 2],
        'week': [2, 2, 18],
        'teacher': "陈靖",
        'location': '一号教学楼201'
      }, {
        'class_name': '大学英语2',
        'time': [2, 3, 4],
        'week': [2, 2, 18],
        'teacher': "陈靖",
        'location': '二号教学楼301'
      }, {
        'class_name': '自习(已约人)',
        'time': [2, 5, 7],
        'week': [2, 2, 18],
        'teacher': "陈靖",
        'location': '一号教学楼301'
      }, {
        'class_name': '数据库概论',
        'time': [3, 4, 5],
        'week': [1, 1, 18],
        'teacher': "陈靖",
        'location': '一号教学楼511'
      }, {
        'class_name': '形势政策',
        'time': [4, 5, 6],
        'week': [2, 5, 18],
        'teacher': "陈靖",
        'location': '一号教学楼401'
      }, {
        'class_name': '计算机网络',
        'time': [5, 1, 2],
        'week': [0, 1, 9],
        'teacher': "陈靖",
        'location': '一号教学楼101'
      }
    ],
  },

  changeWeek: function () {

  },

  setCurrentSche: function (getSche, week) {
    var that = this
    that.data.currentCourse = new Array
    var i = 0;
    while ("undefined" != typeof getSche[i]) {
      var id = (getSche[i].time[0]) * 10 + getSche[i].time[1] //表示课程id
      var zs = week <= getSche[i].week[2] && week >= getSche[i].week[1]
      var dsz = getSche[i].week[0] == 0 || getSche[i].week[0] % 2 == week % 2
      if (zs && dsz) {
        that.data.currentCourse[id] = {
          'class_name': getSche[i].class_name,
          'time': getSche[i].time,
          'lengthTime': getSche[i].time[2] - getSche[i].time[1] + 1,
          'week': getSche[i].week,
          'location': getSche[i].location
        }
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
    var that = this
    wx.showLoading({
      title: '正在读取课表',
    })
    
    wx.request({
      url: 'https://study.xietan.xin/xaufe/EduSysMobile/getCourse?xh=1605990711',
      success: function (res) {
        // console.log(res.data)
        that.setData({
          getSche: res.data
        })
      },
      complete: function () {
        wx.hideLoading()
        that.setCurrentSche(that.data.getSche, that.data.getTerm.week)
        console.log(that.data.getSche)
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
    var that = this
    wx.showLoading({
      title: '正在读取课表',
    })
    wx.request({
      url: 'https://study.xietan.xin/xaufe/EduSysMobile/getCourse?xh=1605990711',
      success: function (res) {
        // console.log(res.data)
        that.setData({
          getSche: res.data
        })
      },
      complete: function () {
        wx.hideLoading()
        wx.stopPullDownRefresh()
        that.setCurrentSche(that.data.getSche, that.data.getTerm.week)
        console.log(that.data.getSche)
      }
    })
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