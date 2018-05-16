Component({
//本组件特性：组件前后端颜色受theme影响，同时带tab切换时颜色转变
  behaviors: [],

  properties: {
    inner: { // 属性名,插入节点的内容
      type: String

    },

    selected: { // 属性名，切换状态是否为选择，这将影响组件的css
      type: Boolean,
      value: false
    },
    index: { // 属性名,
      type:Number

    },
  },
  data: {
    themeColorCSS:'',//当前主题的前景色背景色和边框色的样式
    selectedCSS: ''  //当前主题且切换状态为选择的，前景色背景色和边框色的样式

  }, // 私有数据，可用于模版渲染

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名

  attached: function () {//从本地缓存获取和主题有关的颜色参数，由此设置data themeColorCSS, selectedCSS
    var value = wx.getStorageSync('theme');
    var border = "border-color:"+ value.selectedColor + ";" ;
      var themeColor = border+"background:" + value.unselectedColor + ";color:" + value.selectedColor + ";";
      var selected = border +"background:" + value.selectedColor + ";color:" + value.unselectedColor + ";";
     
    this.setData({ themeColorCSS: themeColor, selectedCSS: selected});

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