Component({

  behaviors: [],
  properties: {
    showModalStatus: { // 属性名,是否显示弹窗
      type: Boolean, 
      value: false,
      observer: function (newVal, oldVal) {
        if (newVal) {
         this.util("open");

        }

      } 
    },
    title: String, // 简化的定义方式,弹窗标题
    rightButton: { // 属性名,右按钮名称
      type:String,
      value: '确认'
    }, 
    formtype: { // 属性名,引用form模板的表单类型名
    type: String,
    value: 'leave_message'
  },
    full: { // 属性名,是否全屏
      type: Boolean,
      value: false,
    }
  },
  data: {

  }, // 私有数据，可用于模版渲染

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () {
    
   },
  moved: function () { },
  detached: function () { },

  methods: {
    onMyButtonTap: function () {
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },

    util: function (currentStatu) {
      /* 动画部分 */
      // 第1步：创建动画实例
      var animation = wx.createAnimation({
        duration: 200, //动画时长
        timingFunction: "linear", //线性
        delay: 0 //0则不延迟
      });

      // 第2步：这个动画实例赋给当前的动画实例  
      this.animation = animation;

      // 第3步：执行第一组动画  
      animation.opacity(0).rotateX(-100).step();

      // 第4步：导出动画对象赋给数据对象储存  
      this.setData({
        animationData: animation.export()
      })

      // 第5步：设置定时器到指定时候后，执行第二组动画  
      setTimeout(function () {
        // 执行第二组动画  
        animation.opacity(1).rotateX(0).step();
        // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
        this.setData({
          animationData: animation
        })

        //关闭  
        if (currentStatu == "close") {
          this.setData(
            {
              showModalStatus: false
            }
          );
        }
      }.bind(this), 200)

      // 显示  
      if (currentStatu == "open") {
        this.setData(
          {
            showModalStatus: true
          }
        );
      }
    }, 
    cancel: function() { //取消弹窗
      this.util("close");
    }, 
    Confirm_submit: function(e) { //确认，并提交数据
      var myEventDetail = { formData: e.detail.value, templateType: this.data.formtype } // detail对象，将弹窗内的表单数据给事件监听函数
      var pages = getCurrentPages();
      var currentPage = pages[pages.length - 1];//lly_improve
      currentPage.data.modal_comfirm_callback(myEventDetail);
      this.util("close");
    },
    //--------------------------------
    _myPrivateMethod: function () {
      // 内部方法建议以下划线开头
      this.replaceDataOnPath(['A', 0, 'B'], 'myPrivateData') // 这里将 data.A[0].B 设为 'myPrivateData'
      this.applyDataUpdates()
    },
    _propertyChange: function (newVal, oldVal) {

    }
  }

})
