var _components = getApp().globalData.components;
var _util = getApp().globalData.util;
var _API = getApp().globalData.CONSTANT.API; 
var _PATH = getApp().globalData.CONSTANT.PATH;
Component({

  behaviors: [],

  properties: {
   inner: String, // 简化的定义方式,插入的内容
   model:Number,
   userID: String
  },
  data: {
    user_head_img:'',//用户头像url
    user_source_name:'',//用户昵称
    show_modal:false,
    followed: false,//判断是否关注已当前用户
    invited: false,//判断是否已发送邀请请求
    myself:false,//判断是否是用户自己
  }, // 私有数据，可用于模版渲染

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () {
    //--------
    var that = this;
    if (that.data.userID == getApp().globalData.me.uid)//如果是用户自己将model设置为0
      {
      that.setData({ myself: true, model: 0, user_head_img: getApp().globalData.me.avatarUrl, user_source_name: getApp().globalData.me.nickName+" - 自己"});
        return true;
      }
    
    wx.request({
      url: _API.getUserBasicInfo,
      data: {
        session: wx.getStorageSync('session'),
        other_uid: that.data.userID,
      },
      method: 'GET',
      success: function (res) {
      
        //console.log(getCurrentPages()[0].is, res.data);
        var data=_util.errCode(res.data);
        //console.log(getCurrentPages()[0].is, data);
        if(data)
        {
         // console.log(getCurrentPages()[0].is,'line 42', );
          that.setData({ user_head_img: data[0].avatarUrl, user_source_name: data[0].nickName });
          console.log(that.data.user_source_name);
          if (that.data.model == 1)//获取信息，判断是否关注已当前用户
          {
            //that.setData({ followed: data[0].followed });
            //addtionRegion
          }
        }
        else
          that.set_default();

      },
      fail: function (res) {
       
        _components.show_mToast('网络错误');
        that.set_default();
      },
      complete: function (res) { },
    })
    //------
   },
  moved: function () { },
  detached: function () { },

  methods: {

    set_default: function () {//为从服务器获取用户信息时将其设置为匿名用户，无法进行任何按钮操作
    var _THAT=this;
      //console.log(getCurrentPages()[0].is, 'set_default', );
      _THAT.setData({ user_head_img: _PATH.anonymous, user_source_name: '匿名用户',model:0 });
    
    },
    nav_User_personalPage: function() { //转跳至用户个人信息页面
      var data = false;
      //addtionRegion
      //----debugdata----------

      //----debugdata----------
     // this.setData({ followed: data });
      console.log('nav_User_personalPage');
      return true;
    },
    onMyButtonTap: function () {
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },
    //---------------自定义部分---------

    set_followed: function () { //获取信息，由+关注组件触发，关注当前用户
      var _THAT = this;
      wx.request({
        url: _API.set_followed_user,
        data: {
          session: wx.getStorageSync('session'),
          other_uid: _THAT.data.userID
        },
        method: 'GET',
        success: function (res) {
          
          
            if (_util.errCode(res.data))

              this.setData({ followed: true });
          
          return true;
        },
        fail: function (res) {
          _components.show_mToast('网络错误');
        },
        complete: function (res) { },
      })
  

    },

    post_invited: function () { //向用户发送邀请
      var data;
      var _THAT = this;
      //debugRegion
      //----debugdata----------
      wx.request({
        url: _API.post_invited,
        data: {
          session: wx.getStorageSync('session'),
          other_uid: _THAT.data.userID
        },
        method: 'GET',
        success: function (res) {

          this.setData({ invited: true });//lly_improve
          _components.show_mToast('已发送邀请');
          return true; 
        },
        fail: function (res) {
          _components.show_mToast('网络错误');
        },
        complete: function (res) { },
      })
      //----debugdata----------
    
    },
    modal_leave_message: function () { //用户留言窗口
      var _THAT = this;
      _components.show_modal(_THAT, 'leave_message', this.post_leave_message, '留言ing', '发送', false);
      
      
      return true;
    },
    modal_reply_message: function () { //用户回复留言窗口,暂停使用
    //  var _THAT = this;
      //_components.show_modal(_THAT, 'leave_message', this.post_leave_message, '回复ing', '发送', false);
      
      return true;
    },
    post_leave_message: function (formdata) { //向服务器发送用户留言，或者回复内容
      var _THAT = this;
      //debugRegion
      //----debugdata----------
      wx.request({
        url: _API.post_leave_message,
        data: {
          session: wx.getStorageSync('session'),
          other_uid: _THAT.data.userID,
          leaveMessage: formdata

        },
        method: 'POST',
        success: function (res) {
          _util.errCode(res.data);
        },
        fail: function (res) {
          _components.show_mToast('网络错误');
        },
        complete: function (res) { },
      })
      //----debugdata----------
      return true;
    },

    modal_comment: function () { //用户评论窗口
      //var _THAT = this;
      //_components.show_modal(_THAT, 'leave_message', this.post_comment, '评论ing', '发送', false);
      //addtionRegion

      return true;
    },

    post_comment: function (e) { //向服务器发送用户评论
      var data;
      //addtionRegion
      //----debugdata----------

      //----debugdata----------

      //console.log(e);
      _components.show_mToast('完成评价');
     
      return true;
    },
    modal_answer_question: function () { //用户回答窗口
  
      wx.navigateTo({ url:'/pages/markdown_editor/index'});
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