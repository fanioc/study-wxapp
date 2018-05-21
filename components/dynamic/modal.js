
var util=getApp().globalData.util
Component({

  behaviors: [],

  properties: {

     feed: Array, // 简化的定义方式,整个模块数据来源，用于wx::for渲染

         refresh: { // 属性名,监视页面pulldown
       type: Boolean, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
       value: false, // 属性初始值（可选），如果未指定则会根据类型选择一个
       observer: function (newVal, oldVal) { 
         if (this.getFeed(0)) {
           this.setData({ hiddenToast: true, toastContent: '刷新成功' });

         }
         else {
           this.setData({ hiddenToast: true, toastContent: '刷新失败' });

         }
       } // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
     },
  },
  
  data: {
    feed_length:0,//feed数组长度，getFeed()会自动设置
    hiddenToast:false, //控制提示刷新成功的toast
    toastContent: ''//toast 提示内容
  }, // 私有数据，可用于模版渲染

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () {
    this.getFeed(0);//addtionRegion
    this.getFeed(1);
   },
  moved: function () { },
  detached: function () { },

  methods: {
    onMyButtonTap: function () {
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },
    getFeed: function (mode = 0)//从服务器获取动态模块所需数据,参数mode表示设置feed时：1为追加 0为重写，设置data：feed, feed_length
    {
      var getFeed, feed_Array = [];
      //----debug----
      getFeed = [
        {
          userID:123,
          dynamic_data:
          {
            feed_head_img: '/image/debug.png',
            feed_source_name: 'debug',
            feed_source_identity: 'debug',
            question_title: 'debug',
            question_describe: 'debug'
          },
          dynamic_sort: 'debug',
          comment_num: 999,
          dynamic_follow_with_interest: true,
          dynamic_type:0,
          dynamic_time:2018-1-1
        },
        {
          userID:123,
          dynamic_data:
          {
            
            feed_head_img: '/image/debug.png',
            feed_source_name: 'debug',
            feed_source_identity: 'debug',

            card_img: '/image/debug2.jpeg',

            question_title: 'http://hao.360.cnhttp://hao.360.cnhttp://hao.360.cnhttp://hao.360.cn',
            question_describe: 'debug',
          },
          dynamic_sort: 'debug',
          comment_num: 999,
          dynamic_follow_with_interest: true,
          dynamic_type: 1,
          dynamic_time: 2018 - 1 - 2
        },
      ];
      //----debug----

      //addtionRegion 后台数据
      if (mode) {
        feed_Array = this.data.feed.concat(getFeed);
      }
      else {
        feed_Array = getFeed;
      }
      this.setData({ feed: feed_Array, feed_length: feed_Array.length });
      return true;
    },

    lower: function (e) {//下拉追加
      this.getFeed(1);
      console.log("lower");
    },
    //--------------bindtap事件函数

    nav_dynamic_page: function (e) {//转跳至动态详情页面
      console.log(e.currentTarget.dataset.feedindex);
    //addtionRegion
    },

    nav_User_personalPage: function (e) {//转跳至用户个人页面
      console.log(e.currentTarget.dataset.uid);
      //addtionRegion
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
 