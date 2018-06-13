//存储全局常量



//1.关于链接的常量，所有网络请求都以此为前缀
const URL = {
	base: {
		master: "https://study.xietan.xin/",
		debug: "https://api.xietan.xin/"
	}
}

URL.API = URL.base.master + "xaufe/StudyApp/"


//2.关于路径的常量，所有资源都以此为前缀
const PATH = {
	icon: "/image/subject/",
	wrong: "/image/wrong.png",
	debug: "/image/debug.png",
	anonymous: "/image/anonymous.png"
}

const Theme = {
	0: { nav: "", button: "" },
	1: { nav: "", button: "" },
}

const errCode = {
	"0": "正常",
	"1000": "网络错误",
	"1001": "Mobile登入网页无法访问",
	"1002": "Mobile课表页面无法访问",
	"1003": "Mobile课表子页面无法访问",
	"1004": "Mobile成绩页面无法访问",
	"1005": "Mobile个人信息页面无法访问",
	"2000": "与微信后台相关",
	"2100": "提供给微信后台信息错误",
	"2101": "服务器session_key获取错误",
	"2102": "服务器解密vi获取错误",
	"2103": "服务器解密错误",
	"2104": "appid与服务器校验出错",
	"2500": "+ 微信服务器提示错误errcode",
	"3000": "与服务器数据相关",
	"3100": "教务信息错误",
	"3101": "用户第一次登入，进入欢迎页面 并 初始化个人信息",
	"3102": "session错误",
	"3103": "用户没有绑定",
	"3104": "关注错误，请稍后再来",
	"3105": "教务系统没有当前学号个人信息",
	"3106": "教务系统课表读取错误",
	"3107": "教务系统没有当前学年记录",
	"3108": "添加自定义课表错误",
	"3109": "删除自定义课表错误",
	"3110": "读取自定义课表出错",
	"31101": "读取空闲教室出错，查询出错",
	"3111": "读取studylist出错",
	"3112": "读取studylist接受列表出错",
	"3113": "发起学习失败",
	"3114": "接受邀请失败，该学习过期或不是该学习的邀请对象",
	"3115": "接受邀请失败数据库错误",
	"3116": "读取自习地点出错",
	"3117": "发送消息失败",
	"3118": "标签过长",
	"3119": "打标签失败",
	"3120": "获取消息列表失败",
	"3121": "获取标签信息失败",
	"3122": "设置满意度失败",
	"3123": "弹幕类型无效",
	"3124": "发送弹幕失败",
	"3125": "用户第一次设置初始化成功",
	"3126": "用户第一次设置初始化失败",
	"3127": "更改用户设置失败",
	"3200": "提供给后台服务器信息错误",
	"3201": "请求的数据非微信提供",
	"3202": "没有存在的cookies值，刷新验证码重试",
	"3300": "教务登入错误",
	"32": "获取验证码错误",
	"3400": "上传错误",
	"3401": "上传出错",
	"3402": "文件过大",
	"3403": "有同名文件",
	"3500": "社区模块",
	"3501": "发表数据库写入错误",
	"3502": "删除回答失败，无删除权限",
	"3503": "更改赞同失败，无赞同动态",
	"3504": "获取动态列表错误",
	"3505": "问题获取失败，可能已被删除",
	"3506": "获取问题列表错误",
	"3507": "获取问题回答错误",
	"3508": "删除动态失败，无删除权限"
}

/**
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
  : URL.study + 'getUserConfig',//($session)

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
 */


module.exports = {
	URL: URL,
	PATH: PATH,
	Theme: Theme,
	errCode: errCode
}