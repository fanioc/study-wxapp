var edit_content_value_temp = ''; //存放编辑文本的临时变量
var init_mark = ''; //初始的标记
var button_type = 0;

var core = getApp().globalData.core;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    edit_content_preview: false,
    edit_content_img_insert: false,
    edit_content_value: '',
    edit_content_focus: true
  },
  //----------------
  edit_button: function (e) {
    var that = this;
    //console.log();
    if (that.data.edit_content_value.length == 0)
      init_mark = '';

    //console.log(temp);
    switch (e.currentTarget.dataset.type) {
      case '0':

        that.setData({
          edit_content_value: that.data.edit_content_value + init_mark
        });
        init_mark = '';
        break;
      case '1':
        {

          if (init_mark != '**') {
            that.setData({
              edit_content_value: that.data.edit_content_value + init_mark + '**'
            });
            init_mark = '**';
          }


        }
        break;
      case '2':
        {

          if (init_mark != '*') {
            that.setData({
              edit_content_value: that.data.edit_content_value + init_mark + '*'
            });
            init_mark = '*';
          }

        }
        break;
      case '3':
        {


          if (init_mark != '`') {
            that.setData({
              edit_content_value: that.data.edit_content_value + init_mark + '`'
            });
            init_mark = '`';
          }



        }
        break;
      case '4':
        that.setData({
          edit_content_value: that.data.edit_content_value + init_mark + "\n# "
        });
        init_mark = '';
        break;
      case '5':
        that.setData({
          edit_content_value: that.data.edit_content_value + init_mark + "\n## "
        });
        init_mark = '';
        break;
      case '6':
        that.setData({
          edit_content_value: that.data.edit_content_value + init_mark + "\n### "
        });
        init_mark = '';
        break;
      case '7':
        that.setData({
          edit_content_value: that.data.edit_content_value + init_mark + "\n----\n"
        });
        init_mark = '';
        break;
      case '8':
        {
          if (init_mark != '\n```\n') {
            that.setData({
              edit_content_value: that.data.edit_content_value + init_mark + '\n```\n'
            });
            init_mark = '\n```\n';
          }

        }
        break;
      case '9':
        {
          that.edit_content_imgURL();


        }
        break;
      case '10':
        {
          that.setData({
            edit_content_value: that.data.edit_content_value + init_mark
          });
          init_mark = '';
          this.setData({
            edit_content_preview: true
          });

        }
        break;
      case '11':
        {
          that.setData({
            edit_content_value: that.data.edit_content_value + init_mark
          });
          init_mark = '';
          this.edit_content_complete();

        }
        break;
    }

    console.log(this.data.edit_content_value);
  },
  edit_content_listen: function (e) {

    //console.log(edit_content_value_temp);

    this.data.edit_content_value = e.detail.value;
    console.log(this.data.edit_content_value);


  },
  edit_content_imgURL: function (e) {
    var that = this;
    var image_url;
    wx.chooseImage({ //选择图片，上传成功后将获取地址插入markdown标记中
      count: 1,
      success: function (res_cho) {

        console.log(res_cho.tempFilePaths[0]);

        var uploadTask = wx.uploadFile({
          url: _API.uploadFile,
          filePath: res_cho.tempFilePaths[0],
          name: 'file',
          success: function (res) {

            image_url = JSON.parse(res.data).fileUrl;
            that.setData({
              edit_content_value: that.data.edit_content_value + init_mark + "\n![此次为插入的图片](" + image_url + ")\n"
            });
            init_mark = '';
          }
        });
        //----------------------
        that.setData({
          edit_content_img_insert: true
        });
        uploadTask.onProgressUpdate((res) => {

          that.setData({
            edit_content_img_upload_percent: res.progress
          });

          if (res.progress == 100) //上传成功后的行为
          {

            that.setData({
              edit_content_img_insert: false
            });
            _components.show_mToast('图片上传成功');




          }
        })
      }
    })


  },
  exit_edit_content_preview: function () { //退出预览
    this.setData({
      edit_content_preview: false
    });
  },
  edit_content_complete: function () { //完成编辑，上传文件
    //addtionRegion
    var that = this;

    var question = getApp().globalData.current_question;
    var pages = getCurrentPages();
    var dy_id = pages[pages.length - 2].data.dynamic.dynamic_id; //lly_improve

    core.APIrequest('AnswerDynamic', {
      dynamic_id: dy_id,
      content: that.data.edit_content_value,
      type: 1
    }).then((result) => {
      wx.showToast({
        title: '回答成功~',
        duration: 1000,
        icon: 'none',
        mask: true
      })
      wx.navigateBack({
        delta: 1
      });
    }).catch((err) => {
      core.APIerrCode(err, 2)
    });
  },
  //----------------
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})