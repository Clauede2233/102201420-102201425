Page({
  data: {
    avatarUrl: '/images/wear-goggles.svg', // 默认头像路径
    name: '昵称', // 昵称
    major: '专业'
  },

  onNameInput: function(event) {
    this.setData({
      name: event.detail.value // 更新姓名
    });
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
  navigateToperson0: function() {
    wx.navigateTo({
      url: '/home/person/fix/index' // 替换为目标页面的路径
    });
  },
  navigateToperson1: function() {
    wx.navigateTo({
      url: '/home/person/privacy/index' // 替换为目标页面的路径
    });
  },
  navigateToPage1: function() {
    wx.navigateTo({
      url: '/home/community/index' // 替换为目标页面的路径
    });
  },
  navigateToPage2: function() {
    wx.navigateTo({
      url: '/home/project/index' // 替换为目标页面的路径
    });
  },
  navigateToPage3: function() {
    wx.navigateTo({
      url: '/home/mentor/index' // 替换为目标页面的路径
    });
  },
  navigateToPage4: function() {
    wx.navigateTo({
      url: '/home/person/index' // 替换为目标页面的路径
    });
  }
})