var core = getApp().globalData.core;

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		upload_img: [],
		button_prompt: '添加',
		anonymous: 1,
	},
	edit_content_imgURL: function (e) {
		var that = this;
    that.data.upload_img=[];
		that.setData({
      upload_img: that.data.upload_img
		});
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
    	var that = this;
      console.log(e)
    console.log('(that.data.upload_img[0])', that.data.upload_img[0]);
		if (e.detail.value.question_title.length < 3 || e.detail.value.sort.length == 0) {
			core.com.show_mToast('标题大于三个字，类别不能为空');
			return false;
		}

		

	
		wx.showLoading({
			title: '正在发表~稍等一会...',
			mask: true
		})
    
    if (that.data.upload_img[0])
    {
      core.uploadFile(that.data.upload_img[0]).then((image_url) => {

        core.APIrequest('publishDynamic', {
          title: e.detail.value.question_title,
          img_url: image_url,
          content: e.detail.value.question_describe,
          type: that.data.anonymous,
          sort: e.detail.value.sort
        }).then((result) => {
          console.log(res)
          wx.hideLoading();
          wx.switchTab({
            url: '../index',
            success: function (res) { },
          })
          wx.showToast({
            title: '发表成功！',
            duration: 1000,
            icon: 'success',
          })
        }).catch((err) => {
          console.log(err)
          wx.hideLoading();
          core.APIerrCode(err, 2)
        });
      }).catch((err) => {
        console.log(err)
        wx.hideLoading();
        core.APIerrCode(err, 2)
      });
    }
else{
      core.APIrequest('publishDynamic', {
        title: e.detail.value.question_title,
        img_url: '',
        content: e.detail.value.question_describe,
        type: that.data.anonymous,
        sort: e.detail.value.sort
      }).then((result) => {
        wx.hideLoading();
        wx.switchTab({
          url: '../index',
        })
        wx.showToast({
          title: '发表成功！',
          duration: 1000,
          icon: 'success',
        })
      }).catch((err) => {
        wx.hideLoading();
        core.APIerrCode(err, 2)
      });
}
	},

	//将编写问题页面收集的文字信息发送到数据库
	anonymous: function (e) {
		console.log('checkbox发生change事件，携带value值为：', e.detail.value.length);
		if (e.detail.value.length==1)
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