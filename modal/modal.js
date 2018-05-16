var globalData = getApp().globalData;
var util = globalData.util;
var CONSTANT = globalData.CONSTANT;
Component({

  behaviors: [],

  properties: {
    refresh: { // 属性名,监视页面pulldown
      type: Boolean, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: false, // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function (newVal, oldVal) {
        if (this.getFeed(0)) {
          this.setData({ hiddenToast: true, toastContent: '刷新成功' });

        }
        else {
          this.setData({ hiddenToast: true, toastContent: '刷新失败' });

        }
      } // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
    },
   inner: String // 简化的定义方式,插入的内容
  },
  data: {
    hiddenToast: false, //控制提示刷新成功的toast
    toastContent: ''//toast 提示内容
  }, // 私有数据，可用于模版渲染

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { },
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