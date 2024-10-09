Page({
  data: {
    projectName: '',     // 项目名字
    projectSimple: '',   // 项目简介
    projectDescription: '', // 项目（详细)描述
    members: '',        // 项目参与者
    membersid: '',
    userid: '',         //创建者id
    userName:'',        //创建者名字
    limit: 5,           // 项目初始人数限制
    projectCreated: false,
    projectId: '',
  },

  onProjectNameInput: function(e) {
    this.setData({
      projectName: e.detail.value
    });
  },
  onProjectSimpleInput: function(e) {
    this.setData({
      projectSimple: e.detail.value
    });
  },
  onProjectDescriptionInput: function(e) {
    this.setData({
      projectDescription: e.detail.value
    });
  },

  onLimitInput: function(e) {
    const limit = parseInt(e.detail.value) || 0; // 确保是整数
    this.setData({
      limit
    });
  },

  createProject: function() {
    const { projectName, projectSimple, projectDescription,limit } = this.data;

    if (!projectName || !projectDescription) {
      wx.showToast({
        title: '请填写所有字段',
        icon: 'none'
      });
      return;
    };
    wx.cloud.callFunction({
      name: 'getprofile', // 替换为你的云函数名称
      success: res => {
        // 假设云函数返回的数据结构为 { success: true, data: { name: '...' } }
        if (res.result.success) {
          // 调用云函数来创建项目
          wx.cloud.callFunction({
            name: 'createProject', // 云函数名称
            data: {
              projectName,
              projectSimple,
              projectDescription,
              members:res.result.data.name.split(','), // 使用获取的用户账号
              membersid:res.result.data._id.split(','),// 使用获取的用户id
              name:res.result.data.name.split(','),
              limit
            },
            success: (res) => {
              console.log('项目创建成功:', res);
              if (res.result.success) {
                wx.showToast({
                  title: '创建成功',
                  icon: 'success',
                  duration: 1000
                });
                setTimeout(() => {
                  this.navigateToProject(); // 登录成功后跳转到主页
                }, 1000);
                this.setData({
                  projectCreated: true,
                  projectId: res.result.projectId // 假设云函数返回项目ID
                });
              } else {
                wx.showToast({
                  title: res.result.message,
                  icon: 'none'
                });
              }
            },
            fail: (err) => {
              console.error('调用云函数失败:', err);
              wx.showToast({
                title: '创建项目失败',
                icon: 'none'
              });
            }
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
  navigateToProject: function() {
    wx.navigateTo({
      url: '/home/project/index' // 替换成您要跳转的页面路径
    });
  },
});