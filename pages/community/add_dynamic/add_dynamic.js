var core = getApp().globalData.core;

Page({

  /**
   * 页面的初始数据
   */
	data: {
		upload_img: [],
		button_prompt: '添加',
		anonymous: '',
	},
	edit_content_imgURL: function (e) {
		var that = this;
		that.setData({ upload_img: [] });
		wx.chooseImage({ //选择图片，上传成功后将获取地址插入markdown标记中
			count: 1,
			success: function (res_cho) {
				//addtionRegion
				console.log(res_cho.tempFilePaths);
				that.setData({
					upload_img: res_cho.tempFilePaths,
					button_prompt: '重置'
				});
			}
		})


	},
	submit_question: function (e) {
		if (e.detail.value.question_title.length < 3 || e.detail.value.sort.length == 0) {
			_components.show_mToast('标题大于三个字，类别不能为空');
			return false;
		}

		var that = this;
		console.log(e.detail.value);
		//addtionRegion
		var a = wx.uploadFile({
			url: _API.uploadFile,
			filePath: that.data.upload_img[0],
			name: 'file',
			success: function (res) {
				var image_url = JSON.parse(res.data).fileUrl
				if (e.detail.value.type[0] == 1)
					var dd_type = 2
				else var dd_type = 1

				wx.request({
					url: _API.publishDynamic,
					data: {
						session: wx.getStorageSync('session'),
						title: e.detail.value.question_title,
						img_url: image_url,
						content: e.detail.value.question_describe,
						type: dd_type,
						sort: e.detail.value.sort
					},
					success: function (e) {
						wx.hideToast();
						wx.switchTab({
							url: '../index',
							success: function (res) { },
							fail: function (res) { },
							complete: function (res) { },
						})

					},
					fail: function (res) {
						_components.show_mToast('网络错误');
					},
					complete: function (res) { },
				})
			}

		})

		//console.log('发表成功');
	},

	//将编写问题页面收集的文字信息发送到数据库
	anonymous: function (e) {
		console.log('checkbox发生change事件，携带value值为：', e.detail.value.length);
		if (e.detail.value.length)
			this.setData({
				anonymous: 2
			});
		else
			this.setData({
				anonymous: 1
			});
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