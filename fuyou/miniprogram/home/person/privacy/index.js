Page({
  data: {
    real_name: '张三', // 用户姓名
    gender: '男', // 性别
    birthDate: '1990年1月1日', // 出生日期
    account: '102201420', // 账号
    phone: '18359375161', // 手机号
    signature: '活在当下，珍惜每一天' // 个性签名
  },
  onLoad: function() {  
    // 调用云函数  
    wx.cloud.callFunction({  
      name: 'getprofile', // 替换为你的云函数名称  
      success: res => {  
        // 假设云函数返回的数据结构为 { success: true, data: { name: '...' } }  
        if (res.result.success) {  
          this.setData({  
            real_name: res.result.data.name, // 将云函数返回的name数据设置到userName中  
            gender: res.result.data.gender,
            birthDate: res.result.data.birthday,
            account: res.result.data.account,
            phone: res.result.data.phone,
            signature:res.result.data.signature
          });  
        } else {  
          console.error('获取用户信息失败:', res.result.message);  
        }  
      },  
      fail: err => {  
        console.error('调用云函数失败:', err);  
      }  
    });  
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