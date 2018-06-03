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

//设置session到储存空间
function setSeesion(session) {
  wx.setStorageSync('session', session)
}

//接口函数


// errCode={
// 0 成功

// 1000 网络错误
// 1001 Mobile登入网页无法访问
// 1002 Mobile课表页面无法访问
// 1003 Mobile课表子页面无法访问
// 1004 Mobile成绩页面无法访问
// 1005 Mobile个人信息页面无法访问

// 2000 与微信后台相关
// 2100 提供给微信后台信息错误
// 2101 服务器session_key获取错误
// 2102 服务器解密vi获取错误
// 2103 服务器解密错误
// 2104 appid与服务器校验出错

// 2500 + 微信服务器提示错误errcode


// 3000 与服务器数据相关
// 3100 教务信息错误
// 3101 数据库没有用户的个人信息，请求更新
// 3102 session错误
// 3103 用户没有绑定


// 3200 提供给后台服务器信息错误
// 3201 请求的数据非微信提供
// 3202 没有存在的cookies值，刷新验证码重试
// 3300 教务登入错误

// 32 + 位数，获取验证码错误

// 3400 上传错误
// 3401 上传出错
// 3402 文件过大
// 3403 有同名文件


// 3500 社区模块
// 3501 发表数据库写入错误
// 3502 删除回答失败，无删除权限
// 3503 更改赞同失败，无赞同动态
// 3504 获取动态列表错误
// 3505 问题获取失败，可能已被删除
// 3506 获取问题列表错误
// 3507 获取问题回答错误
// 3508 删除动态失败，无删除权限
// }




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
module.exports = {
  toFreeSchel:toFreeSchel,
  setTheme: setTheme,
  PullDownRefresh: PullDownRefresh,
  errCode: errorCode
}