const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    applicants: [], // 申请者列表
    profiles:[],
    message: '',
    projectId:'',
  },

  onLoad: function (options) {
    const projectId = options.projectId;
    this.fetchApplicants(projectId); // 加载申请者列表
    this.getUserProfiles(projectId);
  },

  fetchApplicants: function (projectId) {
    // 获取申请者数据的逻辑，假设从云函数获取
    if (projectId) {
      this.setData({
        projectId: projectId
      });
      this.queryapplicants(projectId);
    } else {
      console.error("未接收到项目ID");
      wx.showToast({
        title: '错误：未接收到项目ID',
        icon: 'none',
      });
    }
    console.log(this.data.projectId);
    setTimeout(() => {
      this.setData({
        isDataLoaded: true // 数据加载完成
      });
    },300);
  },
  queryapplicants() {
    let that = this;
    wx.showLoading({
      title: '加载中...',
    });
    console.log(this.data.projectId);
    db.collection('projects').where({
      _id: that.data.projectId
    }).get({
      success: function(res) {
        console.log("查询成功！", res);
        if (res.data.length > 0) {
          that.setData({
            applicants: res.data[0].applicants, // 获取申请用户列表
          });
        console.log("申请用户列表:", res.data[0].applicants); // 输出申请用户列表
          // 调用获取用户个人信息的方法
          that.getUserProfiles();
        } else {
          that.setData({
            applicants: []
          });
        }
        console.log("申请用户列表:", that.data.applicants);
      },
      fail: function(err) {
        console.log("查询失败！", err);
      },
      complete: function() {
        wx.hideLoading();
      }
    });
  },
  
  // 获取用户个人信息
  getUserProfiles() {
    const db = wx.cloud.database(); // 初始化数据库引用
    const promises = this.data.applicants.map(account => {
      return db.collection('users') // 假设用户信息存储在 'user' 集合中
        .where({ account: account }) // 根据账号进行查询
        .get() // 获取数据
        .then(res => {
          if (res.data.length > 0) { // 确保找到了用户信息
            return res.data[0]; // 返回第一个匹配的用户数据
          } else {
            console.error('未找到用户信息:', account);
            return null; // 如果未找到用户，返回null
          }
        })
        .catch(err => {
          console.error('数据库查询失败:', err);
          return null; // 如果查询失败，返回null
        });
    });
  
    // 等待所有的查询完成
    Promise.all(promises).then(results => {
      // 过滤掉失败的结果
      const validProfiles = results.filter(profile => profile !== null);
      this.setData({
        profiles: validProfiles // 设置获取到的个人信息
      });
    });
  },


  onReject: function(event) {
    
    const account = event.currentTarget.dataset.account; // 获取账号信息
    const projectId = this.data.projectId; // 替换为实际的项目ID
    console.log('Project ID:', projectId);
    console.log('Account:', account);
    wx.cloud.callFunction({
      name: 'reject', // 云函数名称
      data: {
        _id: projectId, // 替换为实际的项目ID
        account: account // 使用从按钮获取的账号信息
      },
      success: res => {
        if (res.result.success) {
          wx.showToast({
            title: '成功拒绝申请',
            icon: 'success'
          });
          console.log('成功拒绝申请:', res.result.message);
        } else {
          wx.showToast({
            title: '拒绝失败',
            icon: 'none'
          });
          console.error('拒绝申请失败:', res.result.message);
        }
      },
      fail: err => {
        wx.showToast({
          title: '调用失败',
          icon: 'none'
        });
        console.error('调用云函数失败:', err);
      }
    });
  }
});