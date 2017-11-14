// 引入screening.js方法
let screening = require("./screening/screening.js");
// 引入attence.js方法
let attence = require("./attence/attence.js");
// 引入qrcode.js方法
let qrcode = require("./qrcode/qrcode.js");
// 引入qrcode.js方法
let codeImage = require("./codeImage/codeImage.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //显示/隐藏筛选区
    screeningStatus: 0
    //筛选区点击状态
    ,screeningBigScreen: 4
    ,screeningSmallScreen: 4
    , screeningBigText: '全部'
    , screeningSmallText: '全部'
    
    //显示/隐藏考勤区
    , attenceStatus : false
    //考勤区点击状态
    , attenceAllDay : 0

    //拍照
    , codeImageStatus : 0
    , chooseimage : ''

    //二维码
    , qrcodeStatus : false
    , maskHidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const code = { 'dateOption': 1 }
    const url = 'activity/getAllActivity';
    screening.activityData(code, url);
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
  /** 
   * 筛选
  */
  screeningStatus: screening.screeningStatus,
  //状态
  screeningBigScreen: screening.screeningBigScreen,
  //重置
  screeningResetting: screening.screeningResetting,
  //时间
  screeningSmallScreen: screening.screeningSmallScreen,
  //提交
  screeningSubmit: screening.screeningSubmit,

  /** 
   * 考勤
  */
  attenceStatus: attence.attenceStatus,
  //点击状态
  attenceAllDay: attence.attenceAllDay,

  /**
   * 二维码
   */
  qrcodeStatus: qrcode.qrcodeStatus,

  /**
   * 拍照
   */
  codeImageStatus : codeImage.codeImageStatus,
  chooseimage : codeImage.chooseimage, 
  imageRemove : codeImage.imageRemove,
  imageUploadFile: codeImage.imageUploadFile,
  imagePreview: codeImage.imagePreview,
})