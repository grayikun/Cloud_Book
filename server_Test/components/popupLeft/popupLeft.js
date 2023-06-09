Component({
  properties: {
    show: Boolean,
    titles: Object
  },
  data: {
    // isRead = false
  },
  attached: function (e) { },
  methods: {
    close_overlay() {
      this.setData({
        show: false
      })
    },
    pop_left() {
      this.setData({
        show: true
      })
    },
    // if_readed(){
    //   let isRead = false;
    //   let readed = wx.getStorageSync("readed") || [];
    //   let index = readed.findIndex(v => v.content === titles);
    //   if (index !== -1) {
    //     //能找到，已经收藏过了，在数组中删除
    //     readed.splice(index, 1);
    //     isRead = false;
    //     wx.showToast({
    //       title: '取消成功',
    //       icon: 'success',
    //       mask: true
    //     });
    //   } else {
    //     collect.push(this.Book);
    //     isCollect = true;
    //     wx.showToast({
    //       title: '收藏成功',
    //       icon: 'success',
    //       mask: true
    //     });
    //   }
    //   // 4 把数组存入到缓存中
    //   wx.setStorageSync("collect", collect);
    //   // 5 修改data中的属性  isCollect
    //   this.setData({
    //     isCollect
    //   })
    // }
  },
})
