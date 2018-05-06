Component({
//本组件特性：组件前后端颜色受theme影响，同时带tab切换时颜色转变
  behaviors: [],

  properties: {
    inner: { // 属性名
      type: String

    }
  },
  data: {
    themeColorCSS:'',//当前主题的前景色背景色和边框色的样式

  }, // 私有数据，可用于模版渲染

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () {
   var value=wx.getStorageSync('theme');
    var themeColor = "border:1px solid " + value.selectedColor + ";" +"background:" + value.unselectedColor + ";color:" + value.selectedColor + ";";
this.setData({ themeColorCSS: themeColor});

   },
  moved: function () { },
  detached: function () { },

  methods: {
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