var _components = getApp().globalData.components;
var _API = getApp().globalData.CONSTANT.API;
var _util = getApp().globalData.util;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feed: Array, // 简化的定义方式,整个模块数据来源，用于wx::for渲染
    feed_length: '',//feed数组长度，getFeed()会自动设置
    hiddenToast: false, //控制提示刷新成功的toast
    toastContent: '',//toast 提示内容
    data_success: false,//只有当网络请求成功时才会设置为真然后对其渲染
    dynamics_refresh:0,
    currentTab: 0,//当前顶部切换组件的序号
    bannerList: [{ imgSrc: "debug0.png" }],
    on: true,
    feed: [],
    feed_length: 0

  },
  //-----------------本页面自定义函数
  //-----swichNav
  swichNav: function (e)//* 点击上tab切换，已调试
  {
//console.log(e.currentTarget.dataset.current);
var that = this;

if (this.data.currentTab === e.target.dataset.current) 
        {
  return false;
        } 
else 
    {
  that.setData({
    currentTab: e.target.dataset.current})
    }
  },


//----getBannerImgSrc

  getBannerImgSrc: function (e)//获取动态圈板块的置顶广告的图片src，并存入数组bannerList:[]供wx for渲染
  {
    //addtionRegion
  },
  add_dynamic: function ()//编辑动态
  {
    wx.navigateTo({ url: "/pages/community/add_dynamic/add_dynamic"});
  },
//-----------------本页面自定义函数
  getFeed: function (mode = 1)//从服务器获取动态模块所需数据,参数mode表示设置feed时：1为追加 0为重写，设置data：feed, feed_length
  {
    var that = this;
    //console.log(getCurrentPages()[0].is, _API.get_dynamic_array);
    if (that.data.feed_length == 1) {
      _components.show_mToast('没有更多了')
      return;
    }
    //---
    wx.showLoading({
      title: '加载动态中',
    })
    //---
    wx.request({
      url: _API.getDynamicList,
      data: {
        session: wx.getStorageSync('session'),
        last_id: that.data.feed_length
      },
      method: 'GET',
      success: function (res) {
        //----网络请求成功渲染当前页面
        console.log(res.data);//master
        //----
        var getFeed, feed_Array = [];
        //console.log(res);
        getFeed = _util.errCode(res.data);
        if (mode) {
          feed_Array = that.data.feed.concat(getFeed);
          console.log('追加');
        }
        else {
          feed_Array = getFeed;
          console.log('重置');
        }

        that.setData({ data_success: true, feed: feed_Array, feed_length: feed_Array[feed_Array.length - 1].question_id });
        console.log('feed_length:', that.data.feed_length);
        return true;
      },
      fail: function (res) {
        _components.show_mToast('网络错误');
        return false;
      },
      complete: function (res) {
        wx.hideLoading();
      },
    })
    //debugRegion

  },

  //
  //--------------bindtap事件函数

  nav_dynamic_page: function (e) {//转跳至动态详情页面,并将quesiotnID存入key中
    var _THAT = this;
    console.log('问题的index:', e.currentTarget.dataset.feedindex);
    var feedIndex = e.currentTarget.dataset.feedindex;
    //将当前问题问题传递给动态页面，

    var question_id = _THAT.data.feed[feedIndex].question_id;
    //转跳至动态详情页面

    wx.navigateTo({
      url: "/pages/community/dynamic/dynamic?question_id=" + question_id
    });
    //debugRegion
  },


    //--------------tap事件函数
//----------------------------

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
    this.getFeed(0);
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
  onPullDownRefresh: function () 
  {
    
    if (this.data.currentTab == 0)//当currentTab为0时下拉刷新提示相应模块刷新数据
    {
      this.setData({ dynamics_refresh: ! this.data.dynamics_refresh});
      console.log(this.data.dynamics_refresh)
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