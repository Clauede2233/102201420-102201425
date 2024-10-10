const db = wx.cloud.database();

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
    userId:'',
    account:'w',
    avatarUrl:'',
    project: {}
  },

  onLoad: function(options) {
    const projectId = options.id;
    console.log(options.id);
    this.fetchProjectDetail(projectId);
  },

  fetchProjectDetail: function(projectId) {
    db.collection('projects').doc(projectId).get().then(res => {
      this.setData({
        project: res.data
      });
    }).catch(err => {
      console.error('获取项目详情失败:', err);
      wx.showToast({
        title: '加载项目详情失败',
        icon: 'none'
      });
    });
  },

  Joinlist: function(event) {
    const projectId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/home/person/project/joinlist/index?projectId=' + projectId // 替换为目标页面的路径
    });
  },
  ChatProject: function(event) {
    const projectId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/home/project/chat/index?projectId=' + projectId// 替换成您要跳转的页面路径
    });
  },
});
