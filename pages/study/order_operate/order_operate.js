var core = getApp().globalData.core;

Page({

  /**
   * 页面的初始数据
   */
  data: {

    current_sort: '0',
    scroll_top: '',
    scroll_ID: 's8',
    hidden_map: true,
    free_class_array: [],
    time_index: [],
    form_date: '',
  },
  /**-------------- */
  attributeCount: function (obj) {
    var count = 0;
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) { // 建议加上判断,如果没有扩展对象属性可以不加
        count++;
      }
    }
    if (count > 0 && count < 3)
      count = 3;
    return count / 3;
  },
  fill_order_study: function (e) {
    var that = this;
    wx.navigateTo({
      url: "/pages/study/order_operate/form/form?site=" + e.currentTarget.dataset.site + '&place=' + that.data.form_place + '&date=' + that.data.form_date,
    })
  },
  a: function () {},
  /*--------------------*/
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // options.place ='2号教学楼';
    this.setData({
      form_place: options.place,
      form_date: options.date
    });
    //console.log(e.markerId)
    var that = this;
    //---
    wx.showLoading({
      title: '加载数据中',
    });
    //---
    core.APIrequest('getClassList', {
      place: options.place,
      date: options.date
    }).then((result) => {
      var data = result;
      var top_offset = [];
      top_offset.push(0);
      console.log('ha', data);
      // console.log('ha',data);
      var i, temp = [],
        temp2 = [],
        temp3 = 0;
      for (i = 8; i < 23;) {
        temp.push(i + '-' + (++i));
      }
      console.log(temp)

      for (i = 8; i < 23; i++) {
        temp2.push(data[i]);
      }
      for (i = 0; i < 8; i++) {
        //*----------------
        console.log('模块高度', temp3);
        temp3 += that.attributeCount(temp2[i]) * 54 + 44;

        //** */-------------高度
        top_offset.push(temp3);
      }
      //console.log('ha66', top_offset);
      top_offset.pop();
      //console.log('ha66', temp2);
      that.setData({
        free_class_array: temp2,
        time_index: temp,
        top_offset: top_offset
      });
      wx.hideLoading()
    }).catch((err) => {
      core.APIerrCode(err, 2)
      wx.hideLoading()
    });

  },

  scrollClass: function (e) {
    var that = this;
    console.log('scrollTop=', e.detail.scrollTop);
    for (var i = 1; i < 8; i++) {
      if (e.detail.scrollTop < that.data.top_offset[i])
        break;
    }
    this.setData({
      current_sort: i - 1
    });

  },
  changeScroll: function (e) {
    this.setData({
      scroll_ID: e.currentTarget.id,
      current_sort: e.currentTarget.dataset.index,
    });
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