var _components = getApp().globalData.components;
var _API = getApp().globalData.CONSTANT.API;
var _util = getApp().globalData.util;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    study_status: true,
    url: {
      study: 'https://study.xietan.xin/static/upLoadFile/STUDY.png'
    },
    study_status: false,//判断是在学习还是结束
    study_history_array: [],//上次学习的信息
   
    current_studyInfo: {},//学习时所需数据
    study_rest: true,//是否处于休息状态
    //-----学习卡片部分
    study_fresh: false,
    //----------
    marker: [
      {

        id: 1,
        latitude: 34.113893,
        longitude: 108.937504,
        width: 50,
        height: 50,
        callout: { content: '第一教学楼\n自习人数200人', color: '#f85f48', bgColor: '#F5F5F5', display: 'ALWAYS', textAlign: 'center' },
        // label: { content: '66\n睡觉的时间的速度', fontSize: 10, x:'-50%',y:0,textAlign:'center'}      
      },
      {

        id: 2,
        latitude: 34.115739,
        longitude: 108.932906,
        width: 50,
        height: 50,
        callout: { content: '第二教学楼', color: '#f85f48', bgColor: '#F5F5F5', display: 'ALWAYS' },

      },
      {

        id: 3,
        latitude: 34.114509,
        longitude: 108.933170,
        width: 50,
        height: 50,
        callout: { content: '第三教学楼', color: '#f85f48', bgColor: '#F5F5F5', display: 'ALWAYS' }
      },
      {

        id: 4,
        latitude: 34.114529,
        longitude: 108.936024,
        width: 50,
        height: 50,

        callout: { content: '图书馆', color: '#f85f48', bgColor: '#F5F5F5', display: 'ALWAYS' },

      },
    ],//lly_improve
    map_controls: [

      {
        id: 1,
        iconPath: '/image/study.png',
        position: {
          left: 300,
          top: 450,
          width: 50,
          height: 50
        }
      }
    ],

    hidden_map: false
  },
  //------------自定义部分
  markertap: function (e) {
    //console.log(e.markerId)
    var that = this;
    this.setData({ hidden_map: true });
    _components.show_modal(that, 'leave_message', this.post_leave_message, '留言ing', '发送', true);
  },
  controltap: function (e) {
    //addtionRegion
  },
  //----------------------
  //--学习卡片部分
  //网约学习按钮
  button_order_menu: function (e) {
    var that = this;
    var item = [];
    var me = getApp().globalData.me;
    //----判断菜单内容
    if (me.study_hidden)
      item.push('隐藏学习信息');
    else
      item.push('取消隐藏学习信息');
    if (me.study_invite)
      item.push('不接受邀请');
    else
      item.push('接收邀请');
    //--------------
    wx.showActionSheet({
      itemList: item,
      success: function (res) {

        switch (res.tapIndex) {
          case 0:
            _util.me.study_hidden(me.study_hidden == 1 ? 0 : 1); break;
          case 1:
            _util.me.study_invite(me.study_invite == 1 ? 0 : 1); break;
        }

      }
    })
  },
  //---结束当前学习
  button_complete_study: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认结束本次学习吗',
      success: res => {
        if (res.confirm) {
          //addtionRegion
          that.setData({ study_status: false })

        }
      }
    })
  },
  //获取正在学习的文字信息，
  set_current_studyInfo: function (study) {
    var data = {
      place: study.place,
      study_content: study.study_content,
      study_num: study.study_num,
      end_hour: study.study_time.time[1],
      title_msg: study.msg
    };
    this.setData({ current_studyInfo: data });
    return true;
  },
  //---------------------------------------------------------------------
  //转跳匹配学习的页面，由图片触发
  nav_orderStudy_detailPage: function () {
    //addtionRegion
    wx.navigateTo({
      url: '/pages/order-study/order_operate/operate',
    })
  },
  //获取上一次学习的信息，此操作读取本地缓存
  get_study_history_array: function (model, e) {
    var data = [];//最终用于渲染的数组数据
    var end = e.length < 4 ? e.length : 4;//限制渲染卡片的数量
    var i, j;
    var reach=[];
    var gay = [];
    var temp;
    //---------------
    for (i = model; i < end; ++i) {
      //--获取曾经已经接受邀请的用户id
        reach=e[i].reach_id;
      for (j = 0; j < reach.length; j++) {
        if (reach[j].status == 1)
          gay.push(reach[j].uid);
      }
      //---设置历史学习卡片信息
      temp = {
        satisfaction:-1,
        msg: e[i].msg,
        place: e[i].place,
        study_content: e[i].study_content,
        launch_time: e[i].launch_time,
        end_hour: e[i].study_time.time[1] - e[i].study_time.time[0],
        gay: gay,
      };
      data.push(temp);
    }


    console.log(temp);
    console.log(data);
    console.log(end);

    this.setData({ study_history_array: data });
  },
  //获取上一次学习的满意度，此操作读取本地缓存
  set_study_satisfaction: function (e) {
    console.log(e);
  },

  //将是否接收邀请和分享学习信息的选择发送给服务器
  post_study_constraint: function (e) {
    var data = 0;
    for (var i in e.detail.value) {
      data += parseInt(e.detail.value[i]);
    }
    //addtionRegion ，
    //console.log(data, e.detail.value);
  },
  //----------------------------
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var get_bulid, get_study;
    //addtionRegion
    //---
    /* wx.showLoading({
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
         get_study = _util.errCode(res.data);
         if (get_study) {
 
         }
       },
       fail: function (res) {
         _components.show_mToast('网络错误');
       },
       complete: function (res) { wx.hideLoading(); },
     })*/


    //----debug
    var get_data = [
      { place: "第一教学楼", location_x: 0.000, location_y: 0.00, study_num: 2000 },
      { place: "第二教学楼", location_x: 0.000, location_y: 0.00, study_num: 2000 },
      { place: "第三教学楼", location_x: 0.000, location_y: 0.00, study_num: 2000 },
      { place: "图书馆", location_x: 0.000, location_y: 0.00, study_num: 2000 }
    ]
    this.setData({ study_status: true });
    this.init_data();
    //----debug

  },
  //------
  init_data: function (get_data) {
    //----debug
    get_data = [
      {
        study_id: 100,
        status: 1,
        launch_id: 110,
        msg: '求大家帮我复习高数',
        place: '第二教学楼|101',
        study_content: '高等数学',
        study_num: '23',
        reach_id: [
          { uid: 109, accept_time: '2018-6-7 18:00', status: 0, msg: "有课不想接，可以下次预约" },
          { uid: 107, accept_time: '2018-6-7 18:00', status: 1, msg: "可以一起学习，我教你高数" },
          { uid: 106 }
        ],
        study_time: { date: '2018-6-7', time: [5, 7] },
        launch_time: '2018-6-7 18:00',
      },
      {
        study_id: 100,
        status: 0,
        launch_id: 110,
        msg: '求大家帮我复习高数',
        place: '第二教学楼|101',
        study_content: '高等数学',
        study_time: { date: '2018-6-7', time: [5, 7] },
        reach_id: [
          { uid: 109, accept_time: '2018-6-7 18:00', status: 1, msg: "有课不想接，可以下次预约" },
          { uid: 107, accept_time: '2018-6-7 18:00', status: 1, msg: "可以一起学习，我教你高数" },
          { uid: 107 }
        ],
        launch_time: '2018-6-7 18:00'
      },
    ];
    //----debug
    if (get_data[0].status) {
      this.setData({ study_status: true });
      this.set_current_studyInfo(get_data[0]);
      this.get_study_history_array(1, get_data);
    }
    else {
      this.setData({ study_status: false })
    }
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