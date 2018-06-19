var core = getApp().globalData.core;
var WxSearch = require('../../extends/wxSearch/wxSearch.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feed: [], // 简化的定义方式,整个模块数据来源，用于wx::for渲染
    feed_length: '', //feed数组长度，getFeed()会自动设置
    hiddenToast: false, //控制提示刷新成功的toast
    toastContent: '', //toast 提示内容
    data_success: false, //只有当网络请求成功时才会设置为真然后对其渲染
    tag_all: true,//默认设置初始选择全部标签
    //---------
    tag_group_array: [{
      content: '哈哈',
      choose: false,
    },
    {
      content: '高等数学',
      choose: false
    },
    {
      content: 'C语言',
      choose: false
    },
    ], //debug

  },
  //-----------------本页面自定义函数

  getFeed: function (mode = 1) //从服务器获取动态模块所需数据,参数mode表示设置feed时：1为追加 0为重写，设置data：feed, feed_length
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
    core.APIrequest('getDynamicList', {
      last_id: last_id
    }).then((result) => {
      var getFeed, feed_Array = [];
      getFeed = result;
      console.log(getFeed)
      if (mode) feed_Array = that.data.feed.concat(getFeed); //追加 else feed_Array = getFeed; //重置
      else feed_Array = getFeed
      if (typeof (feed_Array.length) == 'undefined') {
        core.com.show_mToast('网络错误');
      }
      //--------
      let temp_index=[];
      for (let i in feed_Array) {
        temp_index.push(true);

      }
      that.setData({ tag_show_index:temp_index})
      //------
      that.setData({
        data_success: true,
        feed: feed_Array,
        feed_length: feed_Array[feed_Array.length - 1].question_id
      });
      wx.hideLoading();
      that.getTag_group();
    }).catch((err) => {
      core.APIerrCode(err, 2)
      wx.hideLoading();
    });
  },
  getTag_group:function()
  {
    var that=this;
    let dynamic = this.data.feed;
    let temp1=[],temp2=[];
    for(let i in dynamic)
    {
      if (temp2.indexOf(dynamic[i].dynamic_sort)!=-1)
          continue; 
      if(i<3)
      {
        temp1.push({ content: dynamic[i].dynamic_sort,choose:false}); 
      }
      temp2.push(dynamic[i].dynamic_sort);
    
    }
    this.setData({ tag_group_array:temp1,tag2:temp2});
   
    let keys = that.data.tag2;
    WxSearch.init(that, 0, keys);//热门，barHeight:top值
    WxSearch.initMindKeys(that.data.tag2);//匹配内容
  },
  //--------------bindtap事件函数

  nav_dynamic_page: function (e) { //转跳至动态详情页面,
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
    let tag_group = this.data.tag_group_array;
    let wxSearchData = this.data.wxSearchData;
    var that = this;
    if (e.currentTarget.dataset.all == 'true') {
      //console.log(e.currentTarget.dataset.all);
      for (let i in tag_group) {
        tag_group[i].choose = false;
      }
      that.setData({ tag_group_array: tag_group,tag_all:!that.data.tag_all });
    }
    //addtionRegion
    else {

      tag_group[e.currentTarget.dataset.index].choose = !tag_group[e.currentTarget.dataset.index].choose;
      
      that.setData({ tag_group_array: tag_group, tag_all: false });
    }
    let temp_index=[],indexOf;
    let feed = that.data.feed;
    let tag_group_array = that.data.tag_group_array;
    if (e.currentTarget.dataset.all == 'true')
    {
      for (let i in feed) {
        temp_index.push(true);

      }
    }
    else{
      for (let i in feed) {
        temp_index.push(false);

      }
     // console.log(temp_index);
      for (let i in feed) {
        //console.log(that.data.tag_group_array);
        indexOf=false;
        for (let j in tag_group_array)
        {
          if (tag_group_array[j].content == feed[i].dynamic_sort && tag_group_array[j].choose==true)
          {
            indexOf=true;
            break;
          }
        }
        if (indexOf==true) {
                  {
                    temp_index[i]=true;
                    
                  }
                 
        }
      }
    }
    console.log(temp_index);
    that.setData({tag_show_index:temp_index});
   
  },
  //-----------------本页面自定义函数
  //-------外部引入的组件函数
  //搜索键所需;
  reset_wxSearchData_tagChoose: function(e)
  {
    let temp=this.data.wxSearchData;
    for (let i in temp.tag_group_choose)
    {
      temp.tag_group_choose[i]=false;
    }
    temp.value='';
    this.setData({ wxSearchData:temp});
  },
  wxSearchFn: function (e) {
    var that = this
    WxSearch.wxSearchAddHisKey(that);
    //addtionRegion,
    
    let tag;
    if (that.data.wxSearchData.value)
    {
      tag = that.data.wxSearchData.value.split(' ');
      console.log(tag);//value可能需要分割
      let temp=[];
      for (let i in tag)
      {
        
        temp.push({ content: tag[i],choose:false});
      }


      let wxSearchData = this.data.wxSearchData;
     
      let temp_index = [];
      let feed = that.data.feed;
      for (let i in feed) {
        temp_index.push(true);
      }
      //console.log(temp_index);
      that.setData({ tag_show_index: temp_index, tag_group_array: temp,tag_all: true });
    }
   //----重新设置分类
    that.reset_wxSearchData_tagChoose();
  },
  //----input所需
  wxSearchInput: function (e) {
    var that = this
    WxSearch.wxSearchInput(e, that);
  },
  wxSerchFocus: function (e) {
    var that = this;
    WxSearch.wxSearchFocus(e, that);
  },
  wxSearchBlur: function (e) {
    var that = this
    WxSearch.wxSearchBlur(e, that);
  },
  //-----------面板操作
  wxSearchKeyTap: function (e) {
    var that = this;
    WxSearch.wxSearchKeyTap(e, that);
  },
  wxSearchDeleteKey: function (e) {
    var that = this
    WxSearch.wxSearchDeleteKey(e, that);
  },
  wxSearchDeleteAll: function (e) {
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function (e) {
    var that = this;
    // console.log('wxSearchTap', e.target.id.length);
    if (e.target.id == 'box')
      WxSearch.wxSearchHiddenPancel(that);
  },

  //--------------------
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
    var that = this;
    this.getFeed(0);
    //addtionRegion
    //(that, barHeight, keys, isShowKey, isShowHis, callBack)
    

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
    } else {
      this.getFeed(1);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})