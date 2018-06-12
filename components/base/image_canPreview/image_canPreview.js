
Component({

  behaviors: [],

  properties: {
    imgURL: String,//图片的网络地址
    inner: String, // 简化的定义方式,插入的内容aspectFit
    complete: { // 属性名,图片是否完整显示，即img属性是aspectFit还是aspectFill
      type: Number, 
      value: 0
    },
 
  },
  data: {
  }, // 私有数据，可用于模版渲染

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () {

   },
  moved: function () { },
  detached: function () { },

  methods: {
//---------------
    pre_image: function () {//点击图片时预览
      wx.previewImage({
        urls: [this.data.imgURL]
      })
    },
//---------------
    onMyButtonTap: function () {
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },
    _myPrivateMethod: function () {
      // 内部方法建议以下划线开头
      this.replaceDataOnPath(['A', 0, 'B'], 'myPrivateData') // 这里将 data.A[0].B 设为 'myPrivateData'
      this.applyDataUpdates()
    },
    _propertyChange: function (newVal, oldVal) {

    }
  }

})