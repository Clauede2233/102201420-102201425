const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mess: '',
    content: [], // 聊天信息
    mineAvatorSrc: '/images/user_male.jpg',
    himAvatorSrc: '/images/user_female.jpg',
    projectId: '' // 用于存储传来的projectId
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
    console.log(this.data.projectId);
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
    let date = that.getFormatTime();

  },

  // 查询聊天
  queryChat() {
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
            content: res.data[0].chatContent
          });
        } else {
          // 如果没有聊天记录，初始化为空数组
          that.setData({
            content: []
          });
        }
=======
      title: '查询...',
      mask: true,
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {
        db.collection('chatRecords')
        //.doc('4efa204964219ab20003873513331ef9')
        .get({
          success:function(res){
            console.log("查询成功！",res);
            if(res.data.length == 0){
				that.initChatContent();//初始化数据库字段
			}
			else{
				that.setData({
					currentId : res.data[0]._id,//设置当前的id
					content : res.data[0].chatContent//赋值给当前的聊天循环体
				})
				
				//定位到最后一行
				that.setData({
					toBottom : `item${that.data.content.length - 1}`,
				})
			}
          },
          fail:function(err){
            console.log("查询失败！",err);
          },
          complete:function(){
            wx.hideLoading({
              noConflict: true,
              success: (res) => {},
              fail: (res) => {},
              complete: (res) => {},
            })
          }
        })
      },
      fail: function(err) {
        console.log("查询失败！", err);
      },
      complete: function() {
        wx.hideLoading();
      }
    });
  },

  // 页面加载时查询聊天
  onLoad: function(options) {
    // 从页面跳转过来的projectId
    this.setData({
      projectId: options.projectId || '',
    });
    this.queryChat(); // 查询聊天
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
              that.setData({
                content: newContent
              });
              // 定位到最后一行
              that.setData({
                toBottom: `item${that.data.content.length - 1}`,
              });
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