// pages/community/add_dynamic/add_dynamic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    upload_img:[]
  },
  edit_content_imgURL: function (e) {
    var that = this;

    wx.chooseImage({//选择图片，上传成功后将获取地址插入markdown标记中
      count: 9,
      success: function (res_cho) {

        //addtionRegion
        console.log(res_cho.tempFilePaths);
        that.setData({ upload_img: res_cho.tempFilePaths})
        
      }
    })


  }, 
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