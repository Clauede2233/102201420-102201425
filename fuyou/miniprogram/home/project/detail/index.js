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
    project: {}
  },

  onLoad: function(options) {
    const projectId = options.id;
    console.log(options.id)
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
  JoinProject: function() {
    // 这里可以添加申请逻辑，例如调用云函数或API
    wx.cloud.callFunction({
      name: 'joinproject_id', // 云函数名
      data: { /* 可以传递一些数据 */ },
      success: res => {
        // 处理成功后的逻辑，比如更新outputText
        this.setData({
          outputText: '申请已提交！'
        });
        wx.showToast({
          title: '申请已提交',
          icon: 'success',
          duration: 2000
        });
      },
      fail: err => {
        console.error('申请失败:', err);
        wx.showToast({
          title: '申请失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },
  ChatProject: function() {
    wx.navigateTo({
      url: '/home/project/chat/index?projectId=' + projectId// 替换成您要跳转的页面路径
    });
  },
});
