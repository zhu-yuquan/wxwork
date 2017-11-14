let that = null;
/**
 *  显示/隐藏
 */
function codeImageStatus(e){
  that = this;
  this.setData({
    codeImageStatus : e.currentTarget.id,
  })
}
module.exports.codeImageStatus = codeImageStatus;
var arrImg = [];//保存选择的图片
/**
 *  上传图片
 */
function chooseimage(){
  wx.showLoading({
    title: '正在加载',
    mask: true
  })
    wx.chooseImage({
      count: 3, // 默认9  
      // 可以指定是'original'原图还是'compressed'压缩图，默认二者都有
      sizeType: ['original'], 
      // 可以指定来源是'album'相册还是'camera'相机，默认二者都有
      sourceType: ['album'], 
      success: function(res) {
        console.log(res.tempFilePaths.length)
        for (var i = 0; i < res.tempFilePaths.length; i++){
          arrImg.splice(0,0,res.tempFilePaths[i])//放入数组
        }
        that.setData({
          chooseimage: arrImg
        })
      },
      complete : function(){
        wx.hideLoading();//隐藏提示框
      }
    })
}
module.exports.chooseimage = chooseimage;
/**
 *  删除
 */
function imageRemove(e){
  arrImg.splice(e.currentTarget.id, 1)
  this.setData({
    chooseimage: arrImg
  })
  wx.showToast({
    title: '删除',
  })
}
module.exports.imageRemove = imageRemove;
/**
 *  上传
 */
function imageUploadFile(){
  wx.showLoading({
    title: '正在上传',
    mask: true
  })
  if (arrImg != null && arrImg != ''){
    arrImg.splice(0, arrImg.length);//清空数组
    wx.uploadFile({
      url: '',
      filePath: arrImg,
      name: 'files',
      header: { "Content-Type": "multipart/form-data" },
      success: function (res){
        wx.showToast({
          title: '上传成功',
        })
      },
      fail: function () {
        wx.showToast({
          title: '上传失败',
        })
      },
      complete: function(){
        wx.hideLoading();//隐藏提示框
      }
    })
  }
}
module.exports.imageUploadFile = imageUploadFile;

/**
 *  预览
 */
function imagePreview(e){
  console.log();
  this.setData({
    imagePreview : e.currentTarget.dataset.url
  })
}
module.exports.imagePreview = imagePreview;
