Page({
  data: {
    username: '', // 账号
    oldPassword: '', // 旧密码
    newPassword: '', // 新密码
    confirmPassword: '' // 确认新密码
  },

  onUsernameInput: function(event) {
    this.setData({
      username: event.detail.value // 更新账号
    });
  },

  onOldPasswordInput: function(event) {
    this.setData({
      oldPassword: event.detail.value // 更新旧密码
    });
  },

  onNewPasswordInput: function(event) {
    this.setData({
      newPassword: event.detail.value // 更新新密码
    });
  },

  onConfirmPasswordInput: function(event) {
    this.setData({
      confirmPassword: event.detail.value // 更新确认新密码
    });
  },

  updatePassword: function() {
    const { username, oldPassword, newPassword, confirmPassword } = this.data;

    // 简单的验证
    if (!username || !oldPassword || !newPassword || !confirmPassword) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      wx.showToast({
        title: '新密码与确认密码不一致',
        icon: 'none'
      });
      return;
    }

    // 调用云函数更新密码
    wx.cloud.callFunction({
      name: 'updatePassword', // 云函数名称
      data: {
        username,
        oldPassword,
        newPassword,
        confirmPassword
      },
      success: function(res) {
        console.log('密码更新成功', res);
        wx.showToast({
          title: '密码更新成功',
          icon: 'success'
        });
      },
      fail: function(err) {
        console.error('密码更新失败', err);
        wx.showToast({
          title: '密码更新失败',
          icon: 'none'
        });
      }
    });
  }
});