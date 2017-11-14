let that = null;
let QR = require("../../../utils/qrcode.js");
//动态设置画布大小
function qrcodeSize(initUrl) {
  const size = wx.getSystemInfoSync();
  const w = size.windowWidth * 0.7;
  console.log(w)
  that.setData({
    qrcodeW: w+"px"
  })
  QR.qrApi.draw(initUrl, "mycanvas", w, w);
}

//显示/隐藏
function qrcodeStatus(e){
  that = this;
  console.log(e.target.id);
  console.log(e.target.dataset.u);
  console.log(wx.getStorageSync('user'));
  that.setData({
    qrcodeStatus: !that.data.qrcodeStatus,
  })
  var initUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6d6fb2eddd9345a7&redirect_uri=http%3a%2f%2ftest4.easyinlab.org%2fscrm%2fmy.do&response_type=code&scope=snsapi_userinfo&state=easyinlab_' + e.target.dataset.u + '_' + e.target.id + '_' + wx.getStorageSync('user').opid + '#wechat_redirect';
  qrcodeSize(initUrl)
}
module.exports.qrcodeStatus = qrcodeStatus;