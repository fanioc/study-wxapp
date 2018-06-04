// components/navigation/navigation.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    seat: { // 属性名,如果为真则屏幕占位70px
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    Back:function(){
      wx.navigateBack({
        delta: 1, // 回退前 delta(默认为1) 页面
      })
    }

  }
})
