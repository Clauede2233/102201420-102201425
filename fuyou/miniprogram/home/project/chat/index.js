<<<<<<< HEAD
const app = getApp();
const db = wx.cloud.database();

=======
const app = getApp()
const db = wx.cloud.database()
>>>>>>> 4796b1e21e5a12041e0ea548d1b6535bae959289
Page({
  data: {
<<<<<<< HEAD
    mess: '',
    content: [], // 聊天信息
    mineAvatorSrc: '/images/user_male.jpg',
    himAvatorSrc: '/images/user_female.jpg',
    projectId: '', // 存储项目 _id
    toBottom: '',
  },
  onLoad: function (options) {
    // 从 onLoad 的 options 参数中获取 _id
    const projectId = options.projectId;
    if (projectId) {
      this.setData({
        projectId: projectId
      });
      this.queryChat(projectId);
    } else {
      console.error("未接收到项目ID");
      wx.showToast({
        title: '错误：未接收到项目ID',
        icon: 'none',
      });
    }
  },
  // 获取格式化的时间 yyyy-mm-dd-hh:mm-ss
  getFormatTime() {
    let date = new Date();
    let ymd = date.toISOString().substring(0, 10); // 年-月-日
    let hms = date.toTimeString().substring(0, 8); // 小时-分钟-秒钟
    return ymd + " " + hms; // 拼接
  },

  // “发送”消息
  sendMess() {
=======
    mess : '',
    content : [],//聊天信息
    mineAvatorSrc : '/images/user_male.jpg',
    himAvatorSrc : '/images/user_female.jpg',
	},
  //获取格式化的时间 yyyy-mm-dd-hh:mm-ss
	getFormatTime(){
		let date = new Date();
		let ymd = date.toISOString().substring(0,10);//年-月-日
		let hms = date.toTimeString().substring(0,8);//小时-分钟-秒钟
		console.log(ymd + "-" + hms);
		return ymd + "-" + hms;//拼接
	},
 
  //“发送”
  sendMess(){
>>>>>>> 4796b1e21e5a12041e0ea548d1b6535bae959289
    let that = this;
    let mess = that.data.mess;
    let date = that.getFormatTime();

    wx.showLoading({
      title: '发送中...',
      mask: true,
    });

    wx.cloud.callFunction({
      name: 'sendChatMessage',
      data: {
        projectId,
        mess: mess,
        date: date
      },
      success: function (res) {
        that.setData({
          mess: '',
          content: that.data.content.concat(res.result.data)
        });
        that.setData({
          toBottom: `item${that.data.content.length - 1}`,
        });
      },
      fail: function (err) {
        console.error("发送失败！", err);
        wx.showToast({
          title: '发送失败',
          icon: 'none',
        });
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },

  // 查询聊天
  queryChat() {
    let that = this;
    wx.showLoading({
      title: '查询中...',
      mask: true,
    });

    wx.cloud.callFunction({
      name: 'queryChat',
      data: { projectId: that.data.projectId },
      success: function (res) {
        that.setData({
          content: res.result.data.chatContent
        });
        that.setData({
          toBottom: `item${that.data.content.length - 1}`,
        });
      },
      fail: function (err) {
        console.error("查询失败！", err);
        wx.showToast({
          title: '查询失败',
          icon: 'none',
        });
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },

  // 监听页面触摸滚动
  onScroll: function (e) {
    this.setData({
      toBottom: '',
    });
  },

  // 数据库的监听器
  dbWatcher() {
    let that = this;
    db.collection('chatRecords').where({
      _id: this.data.projectId
    }).watch({
      onChange: function (res) {
        if (res.docChanges) {
          that.setData({
            content: res.docChanges[0].doc.chatContent
          });
          that.setData({
            toBottom: `item${that.data.content.length - 1}`,
          });
        }
      },
      onError: function (err) {
        console.error(err);
      }
    });
  },

  onReady: function () {
    this.dbWatcher();
  }
});