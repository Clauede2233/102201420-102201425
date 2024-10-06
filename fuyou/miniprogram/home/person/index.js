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