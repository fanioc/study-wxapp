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
    study_status: false,//判断是在学习还是结束
    study_history_array: [],//上次学习的信息
    study_satisfaction: [],//历史学习记录的满意度,
    current_studyInfo: {},//离自己最近的学习计划所需数据
    study_index: {
      doing:'',
      invited:'',
    },//sort_by_study_index根据服务器studylist接口接收的数据，对其进行分类,存入此数组中
    //-----学习卡片部分
    study_fresh: false,
    //----------

  },
  //------------自定义部分
  sort_by_study_index: function (data) {//根据服务器studylist接口接收的数据，对其进行分类,存入study_index数组中
            data
  },
  //--学习卡片部分
  //网约学习底部菜单
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
    item.push('不显示历史记录');//debug
    item.push('学习地图');
    
    //--------------
    this.setData({menu_item_list:item});
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
    // var data = {
    //   place: study.place,
    //   study_content: study.study_content,
    //   study_num: study.study_num,
    //   end_hour: study.study_time.time[1],
    //   title_msg: study.msg
    // };
    var i,card_sort,temp=[];
    console.log(study);
    for(i=0;i<study.length;i++)
    {
      
      if (study[i].launch_id != getApp().globalData.me.uid)
      {
        if (study[i].reach_id[0].status == '-1')
          {
          study[i].card_sort = 2;
          temp.push(study[i]);
          }
        else if (study[i].reach_id[0].status == '1')
        {
          study[i].card_sort = 3;
          temp.push(study[i]);
        }
        else
        {}
      }
      else
      {
        study[i].card_sort = 1;
        temp.push(study[i]);
      }
    }
    console.log(temp);
    this.setData({ current_studyInfo:temp });
    return true;
  },
  //---------------------------------------------------------------------
  //转跳匹配学习的页面，由图片触发
  nav_orderStudy_detailPage: function () {
    //addtionRegion
    wx.navigateTo({
      url: '/pages/order-study/order_map/order_map',
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
      gay = [];
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
      console.log(gay);
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

        get_study = _util.errCode(res.data);
        if (get_study) {
          console.log(get_study);//debug
          that.init_data(get_study);
        }
      },
      fail: function (res) {
        _components.show_mToast('网络错误');
      },
      complete: function (res) { 
        wx.hideLoading();
      },
    })


    //----debug

    // this.setData({ study_status: true });
    /* wx.showLoading({
       title: 'jiazaizhong',
     });
     this.init_data();*/
    //----debug


  },
  //------
  init_data: function (get_data) {
    console.log(get_data)
    if (get_data[1]) {
      this.set_current_studyInfo(get_data[1]);
      //this.get_study_history_array(1, get_data);
      this.setData({ study_status: true });
    }
    else {
      this.get_study_history_array(0, get_data);
      wx.navigateTo({
        url: '/pages/order-study/order_map/order_map',
      });
      this.setData({ study_status: true });
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