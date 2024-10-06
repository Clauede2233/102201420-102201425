Page({
  data: {
    account: '', // 账号
    oldPassword: '', // 旧密码
    newPassword: '', // 新密码
    confirmPassword: '' // 确认新密码
  },

  onUsernameInput: function(event) {
    this.setData({
      account: event.detail.value // 更新账号
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
    const { account, oldPassword, newPassword, confirmPassword } = this.data;

    // 简单的验证
    if (!account || !oldPassword || !newPassword || !confirmPassword) {
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
        account,
        oldPassword,
        newPassword,
        confirmPassword
      },
      success: function(res) {
        // 根据云函数返回的数据做出反应
        if (res.result && res.result.success) {
          console.log('密码更新成功', res);
          wx.showToast({
            title: '密码更新成功',
            icon: 'success'
          });
        } else {
          // 云函数返回了错误信息
          wx.showToast({
            title: res.result.message || '密码更新失败',
            icon: 'none'
          });
        }
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