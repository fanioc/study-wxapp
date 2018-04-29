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
module.exports = {
  URL: URL,
  PATH: PATH
}