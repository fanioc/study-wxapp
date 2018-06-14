// components/bullet-screen/bullet-screen.js
var core = getApp().globalData.core;

Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		cover: {
			type: Boolean,
			value: false
		},
		bullet_opacity: {
			type: Number,
			value: 0.5
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		bullet: [], //top  //delay  //image_head  //color  //content 
		color: ["#fbc2eb", "#d76171", "#5ee7df", "#66a6ff", "#fa71cd", "#80bfff", "#3cba92", "#9face6", "#de5145"]
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		//点击暂停
		getBullet: function (last_id = 0) {
			let data = {
				last_id: last_id,
				not_type: core.userConfig.bullet_not_show
			}
			let Req = core.APIrequest('getBullet', data)
			Req.then(result => {
				if (result.length >= 1) {
					this.showBullet(result)
					wx.setStorageSync('bullet_id', result[result.length - 1].bullet_id)
				}
			}).catch(err => {
				console.log('获取弹幕错误：' + err)
			})
		},
		showBullet: function (bullet = []) {
			var that = this
			bullet.forEach(function (t, index) {
				that.data.bullet.push({ //top  //daely  //image_head  //color  //content 
					head: t.head,
					top: core.tool.rand(70, 500),
					delay: t.bullet_id / 2,
					color: that.data.color[t.type],
					content: t.content,
					time: t.time
				})
			})
			this.setData({
				bullet: that.data.bullet
			})
		}
	},

	ready: function () {
		var that = this;
		setInterval(function () {
			that.getBullet(wx.getStorageSync('bullet_id')) //获取弹幕
		}, 3000)
	}
})