var core = getApp().globalData.core;

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		config: {
			tableHead: {
				week: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
				date: [1, 2, 3, 4, 5, 6, 7],
				time: ["08:00", "09:00", "10:00", "11:00", "14:10", "15:10", "16:10", "17:10", "19:00", "20:00", "21:00", "22:00"]
			}
		},
		addSchel: 0,
		timeRange: [
			['周几',"周一", "周二", "周三", "周四", "周五", "周六", "周日"],
			['开始节数',1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
			['结束节数',1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
		],
		weekRange: [
			['单双周','每周', '单周', '双周'],
			['开始周',1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
			['结束周',1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, , 13, 14, 15, 16, 17, 18, 19, 20],
		],
		animationData: [],
		currentWeek: 1,
		currentTerm: [],
		weekArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
		selectNoclass: [],
		color: ["#f3f3f3", '#ffbf80', '#80bfff', "#ffcccc", '#15a892'],
		currentCourse: [{}],
		getSchel: []
	},
	addCustom: function (e) {
		core.APIrequest('addUserCustomCourse', {
			class_name: e.detail.value.class_name,
			location: e.detail.value.location,
			teacher: e.detail.value.teacher,
			time: e.detail.value.time,
			week: e.detail.value.week,
			type:2
		}).then(res=>{
			console.log(res)
		}).catch(err=>{
			console.log(err)
		})

	},
	changeWeek: function (e) {
		var week = parseInt(e.detail.value) + 1
		this.setData({
			currentWeek: week
		})
		wx.setStorageSync('userTerm', {
			"currentWeek": week,
			'currentTerm': this.data.currentTerm
		})
		this.showSchel()
	},
	tapSetting: function (e) {
		var that = this
		wx.showActionSheet({
			itemList: ["添加课程", "自定义课表背景", "更新课程", "设置"],
			success: function (e) {
				if (e.tapIndex == 0) {
					that.showAdd()
				} else if (e.tapIndex == 1) {

				} else if (e.tapIndex == 2) {

				} else if (e.tapIndex == 3) {

				}
			}
		})
	},
	longpressNonClass: function (e) {
		console.log(e)
	},
	longpressClass: function (e) {
		console.log(e)
	},
	selectNonClass: function (e) {
		console.log(e)
	},
	selectClass: function (e) {
		console.log(e)
	},

	setCurrentSche: function (getSche, week) {
		var that = this
		var currentCourse = new Array
		var i = 0;
    console.log(getSche)
		while ("undefined" != typeof getSche[i]) {
			var id = (getSche[i].time[0]) * 100 + getSche[i].time[1] //表示课程id
			var zs = week <= getSche[i].week[2] && week >= getSche[i].week[1]
			var dsz = getSche[i].week[0] == 0 || getSche[i].week[0] % 2 == week % 2
			if (zs && dsz) {
				currentCourse[id] = {
					'class_name': getSche[i].class_name,
					'time': getSche[i].time,
					'lengthTime': getSche[i].time[2] - getSche[i].time[1] + 1,
					'week': getSche[i].week,
					'location': getSche[i].location,
					'type': getSche[i].type
				}
			}
			i++;
		}
		this.setData({
			currentCourse: []
		})
		this.setData({
			currentCourse: currentCourse
		})
		console.log(this.data.currentCourse)
	},
	closeAdd: function () {
		this.setData({
			addSchel: 0
		})
	},
	showAdd: function () {
		this.setData({
			addSchel: 1
		})
	},

	initSchel: function () {
		const weekList = core.tool.getWeekList()
		this.setData({
			'config.tableHead.date': weekList
		})

		var term = wx.getStorageSync('userTerm')
		if (term != '') {
			this.setData({
				currentWeek: term.currentWeek,
				currentTerm: term.currentTerm
			})
			this.readSchel(0)
		} else {
			let Req = core.APIrequest('getCurrentTerm')

			Req.then(data => {
				this.setData({
					currentWeek: data.week,
					currentTerm: {
						xn: data.xn,
						xq: data.xq
					}
				})
				wx.setStorageSync('userTerm', {
					currentTerm: this.data.currentTerm,
					currentWeek: this.data.currentWeek
				})
				this.readSchel(0)
			}).catch(err => {
				console.log("读取错误" + err)
			})
		}
	},

	readSchel: function (updateAll) {
		if (updateAll == 1) {
			this.updateSchel()
		} else {
			var schel = wx.getStorageSync('userSchel')
			if (schel != '') {
				this.setData({
					getSche: schel
				})
				this.showSchel()
			} else {
				this.updateSchel()
			}
		}
	},

	updateSchel: function () {
		wx.showLoading({
			title: '正在读取课表',
		})

		var Req = core.APIrequest('getUserAllCourse', {
			xn: this.data.currentTerm.xn,
			xq: this.data.currentTerm.xq
		})

		Req.then(data => {
			this.setData({
				getSche: data
			})
			wx.setStorageSync('userSchel', data)
			this.showSchel()
			wx.hideLoading()
		}).catch(err => {
			wx.hideLoading()
		})

	},

	showSchel: function () {
		this.setCurrentSche(this.data.getSche, this.data.currentWeek)
	},



	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		core.setTheme(0, this)
		this.initSchel()
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {
		this.readSchel(1)
		wx.stopPullDownRefresh();
	},
	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})