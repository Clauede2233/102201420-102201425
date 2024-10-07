const db = wx.cloud.database();

Page({
  data: {
    project: {}
  },

  onLoad: function() {
    this.fetchProjects(); // 页面加载时获取项目
  },

  fetchProjects: function() {
    const db = wx.cloud.database(); // 初始化云数据库
    db.collection('projects').get()
      .then(res => {
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
  JoinProject: function() {
    // 这里可以添加申请逻辑，例如调用云函数或API
    wx.cloud.callFunction({
      name: 'JoinProject', // 云函数名
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
      url: '/home/project/chat/index' // 替换成您要跳转的页面路径
    });
  },
});
