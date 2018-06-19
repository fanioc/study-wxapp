var core = getApp().globalData.core;
Page({

  /**
   * 页面的初始数据
   */
  data: {

    currentTab: 0,//当前顶部切换组件的序号
    on: true,
    //----------
    list: [
      {
        id: 'doing',
        name: '正在进行',
        open: false,
        pages: ['view', 'scroll-view', 'swiper']
      }, {
        id: 'deal',
        name: '等待处理',
        open: false,
        pages: ['text', 'icon', 'progress']
      }, {
        id: 'done',
        name: '已完成',
        open: false,
        pages: ['button', 'checkbox', 'form', 'input', 'label', 'picker', 'radio', 'slider', 'switch', 'textarea']
      }, {
        id: 'giveUp',
        name: '已放弃',
        open: false,
        pages: ['navigator']
      },
    ],
  },
  //-----------------本页面自定义函数
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },
  //-----swichNav
  swichNav: function (e)//* 点击上tab切换，已调试
  {
    //console.log(e.currentTarget.dataset.current);
    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    }
    else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  init_data: function (e) {
    var that = this;
    var get_data;
    //debugRegion
    //---
    wx.showLoading({
      title: '加载数据中',
    });
    //---
    core.APIrequest('getStudyList').then((get_data) => {
      console.log(get_data); //debug
      that.set_current_studyInfo(get_data[1]);
      that.get_study_history_array(get_data[0]);

      wx.hideLoading();
    }).catch((err) => {
      wx.hideLoading();
    });
  },
  //获取正在学习的文字信息，
  set_current_studyInfo: function (study) {
    var i, card_sort, temp = [];
    let me = core.userInfo[0].uid;
    var temp_doing = [], temp_deal = [];

    for (i = 0; i < study.length; i++) {
            
      if (study[i].launch_id != me) {
        // console.log('ssss', study[i].launch_id, 'ssss', me);
        if (study[i].reach_id[0].status == '-1') {
          //待处理的学习任务
          console.log('待处理的学习任务');
          temp_deal.push(study[i]);


        }
        else if (study[i].reach_id[0].status == '1'){
          temp_doing.push(study[i]);
        }

      } 
      else {

        temp_doing.push(study[i]);
      }
    }
    console.log(temp_doing,temp_deal);
    //console.log(temp);
    this.setData({
      current_studyInfo: temp_doing,
      deal_study_array: temp_deal,
    });
    return true;
  },
  //获取上一次学习的信息，此操作读取本地缓存
  get_study_history_array: function (e) {
    if (!e)
      return false;

    var data = []; //最终用于渲染的数组数据

    var i, j;
    var reach = [];
    var gay = [];
    var temp, satisfaction = [];
    //---------------
    for (i = 0; i < e.length; ++i) {
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

    this.setData({
      study_history_array: data,
      study_satisfaction: satisfaction
    });
  },
  //----拒绝或接受邀请
  modal_study_invite: function (e) {
    var that = this;
    this.setData({
      invited_index: e.currentTarget.dataset.index,
      invited: e.currentTarget.dataset.invited
    });
    var title = '您可向' + (e.currentTarget.dataset.invited == 1 ? '接受邀请的' : '被拒绝的同学') + '发送消息';
    core.com.show_modal(that, 'leave_message', that.post_inviteStatus, title, '确认');

    console.log(e.currentTarget.dataset.index, e.currentTarget.dataset.invited);

  },
  //------发送邀请状态
  post_inviteStatus: function (e) {

    console.log(e.formData, this.data.invited_index, this.data.invited);
    //---
    wx.showLoading({
      title: '加载数据中',
    });
    //---
    var that = this;
    var temp = that.data.current_studyInfo;

    core.APIrequest('acceptStudy', {
      study_id: that.data.invited_index,
      msg: e.formData.leave_message,
      status: that.data.invited
    }).then((result) => {
          wx.hideLoading();
          that.init_data();
    }).catch((err) => {
      wx.hideLoading();
    });
    
  },
  //转跳至study_card
  nav_study_card:function(e)
  {
    wx.navigateTo({
      url: '/pages/study/study_index/study_card/study_card?index=' + e.currentTarget.dataset.index,
    })
  },
  menu_left_button:function(){
    wx.showActionSheet({
      itemList: ['发起自习','自习地图','排行榜'],
      success: function (res) {

        switch (res.tapIndex) {
          case 0:
            wx.navigateTo({
              url: '/pages/study/order_operate/form/form',
            })
            break;
          case 1:
            wx.navigateTo({
              url: '/pages/study/index',
            })
            break;
          case 2:
            wx.navigateTo({
              url: '/pages/study/rank/rank',
            })
            break;
          case 3:
            //that.nav_orderStudy_detailPage()
            break;

        }

      }
    })
  },
  take_part_in:function(){
    //addtionRegion
    wx.showModal({
      title: '提示',
      content: '确定加入此学习吗',
      success:res=>{
        if (res.confirm)
        {
          core.com.show_mToast('已发送邀请');
        }
      }
    })
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