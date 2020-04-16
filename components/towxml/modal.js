
Component({
  properties: {
    URL: { // 属性名,md地址
      type: String, 
    },
    model: { // 属性名,模式见attach函数
      type: Number,
      value: 1,
    },
    content: { // 属性名,转换的内容
      type: String
    },
    theme: { // 属性名,md主题
    type: String,
    value: 'light',
  },
  },
  data: {
    //article将用来存储towxml数据
    article: {},
  }, // 私有数据，可用于模版渲染

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { 
    const _ts = this;
    if (this.data.model==1)
    {
      //请求markdown文件，并转换为内容
      wx.request({
        url: this.data.URL,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: (res) => {
          //将markdown内容转换为towxml数据
          let data = getApp().towxml.toJson('res.data', 'markdown');
          
          //设置文档显示主题，默认'light'
          data.theme = this.data.theme;

          //设置数据
          _ts.setData({
            article: data
          });
        }
      });
    }
    else if (this.data.model == 2)
    {
      //将markdown内容转换为towxml数据
      console.log('lly'+_ts.data.content);
      let data = getApp().towxml.toJson(_ts.data.content, 'markdown');
      console.log(data);
      
      //设置文档显示主题，默认'light'
      data.theme = this.data.theme;
      //设置数据
      _ts.setData({
        article: data
      });
    }
    

   
  },
  moved: function () { },
  detached: function () { },

  methods: {
    onMyButtonTap: function () {
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },
    //---------------自定义部分---------
  
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