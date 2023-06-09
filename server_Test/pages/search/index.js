// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    //取消按钮是否出现
    isFocus: false,
    inpValue: "",
    isSearch:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleInput(e){
    this.setData({
      isSearch:false
    })
    //获取输入框的值
    const { value } = e.detail;
    //检测合法性
    if (!value.trim()) {
      this.setData({
        goods: [],
        isFocus: false
      })
      return;
    }
    //准备发送请求获取数据
    this.setData({
      isFocus: true
    })
    var that = this;
    wx.request({
      method: 'POST',
      data: { word: value },
      url: 'http://10.31.63.48:3000/search',
      success: function (res) {
        console.log(res);

        for (var i = 0; i < res.data.length; i++) {
          var intro = res.data[i].introduce;
          if (intro.indexOf('<br>' == -1)){
            let re = new RegExp('<br>', 'g');
            res.data[i].introduce = intro.replace(re, '\n');
          }
        }
        that.setData({
          books: res.data
        })
        console.log(res);
      },

    })
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