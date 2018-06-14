var core = getApp().globalData.core;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    complete_study:false,
    url: {
      study: 'https://study.xietan.xin/static/upLoadFile/STUDY.png'
    },
    study_status: false,//判断是在学习还是结束
    study_history_array: [],//上次学习的信息
    study_satisfaction: [],//历史学习记录的满意度,
    current_studyInfo: {},//离自己最近的学习计划所需数据

    //-----学习卡片部分
    study_fresh: false,
    //----------

  },
  //------------自定义部分
  //--学习卡片部分
  //----拒绝或接受邀请
  modal_study_invite: function (e) {
    var that = this;
    this.setData({ invited_index: e.currentTarget.dataset.index, invited: e.currentTarget.dataset.invited });
    var title = '您可向' + (e.currentTarget.dataset.invited == 1 ? '接受邀请的' : '被拒绝的同学') + '发送消息';
    _components.show_modal(that, 'leave_message', that.post_inviteStatus, title, '确认');

    console.log(e.currentTarget.dataset.index, e.currentTarget.dataset.invited);

  },
  post_inviteStatus: function (e) {

    //console.log(e.formData, this.data.invited_index, this.data.invited);
    //---
    wx.showLoading({
      title: '加载数据中',
    });
    //---
    var that = this;
    var temp = that.data.current_studyInfo;
    wx.request({
      url: _API.acceptStudy, //acceptStudy: URL.study + 'acceptStudy',//($session, $study_id, $msg, $status)
      data: {
        session: wx.getStorageSync('session'),
        study_id: temp[that.data.invited_index].study_id,
        msg: e.formData.leave_message,
        status: that.data.invited

      },
      method: 'GET',
      success: function (res) {
        if (res.data.errCode) {
          that.init_data();
                  }
      },
      fail: function (res) {
        _components.show_mToast('网络错误');
      },
      complete: function (res) { wx.hideLoading(); },
    })
  },
  //网约学习底部菜单
  button_order_menu: function (e) {
    var that = this;
    var item = [];
    var userConfig = getApp().globalData.userConfig;
    //----判断菜单内容
    if (userConfig.study_hidden)
      item.push('隐藏学习信息');
    else
      item.push('取消隐藏学习信息');
    if (userConfig.study_invite)
      item.push('不接受邀请');
    else
      item.push('接收邀请');
    item.push('不显示历史记录');//debug
    item.push('学习地图');

    //--------------
    this.setData({ menu_item_list: item });
    wx.showActionSheet({
      itemList: item,
      success: function (res) {

        switch (res.tapIndex) {
          case 0:
            _util.me.study_hidden(me.study_hidden == 1 ? 0 : 1); break;
          case 1:
            _util.me.study_invite(me.study_invite == 1 ? 0 : 1); break;
          case 2:
            break;
          case 3:
            that.nav_orderStudy_detailPage()
            break;
        }

      }
    })
  },
  //---结束当前学习
  button_complete_study: function (e) {
    this.setData({complete_study:true});

  },
  //获取正在学习的文字信息，
  set_current_studyInfo: function (study) {
    var i, card_sort, temp = [];
    console.log(study);
    for (i = 0; i < study.length; i++) {

      if (study[i].launch_id != getApp().globalData.me.uid) {
        if (study[i].reach_id[0].status == '-1') {
          study[i].card_sort = 2;
          temp.push(study[i]);
        }
        else if (study[i].reach_id[0].status == '1') {
          study[i].card_sort = 3;//
          temp.push(study[i]);
        }
        else
        { }
      }
      else {
        study[i].card_sort = 1;
        temp.push(study[i]);
      }
    }
    //console.log(temp);
    this.setData({ current_studyInfo: temp });
    return true;
  },
  //---------------------------------------------------------------------
  //转跳匹配学习的页面，由图片触发
  nav_orderStudy_detailPage: function () {
    wx.navigateBack({
      delta: 1,
    })
  },
  //获取上一次学习的信息，此操作读取本地缓存
  get_study_history_array: function (e) {
    if (!e)
      return false;

    var data = [];//最终用于渲染的数组数据
    var end = e.length < 4 ? e.length : 4;//限制渲染卡片的数量
    var i, j;
    var reach = [];
    var gay = [];
    var temp, satisfaction = [];
    //---------------
    for (i = 0; i < end; ++i) {
      //--获取曾经已经接受邀请的用户id
      reach = e[i].reach_id;
      gay = [];
      for (j = 0; j < reach.length; j++) {
        if (reach[j].status == 1 && reach[j].uid != getApp().globalData.me.uid)
          gay.push(reach[j].uid);
      }
      //----获取每次学习的满意度,
      satisfaction.push(e[i].satisfaction);
      //---设置历史学习卡片信息
      temp = {
        msg: e[i].msg,
        place: e[i].place,
        study_content: e[i].study_content,
        launch_time: e[i].launch_time,
        end_hour: e[i].study_time_end - e[i].study_time_start,
        gay: gay,
      };
      //console.log(gay);
      data.push(temp);
    }


    /*console.log(temp);
     console.log(data);
     console.log(end);*/

    this.setData({ study_history_array: data, study_satisfaction: satisfaction });
  },
  //获取上一次学习的满意度，此操作读取本地缓存
  set_study_satisfaction: function (e) {
    console.log(e);
    if (e.target.dataset.value) {
  
      var that = this;
      
       
          //---
          wx.showLoading({
            title: '加载数据中',
          });
          //---
          wx.request({
            url: _API.setSatStudy, //acceptStudy: URL.study + 'acceptStudy',//($session, $study_id, $msg, $status)
            data: {
              session: wx.getStorageSync('session'),
              study_id: e.currentTarget.dataset.index,
              sat: e.target.dataset.value,
            },
            method: 'GET',
            success: function (res) {
              var get_data = _util.errCode(res.data);
              if (get_data) {
                console.log(get_data);
                this.setData({ complete_study: false });
                that.init_data();
              }
            },
            fail: function (res) {
              _components.show_mToast('网络错误');
            },
            complete: function (res) { wx.hideLoading(); },
          })
      
        
      
      
    }
   
    
  },
  //----------------------------
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    


  },
  //------
  init_data: function () {
    var that = this;
    var get_data;
    //debugRegion
    //---
    wx.showLoading({
      title: '加载数据中',
    });
    //---
    wx.request({
      url: _API.getStudyList,
      data: {
        session: wx.getStorageSync('session')
      },
      method: 'GET',
      success: function (res) {

        get_data = _util.errCode(res.data);
        if (get_data) {
          console.log(get_data);//debug
         
            that.set_current_studyInfo(get_data[1]);
            that.get_study_history_array(get_data[0]);
            that.setData({ study_status: true });
          
        }
      },
      fail: function (res) {
        _components.show_mToast('网络错误');
      },
      complete: function (res) {
        wx.hideLoading();
      },
    })



  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    /*  this.map_content=wx.createMapContext('study_map', this);
      this.map_content.moveToLocation();*/
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.init_data();
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
    this.setData({ study_fresh: !this.data.study_fresh });

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