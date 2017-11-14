//index.js
//获取应用实例
const app = getApp()
app.getOpid();
Page({
  data: {
    motto: '学校crm',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  scrm:function(){
    const opid = wx.getStorageSync("opid");
    console.log(opid);
    const data = {'opid':opid};
    const url = 'wx/login';
    app.getRequest(data,url,function(res){
      console.log(res.data.rows)
      if (res.data.rows == null){
        wx.redirectTo({
          url: '../activate/activate'
        })
      }else{
        if (res.data.rows.opid == ''){
          wx.showModal({
            title: '提示',
            content: '请检查当前网络!并重新登录'
          })
        }else{
          wx.removeStorageSync('opid');
          wx.setStorageSync('user', res.data.rows)
          wx.redirectTo({
            url: '../main/main'
          })
        }
      }      
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
