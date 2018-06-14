var _const = require("constant.js")
var _tool = require("tool.js")
var _com = require("component.js")


// wx.getStorage({
// 	key: 'session',
// 	success: function (res) {
// 		var session = res.data
// 	},
// })
// wx.getStorage({
// 	key: 'userInfo',
// 	success: function (res) {
// 		var userInfo = res.data
// 	},
// })
// wx.getStorage({
// 	key: 'userConfig',
// 	success: function (res) {
// 		var userConfig = res.data
// 	},
// })

var session = wx.getStorageSync('session')
var userInfo = function () {
	let userInfo = wx.getStorageSync('userInfo')
	if (userInfo == '') {
		userInfo = {}
		wx.setStorage({ key: 'userInfo', data: userInfo })
		return userInfo
	}
	else return userInfo
}()
var userConfig = wx.getStorageSync('userConfig')

/**
 * uid=0 获取自身uid,设置后获取他人userBasicInfo和关联的关注信息
 * 先判断该uid的个人信息是否在globalDataData.userInfo[uid]中存在，不存在则获取，存在则返回
 * //判断是否是第一次登入，第一次则进入欢迎界面。
 */
function getUserInfo(uid = 0) {
	return new Promise((resove, reject) => {
		if (typeof (userInfo[uid]) != 'undefined') {
			resove(userInfo[uid])
		} else {
			let data = uid ? {} : { other_uid: uid }
			let Req = APIrequest('getUserBasicInfo', data)
			Req.then(res => {
				userInfo[uid] = res
				wx.setStorage({ key: 'userInfo', data: userInfo })
				resove(res)
			}).catch(res => {
				reject(res)
			})
		}
	})
}


function updateInfo() {

}


/**
 * theme内容存放在constant中0为默认主题
 * thisPage为当前页面指针
 */
function setTheme(theme = 0, thisPage) {
	console.log('设置页面主题')
}


/**
 * 	reGet == 0
	//    如果globalData中不存在session,则用code换取session,并存入globalData.session中
	//    调用返回并存入globalData.session
	reGet >= 1
	//    用code向服务器获取session
	//    返回时，如果网络错误，提示
	//    调用返回并存入globalData.session
 */
function getSession(reGet = 0) {
	return new Promise((resove, reject) => {
		if (reGet == 0) {
			wx.checkSession({
				success: function () {
					if (session == '') {
						let re = getSession(++reGet)
						re.then(res => { resove(res) }).catch(res => { reject(res) })
					}
					else resove(session) //session存在则返回
				}, fail: x => {
					let re = getSession(++reGet)
					re.then(res => { resove(res) }).catch(res => { reject(res) })
				} //用户登入凭证过期，重新获取code获取session
			})
		} else if (reGet >= 1 && reGet <= 3) {
			wx.login({
				success: function (res) {
					wx.request({
						url: _const.URL.API + "loginStudy",
						data: { code: res.code },
						success: function (res) {
							if (res.data.errCode == 0) {//成功获取
								session = res.data.data.session
								wx.setStorage({ key: 'session', data: session })
								console.log("请求的session:" + session)
								resove(session)
							}
							else if (res.data.errCode == 2500) {
								console.log("session错误，微信返回错误码：" + res.data.data.wxErrCode) //返回微信errCode错误码
								reject("session错误，微信返回错误码：" + res.data.data.wxErrCode);
							}
							else { console.log("session错误，其他情况：" + res.data); reject("session错误，其他情况：" + res.data) }
						}, fail: function (res) { console.log("微信小程序登入错误：" + res); reject("微信小程序登入错误：" + res) }
					})
				}
			})
		} else { reject() }
	})
}


/**
 * 获取用户自定义设置
 * return { be_invited: 1, bullet_not_show: '', show_class: "1", show_grade: "1", show_info_page: "1", show_province: "1", show_score: "1", study_hidden: "1" }
 * 	reGet == 0
	//如果globalData.userConfig存在，返回globalData.userConfig，不存在则getUserConfig(reGet++)
	reGet >= 1
	//重新从服务器中读取，并将读取的个人设置信息传入golobaData.userConfig中，调用回调函数
 */
function getUserConfig(reGet = 0) {
	return new Promise((resove, reject) => {
		if (reGet == 0) {
			if (userConfig == '') {
				let rReq = getUserConfig(++reGet)
        rReq.then(res => resove(res)).catch(res => reject(res))
			} else resove(userConfig)
		} else if (reGet >= 1) {
			let Req = APIrequest('getUserConfig')
			Req.then(config => {
				userConfig = config
				wx.setStorage({ key: 'userConfig', data: config })
				resove(userConfig)
			}).catch(code => { reject(code) })
		}
	})
}

/**
 * 获取用户授权设置
 */
function getUserAuth() {
	wx.getSetting({
		success: (res) => {
			return res.authSetting
		}
	})
}

function uploadFile(filePath) {
	return new Promise((resove, reject) => {
		wx.uploadFile({
			url: _const.URL.API + "fileUpload",
			filePath: filePath,
			name: 'file',
			success: function (res) {
				if (res.data.errCode = 0) {
					let fileUrl = JSON.parse(res.data).fileUrl
					resove(fileUrl)
				} else reject(res.data.errCode)
			},//其他错误情况
			fail: function (res) { reject(res) }
		})
	})

}


/**
 * 更改用户设置
 * data:{configName1:configValue1,configName2:configValue2}
 */
function setUserConfig(data) {

}

/**
 * data数据不需要session  无数据的时候data={}
 */
function APIrequest(method, data = {}, reGetSession = 0) {
	return new Promise((resove, reject) => {
		if (reGetSession > 3) //如果重试session超过三次，报错
			reject(3102)
		else getSession(reGetSession).then(session => { data.session = session; Requset() })

		var Requset = () => {
			wx.request({
				url: _const.URL.API + method,
				method: "POST",
				data: data,
				success: function (res) {
					if (res.data.errCode == 0)
						resove(res.data.data)
					else if (res.data.errCode == 3102) { //session错误时，重新获取session并重试
						let Req = APIrequest(method, data, ++reGetSession)
						Req.then(x => resove(x)).catch(x => reject(x))
					} else reject(res.data.errCode)
				},
				fail: function () { reject('请求错误') }, //展示模态窗网络错误，retrun res.code;
			})
		}
	})
}

function APIerrCode(code, showModal = 0) {
	if (typeof (_const.errCode[code]) == 'undefined')
		return "没有错误码"

	let errMsg = _const.errCode[code];

	if (showModal == 1)
		wx.showModal({
			title: '请求错误',
			content: errMsg,
			confirmColor: "bd0000",
			showCancel: false
		})

	return errMsg;
}


module.exports = {
	const: _const,
	tool: _tool,
	com: _com,

	uploadFile: uploadFile,
	getUserInfo: getUserInfo,
	setTheme: setTheme,
	getSession: getSession,
	getUserConfig: getUserConfig,
	getUserAuth: getUserAuth,
	setUserConfig: setUserConfig,
	APIrequest: APIrequest,
	APIerrCode: APIerrCode,

	//可读，不可修改
	session: session,
	userInfo: userInfo,
	userConfig: userConfig
}