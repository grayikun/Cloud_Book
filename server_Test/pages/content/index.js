// pages/content/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:[],
    title:[],
    all:[],
    id:[],
    min_id:[],
    max_id:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const content = options.content;
    const title = options.title;
    const book_id = options.book_id;
    const id = parseInt(options.id);

    var that = this;
    wx.request({
      method: 'POST',
      data: { id: book_id },
      url: 'http://10.31.63.48:3000/getContent',
      success: function (res) {
        // console.log(res.data[0].content);
        that.setData({
          all:res.data,
          min_id:res.data[0].id,
          max_id: res.data[res.data.length - 1].id

        })

      },

    })
    this.setData({
      detail: content,
      title:title,
      id: id
    })
    console.log(this.data.id);
  },
  
  lastChap(e){
    var that = this;
    const curr_id = that.data.id;
    if (curr_id == that.data.min_id ) {
      wx.showToast({
        title: '已经走到第一页了',
      })
    }
    for (var i = 0; i < that.data.all.length;i++){
      const all_id = parseInt(that.data.all[i].id);
      
      if(curr_id-all_id === 1){
        console.log("跳到上一页了")
        console.log(that.data.all[i].title);
        that.setData({
          id:all_id,
          detail: that.data.all[i].content,
          title: that.data.all[i].title
        })
      }
    }
    
  },
  nextChap(e) {
    var that = this;
    const curr_id = that.data.id;
    if (curr_id == that.data.max_id) {
      wx.showToast({
        title: '已经是最后一章了',
      })
    }
    // console.log(typeof(parseInt(curr_id)));
    for (var i = 0; i < that.data.all.length; i++) {
      const all_id = parseInt(that.data.all[i].id);

      if (curr_id - all_id === -1) {
        console.log("跳到下一页了")
        console.log(that.data.all[i].title);
        that.setData({
          id: all_id,
          detail: that.data.all[i].content,
          title: that.data.all[i].title

        })
      }
    }
  },
  // downloadTxt: function () {
  //   var that = this;
  //   wx.request({
  //     method: 'POST',
  //     data: { content:that.data.detail },
  //     url: 'http://10.31.63.48:3000/download',
  //     success: function (res) {
  //       wx.downloadFile({
  //         url:"",
  //         filePath: wx.env.USER_DATA_PATH + '第一章.txt',
  //         success:function(res){
  //           wx.showToast({
  //             title: '文件已下载',
  //           })
  //         }
  //       })
       
  //     },

  //   })

  // },

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