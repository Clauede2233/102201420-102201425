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
    // 在这里可以进行数据的验证和提交
    console.log('提交数据:', { name, gender, birthday, account, phone, signature });
    wx.showToast({
      title: '提交成功',
      icon: 'success'
    });
  }
});