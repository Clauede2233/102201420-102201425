// 云函数 rejectApplication/index.js
const cloud = require('wx-server-sdk');

cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
  const { _id, account } = event; // 获取项目ID和账号信息
  const db = cloud.database();
  const projectCollection = db.collection('projects');

  try {
    // 获取项目信息
    const result = await projectCollection.doc(_id).get();
    if (!result || result.data.length === 0) {
      return {
        success: false,
        message: '项目不存在'
      };
    }

    const project = result.data; // 获取项目详情
    const { applicants } = project; // 获取申请列表

    // 检查账号是否在申请列表中
    if (!applicants.includes(account)) {
      return {
        success: false,
        message: '账号不在申请列表中'
      };
    }

    // 从申请列表中移除账号
    const updateResult = await projectCollection.doc(_id).update({
      data: {
        applicants: db.command.pull(account) // 使用 pull 操作符来移除申请者
      }
    });

    if (updateResult.updated === 0) {
      return {
        success: false,
        message: '拒绝申请失败，可能是因为没有实际更新'
      };
    }

    return {
      success: true,
      message: '成功拒绝申请'
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: '拒绝申请失败',
      error: e
    }
  }
};