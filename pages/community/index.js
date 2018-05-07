// pages/community/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,//当前顶部切换组件的序号
    bannerList: [{ imgSrc:"debug0.png"}],
    on:true
  },
//-----------------本页面自定义函数
    /**
     * 点击上tab切换，已调试
     */
  swichNav:function(e){
console.log(e.currentTarget.dataset.current);
var that = this;

if (this.data.currentTab === e.target.dataset.current) {
  return false;
} else {
  that.setData({
    currentTab: e.target.dataset.current
  })
}
  },
      /**
     * 获取动态圈板块的置顶广告的图片src，并存入数组bannerList:[]供wx for渲染
     */
  getBannerImgSrc:function(e)
  {
   //addtionRegion
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