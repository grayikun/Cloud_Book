// pages/feedback/feedback.js
var util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectorItems: [],
    //文本域的内容
    textVal: "",
    // 是否知道信息属实，出现提交按钮
    yesOrNo: false,
    latitude:[],
    longitude:[],
    isSelect:[],
    img:[],
    uname:[]
  },
  onLoad:function(options){
    var that = this;
    const temp = [];
    wx.request({
      method: 'GET',
      url: 'http://10.31.63.48:3000/getNovel',
      success: function (res) {
        for(var i=0;i<res.data.length;i++){
          temp.push(res.data[i].book_name)
          that.setData({
            selectorItems:temp
          })
        }
        
      },

    })
    // 获取经纬度信息
    wx.getLocation({
      type:'wgs84',
      success: function(res) {
        // console.log(res);
        that.setData({
          latitude:res.latitude,
          longitude:res.longitude
        })
      },
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
  },
  // radioChange点击事件
  radioChange: function (e) {
    console.log(e.detail.value)
    if ("yes" == e.detail.value) {
      this.setData({
        yesOrNo: true
      })
    } else {
      this.setData({
        yesOrNo: false
      })
    }

  },
  itemChange: function (e) {
    let i = e.detail.value;
    let value = this.data.selectorItems[i];
    console.log(value);
    this.setData({
      isSelect: value
    })
  },
 
  //文本域输入事件
  handleTextInput(e) {
    this.setData({
      textVal: e.detail.value
    })
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
    //显示正在上传
    wx.showLoading({
      title: '正在上传中',
      mask: true
    });
    
    
    // 提交信息到数据库
    var TIME = util.formatTime(new Date());
    var that = this;
    wx.request({
      method: 'POST',
      data: { 
        book_name: that.data.isSelect,
        comm:that.data.textVal,
        time:TIME,
        img:that.data.img,
        uname:that.data.uname
       },
      url: 'http://10.31.63.48:3000/insertComm',
      success: function (res) {
        that.setData({
          selector:[],
          time:[],
          textVal:""
        })
        wx.navigateBack({
          delta: 1,
        })
      },

    })
    
  }


})