// pages/community/index.js
var globalData=getApp().globalData;
var util=globalData.util;
var CONSTANT = globalData.CONSTANT;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,//当前顶部切换组件的序号
    bannerList: [{ imgSrc:"debug0.png"}],
    on:true,
    feed: [],
    feed_length: 0
  },
//-----------------本页面自定义函数
    //-----swichNav
  swichNav: function (e)//* 点击上tab切换，已调试
  {
//console.log(e.currentTarget.dataset.current);
var that = this;

if (this.data.currentTab === e.target.dataset.current) {
  return false;
} else {
  that.setData({
    currentTab: e.target.dataset.current
  })
}
  },
  //-----bindItemTap
  bindItemTap: function ()//点击单动态模块时的动作
   {
    wx.navigateTo({
      url: '../answer/answer'
    })
  },
//lower 动态圈模块下拉获取更多数据
  lower: function (e) {
    console.log("fuck");
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function () { wx.hideNavigationBarLoading(); that.nextLoad(); }, 1000);
    console.log("lower")
  },
  getFeed: function (mode=0)//从服务器获取动态模块所需数据,参数mode表示设置feed时：1为追加 0为重写，设置data：feed, feed_length
  {
    var getFeed,feed_Array=[];
    //----调试代码----
    getFeed=[
      {
        feed_source_img: '/image/debug.png',
        feed_source_name: 'debug',
        feed_source_identity: 'debug',
        question_title: 'debug',
        question_describe: 'debug',
        sort: 'debug',
        comment_num: 999,
        question_status: '已解决',

      }
    ];
    //----调试代码----

    //addtionRegion 后台数据
    if(mode)
    {
      feed_Array = this.data.feed.concat(getFeed);
    }
    else
    {
      feed_Array = getFeed;
    }
    this.setData({ feed: feed_Array, feed_length:feed_Array.length});
    return true;
  },
//----getBannerImgSrc

  getBannerImgSrc: function (e)//获取动态圈板块的置顶广告的图片src，并存入数组bannerList:[]供wx for渲染
  {
   //addtionRegion
  },
//-----------------本页面自定义函数
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getFeed(1);
     this.getFeed(1);
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
    if (this.data.currentTab==0)
  {
      util.PullDownRefresh(this.getFeed);
  }
  else
  {

  }
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