const date = new Date()
const years = []
const months = []
const days = []
const hours = []
const minutes = []
const durations = []
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
        current: true,
        done: true,
        text: '时间地点信息',
        desc: ''
      },
      {
        done: false,
        current: false,
        text: '匹配自习伙伴',
        desc: '可选'
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
  nav_studylist:function(e)
  {
  wx.redirectTo({
    url: '/pages/study/study_list/index',
    }); 
  let launch = core.APIrequest('launchStudy', { reach_uid: [110,111,112], study_content: '高等数学', msg: '帮我复习高数啊', place: '2号教学楼-108', study_date: '2018-06-16', study_time: '10-12', study_hidden:1});
  },
  swiper_change: function (e) {
    console.log(e.detail.current);
    
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.site);
    this.setData({
      site: options.site,
      place: options.place,
      date: options.date
    });
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