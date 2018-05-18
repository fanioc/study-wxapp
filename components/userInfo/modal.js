var globalData = getApp().globalData;
var util = globalData.util;
var CONSTANT = globalData.CONSTANT;
Component({

  behaviors: [],

  properties: {
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
   inner: String, // 简化的定义方式,插入的内容
   model:Number
  },
  data: {
    show_modal:false,
    hiddenToast: false, //控制提示刷新成功的toast
    toastContent: '',//toast 提示内容
    followed: false,//判断是否关注已当前用户
    invited: false
  }, // 私有数据，可用于模版渲染

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () {
    switch(this.data.model)
    {
      case 1: this.get_followed();break;
    }
   },
  moved: function () { },
  detached: function () { },

  methods: {
    
    nav_User_personalPage: function() { //转跳至用户个人信息页面
      var data = false;
      //addtionRegion
      //----debugdata----------

      //----debugdata----------
     // this.setData({ followed: data });
      return true;
    },
    onMyButtonTap: function () {
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },
    //---------------自定义部分---------
    get_followed: function () { //获取信息，判断是否关注已当前用户
      var data=false;
      //addtionRegion
      //----debugdata----------
      
      //----debugdata----------
      this.setData({ followed: data }); 
      return true;
    },
    set_followed: function () { //获取信息，由+关注组件触发，关注当前用户
      var data;
      //addtionRegion
      //----debugdata----------
     
      //----debugdata----------
      this.setData({ hiddenToast: true, toastContent: '关注成功', followed: true});
      return true;
    },

    post_invited: function () { //向用户发送邀请
      var data;
      //addtionRegion
      //----debugdata----------

      //----debugdata----------
      this.setData({ hiddenToast: true, toastContent: '已发送邀请', invited: true });
      return true; 
    },
    modal_leave_message: function () { //用户留言窗口

      this.setData({ show_modal: true, modal_title: '留言ing', modal_right_button: '发送', modal_callback:'post_leave_message'});
      
      return true;
    },
    post_leave_message: function (e) { //向服务器发送用户留言
      var data;
      //addtionRegion
      //----debugdata----------

      //----debugdata----------

      console.log(e.detail.formData);
      this.setData({ hiddenToast: true, toastContent: '已发送邀请' });
      return true;
    },
    modal_comment: function () { //用户评论窗口

      this.setData({ show_modal: true, modal_title: '评论ing', modal_right_button: '完成', modal_callback: 'post_comment', template_form:'comment'});

      return true;
    },
    post_comment: function (e) { //向服务器发送用户留言
      var data;
      //addtionRegion
      //----debugdata----------

      //----debugdata----------

      console.log(e.detail.formData);
      this.setData({ hiddenToast: true, toastContent: '已完成评价' });
      return true;
    },
    //--------------------------------
    _myPrivateMethod: function () {
      // 内部方法建议以下划线开头
      this.replaceDataOnPath(['A', 0, 'B'], 'myPrivateData') // 这里将 data.A[0].B 设为 'myPrivateData'
      this.applyDataUpdates()
    },
    _propertyChange: function (newVal, oldVal) {

    }
  }

})