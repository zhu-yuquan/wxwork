// pages/historicalEvents/studentlist/studentlist.js
let app = getApp();
// 引入util.js方法
let utils = require("../../../utils/util.js");
// 引入screening.js方法
let screening = require("../../admin/screening/screening.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeIndex: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const aid = options.aid;
    const price = parseInt(options.price);
    this.setData({
      price: price,
      aid: aid
    })
    getUserList(this, '', aid);
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
    
  },
  studentdetail : function(e){
    const code = e.target.dataset.code;
    const status = e.target.dataset.status;
    if (code != null && status != null){
      wx.navigateTo({
        url: '../studentdetail/studentdetail?aid=' + this.data.aid + "&uid=" + code + "&status=" + status
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '请检查当前网路',
        complete: function () {
          wx.navigateTo({
            url:'../historicalEvents/historicalEvents'
          });
        }
      })
    }
  }
})
// 请求/获取数据
function getUserList(that,e,aid){
  const url = "wx/userList";
  const user = wx.getStorageSync('user');
  const code = { "aid": aid, "id": user.id, "name": user.name, "opid": user.opid, "status": user.status, "tel": user.tel, "checksum": user.checksum };
  app.getRequest(code, url, function (res){
    const data = res.data.rows;
    const agent = data[data.length - 1].agentActivity;
    let map = [];
    let index = 0;
    for (let i = 0; i < data.length-1;i++){
      map.push(data[i])
      if (data[i].signUp.status == '已全勤'){
        index++
      }
    }
    agent.sdate = utils.formatTime(new Date(agent.sdate));
    console.log(map)
    console.log(agent)
    const sumPrice = that.data.price * map.length;
    that.setData({
      map: map,
      agent:agent,
      sumPrice : sumPrice,
      index: index
    });
  });
}