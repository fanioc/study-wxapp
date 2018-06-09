var _components = getApp().globalData.components;
var _API = getApp().globalData.CONSTANT.API;
var _util = getApp().globalData.util;
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
    time_index: []
  },
/**-------------- */
  attributeCount: function (obj) {
    var count = 0;
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {  // 建议加上判断,如果没有扩展对象属性可以不加
        count++;
      }
    }
    return count;
  },
  /*--------------------*/
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(e.markerId)
    var that = this;
    //---
    wx.showLoading({
      title: '加载数据中',
    });
    //---
    wx.request({
      url: _API.getClassList,
      data: {
        session: wx.getStorageSync('session'),
        place: options.place,
        date: '2018-06-08'//improve

      },
      method: 'GET',
      success: function (res) {

        var data = _util.errCode(res.data);
        var top_offset = [];
        top_offset.push(0);
        if (data) {
          console.log('ha', data);
          // console.log('ha',data);
          var i, temp = [], temp2 = [], temp3 = 0;
          for (i = 8; i < 23; i++) {

            temp.push(i + '-' + (++i));
            temp2.push(data[i]);
          }
          for (i = 0; i < 8; i++) {
            //*----------------
            if (temp2[i]) {
              console.log('haddddd', temp3);
              temp3 += that.attributeCount(temp2[i]) * 55 + 44;
            }
            else
              temp3 += 44;
            //** */-------------高度
            top_offset.push(temp3);
          }
          //console.log('ha66', top_offset);
          top_offset.pop();
          //console.log('ha66', temp2);
          that.setData({ free_class_array: temp2, time_index: temp, top_offset: top_offset });
        }
      },
      fail: function (res) {
        _components.show_mToast('网络错误');
      },
      complete: function (res) { wx.hideLoading(); },
    })
  },

  scrollClass: function (e) {
    var that = this;
    console.log('scrollTop=', e.detail.scrollTop);
    for (var i = 1; i < 8; i++) {
      if (e.detail.scrollTop <that.data.top_offset[i])
        break;
    }
    this.setData({ current_sort: i - 1 });

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