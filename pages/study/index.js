var core = getApp().globalData.core;

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		currentLatitude: 34.11594,
		currentLongitude: 108.932906,
		placeRange: [],
		currentPlace: 0,
		markers: [],
		currentDate: "",
		dateRange: {
			start: '',
			end: ''
		},
		currentSelect: 0,
		placeItems: [],
		otherPlaceItem: [],
		marker: []
	},
	goStudyList: function (e) {
		wx.navigateBack({
      delta: 1,
    })
	},
	changePlace: function (e) {
		this.setData({
			currentPlace: e.detail.value
		})
	},
	selectPlace: function (e) {
		let id = e.currentTarget.id

		if (this.data.currentSelect == id)
			wx.navigateTo({
				url: '/pages/study/order_operate/order_operate?date=' + this.data.currentDate + '&place=' + this.data.placeItems[e.currentTarget.id].place
			})
		else {
			var that = this
			this.data.currentSelect = id
			console.log(that.data.placeItems)
			this.setData({
				currentSelect: id,
				currentLongitude: that.data.placeItems[id].longitude,
				currentLatitude: that.data.placeItems[id].latitude
			})
		}
		console.log(e)
	},
	tapMarker: function (e) {
		wx.navigateTo({
			url: '/pages/study/order_operate/order_operate?date=' + this.data.currentDate + '&place=' + this.data.placeItems[e.markerId].place
		})
	},

	getStudyPlace: function (date) {
		wx.showLoading({
			'title': '正在读取数据~请稍等',
			mask: true
		})
		core.APIrequest('getStudyPlace', {
			date: date
		}).then((result) => {
			let placeRange = []
			let placeItems = []
			let i = 0
			result.forEach(placeItem => {
				if (placeItem.active > 0) {
					placeItems.push({
						id: i++,
						place: placeItem.place,
						latitude: placeItem.latitude,
						longitude: placeItem.longitude,
						stu_num: placeItem.stu_num
					})
					placeRange.push(placeItem.place_belong)
				}
			});
			placeRange = [...new Set(placeRange)]
			this.setData({
				placeItems: placeItems,
				placeRange: placeRange
			})
			this.showMarkers(placeItems)
			wx.hideLoading()
		}).catch((err) => {
			wx.hideLoading()
			console.log(err)
		});
	},

	showMarkers: function (placeItems) {
		let markers = []
		placeItems.forEach(item => {
			markers.push({
				id: item.id,
				latitude: item.latitude,
				longitude: item.longitude,
				width: 0,
				height: 0,
				place: item.place,
				callout: {
					content: item.place + '\n自习人数:' + item.stu_num,
					color: '#ffffff',
					bgColor: '#22b36e',
					display: 'ALWAYS',
					textAlign: 'center',
					padding: 8
				}
			})
		})
		this.setData({
			markers: markers,
			currentLongitude: markers[this.data.currentSelect].longitude,
			currentLatitude: markers[this.data.currentSelect].latitude
		})
	},
	getDataList: function () {
		let date = new Date;
		let currentDate = core.tool.dateFtt('yyyy-MM-dd', date)
		let start = currentDate
		date.setDate(date.getDate() + 14)
		let end = core.tool.dateFtt('yyyy-MM-dd', date)
		this.setData({
			currentDate: currentDate,
			dateRange: {
				start: start,
				end: end
			}
		})
	},

	changeDate: function (e) {
		this.getStudyPlace(e.detail.value)
		this.setData({
			currentDate: e.detail.value
		})
	},
  goRank:function()
  {
    wx.navigateTo({
      url: '/pages/study/rank/rank',
    })
  },
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// wx.showLoading({title:'正在读取~'})
		this.getDataList()
		this.getStudyPlace(this.data.currentDate)
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {},

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