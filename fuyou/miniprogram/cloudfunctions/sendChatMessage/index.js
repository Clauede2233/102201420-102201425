// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init();

// 发送消息云函数
exports.main = async (event, context) => {
  const { projectId, mess, date } = event;
  const db = cloud.database();
  const chatRecordCollection = db.collection('chatRecords');

  try {
    // 获取当前聊天内容
    const result = await chatRecordCollection.doc(projectId).get();
    if (result.data.length === 0) {
      return {
        success: false,
        message: '聊天记录不存在',
      };
    }

    const { chatContent } = result.data;

    // 添加新消息到聊天内容数组
    const updateResult = await chatRecordCollection.doc(projectId).update({
      data: {
        chatContent: cloud.database.command.$push({
          text: mess,
          date: date
        })
      }
    });

    return {
      success: true,
      message: '发送成功',
      data: updateResult,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: '发送失败',
      error: e,
    };
  }
};