// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init();

// 创建聊天记录云函数
exports.main = async (event, context) => {
  const { projectId } = event;
  const db = cloud.database();
  const chatRecordCollection = db.collection('chatRecords');

  // 检查聊天记录是否存在
  try {
    // 先尝试获取文档，看是否已存在
    const result = await db.collection('chatRecordCollection').where({ project_id: projectId }).get();
    if (result.data.length > 0) {
      // 如果聊天记录已存在, 返回获取的文档
      return {
        success: true,
        message: '聊天记录已存在',
        data: result.data
      };
    } else {
      // 如果聊天记录不存在，使用 add 方法创建新的聊天记录
      const createResult = await chatRecordCollection.add({
        data: {
          project_id: projectId, // 设置 projectId 字段
          chatContent: [] // 初始化为空数组
        }
      });
      // 返回新创建的聊天记录
      return {
        success: true,
        message: '聊天记录创建成功',
        data: {
          _id: createResult._id,
          project_id: projectId,
          chatContent: []
        },
      };
    }
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: '操作失败',
      error: e,
    };
  }
};