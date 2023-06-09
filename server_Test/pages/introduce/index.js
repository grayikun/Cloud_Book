// pages/introduce/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    intro:[],
    isCollect:false,
    showleft:false,
    book_id:[],
    titles:{},//传入组件
    content:[],
    unLogin:true,
    commentList:[]
  },
  Book:{},
  /**
     * 生命周期函数--监听页面显示
     */
  onShow: function () {
    // console.log(e.book_id);
    this.getBook(this.data.book_id);
    this._getCommentData(this.data.book_id);
    
  },
  // 页面进入
  onLoad:function(options){
    // console.log(options.book_id);
    const book_id = options.book_id;
    const id = book_id.replace(/\'/g, "");
    // console.log(typeof(id));
    this.setData({
      book_id:id
    })

  },
  
// 获取图书
  getBook(book_id){
    var that = this;
    wx.request({
      method: 'POST',
      data: { id: book_id },
      url: 'http://10.31.63.48:3000/getIntro',
      success: function (res) {
        that.Book = res.data[0];
        //获取缓存中的商品收藏数组
        let collect = wx.getStorageSync("collect") || [];
        //判断是否被收藏
        let isCollect = collect.some(v => v.book_id === that.Book.book_id);
        console.log(res.data[0]);
        that.setData({
          intro: res.data[0],
          isCollect
        })
      },

    })
  },
  // 收藏图书
  handleCollect(e){
    let isCollect = false;
    let collect = wx.getStorageSync("collect") || [];
    console.log(collect);
    let index = collect.findIndex(v => v.book_id === this.Book.book_id);
    if (index !== -1) {
      //能找到，已经收藏过了，在数组中删除
      collect.splice(index, 1);
      isCollect = false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      });
    } else {
      collect.push(this.Book);
      isCollect = true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      });
    }
    // 4 把数组存入到缓存中
    wx.setStorageSync("collect", collect);
    // 5 修改data中的属性  isCollect
    this.setData({
      isCollect
    })
  },
  //查看目录
  showleft(e){
    var that = this;
    wx.request({
      method: 'POST',
      data: { id: that.data.book_id },
      url: 'http://10.31.63.48:3000/getContent',
      success: function (res) {
        console.log(res.data);
        // var temp = [];
        // for(var i=0;i<res.data.length;i++){
        //   temp.push(res.data[i].title)
        // }
        that.setData({
          titles: res.data
        })

      },

    })
    
    this.setData({
      showleft:true
    })
  },
  //开始阅读
  handleRead(e){
    var that = this;
    wx.request({
      method: 'POST',
      data: { id: that.data.book_id },
      url: 'http://10.31.63.48:3000/getContent',
      success: function (res) {
        // console.log(res.data[0].content);
        var content = res.data[0].content;
        var title = res.data[0].title;
        var newid = res.data[0].id;
        wx.navigateTo({
          url: "/pages/content/index?content=" + content + "&title=" + title + "&id=" + newid + "&book_id=" + that.data.book_id,
        })
        

      },

    })
   
  },
  // 获取评论数据
  _getCommentData(book_id) {
    var that = this;
    wx.request({
      method: 'POST',
      data: { id: book_id },
      url: 'http://10.31.63.48:3000/getComment',
      success: function (res) {
        that.setData({
          commentList:res.data
        })
       console.log(res.data);
      },

    })
    
  },
  //跳转评论页面
  writeComment(e){
    wx.navigateTo({
      url: "/pages/writeComment/index?book_id=" + this.data.book_id,
    })
  },
  //预览封面
  preview(e){
    var that = this;
    wx.previewImage({
      urls:[that.data.intro.img]
    })
  }

  // onLoad:function(){
  //   let that = this;
  //   console.log(wx.getStorageSync("userInfo"));
  //   if (wx.getStorageSync("userInfo") != null) {//查找是否有登录
  //     that.setData({
  //       unLogin: false
  //     })
  //     // 评论需要登录
  //     that._getCommentData(this.data.book_id);
  //   } else {
  //     that.setData({
  //       unLogin: true
  //     })
  //   }
  // }
 
})