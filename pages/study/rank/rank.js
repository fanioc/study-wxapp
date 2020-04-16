var charts = require('../../../extends/form/moduel/charts');
var hiway = require('../../../extends/form/moduel/mars');
var core = getApp().globalData.core;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
/*-----------*/
  initGraph: function () {
    let _this = this

    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          deviceH: res.windowHeight,
          deviceW: res.windowWidth,
        })
      }
    });
    let params = {}
    params.canvas_id = 'pieGraph'
    params.data = [{
      name: '早上',
      data: 15,
    }, {
      name: '下午',
      data: 35,
    }, {
      name: '晚上',
      data: 50,
    }]
    params.width = this.data.deviceW

    charts.shapePie(params)
    
    //------------------
    params.canvas_id = 'lineGraph'
    params.ytitle = '上周自习人数'
    params.xcate = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    params.data = [{
      name: '自习人数',
      data: [138, 276, 137, 415, 24, 96, 372],
      format: function (val) {
        return val.toFixed(0) + '人';
      }
    }]
    charts.shapeLine(params)

  },
  //-----------------------------
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
    this.initGraph();
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