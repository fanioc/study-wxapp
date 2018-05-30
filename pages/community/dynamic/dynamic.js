// pages/community/dynamic/dynamic.js
var components = getApp().globalData.components;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag_array: [],//分类标签用于for渲染，onload()
    
    question_title:'盧林楊啊啊啊',
    question_describe:'debugdatadebugdatadebugdatadebugdatadebugdatadebugdatadebugda哈哈哈啊tadebugdata哈哈哈啊',
    userID:0,
    answer_array: [],//回答问题的列表，用于for渲染
    hidden_answer_detail:true,//是否隐藏回答详情页面
    answer_detail_index: 0,//回答问题的列表下的for渲染的索引
    my_question:false,//是否是用户本人的问题,onload时get
    question_attitude: false,//对问题的态度是赞同采纳或者不赞同采纳，需要在modal_answer_detail开始时get
    
    current_answer_detail: '',//当前需要展示的给towxml的md回答页面
  },
//-----------自定义函数
  /**
   * 获取问题的分类标签用于for渲染
   */
  get_tag_array: function () {
      var data=[];
      //debugRegion
      //----debugdata----------
      data = [getApp().globalData.current_question.dynamic_sort];
      //----debugdata----------
      var len=data.length;
      if(len.length>3)//确保只显示三个tag
        {
          len=3;
        }

      this.setData({ tag_array: data.slice(0,len)});
  },
    /**
   * 获取回答的列表 追加的向数组添加数据
   */
  get_answer_array: function (model=1) {
    var data = [];
    var getArray=[];
    //addtionRegion
    //----debugdata----------
    getArray = [{
      userID:1,
      content:"难道不明白纸质书更贵啊！！！ 若觉得kindle更贵，我觉得要么阅读量太少，那确实没有买kindle的必要。要么买的都是读量太少，那确实没有买kindle的必要。要",
      agree:369,
      answer_time:2017-1-1
    }];
    //----debugdata----------

    if (model) {
      data = this.data.answer_array.concat(getArray);
    }
    else {
      data = getArray;
    }
    this.setData({ answer_array: data });
  },
    /**
   * 显示回答详情
   */
  modal_answer_detail: function (e) {
    //console.log(e.currentTarget.dataset.index);
    var get_question_attitude;//获取用户对问题的态度
    //addtionRegion
     get_question_attitude=false;
     this.setData({ answer_detail_index: e.currentTarget.dataset.index, hidden_answer_detail: false, question_attitude: get_question_attitude });
  },
  /**
*隐藏回答详情
*/
  hidden_answer_detail: function () {
    
    this.setData({ hidden_answer_detail: true});
    //console.log('hah');
  },
  /**
* 赞同或采纳此问题
*/
  set_question_attitude: function () {

    this.setData({ question_attitude: true });
    //addtionRegion
   
  },
//--------------------
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(getApp().globalData.current_question);
    
    var question = getApp().globalData.current_question;
    this.setData({ 
      card_img: question.card_img,
      question_title: question.question_title,
      question_describe: question.question_describe,
      userID: question.userID
    });
   
    if (question.userID == getApp().globalData.me.uid) //debugRegion
      this.setData({ my_question: true });
    
    this.get_tag_array();
    this.get_answer_array();

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
  wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.get_answer_array();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})