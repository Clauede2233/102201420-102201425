// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init();

// 查询聊天记录云函数
exports.main = async (event, context) => {
  const { projectId } = event;
  const db = cloud.database();
  const chatRecordCollection = db.collection('chatRecords');

  try {
    // 根据项目ID查询聊天记录
    const result = await chatRecordCollection.doc(projectId).get();
    if (result.data.length === 0) {
      return {
        success: false,
        message: '没有找到聊天记录',
      };
    }
    return {
      success: true,
      message: '查询成功',
      data: result.data,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: '查询失败',
      error: e,
    };
  }
};