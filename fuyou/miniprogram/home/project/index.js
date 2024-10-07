App({
  onLaunch: function () {
    wx.cloud.init({
      env: 'envy-1ghaz9gk4b8c5b88', // 替换为你的云环境 ID
      traceUser: true,
    });
  }
});
Page({
  data: {
    projects: []
  },
  onLoad: function() {
    this.fetchProjects(); // 页面加载时获取项目
  },
  
  fetchProjects: function() {
    let that = this;
    const db = wx.cloud.database(); // 初始化云数据库
    db.collection("projects").get()
      .then(res => {
        console.log(res)
        // 更新data中的projects数组
        this.setData({
          projects: res.data
        });
        console.log('获取的项目数据:', res.data); // 打印获取的数据
      })
      .catch(err => {
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
      url: '/home/project/detail/index?id='+projectId
    });
  },
  ProjectDetail: function(event) {
    wx.navigateTo({
      url: '/home/project/detail/index'
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