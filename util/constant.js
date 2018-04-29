//存储全局常量

  //1.关于链接的常量，所有网络请求都以此为前缀
const URL=
{
    base:"http://localhost/wx/",
    debug:"http://localhost/a.php"
}

//2.关于路径的常量，所有资源都以此为前缀
const PATH=
{
  icon:"/image/subject/"
}

//3.关于时间的常量
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//----------------------------------------------
module.exports = {
  URL: URL,
  PATH: PATH,
  TIME_F: formatTime
}