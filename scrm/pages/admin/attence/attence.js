let app = getApp();
let that = null;
// 显示/关闭考勤
function attenceStatus(e){
  that = this;
  console.log(e.target.id)
  this.setData({
    attenceStatus: !this.data.attenceStatus
  })
  attenceData(e.target.id,this);
}
module.exports.attenceStatus = attenceStatus;
// 点击状态
function attenceAllDay(e){
  this.setData({
    attenceAllDay: e.currentTarget.id
  })
}
module.exports.attenceAllDay = attenceAllDay;
function attenceData(id){
  const data = {'aid':id};
  const url = 'user/getUserStatus';
  app.getRequest(data,url,function(res){
    console.log(res.data.rows[0]);//当天
    console.log(res.data.rows[1]);//全部
    if (status == 0){
      that.setData({
        attenceData: res.data.rows[0]
      })
    }else{
      that.setData({
        attenceData: res.data.rows[1]
      })
    }
  })
}