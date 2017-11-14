// pages/activate/activate.js
let zz = /^1[3|4|5|8|7][0-9]\d{8}$/;
let app = getApp();
Page({
  //手机号
  tel : function(e){
    this.setData({
      tel: e.detail.value
    })
  },
  //验证码
  code: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  //获取验证码
  validation : function(e){
    const that = this;
    console.log(e.target.dataset);
    const tel = e.target.dataset.tel;
    if (!zz.test(tel)){
      wx.showModal({
        title: '提示',
        content: '手机号有误',
      })
    }else{
      const url = 'user/validation';
      const data = { 'tel': tel};
      app.getRequest(data,url,function(res){
        console.log(res.data.rows);
        if (res.data.rows=='0'){
          wx.redirectTo({
            url: '../error/error',
          })
        }
        that.setData({
          validation: res.data.rows,
          tel:tel
        })
      })
    }
  },
  // 提交
  submit : function (e){
    console.log(e.target.dataset);
    const tel = e.target.dataset.tel;
    const thatTel = this.data.tel;
    let code = e.target.dataset.code;
    const validation = this.data.validation;
    // console.log(this.data.validation)
    if(tel!=thatTel){
      wx.showModal({
        title: '提示',
        content: '手机号有误，重新获取验证码！',
      })
    }
    if (tel == '' || code == '' || validation == null){
      wx.showModal({
        title: '提示',
        content: '信息有误',
      })
    }else{
      if (validation != code){
        wx.showModal({
          title: '提示',
          content: '验证码有误',
        })
        return;
      }
      if (!zz.test(tel)) {
        wx.showModal({
          title: '提示',
          content: '手机号有误',
        })
      } else {
        code = {
          "tel":tel,
          "validation": validation,
          "opid":wx.getStorageSync("opid")
        }
        const url = "wx/activate";
        app.getRequest(code,url,function(res){
          console.log(res)
          if (res.data.rows!=null){
            wx.setStorageSync("user", res.data.rows)
            wx.redirectTo({
              url: '../main/main',
            })
          }
        })
      }
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    tel : '',
    code : ''
  },

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