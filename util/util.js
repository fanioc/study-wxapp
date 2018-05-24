//------
var CONSTANT = require("./constant.js");
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
// 3202 教务账号密码错误，无法登入
// }




//核心函数，处理服务器发送来的errocode
function errorCode(re_data, callback) {
  console.log("errorCode函数参数\n错误码：" + re_data.errCode + "\n数据：" + re_data.data);

  switch (re_data.errCode) {
    //状态码
    case 0:
      return 0; //无错误
      callback();
    case 1:
      //---------------------------------------------------------

      //错误码

  }
}
module.exports = {
  setTheme: setTheme,
  PullDownRefresh: PullDownRefresh,
  errCode: errorCode
}