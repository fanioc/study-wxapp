// components/bullet-screen/bullet-screen.js
var _util = getApp().globalData.util;
var _URL = getApp().globalData.CONSTANT;
var _components = getApp().globalData.components;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cover: { type: Boolean, value: false },
    bullet_opacity: { type: String, value: '1' }

  },

  /**
   * 组件的初始数据
   */
  data: {
    bullet: [],//top  //delay  //image_head  //color  //content 
    color: ["#fbc2eb", "#d76171", "#5ee7df", "#66a6ff", "#fa71cd", "#f5efef", "#3cba92", "#9face6"]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击暂停
    getBullet: function (last_id) {
      var that = this;
      if (last_id == undefined)
        last_id = 0
      wx.request({
        url: _URL.API.getBullet,
        data: {
          session: wx.getStorageSync('session'),
          last_id: last_id
        },
        success: function (e) {
          that.showBullet(e.data.data)
          if (e.data.data.length >=1)
            wx.setStorageSync('bullet_id', e.data.data[e.data.data.length - 1].bullet_id)
        }
      })
    },
    showBullet: function (bullet) {
      var that = this
      bullet.forEach(function (t, index) {
        that.data.bullet.push({  //top  //daely  //image_head  //color  //content 
          head: t.head,
          top: _util.rand(70, 500),
          delay: t.bullet_id / 2,
          color: that.data.color[t.type],
          content: t.content,
          time: t.time
        })
      })
      that.setData({ bullet: that.data.bullet })
    }
  },

  ready: function () {
    var that = this;
    setInterval(function () {
      that.getBullet(wx.getStorageSync('bullet_id'))
      //获取弹幕
    }, 3000)
  }
})
