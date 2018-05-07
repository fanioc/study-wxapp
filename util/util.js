//设置程序的主题参数（颜色用十六进制或者颜色英文单词表示，因为这些参数一般用于css）
function setTheme(selected,unselected,background,code)
{
    wx.setStorage({
      key: 'theme',
      data: { orderCode: code, selectedColor: selected, unselectedColor: unselected, pageBackgroundColor: background}
      //success:,addtionRegion
    })
}
//核心函数，处理服务器发送来的errocode
function errorCode(err, data, callback) {

  console.log("errorCode函数参数,错误码：" + err + "数据：" + data);

  switch (err) {
    //状态码
    case 0: return 0;//无错误


    //---------------------------------------------------------

    //错误码

  }
}
module.exports = {
setTheme:setTheme
}