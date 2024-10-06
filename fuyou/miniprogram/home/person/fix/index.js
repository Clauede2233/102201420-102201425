// 小程序端 index.js
Page({
  data: {
    avatarUrl: '/images/wear-goggles.svg', // 默认头像路径
    name: '', // 姓名
    major: '' // 专业
  },

  chooseAvatar: function() {
    const that = this;
    wx.chooseImage({
      count: 1, // 默认选择一张图片
      sourceType: ['album', 'camera'], // 可以从相册或相机选择
      success(res) {
        const tempFilePath = res.tempFilePaths[0];
        that.setData({
          avatarUrl: tempFilePath // 更新头像路径
        });
      }
    });
  },

  onNameInput: function(event) {
    this.setData({
      name: event.detail.value // 更新姓名
    });
  },

  onMajorInput: function(event) {
    this.setData({
      major: event.detail.value // 更新专业
    });
  },

  saveProfile: function() {
    const { name, major, avatarUrl } = this.data;
    if (!name || !major || !avatarUrl) {
      wx.showToast({
        title: '请填写完整的用户信息',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    // 调用云函数保存用户信息
    wx.cloud.callFunction({
      name: 'saveProfile',
      data: { name, major, avatarUrl },
      success: res => {
        if (res.result.success) {
          wx.showToast({
            title: `${res.result.message}`,
            icon: 'success',
            duration: 2000
          });
          setTimeout(() => {
            this.navigateToperson(); // 登录成功后跳转到主页
          }, 1000);
        } else {
          wx.showToast({
            title: `${res.result.message}`,
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: err => {
        wx.showToast({
          title: '调用云函数失败',
          icon: 'none',
          duration: 2000
        });
        console.error('云函数调用失败：', err);
      }
    });
  },
  navigateToperson: function() {
    wx.navigateTo({
      url: '/home/person/index' // 替换成您要跳转的页面路径
    });
  },
});