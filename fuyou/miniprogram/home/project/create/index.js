Page({
  data: {
    projectName: '',     //项目名字
    projectSimple:'',   //项目简介
    projectDescription: '',//项目（详细)描述
    members: '',        //项目创建者
    limit: 5,           //项目初始人数限制
    projectCreated: false,
    projectId: '',
  },

  onProjectNameInput: function(e) {
    this.setData({
      projectName: e.detail.value
    });
  },
  onLimitInput: function(e) {
    const limit = parseInt(e.detail.value) || 0; // 确保是整数
    this.setData({
      limit
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

  onMembersInput: function(e) {
    this.setData({
      members: e.detail.value
    });
  },

  createProject: function() {
    const { projectName, projectDescription, members } = this.data;

    if (!projectName || !projectDescription || !members) {
      wx.showToast({
        title: '请填写所有字段',
        icon: 'none'
      });
      return;
    }

    // 调用云函数来创建项目
    wx.cloud.callFunction({
      name: 'createProject', // 云函数名称
      data: {
        projectName,
        projectDescription,
        members: members.split(',') // 将成员ID转换为数组
      },
      success: (res) => {
        console.log('项目创建成功:', res);
        if (res.result.success) {
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
  }
});