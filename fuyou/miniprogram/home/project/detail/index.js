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

  JoinProject: function(event) {
    const projectId = event.currentTarget.dataset.id;
    
    // 调用云函数以获取用户信息
    wx.cloud.callFunction({
      name: 'getprofile', // 替换为你的云函数名称  
      success: res => {  
        // 假设云函数返回的数据结构为 { success: true, data: { account: '...' } }  
        if (res.result.success) {  
          this.setData({  
            account: res.result.data.account,
          });  
          console.log(this.data.account)
          // 在获取到 account 之后，再调用 joinproject_id 云函数
          this.applyToJoinProject(projectId);
        } else {  
          console.error('获取用户信息失败:', res.result.message);  
        }  
      },  
      fail: err => {  
        console.error('调用云函数失败:', err);  
      } 
    });
  },
  applyToJoinProject: function(projectId) {
    const { account } = this.data; // 获取当前的 account 值
    console.log(this.data.account);
    console.log(projectId);
    wx.cloud.callFunction({
      name: 'joinprojectrequest_id', // 云函数名
      data: { projectId, account },
      success: res => {
        // 处理成功后的逻辑，比如更新 outputText
        // 假设云函数返回的数据结构是 { success: true/false, message: '描述信息' }
        const { success, message } = res.result;
        if (success) {
          // 申请成功的逻辑
          this.setData({
            outputText: '申请已提交！'
          });
          wx.showToast({
            title: '申请成功',
            icon: 'success',
            duration: 2000
          });
        } else {
          // 申请失败的逻辑，但云函数给出了具体原因
          console.error('申请失败:', message);
          wx.showToast({
            title: message || '申请失败',
            icon: 'none',
            duration: 2000
          });
        }
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
  ChatProject: function(event) {
    const projectId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/home/project/chat/index?projectId=' + projectId// 替换成您要跳转的页面路径
    });
  },
});
