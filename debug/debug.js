// debug/debug.js

var util=require('../util/util.js');
var components = getApp().globalData.components;//
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //article将用来存储towxml数据
    article: {},
    study_fresh:false,
    invite_item_array: [
      {
        dynamic_data:
        {

          feed_head_img: '/image/debug.png',
          feed_source_name: 'debug',
          feed_source_identity: 'debug',

          card_img: '/image/debug4.jpg',
          question_title: 'http://hao.360.cnhttp://hao.360.cnhttp://hao.360.cnhttp://hao.360.cn',
          question_describe: 'debug',
        },
        dynamic_sort: 'debug',
        comment_num: 999,
        dynamic_follow_with_interest: true,
        dynamic_type: 1,
        dynamic_time: 2018 - 1 - 2
      },
      {
        dynamic_data:
        {

          feed_head_img: '/image/debug.png',
          feed_source_name: 'debug',
          feed_source_identity: 'debug',

          card_img: '/image/debug4.jpg',

          question_title: 'http://hao.360.cnhttp://hao.360.cnhttp://hao.360.cnhttp://hao.360.cn',
          question_describe: 'debug',
        },
        dynamic_sort: 'debug',
        comment_num: 999,
        dynamic_follow_with_interest: true,
        dynamic_type: 1,
        dynamic_time: 2018 - 1 - 2
      }],
  },
//-------------
  asd: function () {
   // getCurrentPages();
    //var asda = this.bindItemTap;
    components.show_mToast('完成评价');
    //this.lly(asda);
    //this.a(asda);
    
    //getCurrentPages()[0].setData({ hah:  function () { console.log('asda');return true; } });
    //getCurrentPages()[0].data.hah();
    //console.log(this.data.hah());
    //console.log(getCurrentPages()[0].a);
  },
  lly:function(call)
  {
      call();
  },
  bindItemTap: function () {
    wx.navigateTo({
      url: '../answer/answer'
    })
  },
  a:function(aa)
  {
    aa();
    console.log('e');
    return true;
  },
//------------
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
    this.setData({ study_fresh: !this.data.study_fresh });
  
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