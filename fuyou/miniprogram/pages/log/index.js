Page({
  data: {
    inputValue1: '', // 用户名
    inputValue2: '', // 密码
  },

  // 处理第一个输入框的输入
  onInput1: function(event) {
    this.setData({
      inputValue1: event.detail.value
    });
  },

  // 处理第二个输入框的输入
  onInput2: function(event) {
    this.setData({
      inputValue2: event.detail.value
    });
  },

  // 登录按钮的处理函数
  login: function() {
    const { inputValue1, inputValue2 } = this.data;
    wx.cloud.callFunction({
      name: 'log',
      data: {
        username: inputValue1,
        password: inputValue2,
        role: '学生'  // 发送角色参数
      },
      success: res => {
        if (res.result && res.result.success) {
          console.log("登录成功，用户ID:", res.result.userId);
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000
          });
          setTimeout(() => {
            this.navigateToHome(); // 登录成功后跳转到主页
          }, 2000);
        } else {
          wx.showToast({
            title: res.result.message || '登录失败',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: err => {
        let errorMessage = '登录失败';
        if (err.errMsg) {
          errorMessage += `: ${err.errMsg}`;
        }
        console.error('登录失败:', err);
        wx.showToast({
          title: errorMessage,
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  // 页面跳转到主页
  navigateToHome: function() {
    wx.navigateTo({
      url: '/pages/home/index' // 替换成您要跳转的页面路径
    });
  },

  // 页面跳转到其他页面
  navigateToLink0: function() {
    wx.navigateTo({
      url: '/pages/log2/index' // 替换成您要跳转的页面路径
    });
  }
});