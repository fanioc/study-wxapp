var _components = getApp().globalData.components;
var _API = getApp().globalData.CONSTANT.API;
var _util = getApp().globalData.util;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: {
      study: 'https://study.xietan.xin/static/upLoadFile/STUDY.png'
    },
    study_status: true,//判断是在学习还是结束
    study_history_array: [],//上次学习的信息
    study_satisfaction: [],//历史学习记录的满意度,
    current_studyInfo: {},//学习时所需数据
    //-----学习卡片部分
    study_fresh: false,
    //----------
    marker: [],//lly_improve
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
  //--初始化学习地图
  get_study_map: function () {
    var that=this;
    //--获取当前地址；
    wx.getLocation({
      success: function (res) {

        that.setData({ latitude: res.latitude, longitude: res.longitude })
      },
    });
    //-----debug
    var e = [
      { place: "第一教学楼", location_x: 34.113893, location_y: 108.937504, study_num: 2000 },
      { place: "第二教学楼", location_x: 34.115739, location_y: 108.932906, study_num: 2000 },
      { place: "第三教学楼", location_x: 34.114509, location_y: 108.933170, study_num: 2000 },
      { place: "图书馆", location_x: 34.114529, location_y: 108.936024, study_num: 2000 }
    ]
    //----

    //---//addtionRegion
    /* wx.request({
       url: _API.getStudyPlace,
       data: {
         session: wx.getStorageSync('session')
       },
       method: 'GET',
       success: function (res) {
                 var e=_util.errCode(res.data);
                 if(e)
                 {
 
                 }
       },
       fail: function (res) {
         _components.show_mToast('网络错误');
       },
       complete: function (res) { wx.hideLoading();},
     })*/

    var i, marker = [], temp;
    for (i = 0; i < e.length; i++) {
      temp = {

        id: i,
        latitude: e[i].location_x,
        longitude: e[i].location_y,
        width: 50,
        height: 50,
        callout: { content: e[i].place + '\n自习人数:' + e[i].study_num, color: '#f85f48', bgColor: '#F5F5F5', display: 'ALWAYS', textAlign: 'center' }
        // label: { content: '66\n睡觉的时间的速度', fontSize: 10, x:'-50%',y:0,textAlign:'center'}      
      }
      marker.push(temp);
    }
    this.setData({ marker: marker });

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
          that.get_study_map();
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
    var reach = [];
    var gay = [];
    var temp, satisfaction = [];
    //---------------
    for (i = model; i < end; ++i) {
      //--获取曾经已经接受邀请的用户id
      reach = e[i].reach_id;
      for (j = 0; j < reach.length; j++) {
        if (reach[j].status == 1)
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
        end_hour: e[i].study_time.time[1] - e[i].study_time.time[0],
        gay: gay,
      };
      data.push(temp);
    }


    /*console.log(temp);
     console.log(data);
     console.log(end);*/

    this.setData({ study_history_array: data, study_satisfaction: satisfaction });
  },
  //获取上一次学习的满意度，此操作读取本地缓存
  set_study_satisfaction: function (e) {
    console.log(e.target.dataset);
    if (e.target.dataset.value) {
      var temp = this.data.study_satisfaction;
      temp[e.currentTarget.dataset.index] = e.target.dataset.value;
      //addtionRegion  发送满意度
      this.setData({ study_satisfaction: temp });
    }
    console.log(e);
    //this.setData({ })study_history_array[e.currentTarget.dataset.]
  },
  //----------------------------
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var get_study;
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
            that.init_data(get_study);
         }
       },
       fail: function (res) {
         _components.show_mToast('网络错误');
         wx.hideLoading();//success的由init_data()hideloading
       },
       complete: function (res) {  },
     })*/


    //----debug

    // this.setData({ study_status: true });
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
        satisfaction: -1,
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
        satisfaction: -1,
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
    if (get_data[0].status == 1) {
      this.set_current_studyInfo(get_data[0]);
      this.get_study_history_array(1, get_data);
      this.setData({ study_status: true });
      wx.hideLoading();
    }
    else {
      this.get_study_history_array(0, get_data);
      get_study_map();
      this.setData({ study_status: false });
      //---由get_study_map wx.hideLoading();
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