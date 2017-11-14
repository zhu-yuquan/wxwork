// pages/historicalEvents/historicalEvents.js
let app = getApp();
// 引入util.js方法
var utils = require("../../utils/util.js");
// 引入screening.js方法
let screening = require("../admin/screening/screening.js");
// 引入二维码js
var QR = require("../../utils/qrcode.js");
// 引入qrcode.js方法
let qrcode = require("../admin/qrcode/qrcode.js");
// 引入share.js方法
let share = require("../activities/share/share.js");
// 引入particulars.js
let particulars = require("../activities/particulars/particulars.js");
Page({
  // 上个月
  upper : function(){
    const date = this.data.date;
    let year = parseInt(date.substring(0, date.indexOf('年')));
    let month = parseInt(date.substring(date.indexOf('年') + 1, date.indexOf('月')));
    const date1 = getPreMonth(year, month);
    console.log(date1)
    this.activitylist(1, 1000, date1, this);
    this.setData({
      date: date1,
    })
  },
  //当前月
  now: function(){
    const date = new Date();
    const year = date.getFullYear()
    const month = date.getMonth() + 1;
    const date1 = year + "年" + month + "月";
    this.setData({
      date: date1
    })
    console.log(date1)
    this.activitylist(1, 1000, date1, this);
  },
  // 下个月
  lower : function(){
    let lower = this.data.lower;
    const date = this.data.date;
    let year = parseInt(date.substring(0, date.indexOf('年')));
    let month = parseInt(date.substring(date.indexOf('年') + 1, date.indexOf('月')));
    const date1 = getNextMonth(year, month); 
    console.log(date1)
    this.activitylist(1, 1000, date1, this);
    this.setData({
      date: date1
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    timeIndex : true,
    qrcodeStatus: false
    //分享
    , shareStatus: false
    //详情
    , particularsStatus: false 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const date = new Date();
    const year = date.getFullYear()
    const month = date.getMonth() + 1;
    const date1 = year + "年" + month + "月";
    this.setData({
      date: date1
    })
    this.activitylist(1, 1000, date1, this);
    let that = this;
    setTimeout(function () {
      that.setData({
        timeIndex: !that.data.timeIndex
      })
    }, 1000 * 2)
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
    let that = this;
    return {
      title: '微信小程序联盟',
      desc: '最具人气的小程序开发联盟!',
      path: '/pages/logs/logs',
      imageUrl: 'http://oz1h9kuzx.bkt.clouddn.com/17_11510107853669.jpg'
      ,complete:function(){
        that.setData({
          shareStatus : false
        })
      }
    }
  },
  studentlist : function(e){
    wx.navigateTo({
      url: './studentlist/studentlist?price=' + e.currentTarget.dataset.price + "&aid=" + e.currentTarget.id
    })
  },
  activitylist : function(num,size,date,that){
    const user = wx.getStorageSync('user');
    const code = { "num": num, "size": size, "date": date, "id": user.id, "name": user.name, "opid": user.opid, "status": user.status, "tel": user.tel,"that":that };
    const url = 'wx/slectActivitylist';
    screening.activityData(code, url);
  },

  /**
   * 分享
   */
  shareStatus: share.shareStatus,
  /**
   * 详情
   */
  particularsStatus: particulars.particularsStatus,
  /**
   * 二维码
   */
  qrcodeStatus: qrcode.qrcodeStatus,
  createQrCode: qrcode.createQrCode,
})
//上个月
function getPreMonth(year, month) {
  var year2 = year;
  var month2 = month-1;
  if (month2 == 0) {
    year2 = parseInt(year2) - 1;
    month2 = 12;
  }
  if (month2 < 10) {
    month2 = '0' + month2;
  }
  var t2 = year2 + '年' + month2 + '月';
  return t2;
} 

//下个月
function getNextMonth(year, month) {
  var year2 = year;
  var month2 = month+1;
  if (month2 == 13) {
    year2 = parseInt(year2) + 1;
    month2 = 1;
  }
  if (month2 < 10) {
    month2 = '0' + month2;
  }
  var t2 = year2 + '年' + month2 +'月';
  return t2;
}