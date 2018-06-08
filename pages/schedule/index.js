// pages/schedule/index.js
var util = getApp().globalData.util;
const CONSTANT = getApp().globalData.CONSTANT;
Page({

  /**
   * 页面的初始数据
   */
  data: {

    config: {
      tableHead: {
        week: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        date: [],
        time: ["08:00", "09:00", "10:00", "11:00", "14:10", "15:10", "16:10", "17:10", "19:00", "20:00", "21:00", "22:00"]
      },
      currentWeek: 15,
      currentTerm: []

    },
    split:"|",
    yh:"'",
    selectNoclass: [],
    color: ["#f3f3f3", '#ffbf80', '#80bfff', "#ffcccc", '#15a892'],
    currentCourse: [{}],
    getSchel: []
  },

  changeWeek: function () {

  },

  longpressNonClass: function (e) {
    console.log(e)
  },
  longpressClass: function (e) {
    console.log(e)
  },
  selectNonClass: function (e) {
    console.log(e)
  },
  selectClass: function (e) {
    console.log(e)
  },

  setCurrentSche: function (getSche, week) {
    var that = this
    that.data.currentCourse = new Array
    var i = 0;
    while ("undefined" != typeof getSche[i]) {
      var id = (getSche[i].time[0])*100+ getSche[i].time[1] //表示课程id
      var zs = week <= getSche[i].week[2] && week >= getSche[i].week[1]
      var dsz = getSche[i].week[0] == 0 || getSche[i].week[0] % 2 == week % 2
      if (zs && dsz) {
        that.data.currentCourse[id] = {
          'class_name': getSche[i].class_name,
          'time': getSche[i].time,
          'lengthTime': getSche[i].time[2] - getSche[i].time[1] + 1,
          'week': getSche[i].week,
          'location': getSche[i].location,
          'type': getSche[i].type
        }
      }
      i++;
    }
    this.setData({
      currentCourse: that.data.currentCourse
    })
    console.log(this.data.currentCourse)
  },


  initSchel: function () {
    var that = this;

    const weekList = util.getWeekList()
    console.log(weekList)
    that.setData({
      'config.tableHead.date': weekList
    })

    var term = wx.getStorageSync('userTerm')
    if (term != '') {
      that.setData({
        currentWeek: term.currentWeek,
        currentTerm: term.currentTerm
      })
      that.readSchel(0)
    }
    else {
      wx.request({
        url: CONSTANT.API.getCurrentTerm,
        success: function (res) {
          that.setData({
            currentWeek: res.data.data.week,
            currentTerm: {
              xn: res.data.data.xn,
              xq: res.data.data.xq
            }
          })
          wx.setStorageSync('userTerm', { currentTerm: that.data.currentTerm, currentWeek: that.data.currentWeek })
          that.readSchel(0)
        }
      })
    }
  },

  readSchel: function (updateAll) {
    if (updateAll == 1) {
      this.updateSchel()
    } else {
      var schel = wx.getStorageSync('userSchel')
      if (schel != '') {
        this.setData({
          getSche: schel
        })
        this.showSchel()
        return;
      } else {
        this.updateSchel()
      }
    }
  },

  updateSchel: function () {
    var that = this;
    wx.showLoading({
      title: '正在读取课表',
    })
    wx.request({
      url: CONSTANT.API.getUserAllCourse,
      data: {
        session: wx.getStorageSync('session'),
        xn: that.data.currentTerm.xn,
        xq: that.data.currentTerm.xq
      },
      success: function (res) {
        console.log(res)
        if (res.data.errCode == 0) {
          that.setData({
            getSche: res.data.data
          })

          wx.setStorageSync('userSchel', res.data.data)
          that.showSchel()
        } else if (res.data.errCode == 3106) {

          //数据库课表错误

        }

      },
      complete: function () {
        wx.hideLoading()
      }
    })
  },

  showSchel: function () {
    this.setCurrentSche(this.data.getSche, this.data.currentWeek)
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    setTimeout(function () {
      that.initSchel()
    }, 500)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
    console.log(getApp().globalData.me)
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
    this.readSchel(1)
    wx.stopPullDownRefresh();

    wx.request({
      url: CONSTANT.API.getClassList,
      data: {
        session: wx.getStorageSync('session'),
        date: '2018-06-08',
        place: '2号教学楼'
      },
      success: function (e) {
        console.log(e);
      }

    })

    wx.request({
      url: CONSTANT.API.getStudyList,
      data:{
        session:wx.getStorageSync('session'),
      },
      success:function(e){
        console.log(e);
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