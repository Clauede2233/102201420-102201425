Page({
  data: {
    inputValue1: '', // 用户名
    inputValue2: '', // 密码
    selectedID: '', // 选中的身份
    IDOptions: ['学生', '导师'], // 身份选项
  },

  onInput1: function(event) {
    this.setData({
      inputValue1: event.detail.value
    });
  },

  onInput2: function(event) {
    this.setData({
      inputValue2: event.detail.value
    });
  },

  onIDChange: function(event) {
    const index = event.detail.value;
    if (index >= 0 && index < this.data.IDOptions.length) {
      this.setData({
        selectedID: this.data.IDOptions[index]
      });
      
    } else {
      console.error('Invalid index:', index);
      wx.showToast({
        title: '无效的选择',
        icon: 'none',
        duration: 2000
      });
    }
  },

  // 处理注册逻辑
  register: function() {
    const { inputValue1, inputValue2, selectedID } = this.data;
    wx.cloud.callFunction({
      name: 'register',
      data: {
        username: inputValue1,
        password: inputValue2,
        role: selectedID
      },
      success: res => {
        // 利用云函数返回的信息来判断注册是否成功
        if (res.result && res.result.success) {
          console.log("注册成功", res);
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            duration: 2000
          });
          setTimeout(() => {
            this.navigateToLink(); // 注册成功后跳转，设置延迟以显示提示
          }, 2000);
        } else {
          // 云函数返回了失败信息
          wx.showToast({
            title:  res.result.message ||'注册失败',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: err => {
        let errorMessage = '注册失败';
        if (err.errMsg) {
          errorMessage += `: ${err.errMsg}`;
        }
        console.error('注册失败:', err);
        wx.showToast({
          title: errorMessage,
          icon: 'none',
          duration: 2000
        });
      }
    });
  },
  // 页面跳转
  navigateToLink: function() {
    wx.navigateTo({
      url: '/pages/home/index' // 替换成您要跳转的页面路径
    });
  }
});