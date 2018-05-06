Component({
//本组件特性：组件前后端颜色受theme影响，同时带tab切换时颜色转变
  behaviors: [],

  properties: {
  
    selected: { //当前被选择的index码
      type: Number, 
      value: -1,
      observer: function (newVal, oldVal) {
        console.log(newVal);
      console.log(oldVal);
        if (newVal == this.data.orderIndex) {
          this.setData({ style: this.data.selectedCSS });
        }
        else if (oldVal == this.data.orderIndex)
          this.setData({ style: this.data.unselectedCSS });
      }  
    },
    orderIndex: { //当前组件index序号，-1表示仅有一个组件无切换事件
      type: Number,
      value: -1
    },
    innerText: { //插入节点的内容
      type: String
    }
  },
  data: {
    selectedColor:'',//被选择时的颜色rgb十六进制码
    unselectedColor: '',//未被选择时的颜色rgb十六进制码
    backgoundColor: '',//页面的颜色rgb十六进制码
    unselectedCSS:'',
    selectedCSS:''
  }, // 私有数据，可用于模版渲染

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () {
   var value=wx.getStorageSync('theme');
  var selected = "border-color:" +value.selectedColor+";"+"background:" + value.selectedColor + ";color:" + value.unselectedColor+";";
var unselected = "border-color:" + value.selectedColor + ";" +"background:" + value.unselectedColor + ";color:" + value.selectedColor + ";";
this.setData({ selectedColor: value.selectedColor, unselectedColor: value.unselectedColor, backgoundColor: value.pageBackgroundColor, unselectedCSS: unselected, selectedCSS: selected});

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