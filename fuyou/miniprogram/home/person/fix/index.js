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
    // 在这里处理保存逻辑，如上传到服务器或存储本地
    wx.showToast({
      title: '保存成功',
      icon: 'success'
    });
  }
});