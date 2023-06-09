// index.js
// 获取应用实例
const app = getApp()

// Page({
//   data: {
//     text:[],
//     book_id:[],
//     image:[],
//     swiperList:[]
//   },
//   onLoad() {
//     console.log(wx.getSystemInfoSync().windowWidth);
//     var that= this;
//     wx.request({
//       method: 'GET',
//       url: 'http://10.31.63.48:3000/getNovel',
//       success:function(res){
//         console.log(res.data);
//         console.log(res.data[0].img)
//         that.setData({
//           text:res.data[0].book_name,
//           book_id:res.data[0].book_id,
//           image:res.data[0].img
//         })
//       },
    
      
//     }),
//     this.getThree();
      
//   },
//   getThree(){
//     var that = this;
//     wx.request({
//       method: 'GET',
//       url: 'http://10.31.63.48:3000/getThree',
//       success: function (res) {
//         console.log(res.data);
//         console.log(res.data[0].img)
//         that.setData({
//           swiperList:res.data
//         })
//       },

//     })
//   }
// })
// import {
//   BookModel
// } from '../../models/book.js'

// // 创建图书 model
// const bookModel = new BookModel()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookList: [], // 书籍列表数组
    indicatorDots: false, // 是否显示轮播指示点
    autoplay: false, // 是否自动播放轮播
    interval: 5000, // 轮播间隔
    duration: 1000, // 轮播播放延迟
    circular: true, // 是否采用衔接滑动
    sideMargin: '100rpx', // 幻灯片前后边距
    showLoading: true // 是否显示loading态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      method: 'GET',
      url: 'http://10.31.63.48:3000/getThree',
      success: function (res) {
        console.log(res.data);
        console.log(res.data[0].img)
        that.setData({
          bookList: res.data,
          showLoading: false
        })
      },

    })
    
  },
  goDetail(e){
    const book_id = e.currentTarget.dataset.id;
    wx:wx.navigateTo({
      url: "/pages/introduce/index?book_id='"+book_id+"'",
    })
  }
})