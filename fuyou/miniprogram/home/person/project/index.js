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
    userid:'',
    projects: [],
  },
  onLoad: function() {
    wx.cloud.callFunction({
      name: 'getprofile', // 获取用户信息  
      success: res => {   
        if (res.result.success) {  
          this.setData({  
            userid: res.result.data._id, // 获取用户ID  
            avatarUrl: res.result.data.avatarUrl // 获取用户头像
          }, () => {
            // 在 setData 完成后打印 userid
            console.log(this.data.userid);
            this.fetchProjects(); // 确保在获取用户ID后再获取项目
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

  fetchProjects: function() {
    let that = this;
    const db = wx.cloud.database(); // 初始化云数据库
    db.collection("projects").get()
      .then(res => {
        console.log(res);
        // 更新data中的projects数组
        this.setData({
          projects: res.data,
        }, () => {
          console.log('Projects after setData:', this.data.projects); // 输出更新后的项目数据
          console.log('UserID after fetching projects:', this.data.userid); // 再次输出用户ID
        });
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