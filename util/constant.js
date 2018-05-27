//存储全局常量

//1.关于链接的常量，所有网络请求都以此为前缀
const URL = {
  study: 'https://study.xietan.xin/xaufe/StudyApp/',
  localhost: 'https://study.xietan.xin/xaufe/StudyApp/',
  base: "http://localhost/wx/",
  debug: "http://localhost/a.php",
}

const API = {
  //----陈靖
  loginStudy: URL.study + 'loginStudy',
  bindEduSys: URL.study + 'bindEduSys',
  getCheckCode: URL.study + 'getCheckCode',
  getUserCourse: URL.study + 'getUserCourse',
  getEduFreeClass: URL.study + 'getEduFreeClass',
  getUserBasicInfo: URL.study + 'getUserBasicInfo',
  getCurrentTerm: URL.study + 'getCurrentTerm',
  getUserEduInfo: URL.study + 'getUserEduInfo',
  getUserScore: URL.study + 'getUserScore',
  updateUserBasicInfo: URL.study + 'updateUserBasicInfo',
  updateUserEduAll: URL.study + 'updateUserEduAll',
  updateUserEduCourse: URL.study + 'updateUserEduCourse',
  updateUserEduInfo: URL.study + 'updateUserEduInfo',
  updateUserEduScore: URL.study + 'updateUserEduScore',
  //----卢林杨 
  //data[0].followed
  get_dynamic_array: 'addtionRegion', //获取社区板块的动态信息，用于wx:for渲染

  set_followed_user: 'https://api.xietan.xin/lly_debug/a.php',//发送other_uid和session，关注此用户
  post_invited: 'https://api.xietan.xin/lly_debug/a.php',//发送other_uid和session，向用户发送自习邀请
  post_leave_message: 'https://api.xietan.xin/lly_debug/a.php',//POST 发送other_uid和session和leaveMessage，向服务器发送用户的留言
  /*
    leaveMessage
  :
  {formData: {leave_message: "666"}, templateType: "leave_message"}
  other_uid
  :
  "110"
  session
  :
  "53a9f124bec18df37e2e205b9c153374"
  */
}

//2.关于路径的常量，所有资源都以此为前缀
const PATH = {
  icon: "/image/subject/",
  wrong: "/image/wrong.png",
  debug: "/image/debug.png",
  anonymous: "/image/anonymous.png"
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
  TIME_F: formatTime,
  API: API
}