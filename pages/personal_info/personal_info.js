const CONSTANT = getApp().globalData.CONSTANT
var mtabW;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: 110,
    userInfo: {},
    activeIndex: 0,
    // slideOffset: 0,
    tabW: 0,
    study: [
      {
        study_id: 100,
        status: 1, launch_id: 110,
        msg: '求大家帮我复习高数',
        place: '第二教学楼-101',
        study_content: "高等数学",
        reach_id: [
          { uid: 109, accept_time: '2018-6-7 18:00', status: 1, msg: "有课不想接，可以下次预约" },
          { uid: 107, accept_time: '2018-6-7 18:00', status: 1, msg: "可以一起学习，我教你高数" },
          { uid: 106 }
        ],
        study_time: { date: '2018-6-7', time: [8, 12] },
        launch_time: '2018-6-7 18:00'
      }, {
        study_id: 100,
        status: 1, launch_id: 110,
        msg: '求大家帮我复习高数',
        place: '第二教学楼-101',
        study_time: { date: '2018-6-7', time: [8, 12] },
        study_content: "高等数学",
        reach_id: [
          { uid: 109, accept_time: '2018-6-7 18:00', status: 1, msg: "有课不想接，可以下次预约" },
          { uid: 107, accept_time: '2018-6-7 18:00', status: 1, msg: "可以一起学习，我教你高数" },
          { uid: 107 }
        ],
        launch_time: '2018-6-7 18:00'
      }, {
        study_id: 100,
        status: 1, launch_id: 110,
        msg: '求大家帮我复习高数',
        place: '第二教学楼-101',
        study_time: { date: '2018-6-7', time: [8, 12] },
        study_content: "高等数学",
        reach_id: [
          { uid: 109, accept_time: '2018-6-7 18:00', status: 1, msg: "有课不想接，可以下次预约" },
          { uid: 107, accept_time: '2018-6-7 18:00', status: 1, msg: "可以一起学习，我教你高数" },
          { uid: 107 }
        ],
        launch_time: '2018-6-7 18:00'
      }, {
        study_id: 100,
        status: 1, launch_id: 110,
        msg: '求大家帮我复习高数',
        place: '第二教学楼-101',
        study_time: { date: '2018-6-7', time: [8, 12] },
        study_content: "高等数学",
        reach_id: [
          { uid: 109, accept_time: '2018-6-7 18:00', status: 1, msg: "有课不想接，可以下次预约" },
          { uid: 107, accept_time: '2018-6-7 18:00', status: 1, msg: "可以一起学习，我教你高数" },
          { uid: 107 }
        ],
        launch_time: '2018-6-7 18:00'
      }, {
        study_id: 100,
        status: 1, launch_id: 109,
        msg: '求大家帮我复习高数',
        place: '第二教学楼-101',
        study_content: "高等数学",
        study_time: { date: '2018-6-7', time: [8, 12] },
        reach_id: [
          { uid: 109, accept_time: '2018-6-7 18:00', status: 1, msg: "有课不想接，可以下次预约" },
          { uid: 107, accept_time: '2018-6-7 18:00', status: 1, msg: "可以一起学习，我教你高数" },
          { uid: 107 }
        ],
        launch_time: '2018-6-7 18:00'
      }
    ],
    timeCap: [
      {
        capsule_id: 1,
        content: "过四级",
        start_time: '',
        dead_time: '',
        cap_color: '',
        star_num: 123,
        status: 1
      }, {
        capsule_id: 2,
        content: "过六级",
        start_time: '',
        dead_time: '',
        cap_color: '',
        star_num: 123,
        status: 1
      }, {
        capsule_id: 2,
        content: "过八级",
        start_time: '',
        dead_time: '',
        cap_color: '',
        star_num: 123,
        status: 0
      },
      {
        capsule_id: 2,
        content: "过八级",
        start_time: '',
        dead_time: '',
        cap_color: '',
        star_num: 123,
        status: 0
      }
    ], score: [
      {
        xn: '2018-2017',
        xq: 2,
        course: "高等数学",
        score: 99,
        quality: '公共必修',
        credit: 3
      }, {
        xn: '2018-2017',
        xq: 2,
        course: "英语",
        score: 99,
        quality: '公共必修',
        credit: 3
      }, {
        xn: '2018-2017',
        xq: 2,
        course: "历史",
        score: 99,
        quality: '公共必修',
        credit: 3
      }, {
        xn: '2018-2017',
        xq: 2,
        course: "语文",
        score: 99,
        quality: '公共必修',
        credit: 3
      }
    ]

  },
  tabClick: function (e) {
    if (this.data.activeIndex != e.currentTarget.id)
      this.setData({
        activeIndex: e.currentTarget.id,
        slideOffset: e.currentTarget.offsetLeft
      })
  },

  tabChange: function (e) {
    var current = e.detail.current;
    var offsetW = current * mtabW; //2种方法获取距离文档左边有多少距离
    this.setData({
      activeIndex: current,
      slideOffset: offsetW
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        mtabW = res.windowWidth / 3; //设置tab的宽度
        console.log(res)
        that.setData({
          tabW: mtabW
        })
      }
    });

    this.getUserInfo(options.uid)
  },

  getUserInfo(uid) {
    var that = this
    this.setData({ uid: uid })
    wx.request({
      url: CONSTANT.API.getUserBasicInfo,
      data: {
        session: wx.getStorageSync('session'),
        other_uid: uid
      },
      success: function (res) {
        console.log(res)
        if (res.data.errCode == 0)
          that.setData({
            userInfo: res.data.data
          })
      }
    })
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