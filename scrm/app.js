//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  getRequest:function(data,url,cb){//获取活动数据;
  // url:路径;index:参数;cb:function
    wx.showLoading({
      title: '正在加载',
      mask: true,
    })
    wx.request({
      url: 'http://10.0.18.13:8080/scrm/'+url,
      data: data,
      header: { 'Context-Type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        cb(res);
      },
      fail: function (res) {
        wx.showToast({
          title: '加载失败',
          image: ''
        })
      },
      complete: function (res) {wx.hideLoading() },
    })
  },
  getOpid:function(){//获取opid;url:路径
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: "https://api.weixin.qq.com/sns/jscode2session",//登录页面
            data: {
              appid: 'wx2afd82894a81aa59',//小程序ID
              secret: 'c4638c5baf5279cee30443694bcaee25',//小程序密钥
              js_code: res.code,//登录时获取的 code
              grant_type: 'authorization_code'//固定写法
            },
            success: function (rows) {
              wx.setStorageSync("opid",rows.data.openid);
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  }
})