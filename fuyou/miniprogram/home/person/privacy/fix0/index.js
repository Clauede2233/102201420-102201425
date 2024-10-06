Page({
  data: {
    name: '',
    gender: '请选择',
    genderOptions: ['男', '女'],
    birthday: '请选择',
    account: '',
    phone: '',
    signature: ''
  },
  onNameInput(event) {
    this.setData({ name: event.detail.value });
  },

  onGenderChange(event) {
    this.setData({ gender: this.data.genderOptions[event.detail.value] });
  },

  onBirthdayChange(event) {
    this.setData({ birthday: event.detail.value });
  },

  onAccountInput(event) {
    this.setData({ account: event.detail.value });
  },

  onPhoneInput(event) {
    this.setData({ phone: event.detail.value });
  },

  onSignatureInput(event) {
    this.setData({ signature: event.detail.value });
  },

  onSubmit() {
    const { name, gender, birthday, account, phone, signature } = this.data;
    // 数据验证（根据需要添加）
    if (!name || !gender || !birthday || !account || !phone || !signature) {
      wx.showToast({
        title: '请填写所有字段',
        icon: 'none'
      });
      return;
    }

    // 调用云函数保存用户信息
    wx.cloud.callFunction({
      name: 'saveUserInfo',
      data: {
        name,
        gender,
        birthday,
        account,
        phone,
        signature
      },
      success: function(res) {
        console.log('用户信息保存成功', res);
        wx.showToast({
          title: '提交成功',
          icon: 'success',
        });
        setTimeout(function() {  
          wx.navigateTo({  
            url: '/home/person/privacy/index' // 替换成您要跳转的页面路径  
          });  
        }, 1000);
      },
      fail: function(err) {
        console.error('保存失败', err);
        wx.showToast({
          title: '提交失败',
          icon: 'none'
        });
      }
    });
  },
});