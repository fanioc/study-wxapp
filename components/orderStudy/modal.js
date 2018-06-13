var core = getApp().globalData.core;

Component({

  behaviors: [],

  properties: {
    refresh: { // 属性名,监视页面pulldown,重新获取进入学习状态后的信息
      type: Boolean, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: false, // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function (newVal, oldVal) {
        if (this.get_studyInfo_array()) {
          this.setData({ hiddenToast: true, toastContent: '刷新成功' });
          
        }
        else {
          this.setData({ hiddenToast: true, toastContent: '刷新失败' });
          
        }
        wx.stopPullDownRefresh();
      } 
    }
  },
  data: {
    hiddenToast:'',
    toastContent:'',
    url:{
      image:'https://study.xietan.xin/static/upLoadFile/STUDY.png'
    }
    ,
    study_status:false,//判断是在学习和还是休息
    last_study_array: [],//上次学习的信息
    study_satisfaction:0,//学习满意度 用于进度条
    studyInfo_array:[]//学习ing时所需数据

  }, // 私有数据，可用于模版渲染

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () {
    this.get_last_study_array();
   },
  moved: function () { },
  detached: function () { },

  methods: {
    onMyButtonTap: function () {
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },
    //----------------------------
    //改变data.study_status switch触发
    change_study_status: function (e){
      
      this.setData({ study_status:e.detail.value});
      if (this.data.study_status)
        this.get_studyInfo_array();
    },
//转跳匹配学习的页面，由图片触发
    nav_orderStudy_detailPage:function(){
      //addtionRegion
      wx.navigateTo({
        url: '/pages/order-study/order_operate/operate',
      })
    },
//获取上一次学习的信息，此操作读取本地缓存
    get_last_study_array: function () {
      var data=[];
      //addtionRegion 注意显示权重，
      //----debugdata----------
      data.push({ subject: '学习科目',content:'高等数学'});
      data.push({ subject: '学习时间', content: '2018-1-1' });
      data.push({ subject: '学习地点', content: '二教-103' });
      data.push({ subject: '学习伙伴', content: '卢林杨' });
         //----debugdata----------
      this.setData({ last_study_array:data});
    },
//获取上一次学习的满意度，此操作读取本地缓存
    get_study_satisfaction: function (){
        var data=90;
        //addtionRegion
      this.setData({ study_satisfaction:data });
    },
//获取当前学习的信息用于for渲染，
    get_studyInfo_array: function () {
      var data = [];
      //addtionRegion ，
      //----debugdata----------
      data.push({ subject: '学习地点', content: '二教-103' });
      data.push({ subject: '当前位置', content: '二教-103' });
      data.push({ subject: '自习伙伴', content: '未匹配,点击上方图片进人匹配页面' });
      data.push({ subject: '预计结束时间', content: '20:00' });
      data.push({ subject: '当前教室自习人数', content: '9' });
      //----debugdata----------
      this.setData({ studyInfo_array: data });
      return true;
    },
//将是否接收邀请和分享学习信息的选择发送给服务器
    post_study_constraint: function (e) {
      var data = 0;
      for (var i in e.detail.value)
      {
        data += parseInt(e.detail.value[i]);
      }
      //addtionRegion ，
      //console.log(data, e.detail.value);
    },
    //----------------------------
    _myPrivateMethod: function () {
      // 内部方法建议以下划线开头
      this.replaceDataOnPath(['A', 0, 'B'], 'myPrivateData') // 这里将 data.A[0].B 设为 'myPrivateData'
      this.applyDataUpdates()
    },
    _propertyChange: function (newVal, oldVal) {

    }
  }

})