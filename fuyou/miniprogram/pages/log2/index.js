Page({
  data: {
    inputValue1: '', // 第一个输入框的值
    inputValue2: ''  // 第二个输入框的值
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
  // 提交按钮的处理函数
  submit: function() {
    const { inputValue1, inputValue2 } = this.data;
    // 在这里可以处理输入值，例如发送到服务器
    console.log('第一个输入框的值:', inputValue1);
    console.log('第二个输入框的值:', inputValue2);
  },
  navigateToLink0: function() {
    wx.navigateTo({
      url: '/pages/log/index' // 替换成您要跳转的页面路径
    });
  },
  navigateToLink: function() {
    wx.navigateTo({
      url: '/pages/home/index' // 替换成您要跳转的页面路径
    });
  }
});