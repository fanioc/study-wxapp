//------
var CONSTANT = require("./constant.js");
var _components = require("./component.js");

//---------
//设置程序的主题参数（颜色用十六进制或者颜色英文单词表示，因为这些参数一般用于css）
function setTheme(selected, unselected, background, code) {
  wx.setStorage({
    key: 'theme',
    data: {
      orderCode: code,
      selectedColor: selected,
      unselectedColor: unselected,
      pageBackgroundColor: background
    }
    //success:,addtionRegion
  })
}

function toFreeSchel(schel,week){
  var i = 0;
  var free_class = new Array(new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(),new Array());
  while ("undefined" != typeof schel[i]) {
    if (schel[i].week[0] % week == 0 && week <= schel[i].week[2] && week >= schel[i].week[1]){
      var zj = schel[i].time[0]
      for (var q = schel[i].time[1]; q <= schel[i].time[2];q++){
        console.log(zj+'_' + q);
        free_class[zj][q]=1;
      }
    }
    i++;
  }

  console.log(free_class);

  return free_class;
}

function PullDownRefresh(callback) //发生下拉动作执行，执行callback函数，并弹出loading框
{
  wx.showLoading({
    title: '加载中',
    success: function () {
      console.log('loading')
    }
  });
  var status = callback();
  if (status) {
    wx.hideLoading();
  } else {
    wx.hideLoading();
    wx.showToast({
      title: '请求超时',
      image: CONSTANT.PATH.wrong,
      duration: 1000,
    })
  }
}

function rand(min,max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getWeekList(){
  const dateOfToday = Date.now()
  const dayOfToday = (new Date().getDay() + 7 - 1) % 7
  const daysOfThisWeek = Array.from(new Array(7))
    .map((_, i) => {
      const date = new Date(dateOfToday + (i - dayOfToday) * 1000 * 60 * 60 * 24)
      return date.getDate()
    })
  return daysOfThisWeek
}

//设置session到储存空间
function setSeesion(session) {
  wx.setStorageSync('session', session)
}


//核心函数，处理服务器发送来的errocode
function errorCode(re_data, callback=null) {
  console.log("errorCode函数参数\n错误码：" + re_data.errCode + "\n数据：" + re_data.data);
  if (callback)//如果给回调函数将会调用回调函数,会给函数服务器接收到的错误码
    callback(re_data.errCode);

    //--------------
  switch (re_data.errCode) {
    //状态码
    case 0:
      return re_data.data; //无错误,返回数据

    case 1: _components.show_mToast(re_data.data); return true;//向客户端提示，提示内容由re_data.data决定，客户端发送的数据已经处理成功
      //---------------------------------------------------------
      //错误码

  }

}
//------改变全局变量me的函数,同时改变服务器上的相关值,并返回值
//--
function set_me_study_hidden(e) {
  
    getApp().globalData.me.study_hidden = e;
    console.log(getApp().globalData.me);
  return getApp().globalData.me.study_hidden;
  //addtionRegion 网络请求改变值
}
//--
function set_me_study_invite(e) {
  
    getApp().globalData.me.study_invite = e;
    console.log(getApp().globalData.me);
  return getApp().globalData.me.study_invite;
  //addtionRegion 网络请求改变值
}
module.exports = {
  toFreeSchel:toFreeSchel,
  setTheme: setTheme,
  PullDownRefresh: PullDownRefresh,
  errCode: errorCode,
  getWeekList: getWeekList,
  rand:rand,
  me: { study_invite: set_me_study_invite, study_hidden: set_me_study_hidden }

}