const date = new Date()
const years = []
const months = []
const days = []
const hours = []
const minutes = []
const durations = []
var core = getApp().globalData.core;
for (let i = date.getFullYear(); i <= date.getFullYear() + 1; i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
for (let i = date.getHours(); i <= 23; i++) {
  hours.push(i)
}

for (let i = 0; i <= 59; i++) {
  minutes.push(i)
}

for (let i = 1; i <= 12; i++) {
  durations.push(i);
}
var core = getApp().globalData.core;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    invited_user:[],
    years: years,
    year: date.getFullYear(),
    months: months,
    month: date.getMonth() + 1,
    days: days,
    day: date.getDate(),
    date_value: [0, date.getMonth(), date.getDate() - 1],
    //----------
    hours: hours,
    hour: date.getHours(),
    minutes: minutes,
    minute: date.getMinutes(),
    durations: durations,
    duration: date.getHours() + 1,
    time_value: [0, date.getMinutes(), 0],
    //------------
    steps: [{
      current: false,
      done: false,
      text: '时间地点信息',
      desc: '必填'
    },
    {
      done: false,
      current: false,
      text: '匹配自习伙伴',
      desc: '选填'
    },
    {
      done: false,
      current: false,
      text: '确认信息完成'
    }
    ],
    current_step: 1,
    step_content: '下一步',
    //---------
  },
  //-------
  form_check() {
    let data = this.data;
    if (data.date && data.place && data.site && data.textareaValue && data.study_star && data.study_end) {
      return true;
    }
    else {
     
      return false;
    }
  },
  nav_studylist: function (e) {
    let that = this;
    if (!this.form_check()) {
      core.com.show_mToast('表单缺少数据');
      return false;
    }
    wx.showLoading({
      title: '请求中',
    })

    let launch = core.APIrequest('launchStudy', { reach_uid: that.data.invited_user, study_content: that.data.textareaValue, msg: that.data.study_msg, place: that.data.place + '-' + that.data.site, study_date: that.data.date, study_time: that.data.study_star + '-' + that.data.study_end, study_hidden: 1 });
    launch.then(res => {
      wx.switchTab({
        url: '/pages/study/study_index/study_index',
      });
      wx.hideLoading();
    }).catch(err => { wx.hideLoading(); })
  },
  swiper_change: function (e) {
    console.log(e.detail.current);
   
    if(this.form_check())
    {
     
      this.data.steps[0].done=true;
      this.data.steps[0].current = true;
      this.data.steps[0].desc='正确';
    }
    else{
      this.data.steps[0].done = false;
      this.data.steps[0].desc = '信息不完整';
      this.data.steps[0].current = false;
    }
    this.setData({ steps: this.data.steps});
  },
  step_next: function (e) {
    console.log(step);
    var step = ++this.data.current_step;
    console.log(step);
    if (step == 3) {

    } else {
      var temp = this.data.steps,
        i;
      for (i = 0; i < 3; i++) {
        if (i != step)
          temp[i].current = false;
        else
          temp[i].current = true;
      }
      temp[step - 1].done = true;
      this.setData({
        steps: temp,
        current_step: step
      });
      if (step == 2) {
        this.setData({
          step_content: '完成'
        });
      }

    }
  },
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  },
  bindChange_time: function (e) {
    const val = e.detail.value
    this.setData({
      hour: this.data.hours[val[0]],
      minute: this.data.minutes[val[1]],
      duration: this.data.durations[val[2]] + this.data.hours[val[0]]
    })
  },
  inputDate: function (e) {
    //console.log(e.detail.detail.value,'aaa');
    this.setData({ date: e.detail.detail.value });
  },
  inputPlace: function (e) {
    //console.log(e.detail.detail.value,'aaa');
    this.setData({ place: e.detail.detail.value });
  },
  inputSite: function (e) {
    //console.log(e.detail.detail.value,'aaa');
    this.setData({ site: e.detail.detail.value });
  },
  inputContent: function (e) {
    //console.log(e.detail.detail.value,'aaa');
    this.setData({ textareaValue: e.detail.detail.value });
  },
  inputMsg: function (e) {
    //console.log(e.detail.detail.value,'aaa');
    this.setData({ study_msg: e.detail.detail.value });
  },
  inputStar: function (e) {
    let star = e.detail.value.split(':', 2);
    console.log(e.detail.value.split(':', 2), 'aaa', parseInt(star[0]));
    this.setData({ star_time: e.detail.value, study_star: parseInt(star[0]) });
  },
  inputEnd: function (e) {
    let star = e.detail.value.split(':', 2);
    console.log(e.detail.value.split(':', 2), 'aaa', parseInt(star[0]));

    if (this.data.study_end < this.data.study_star) {
      core.com.show_mToast('结束时间不得小于开始时间');
      this.setData({ end_time: '', study_end: '' });
    }
    else {
      this.setData({ end_time: e.detail.value, study_end: parseInt(star[0]) });
    }
  },
  get_studyGay:function()
  {
    var that = this;
    //---
    wx.showLoading({
      title: '加载数据中',
    });
    //---
    core.APIrequest('searchStudyPartner', {
    }).then((result) => {
      console.log(result);
      that.setData({ get_studyGay:result})
      wx.hideLoading()
    }).catch((err) => {
      core.APIerrCode(err, 2)
      wx.hideLoading()
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.site);
    if (options.site) {
      this.setData({
        site: options.site,
        place: options.place,
        date: options.date
      });
    }

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