// pages/historicalEvents/studentdetail/studentdetail.js
let app = getApp();
let utils = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.uid);
    console.log(options.aid);
    console.log(options.status);
    const data = { 'uid': options.uid, 'aid': options.aid};
    const url = 'user/calculationSum';
    const that = this;
    app.getRequest(data,url,function(res){
      const map = [];
      const data = res.data.rows;
      console.log(data);
      for (let i = 0;i < data.length;i++){
        const end = data[i].signend != null ? utils.formatTime1(new Date(data[i].signend)) : '';
        const start = data[i].signstart != null ? utils.formatTime1(new Date(data[i].signstart)) : '';
        const day = data[i].signstart != null ? utils.formatTime(new Date(data[i].signstart)) : '';
        const map1 = {
          end:end,
          start:start,
          day:day
        };
        map.push(map1);
      }
      that.setData({
        user: data[0],
        status: options.status,
        map: map
      });
      console.log(map);
    })
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
  
  },
  commit : function(){
    wx.navigateTo({
      url: '../s',
    })
  }
})