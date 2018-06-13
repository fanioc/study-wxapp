var core = getApp().globalData.core;

Page({

  /**
   * 页面的初始数据
   */
  data: {

    answer_array: [], //回答问题的列表，用于for渲染
    dynamic: [], //当前问题所需数据，用于wx：for
    data_success: false, //只有当网络请求成功时才会设置为真然后对其渲染
  },
  //-----------自定义函数

  /**
   * 获取回答的列表 追加的向数组添加数据
   */
  get_answer_array: function (model = 1, data_array) {
    var data = [];
    //debugRegion
    if (model) {
      data = this.data.answer_array.concat(data_array);
      console.log('get_answer_array 追加');
    } else {
      data = data_array;
    }
    this.setData({
      answer_array: data
    });
  },
  //--------

  /**
   * 转跳至回答详情页面
   */
  modal_answer_detail: function (e) {
    var that = this;

    var current_answer_id = this.data.answer_array[e.currentTarget.dataset.index].answer_id
    wx.navigateTo({
      url: "/pages/community/dynamic/answer_detail/answer_detail?dynamic_id=" + that.data.dynamic.dynamic_id + "&answer_id=" + current_answer_id + "&question_title=" + that.data.dynamic.title,
    })
  },


  //--------------------
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('dynamic.js onload参数', options.question_id)
    console.log(getApp().globalData.current_question);
    //---------
    var that = this;
    //---
    wx.showLoading({
      title: '加载详情中',
    })
    //---
    core.APIrequest('getDynamicContent', {
      dynamic_id: options.question_id
    }).then((result) => {
      that.setData({
        dynamic: result.dynamic,
        data_success: true
      });
      //--------传送回答列表数组
      var typedata = typeof (result.ans_list);
      if (typedata == 'object') {
        that.get_answer_array(0, data.ans_list);
      }
      wx.hideLoading()
    }).catch((err) => {
      wx.hideLoading()
      core.APIerrCode(err, 2)
    });

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
    wx.stopPullDownRefresh();
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