// pages/order-study/order_map/order_map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    var that = this;
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_study_map()
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