/**
	* markdown html 转换为wxml
	*/
const Towxml = require('/extends/towxml/main'); //引入towxml库

var core = require('/util/core.js')

App({
	towxml: new Towxml(),


	loginStudy: function () {
		core.getSession(1).then(session => {
			console.log(session)
			this.initUserInfo()
		}).catch(err => { console.log('初始化session错误' + err) })
	},
	initUserInfo: function () {
		core.getUserInfo().then(info => {
			console.log("个人初始化信息如下：")
			console.log(info)
		}).catch(err => {
			console.log('初始化个人信息错误' + err)
			if (err == 3101)
				console.log('进入初始化页面')
		})
		core.getUserConfig(1).then(config => {
			console.log("个人初始化设置如下：")
			console.log(config)
		}).catch(err => { console.log('初始化个人设置错误' + err) })
	},

	//
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
	onLaunch: function () {
		this.loginStudy()
	},



  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
	onShow: function (options) {

	},

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
	onHide: function () {

	},

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
	onError: function (msg) {

	},

	//全局变量
	globalData: {
		core: core,
		me: {}//debugRegion uid: 109, nickName: '卢二狗', avatarUrl: "https://api.xietan.xin/lly_debug/head (1).jpg" 
	}
})