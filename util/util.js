//------
var CONSTANT=require("./constant.js");
//---------
//设置程序的主题参数（颜色用十六进制或者颜色英文单词表示，因为这些参数一般用于css）
function setTheme(selected,unselected,background,code)
{
    wx.setStorage({
      key: 'theme',
      data: { orderCode: code, selectedColor: selected, unselectedColor: unselected, pageBackgroundColor: background}
      //success:,addtionRegion
    })
}
//
function PullDownRefresh(callback)//发生下拉动作执行，执行callback函数，并弹出loading框
{
  wx.showLoading({
    title: '加载中',
    success: function () { console.log('loading')}
  });
  var status=callback();
  if(status)
  {
    wx.hideLoading();
  }
  else{
    wx.hideLoading();
    wx.showToast({
      title: '请求超时',
      image:CONSTANT.PATH.wrong,
      duration:1000,
    })
  }
}
//核心函数，处理服务器发送来的errocode
function errorCode(err, data, callback) {
  console.log("errorCode函数参数,错误码：" + err + "数据：" + data);

  switch (err) {
    //状态码
    case 0: return 0;//无错误
      callback();
    case 1:


    //---------------------------------------------------------

    //错误码

  }
}
module.exports = {
setTheme:setTheme,
PullDownRefresh: PullDownRefresh,
errCode: errorCode
}