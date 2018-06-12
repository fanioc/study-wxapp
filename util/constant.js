//存储全局常量

//1.关于链接的常量，所有网络请求都以此为前缀
const URL = {
  study: 'https://study.xietan.xin/xaufe/StudyApp/',
  localhost: 'https://study.xietan.xin/xaufe/StudyApp/',
  base: "http://localhost/wx/",
  debug: 'https://api.xietan.xin/lly_debug/a.php',
}

const API = {

  //基础接口
  loginStudy: URL.study + 'loginStudy',
  getUserBasicInfo: URL.study + 'getUserBasicInfo',
  uploadFile: URL.study + 'fileUpload',

  //教务接口
  bindEduSys: URL.study + 'bindEduSys',
  getCheckCode: URL.study + 'getCheckCode',
  getUserCourse: URL.study + 'getUserCourse',
  getEduFreeClass: URL.study + 'getEduFreeClass',//空教室
  updateUserEduAll: URL.study + 'updateUserEduAll',
  updateUserEduCourse: URL.study + 'updateUserEduCourse',
  updateUserEduInfo: URL.study + 'updateUserEduInfo',
  updateUserEduScore: URL.study + 'updateUserEduScore',
  getCurrentTerm: URL.study + 'getCurrentTerm',
  getUserEduInfo: URL.study + 'getUserEduInfo',
  getUserScore: URL.study + 'getUserScore',
  updateUserBasicInfo: URL.study + 'updateUserBasicInfo',

  //用户信息交互接口
  setUserStar: URL.study + 'setUserStar',//$session $bestar_uid $star   star=1关注 0不关注
  sendMsg: URL.study + 'sendMsg',//$session, $to_uid, $content, $type
  getMsg: URL.study + 'getMsg',//$session
  getTag: URL.study + 'getTag',//$session,$other_uid
  tag: URL.study + 'tag',//$session, $be_tag_uid, $tag)

  //弹幕接口
  getBullet: URL.study + 'getBullet',//($session, $last_id = null)

  //用户设置信息
  setUserConfig: URL.study + 'setUserConfig',//($session, $data)data 以设置名为键值，设置内容为内容值
  getUserConfig: URL.study + 'getUserConfig',//($session)

  //自定义课表接口  
  getUserAllCourse: URL.study + 'getUserAllCourse',
  addUserCustomCourse: URL.study + 'addUserCustomCourse',
  delUserCustomCourse: URL.study + 'delUserCustomCourse',
  getUserCustomCourse: URL.study + 'getUserCustomCourse',

  //自习部分接口
  getClassList: URL.study + 'getClassList', //$place, $date, $time = null
  getStudyList: URL.study + 'getStudyList',//(session,study_id=null)
  launchStudy: URL.study + 'launchStudy',//($session, $reach_uid, $study_content, $msg, $place, $study_time, $study_date)
  acceptStudy: URL.study + 'acceptStudy',//($session, $study_id, $msg, $status)
  setSatStudy: URL.study + 'setSatStudy',//设置满意度 也就是完成当前学习 只有发起者能设置本次学习
  searchStudyPartner: URL.study + 'searchStudyPartner',  //$session, $study_time, $study_date, $require = null
  getStudyPlace: URL.study + 'getStudyPlace',//($session, $date = null)

  //社区接口
  publishDynamic: URL.study + 'publishDynamic',  //($session, $title, $img_url, $content, $type, $sort = null)
  getDynamicList: URL.study + 'getDynamicList',//($session, $last_id = null)// 获取动态列表，last_id是上次获取最小的dynamic_id
  AnswerDynamic: URL.study + 'AnswerDynamic',//($session, $dynamic_id, $content, $type)// 回答问题，type=1代表正常，2代表匿名
  delDynamicAnswer: URL.study + 'delDynamicAnswer',//($session, $dynamic_id, $answer_id)// 删除回答，只有自己能删除自己的回答
  setDynamicAgree: URL.study + 'setDynamicAgree',//($session, $dynamic_id, $answer_id, $agree)  // 赞同或不赞同回答
  getDynamicContent: URL.study + 'getDynamicContent',//($session, $dynamic_id)  // 获取一个问题的内容和回答列表
  getDynamicAns: URL.study + 'getDynamicAns',//($session, $dynamic_id, $answer_id)// 查看回答的详细信息
  delDynamic: URL.study + 'delDynamic',//($session, $dynamic_id)// 删除问题
  publishDynamic: URL.study + 'publishDynamic',//$title, $img_url, $content, $type, $sort = null
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