Page({
  data: {
    avatarUrl: '/images/wear-goggles.svg', // 默认头像路径
    userName: '昵称', // 昵称
    major: '专业'
  },

  onLoad: function() {  
    // 调用云函数  
    wx.cloud.callFunction({  
      name: 'getprofile', // 替换为你的云函数名称  
      success: res => {  
        // 假设云函数返回的数据结构为 { success: true, data: { name: '...' } }  
        if (res.result.success) {  
          this.setData({  
            userName: res.result.data.name, // 将云函数返回的name数据设置到userName中  
            major: res.result.data.major,
            avatarUrl:res.result.data.avatarUrl,
          });  
        } else {  
          console.error('获取用户信息失败:', res.result.message);  
        }  
      },  
      fail: err => {  
        console.error('调用云函数失败:', err);  
      }  
    });  
    this.fetchProjects();
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
  navigateToperson3: function() {
    wx.navigateTo({
      url: '/home/person/project/index' // 替换为目标页面的路径
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