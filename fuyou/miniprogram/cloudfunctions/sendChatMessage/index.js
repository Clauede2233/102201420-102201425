// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init();

// 发送消息云函数
exports.main = async (event, context) => {
  const { projectId, mess, date } = event;
  const db = cloud.database();
  const chatRecordCollection = db.collection('chatRecords');

  if (!projectId) {
    return {
      success: false,
      message: 'projectId 未输入或为空',
    };
  }

  try {
    // 根据 projectId 查询聊天记录并更新
    const updateResult = await chatRecordCollection.doc(projectId).update({
      data: {
        chatContent: db.command.$push({
          text: mess,
          date: date
        })
      }
    });

    return {
      success: true,
      message: '发送消息成功',
      data: updateResult,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: '发送消息失败',
      error: e,
    };
  }
};