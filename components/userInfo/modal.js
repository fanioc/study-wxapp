var components = getApp().globalData.components; components.show_mToast
Component({

  behaviors: [],

  properties: {
   inner: String, // 简化的定义方式,插入的内容
   model:Number
  },
  data: {
    show_modal:false,
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
      this.setData({followed: true});
      components.show_mToast('关注成功');
      return true;
    },

    post_invited: function () { //向用户发送邀请
      var data;
      //addtionRegion
      //----debugdata----------

      //----debugdata----------
      this.setData({  invited: true });
      components.show_mToast('已发送邀请');
      return true; 
    },
    modal_leave_message: function () { //用户留言窗口
      var that = this;
      components.show_modal(that, 'leave_message', this.post_leave_message, '留言ing', '发送', false);
      
      
      return true;
    },
    modal_reply_message: function () { //用户回复留言窗口
      var that = this;
      components.show_modal(that, 'leave_message', this.post_leave_message, '回复ing', '发送', false);
      
      return true;
    },
    post_leave_message: function (e) { //向服务器发送用户留言，或者回复内容
      var data;
      //addtionRegion
      //----debugdata----------

      //----debugdata----------

      console.log(e.detail.formData);
      components.show_mToast('已发送');
      return true;
    },

    modal_comment: function () { //用户评论窗口
      var that = this;
      components.show_modal(that, 'comment', this.post_comment, '评论ing', '发送', false);


      return true;
    },

    post_comment: function (e) { //向服务器发送用户留言
      var data;
      //addtionRegion
      //----debugdata----------

      //----debugdata----------

      console.log(e);
      components.show_mToast('完成评价');
     
      return true;
    },
    modal_answer_question: function () { //用户回答窗口
      var data;
      //addtionRegion
      //----debugdata----------

      //----debugdata----------
      var that = this;
      components.show_modal(that, '//addtionRegion', this.post_answer_question, '回答', '完成', true);

      return true;
    },
    post_answer_question: function () { //用户回答窗口
      var data;
      //addtionRegion
      //----debugdata----------

      //----debugdata----------


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