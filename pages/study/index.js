// pages/study/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		latitude:34.11594,
		// longitude: 108.93455,
		longitude:108.932906,
		marker: []
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		this.setData({
			latitude: this.data.latitude,
			longitude: this.data.longitude
		})
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		// var that = this
		// wx.getLocation({
		// 	type:'gcj02',
		// 	success: function (res) {
		// 		console.log(res)
		// 		that.setData({ latitude: res.latitude, longitude: res.longitude })
		// 	},
		// });
		
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