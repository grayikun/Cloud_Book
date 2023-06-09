// pages/writeComment/index.js
var QQMapWX = require("../../lib/qqmap-wx-jssdk1.1/qqmap-wx-jssdk.js");
var util = require("../../utils/util.js");

var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textVal: "",
    phone:[],
    address:[],
    time:[],
    img:[],
    uname:[],
    id:[]
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const book_id = options.book_id;
    wx.getSystemInfo({//获取系统api--->手机型号
      success: function(res) {
        console.log(res.model.split(" ")[0]);
        that.setData({
          phone: res.model.split(" ")[0],
          id:book_id
        })
      },
    })
    qqmapsdk = new QQMapWX({
      key:'IARBZ-VD3WG-IYQQR-QXYNK-4SI2F-V5B32'
    })
    qqmapsdk.reverseGeocoder({
      success:function(res){
        that.setData({
          address: res.result.address_component.city
        })
        console.log(res.result.address_component.city);
      }
    })
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({
          img: res.data.avatarUrl,
          uname: res.data.nickName
        })
        
       
      },
    })
    var TIME = util.formatTime(new Date());
    that.setData({
      time: TIME
    })
    // 获取经纬度信息
    // wx.getLocation({
    //   type:'wgs84',
    //   success: function(res) {
    //     console.log(res)
    //   },
    // })
    
  },
  // handleChooseAddress(e){
  //   wx.chooseAddress({
  //     success: function (res) {
  //       const address = res;
  //       console.log(res);
  //       wx.setStorageSync("address", address);
  //     },
  //   })
  // },
  handleTextInput(e) {
    this.setData({
      textVal: e.detail.value
    })
    console.log(e.detail.value)
  },
  //提交按钮的点击事件
  handleFormSubmit() {
    const { textVal, chooseImgs } = this.data;
    if (!textVal.trim()) {
      //不合法
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true
      });
      return;
    }
    //显示正在等待的图片
    wx.showLoading({
      title: '正在上传中',
      mask: true
    });
    // textVal: "",
    // phone:[],
    // address:[],
    // time:[],
    // img:[],
    // uname:[],
    // id:[]
    console.log(this.data.uname);
    wx.request({
      method: 'POST',
      data: { 
        book_id:this.data.id,
        comment: this.data.textVal,
        phone: this.data.phone,
        ulocat: this.data.address,
        create_time: this.data.time,
        uavatar: this.data.img,
        uname: this.data.uname,
        },
      url: 'http://10.31.63.48:3000/write',
      success: function (res) {
        console.log("成功发表评论");
        wx.navigateBack({
          delta: 1
        })
      },

    })

    // if (chooseImgs.length != 0) {
    //   chooseImgs.forEach((v, i) => {
    //     wx.uploadFile({
    //       url: 'https://imgtu.com/',
    //       filePath: v,
    //       name: 'file',
    //       formData: {},
    //       success: (result) => {
    //         console.log(result);

    //         // let url=JSON.parse(result.data);
    //         // this.UpLoadImgs.push(url);
    //         if (i === chooseImgs.length - 1) {

    //           wx.hideLoading();
    //           console.log("把反馈上传到后台服务器");
    //           this.setData({
    //             textVal: '',
    //             chooseImgs: []
    //           })
    //           //返回上一个页面
    //           wx.navigateBack({
    //             delta: 1
    //           })
    //         }
    //       }
    //     })
    //   })
    // } else {
    //   wx.hideLoading();
    //   console.log("只提交了文本");
    //   wx.navigateBack({
    //     delta: 1
    //   })
    // }
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