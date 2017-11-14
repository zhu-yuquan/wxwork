let that = null;
let utils = require("../../../utils/util.js");
let app = getApp();
/**
   * 状态
   */
function screeningBigScreen(e) {
  this.setData({
    screeningBigScreen: e.currentTarget.id
  })
}
// 这样暴露接口，这里不暴露是不能引用的
module.exports.screeningBigScreen = screeningBigScreen;
/**
  * 时间
  */
function screeningSmallScreen(e) {
  this.setData({
    screeningSmallScreen: e.currentTarget.id
  })
}
module.exports.screeningSmallScreen = screeningSmallScreen;
/**
   * 提交数据
   */
function screeningSubmit(e) {
  let bigscreen = e.currentTarget.dataset.bigscreen;
  let smallscreen = e.currentTarget.dataset.smallscreen;
  if (bigscreen == 0){
    that.setData({
      screeningBigText: '未开始'
    })
  }
  if (bigscreen == 1){ 
    that.setData({
      screeningBigText: '正在进行'
    })
  }
  if (bigscreen == 2){ 
    that.setData({
      screeningBigText: '已结束'
    })
  }
  if (smallscreen == 0){ 
    that.setData({
      screeningSmallText: '当天'
    })
  }
  if (smallscreen == 1){ 
    that.setData({
      screeningSmallText: '全部'
    })
  }
  if (bigscreen == 4) {
    that.setData({
      screeningBigText: '全部'
    })
  }
  if (smallscreen == 4) {
    smallscreen = 1;
    that.setData({
      screeningSmallText: '全部'
    })
  }
  const code = {
    'dateOption': smallscreen,'statOption': bigscreen
  };
  const url = 'activity/getAllActivity';
  activityData(code, url)
}
module.exports.screeningSubmit = screeningSubmit;
/**
   * 重置
   */
function screeningResetting() {
  this.setData({
    screeningSmallScreen: 4
    , screeningBigScreen: 4
  })
}
module.exports.screeningResetting = screeningResetting;
/**
   * 显示/隐藏
   */
function screeningStatus(e) {
  that = this;
  this.setData({
    screeningStatus: e.currentTarget.id
  })
}
module.exports.screeningStatus = screeningStatus;

/**
 * 加载数据
 */
function activityData(code,url){
  if(code.that!=null){
    that = code.that;
  }
  app.getRequest(code, url, function (res) {
    var activity = res.data.rows;
    console.log(activity)
    if (activity != null) {
      for (var i = 0; i < activity.length; i++) {
        if (activity[i].start == null){
          activity[i].start = '';
        }else{
          activity[i].end = utils.formatTime(new Date(activity[i].end));
        }
        if (activity[i].end == null) {
          activity[i].end = '';
        }else{
          activity[i].start = utils.formatTime(new Date(activity[i].start));
        }
      }
    }
    that.setData({
      activity: activity
      ,screeningStatus: 0
    })
  });
}
module.exports.activityData = activityData;