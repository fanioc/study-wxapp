//存储全局常量

//1.关于链接的常量，所有网络请求都以此为前缀
const URL = {
  study: 'https://study.xietan.xin/xaufe/StudyApp/',
  localhost: 'https://study.xietan.xin/xaufe/StudyApp/',
  base: "http://localhost/wx/",
  debug: 'https://api.xietan.xin/lly_debug/a.php',
}

const API = {
  //----陈靖
  loginStudy: URL.study + 'loginStudy',
  bindEduSys: URL.study + 'bindEduSys',
  getCheckCode: URL.study + 'getCheckCode',
  getUserCourse: URL.study + 'getUserCourse',
  getEduFreeClass: URL.study + 'getEduFreeClass',//空教室
  setUserStar: URL.study + 'setUserStar',//$session $bestar_uid $star   star=1关注 0不关注
  getUserBasicInfo: URL.study + 'getUserBasicInfo',
  getCurrentTerm: URL.study + 'getCurrentTerm',
  getUserEduInfo: URL.study + 'getUserEduInfo',
  getUserScore: URL.study + 'getUserScore',
  updateUserBasicInfo: URL.study + 'updateUserBasicInfo',
  updateUserEduAll: URL.study + 'updateUserEduAll',
  updateUserEduCourse: URL.study + 'updateUserEduCourse',
  updateUserEduInfo: URL.study + 'updateUserEduInfo',
  updateUserEduScore: URL.study + 'updateUserEduScore',
  uploadFile: URL.study + 'fileUpload',
  getUserAllCourse: URL.study + 'getUserAllCourse',
  addUserCustomCourse: URL.study + 'addUserCustomCourse',
  delUserCustomCourse: URL.study + 'delUserCustomCourse',
  getUserCustomCourse: URL.study + 'getUserCustomCourse',
  getClassList: URL.study + 'getClassList', //$place, $date, $time = null
  getStudyList: URL.study + 'getStudyList',
  launchStudy: URL.study + 'launchStudy',//($session, $reach_uid, $study_content, $msg, $place, $study_time, $study_date)
  acceptStudy: URL.study + 'acceptStudy',//($session, $study_id, $msg, $status)
  setSatStudy: URL.study + 'setSatStudy',
  searchStudyPartner: URL.study + 'searchStudyPartner',  //$session, $study_time, $study_date, $require = null
  sendMsg: URL.study + 'sendMsg',//$session, $to_uid, $content, $type
  getMsg: URL.study + 'getMsg',//$session
  getTag: URL.study + 'getTag',//$session,$other_uid
  tag: URL.study + 'tag',//$session, $be_tag_uid, $tag)
  getStudyPlace: URL.study + 'getStudyPlace',
  publishDynamic: URL.study + 'publishDynamic',  //($session, $title, $img_url, $content, $type, $sort = null)
  // 获取动态列表，last_id是上次获取最小的dynamic_id
  getDynamicList: URL.study + 'getDynamicList',//($session, $last_id = null)

  // 回答问题，type=1代表正常，2代表匿名
  AnswerDynamic: URL.study + 'AnswerDynamic',//($session, $dynamic_id, $content, $type)

  // 删除回答，只有自己能删除自己的回答
  delDynamicAnswer: URL.study + 'delDynamicAnswer',//($session, $dynamic_id, $answer_id)

  // 赞同或不赞同回答
  setDynamicAgree: URL.study + 'setDynamicAgree',//($session, $dynamic_id, $answer_id, $agree)

  // 获取一个问题的内容和回答列表
  getDynamicContent: URL.study + 'getDynamicContent',//($session, $dynamic_id)

  // 查看回答的详细信息
  getDynamicAns: URL.study + 'getDynamicAns',//($session, $dynamic_id, $answer_id)

  // 删除问题
  delDynamic: URL.study + 'delDynamic',//($session, $dynamic_id)
  publishDynamic: URL.study + 'publishDynamic',//$title, $img_url, $content, $type, $sort = null

  get_dynamic_array: 'https://api.xietan.xin/lly_debug/b.php', //需要返回代码0，获取社区板块的动态信息，用于wx:for渲染

  set_followed_user: 'https://api.xietan.xin/lly_debug/a.php', //需要返回代码1和message关注成功，发送other_uid和session，关注此用户
  post_invited: 'https://api.xietan.xin/lly_debug/a.php', //需要返回代码1和message成功发送邀请，发送other_uid和session，向用户发送自习邀请
  post_leave_message: 'https://api.xietan.xin/lly_debug/a.php', //需要返回代码1和message留言成功，POST 发送other_uid和session和leaveMessage，向服务器发送用户的留言
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