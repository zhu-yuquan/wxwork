function shareStatus() {
  this.setData({
    shareStatus: !this.data.shareStatus
  })
}
module.exports.shareStatus = shareStatus;