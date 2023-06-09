// pages/user/index.js
Page({

  data: {
    userInfo: {},
    collectNums: 0,
    postNums:0
  },
  onShow() {
    const userInfo = wx.getStorageSync("userInfo");
    const collect = wx.getStorageSync("collect") || [];
    const postComm = wx.getStorageSync("post") || [];

    this.setData({
      userInfo,
      collectNums: collect.length,
      postNums:postComm.length
    })
  }
})