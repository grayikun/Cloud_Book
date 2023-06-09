// pages/books/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList:[],
    index: "修真",
    currentTab: "修真",
    rightBooks:[],
    scrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      method: 'GET',
      url: 'http://10.31.63.48:3000/getFenlei',
      success: function (res) {
        console.log(res.data);
        that.setData({
          leftMenuList:res.data
        })
      },

    }),
    this.getBooks();

  },
  getBooks(e){
    var that = this;
    wx.request({
      method: 'POST',
      data: { sort: this.data.currentTab },
      url: 'http://10.31.63.48:3000/getBooks',
      success: function (res) {
        console.log(res);
        that.setData({
          rightBooks: res.data,
          scrollTop: 0
        })
      },

    })
  },
  handleItemTap(e) {
    var page = this;
    var id = e.target.id;
    // console.log(id);
    if (this.data.currentTab == id) {
      return false;
    } else {
      page.setData({
        currentTab: id
      });
    }
    page.setData({
      index: id
    });
    console.log(this.data.currentTab);
    this.getBooks();
    
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