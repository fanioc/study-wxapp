
var _util = getApp().globalData.util;
var _API = getApp().globalData.CONSTANT.API;
var _components = getApp().globalData.components;
Component({

  behaviors: [],

  properties: {

    feed: Array, // 简化的定义方式,整个模块数据来源，用于wx::for渲染
  
    refresh: { // 属性名,监视页面pulldown
      type: Boolean, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: false, // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function (newVal, oldVal) {
        
        //console.log('刷新了');
        
      } // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
    },
  },

  data: {
    feed_length: '',//feed数组长度，getFeed()会自动设置
    hiddenToast: false, //控制提示刷新成功的toast
    toastContent: '',//toast 提示内容
    data_success:false,//只有当网络请求成功时才会设置为真然后对其渲染
  }, // 私有数据，可用于模版渲染

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () {
    
    this.getFeed(0);

  },
  moved: function () { },
  detached: function () { },

  methods: {
    onMyButtonTap: function () {
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },
    getFeed: function (mode = 1)//从服务器获取动态模块所需数据,参数mode表示设置feed时：1为追加 0为重写，设置data：feed, feed_length
    {
      var that = this;
      //console.log(getCurrentPages()[0].is, _API.get_dynamic_array);
      if(that.data.feed_length==1){
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
          
          //----
          var getFeed, feed_Array = [];
          console.log(res);
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
      console.log('问题的index:',e.currentTarget.dataset.feedindex);
      var feedIndex = e.currentTarget.dataset.feedindex;
      //将当前问题问题传递给动态页面，
      
      var question_id = _THAT.data.feed[feedIndex].question_id;
      //转跳至动态详情页面
      
      wx.navigateTo({
        url: "/pages/community/dynamic/dynamic?question_id="+question_id
      });
      //debugRegion
    },

  
    //--------------tap事件函数
    _myPrivateMethod: function () {
      // 内部方法建议以下划线开头
      this.replaceDataOnPath(['A', 0, 'B'], 'myPrivateData') // 这里将 data.A[0].B 设为 'myPrivateData'
      this.applyDataUpdates()
    },
    _propertyChange: function (newVal, oldVal) {

    }
  }

})
