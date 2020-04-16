var core = getApp().globalData.core;

Component({

  behaviors: [],

  properties: {
    inner: String, // 简化的定义方式,插入的内容
    model_data: String,
    model: Number,
    userID: String,
    refresh:{
    type:Boolean,
    value:false,
    observer: function (newVal, oldVal) {
      this.init_data();
     }
    },
  },
  data: {
    user_head_img: '',//用户头像url
    user_source_name: '',//用户昵称
    show_modal: false,
    followed: 0,//判断是否关注已当前用户
    invited: false,//判断是否已发送邀请请求
    myself: false,//判断是否是用户自己
  }, // 私有数据，可用于模版渲染

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () {
  },
  ready:function(){
      this.init_data();
  },

  moved: function () { },
  detached: function () { },

  methods: {
    init_data: function () {//初始化数据
      //--------
      var that = this;
      /* let me=core.getUserConfig();
       me.then(res=>{
         if (that.data.userID == res.uid)//如果是用户自己将model设置为0
         {
           that.setData({ myself: true, model: 0, user_head_img: getApp().globalData.me.avatarUrl, user_source_name: getApp().globalData.me.nickName });
         }
       });*/that.data.userID
      let init = Promise.all([core.getUserConfig(), core.getUserInfo(that.data.userID)]).then(res => {
        console.log(res);
        //-------俩个异步请求成功后的操作
        let myself = false;
        if (that.data.userID == res[0].uid)//如果是用户自己将model设置为0
        {
          myself = true;
          that.data.model = 0;
        }
        //---
        that.setData({
          followed: res[1].is_star, user_head_img: res[1].avatarUrl, user_source_name: res[1].nickName,
          model: that.data.model, myself: myself
        });


        //----------------------------
      }).catch(err => { that.set_default(); });



    },
    set_default: function () {//为从服务器获取用户信息时将其设置为匿名用户，无法进行任何按钮操作
      var _THAT = this;
      //console.log(getCurrentPages()[0].is, 'set_default', );
      _THAT.setData({ user_head_img: '/image/anonymous.png', user_source_name: '', model: 0 });

    },
    nav_User_personalPage: function () { //转跳至用户个人信息页面
      
      var data = false;
      var that = this;
      //addtionRegion
      wx.navigateTo({
        url: '/pages/personal_info/personal_info?uid=' + that.data.userID,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
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
      wx.showLoading({
        title: '进行中',
      })
      let result = core.setUserStar(_THAT.data.userID, _THAT.data.followed ? 0 : 1);
      result.then(res => {
        let pages = getCurrentPages();
        let currentPage = pages[pages.length - 1];//lly_improve
        currentPage.setData({ component_user_refresh: !currentPage.data.component_user_refresh});
        wx.hideLoading();
      }).catch(wx.hideLoading());
    },

    post_invited: function () { //向用户发送邀请
      var data;
      var _THAT = this;
      _THAT.setData({ invited: true });//lly_improve
      let pages = getCurrentPages();
      let currentPage = pages[pages.length - 1];//lly_improve
      let data_temp = currentPage.data.invited_user;
      data_temp.push(_THAT.data.userID);
      currentPage.setData({ invited_user: data_temp});
      //addtionRegion
      //----debugdata----------
     /* wx.request({
        url: _API.post_invited,
        data: {
          session: wx.getStorageSync('session'),
          other_uid: _THAT.data.userID
        },
        method: 'GET',
        success: function (res) {
          //console.log(res);
          if (_util.errCode(res.data))
            _THAT.setData({ invited: true });//lly_improve
          return true;
        },
        fail: function (res) {
          core.com.show_mToast('网络错误');
        },
        complete: function (res) { },
      })*/
      //----debugdata----------

    },
  
    modal_leave_message: function () { //用户留言窗口
      var _THAT = this;
      core.com.show_modal(_THAT, 'leave_message', this.post_leave_message, '留言ing', '发送', false);


      return true;
    },
    modal_reply_message: function () { //用户回复留言窗口,暂停使用
      //  var _THAT = this;
      //core.com.show_modal(_THAT, 'leave_message', this.post_leave_message, '回复ing', '发送', false);

      return true;
    },
    post_leave_message: function (formdata) { //向服务器发送用户留言，或者回复内容
      var _THAT = this;
       //addtionRegion
      //----debugdata----------
      /*wx.request({
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
          core.com.show_mToast('网络错误');
        },
        complete: function (res) { },
      })*/
      //----debugdata----------
      return true;
    },

    modal_comment: function () { //用户评论窗口
      //var _THAT = this;
      //core.com.show_modal(_THAT, 'leave_message', this.post_comment, '评论ing', '发送', false);
      //addtionRegion

      return true;
    },

    post_comment: function (e) { //向服务器发送用户评论
      var data;
      //addtionRegion
      //----debugdata----------

      //----debugdata----------

      //console.log(e);
      core.com.show_mToast('完成评价');

      return true;
    },
    modal_answer_question: function () { //用户回答窗口
      
      wx.navigateTo({ url: '/pages/markdown_editor/index' });
      return true;
    },
    refuse_studyInvite:function()
    {
      console.log('refuse_studyInvite');
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