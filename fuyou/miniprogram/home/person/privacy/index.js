Page({
  data: {
    real_name: '张三', // 用户姓名
    gender: '男', // 性别
    birthDate: '1990年1月1日', // 出生日期
    account: '102201420', // 账号
    phone: '18359375161', // 手机号
    signature: '活在当下，珍惜每一天' // 个性签名
  },
  navigateTofix0: function() {
    wx.navigateTo({
      url: '/home/person/privacy/fix0/index' // 替换为目标页面的路径
    });
  },
  navigateTofix1: function() {
    wx.navigateTo({
      url: '/home/person/privacy/fix1/index' // 替换为目标页面的路径
    });
  }
});