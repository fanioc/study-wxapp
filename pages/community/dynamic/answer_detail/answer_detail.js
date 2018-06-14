var core = getApp().globalData.core;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answer_array:{},//回答所需的详细数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    //---
    wx.showLoading({
      title: '加载详情中',
    })
    //---
    /*  getDynamicAns: URL.study + 'getDynamicAns',//($session, $dynamic_id, $answer_id)*/
    let req = core.APIrequest('getDynamicAns', {
      dynamic_id: options.dynamic_id,
      answer_id: options.answer_id,
    });
    req.then(data=>{
        //----
        if (data)//获取成功
        {

          that.setData({ answer_array: data[0], question_title: options.question_title, agree: data[0].is_agree });
          console.log('getDynamicAns',that.data.answer_array);
          that.setData({ data_success: true });

        }
        wx.hideLoading();

    }).catch(wx.hideLoading());
  },
  /**
*隐藏回答详情
*/
  hidden_answer_detail: function () {

    wx.navigateBack({
      delta: 1,
    });
  },
  /**
* 赞同或采纳此问题
*/
  set_question_attitude: function () {

    var _THAT = this;
    console.log(_THAT.data.agree);
    var new_agree = _THAT.data.agree? 0 : 1;
    console.log(new_agree);
    wx.request({
      //setDynamicAgree: URL.study + 'setDynamicAgree',//($session, $dynamic_id, $answer_id, $agree)
      url: _API.setDynamicAgree,
      data: {
        session: wx.getStorageSync('session'),
        dynamic_id: _THAT.data.answer_array.dynamic_id,
        answer_id: _THAT.data.answer_array.answer_id,
        agree: new_agree
      },
      method: 'GET',
      success: function (res) {
        var data = _util.errCode(res.data)
        if (data) {
          _THAT.setData({ agree: new_agree });
          //_components.show_mToast(data.errMsg)
        }

      },
      fail: function (res) {
        _components.show_mToast('网络错误');
      },
      complete: function (res) { },
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