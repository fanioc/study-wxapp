var core=getApp().globalData.core;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feed: [], // 简化的定义方式,整个模块数据来源，用于wx::for渲染
    feed_length: '',//feed数组长度，getFeed()会自动设置
    hiddenToast: false, //控制提示刷新成功的toast
    toastContent: '',//toast 提示内容
    data_success: false,//只有当网络请求成功时才会设置为真然后对其渲染
    //---------
    tag_group_array: [
      {
        content: '全部',
        choose: true
      },
      {
        content: '高等数学',
        choose: false
      },
      {
        content: 'C语言',
        choose: false
      },
    ],//debug

  },
  //-----------------本页面自定义函数

  getFeed: function (mode = 1)//从服务器获取动态模块所需数据,参数mode表示设置feed时：1为追加 0为重写，设置data：feed, feed_length
  {
    var that = this;
    var last_id = that.data.feed_length;
    if (mode == 0) {
      last_id = '';
    }

    //---
    wx.showLoading({
      title: '加载动态中',
    })
    //---
    let req = core.APIrequest('getDynamicList',{
      last_id: last_id
    });
    req.then(res=>{
      //----网络请求成功渲染当前页面

      //----
      let getFeed, feed_Array = [];
      getFeed = res;
      //-------------
      if (mode) {
        feed_Array = that.data.feed.concat(getFeed);
        console.log('追加');
      }
      else {
        feed_Array = getFeed;
        console.log('重置');
      }
      if (typeof (feed_Array.length) == 'undefined') {
        core.com.show_mToast('网络错误');
        
      }
      that.setData({ data_success: true, feed: feed_Array, feed_length: feed_Array[feed_Array.length - 1].question_id });
      console.log('feed_length:', that.data.feed_length);
      wx.hideLoading();
    }).catch(
      res=>{
        core.com.show_mToast('错误码'+res);
        wx.hideLoading();
      }
    )
    
    
  },

  //--------------bindtap事件函数

  nav_dynamic_page: function (e) {//转跳至动态详情页面,
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

  add_dynamic: function (e) {
    wx.navigateTo({
      url: '/pages/community/add_dynamic/add_dynamic',

    })
  },
  set_tag: function (e) {
    var tag_group = this.data.tag_group_array;

    //addtionRegion
    if (tag_group[0].choose) {
      if (e.currentTarget.dataset.index != 0) {
        tag_group[0].choose = false;
        tag_group[e.currentTarget.dataset.index].choose = !tag_group[e.currentTarget.dataset.index].choose;
      }
      else {
        return true;
      }

    }
    else {
      if (e.currentTarget.dataset.index != 0) {
        tag_group[e.currentTarget.dataset.index].choose = !tag_group[e.currentTarget.dataset.index].choose;
      }
      else {
        for(let i in tag_group)
        {
          tag_group[i].choose=false;
        }
        tag_group[0].choose=true;
      }
    }
    this.setData({ tag_group_array: tag_group });
  },
  //-----------------本页面自定义函数

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
  onPullDownRefresh: function () {



    this.getFeed(0);
    wx.stopPullDownRefresh();
    core.com.show_mToast('刷新成功');

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //console.log(getCurrentPages()[0].is, _API.get_dynamic_array);
    if (this.data.feed_length == 1) {
      core.com.show_mToast('没有更多了')
      return;
    }
    else {
      this.getFeed(1);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})