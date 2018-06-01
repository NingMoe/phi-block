// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [],

    icons: []
  },
  add: function () {

    wx.navigateTo({
      url: '../addAddress/addAddress',
    })
  },
  edit: function (e) {
    var _this = this;

    wx.navigateTo({
      url: '../editAddress/editAddress?address=' + JSON.stringify(_this.data.address[e.currentTarget.dataset.index]),
    })
  },
  deletea:function(){
    wx.navigateBack({
      delta:1
    })
  },
  // 删除操作
  submit_delete: function () {
    var id_arr = [];
    var _this = this;
    for (let i = 0; i < this.data.icons.length; i++) {
      if (this.data.icons[i].isSelect) {
        id_arr.push(parseInt(this.data.address[i].address_id));
      }
    }
    if (id_arr.length == 0) {
      wx.showToast({
        title: '未选择',
        icon: 'none'
      })
      return;
    } else {
      wx.showLoading({
        title: '删除中'
      })
      wx.request({
        url: getApp().globalData.baseUrl + 'address/delete',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        data: {
          user_id: wx.getStorageSync('info').user_id,
          address_id: JSON.stringify(id_arr)
        },
        success: function (res) {
          if (res.data.status) {
            wx.hideLoading();
          
            _this.getAddress();
        
          } else {
            wx.hideLoading();
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
          }
        }
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  getAddress: function () {
    var _this = this;
    wx.showLoading({
      title: '加载数据...',
    })
    wx.request({
      url: getApp().globalData.baseUrl + 'address/list',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data: {
        user_id: wx.getStorageSync('info').user_id
      },
      success: function (res) {
        if (!res.data.status) {
          wx.hideLoading();
          return;
        }
        var icons = [];
        console.log(res.data.data.addresses);
        for (let i = 0; i < res.data.data.addresses.length; i++) {
          icons.push({ isSelect: false })
        }
        _this.setData({
          address: res.data.data.addresses,
          icons: icons
        })
        wx.hideLoading();
      }
    })
  },
  onShow: function () {
    this.getAddress();
  },
  select_delete: function (e) {
    console.log(e);
    var arr = this.data.icons;
    for (let i = 0; i < this.data.icons.length;i++){
      if(i != e.currentTarget.dataset.index){
        arr[i].isSelect = false;
      }else{
        arr[i].isSelect = !arr[i].isSelect;
      }
      
    }
    console.log(arr);
    this.setData({
      icons: arr
    })
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