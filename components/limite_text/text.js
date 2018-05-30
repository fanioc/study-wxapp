// components/limite_text/text.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    max:{
      type:Number,
      value:100,
    },
    content:{
      type:String,
      value:'',
      observer: function (newVal, oldVal) {
        
        if(newVal.length >this.data.max)
        {
          console.log('hah');
          this.setData({ content: newVal.substr(0, this.data.max) +'...'})
        }
      }

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

  }
})
