Page({
  data: {
    username: '', // 账号
    oldPassword: '', // 旧密码
    newPassword: '', // 新密码
    confirmPassword: '', // 确认新密码
    phone: '', // 手机号
    verificationCode: '' // 验证码
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


  updateAccount: function() {
    const { username, oldPassword, newPassword, confirmPassword } = this.data;

    // 简单的验证
    if (!username || !oldPassword || !newPassword || !confirmPassword ) {
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

    // 此处可以添加更新逻辑，如调用 API 更新用户信息
    wx.showToast({
      title: '信息更新成功',
      icon: 'success'
    });

    // 清空输入框
    this.setData({
      username: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  }
});