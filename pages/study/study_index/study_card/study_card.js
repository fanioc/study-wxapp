var core = getApp().globalData.core;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    complete_study: false,
    url: {
      study: 'https://study.xietan.xin/static/upLoadFile/STUDY.png'
    },

  },
  //------------自定义部分
  //--学习卡片部分



  //网约学习底部菜单
  button_order_menu: function (e) {
    let that = this;
    let item = [];
    let userConfig = core.userConfig;
    //----判断菜单内容
    if (userConfig.study_hidden)
      item.push('隐藏学习信息');
    else
      item.push('取消隐藏学习信息');
    if (userConfig.study_invite)
      item.push('允许他人加入');
    else
      item.push('不允许他人加入');
    item.push('学习地图');
    item.push('邀请微信好友');
    item.push('联系室');
    //--------------
   /* this.setData({
      menu_item_list: item
    });*/
    wx.showActionSheet({
      itemList: item,
      success: function (res) {

        switch (res.tapIndex) {
          case 0:
           // _util.me.study_hidden(me.study_hidden == 1 ? 0 : 1);
            break;
          case 1:
           // _util.me.study_invite(me.study_invite == 1 ? 0 : 1);
            break;
          case 2:
            break;
          case 3:
            //that.nav_orderStudy_detailPage()
            break;
           
        }

      }
    })
  },
  //---结束当前学习
  button_complete_study: function (e) {
    //setSatStudy: URL.study + 'setSatStudy',//设置满意度 也就是完成当前学习 只有发起者能设置本次学习
    //---
    wx.showLoading({
      title: '加载数据中',
    });
    //---
    var that = this;

    core.APIrequest('setSatStudy', {
      study_id: that.data.study_array.study_id,
      sat:1,
    }).then((result) => {
      wx.navigateBack({
        delta: 1,
      });
      wx.hideLoading();
    }).catch((err) => {
      wx.hideLoading();
    });

  },

  //---------------------------------------------------------------------



  //----------------------------
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options.index);
    let current_page = getCurrentPages();
    let current_page_index = current_page.length - 2;
    let temp_study=current_page[current_page_index].data.current_studyInfo[options.index];
    console.log(temp_study);
    this.setData({ study_array:temp_study});
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