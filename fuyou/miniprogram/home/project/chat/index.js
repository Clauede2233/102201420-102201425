const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDataLoaded: false,
    userid:'',
    mess: '',
    avatarUrl:'/images/user_male.jpg',
    content: [], // 聊天信息
    mineAvatorSrc: '/images/user_male.jpg',
    himAvatorSrc: '/images/user_female.jpg',
    projectId: '' // 用于存储传来的projectId
  },
  onLoad: function (options) {
    // 从 onLoad 的 options 参数中获取 _id
    const projectId = options.projectId;
    wx.cloud.callFunction({
      name: 'getprofile', //获取用户信息  
      success: res => {   
        if (res.result.success) {  
          this.setData({  
            userid: res.result.data._id, //获取用户ID  
            avatarUrl:res.result.data.avatarUrl,//获取用户头像
          });  
          console.log(this.data.userid)
        } else {  
          console.error('获取用户信息失败:', res.result.message);  
        }  
      },  
      fail: err => {  
        console.error('调用云函数失败:', err);  
      } 
    });
    console.log(this.data.projectId)
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
    console.log(this.data.projectId);
    setTimeout(() => {
      this.setData({
        isDataLoaded: true // 数据加载完成
      });
    },300);
  },
  // 获取格式化的时间 yyyy-mm-dd hh:mm:ss
  getFormatTime() {
    let date = new Date();
    let ymd = date.toISOString().substring(0, 10); // 年-月-日
    let hms = date.toTimeString().substring(0, 8); // 小时-分钟-秒钟
    return ymd + " " + hms; // 拼接
  },
// “发送”
sendMess() {
  let that = this;
  let mess = that.data.mess;
  let userid = that.data.userid;
  let avatarUrl = that.data.avatarUrl;
  let date = that.getFormatTime();
  wx.showLoading({ title: '发送中...', mask: true });
  // 查询是否存在聊天记录
  db.collection('chatRecords').where({
    projectId: that.data.projectId,
    userid: that.data.id
  }).get().then(res => {
    if (res.data.length > 0) {
      // 如果存在聊天记录，更新该记录
      let recordId = res.data[0]._id;
      let newMessage = {
        avatarUrl: avatarUrl,
        id: userid,
        text: mess,
        date: date,
      };
      db.collection('chatRecords').doc(recordId).update({
        data: {
          chatContent: db.command.push(newMessage)
        },
        success: function(updateRes) {
          console.log("消息更新成功！", updateRes);
          that.setData({
            mess: '',
            content: that.data.content.concat(newMessage) // 将新发送的消息添加到聊天内容中
          });
          that.setData({         
            toBottom: `item${that.data.content.length - 1}`,//滚动到底部
          });
        },
        
        fail: function(err) {
          console.log("消息更新失败！", err);
        },
        complete: function() {
          wx.hideLoading();
        }
      });
    } else {
      // 如果不存在聊天记录，创建新的记录
      let newMessage = {
        avatarUrl: avatarUrl,
        id: userid,
        text: mess,
        date: date
      };
      db.collection('chatRecords').add({
        data: {
          projectId: that.data.projectId,
          chatContent: [newMessage],
          createTime: db.serverDate()
        },
        success: function(addRes) {
          console.log("新建聊天记录成功！", addRes);
          that.setData({
            mess: '',
            content: [newMessage]
          });
        },
        fail: function(err) {
          console.log("新建聊天记录失败！", err);
        },
        complete: function() {
          wx.hideLoading();
        }
      });
    }
  }).catch(err => {
    console.log("查询聊天记录失败！", err);
    wx.hideLoading();
  });
},

  // 查询聊天
  queryChat() {
    console.log(this.data.userid);
    let that = this;
    wx.showLoading({
      title: '加载中...',
    });
    db.collection('chatRecords').where({
      projectId: that.data.projectId
    }).get({
      success: function(res) {
        console.log("查询成功！", res);
        if (res.data.length > 0) {
          that.setData({
            content: res.data[0].chatContent   //每次刷新都会变化
          });
        } else {
          // 如果没有聊天记录，初始化为空数组
          that.setData({
            content: []
          });
        }
      },
      fail: function(err) {
        console.log("查询失败！", err);
      },
      complete: function() {
        wx.hideLoading();
      }
    });
  },


  // 页面准备完毕时
  onReady: function() {
    // 设置数据库监听器
    this.dbWatcher();
  },

  // 数据库的监听器
  dbWatcher() {
    let that = this;
    // 监听聊天记录集合的变化
    db.collection('chatRecords').where({
      projectId: that.data.projectId
    }).watch({
      onChange: function(res) {
        // 监控数据发生变化时触发
        if (res.docChanges) {
          res.docChanges.forEach(function(change) {
            if (change.dataType === "update") { // 数据库监听到的内容更新
              let updatedContent = change.doc.chatContent;
              let newContent = that.data.content.concat(updatedContent);
            }
          });
        }
      },
      onError: function(err) {
        console.error(err);
      }
    });
  },

});
