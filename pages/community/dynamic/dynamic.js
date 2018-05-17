// pages/community/dynamic/dynamic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag_array: [],//分类标签用于for渲染，get_tag_array: function ()
  },
//-----------自定义函数
  /**
   * 获取问题的分类标签用于for渲染
   */
  get_tag_array: function () {
      var data=[];
      //addtionRegion
      //----debugdata----------
      data = ['高等数学', '第二章','高斯定理'];
      //----debugdata----------
      var len=data.length;
      if(len.length>3)//确保只显示三个tag
        {
          len=3;
        }

      this.setData({ tag_array: data.slice(0,len)});
  },
//--------------------
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_tag_array();
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