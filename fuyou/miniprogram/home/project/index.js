const db = wx.cloud.database();
Page({
  data: {
    projects: []
  },

  onLoad: function() {
    this.fetchProjects();
  },

  fetchProjects: function() {
    db.collection('projects').get().then(res => {
      this.setData({
        projects: res.data
      });
    }).catch(err => {
      console.error('获取项目失败:', err);
      wx.showToast({
        title: '加载项目失败',
        icon: 'none'
      });
    });
  },

  viewProjectDetail: function(event) {
    const projectId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/projectDetail/projectDetail?id=${projectId}`
    });
  },
  navigateTocreate: function() {
    wx.navigateTo({
      url: '/home/project/create/index' // 替换为目标页面的路径
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