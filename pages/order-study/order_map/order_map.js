var core = getApp().globalData.core;

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
          height: 50,
          
        },
        clickable: true
      }
    ],
  
  },
  markertap: function (e) {
 
    var i; 
    for (i = 0; i < this.data.marker.length;i++)
    {
      //console.log(this.data.marker[i].id ,e.markerId);
     
      if (this.data.marker[i].id == e.markerId)
        break;
    }

    //console.log("pages/order-study/order_operate/order_operate?place=" + this.data.marker[i].place);
   wx.navigateTo({
     url: "/pages/order-study/order_operate/order_operate?place=" + this.data.marker[i].place,
   })

  },
  
  controltap: function (e) {
    wx.navigateTo({
      url: "/pages/order-study/index",
    })
    console.log('controltap')
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
    //---//debugRegion
     wx.request({
       url: _API.getStudyPlace,
       data: {
         session: wx.getStorageSync('session')
       },
       method: 'GET',
       success: function (res) {
                 var e=_util.errCode(res.data);
                 if(e)
                 {
                   var i, marker = [], temp;
                   for (i = 0; i < e.length; i++) {
                     temp = {

                       id: e[i].place_id,
                       latitude: e[i].latitude,
                       longitude: e[i].longitude,
                       width: 50,
                       height: 50,
                       place: e[i].place,
                       callout: { content: e[i].place + '\n自习人数:' + e[i].stu_num, color: '#f85f48', bgColor: '#F5F5F5', display: 'ALWAYS', textAlign: 'center' }
                       // label: { content: '66\n睡觉的时间的速度', fontSize: 10, x:'-50%',y:0,textAlign:'center'}      
                     }
                     marker.push(temp);
                   }
                   console.log(e);
                   that.setData({ marker: marker});
                   wx.hideLoading()
                 }
       },
       fail: function (res) {
         _components.show_mToast('网络错误');
       },
       complete: function (res) { wx.hideLoading();},
     })



  },

 

  //----------------------
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载地图...',
    })
    this.get_study_map();
    
    
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