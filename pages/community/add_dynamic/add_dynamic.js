// pages/community/add_dynamic/add_dynamic.js
var _components = getApp().globalData.components;
var _API = getApp().globalData.CONSTANT.API;
var _util = getApp().globalData.util;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    upload_img: [],
    button_prompt: '添加',
    anonymous: '',
  },
  edit_content_imgURL: function (e) {
    var that = this;

    wx.chooseImage({//选择图片，上传成功后将获取地址
      count: 1,
      success: function (res_cho) {

        //debugRegion
        console.log(res_cho.tempFilePaths[0]);
        that.setData({ upload_img: res_cho.tempFilePaths, button_prompt: '重选' });

      }
    })


  },
  submit_question: function (e) {
    var that = this;
    console.log(e.detail.value);
    //addtionRegion

    var post_signal;
    var upload_data;
    if (that.data.upload_img) {
      const upload_task = wx.uploadFile({
        url: _API.uploadFile,

        filePath: that.data.upload_img[0],
        name: 'file',
        success: function (res) {
          console.log(JSON.parse(res.data));
         upload_data = JSON.parse(res.data);
          if (upload_data.errCode == 0) {
              post_signal=true;
          }
          else {
            _components.show_mToast('图片上传失败');
            post_signal=false;
          }
        },

      });//上传问题描述的图片
    }
    else
      post_signal=true;
    if(post_signal)
{
      wx.request({
        url: _API.publishDynamic,
        data: {
          session: wx.getStorageSync('session'),
          title: e.detail.value.question_title,
          img_url:upload_data.fileUrl,
          content: e.detail.value.question_describe,
          type: that.data.anonymous,
          sort: e.detail.value.question_sort,
        },
        method: 'GET',
        success: function (res) {
          console.log(res.data);
          _components.show_mToast('发表成功');
          /*wx.navigateBack({
      delta:1
    })*/
        },
        fail: function (res) {
          _components.show_mToast('网络错误');
        },
        complete: function (res) { },
      })
      //console.log('发表成功');
      
    
}

   
  },
  //将编写问题页面收集的文字信息发送到数据库

  anonymous: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value.length);
    if (e.detail.value.length)
      this.setData({ anonymous: 2 });
    else
      this.setData({ anonymous: 1 });
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