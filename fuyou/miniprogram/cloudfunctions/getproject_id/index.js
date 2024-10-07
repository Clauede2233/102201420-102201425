// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
  const { id } = event; // 获取项目ID
  const db = cloud.database();
  const projectCollection = db.collection('projects');
  try {
    // 根据ID查询项目
    const result = await projectCollection.where({
      _id: id
    }).get();

    if (result.data.length === 0) {
      // 如果没有找到项目
      return {
        success: false,
        message: '项目不存在'
      };
    }

    const projectInfo = result.data[0]; // 获取项目信息

    return {
      success: true,
      message: '获取成功',
      data: projectInfo
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: '获取项目信息失败',
      error: e
    }
  }
};