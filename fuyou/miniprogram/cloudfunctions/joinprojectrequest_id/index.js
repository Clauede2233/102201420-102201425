// 云函数 addToApplyList/index.js
const cloud = require('wx-server-sdk');

cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
  const { projectId, account } = event; // 获取项目ID和账号信息
  const db = cloud.database();
  console.log(projectId);
  const projectCollection = db.collection('projects');
 
  try {
    // 获取项目信息
    const result = await projectCollection.doc(projectId).get();
    if (!result || result.data.length === 0) {
      return {
        success: false,
        message: '项目不存在'
      };
    }

    const project = result.data; // 获取项目详情
    const { applicants } = project; // 获取申请列表

    // 检查账号是否已经在申请列表中
    if (applicants && applicants.includes(account)) {
      return {
        success: false,
        message: '账号已在申请列表中'
      };
    }

    // 添加账号到申请列表
    const updateResult = await projectCollection.doc(projectId).update({
      data: {
        applicants: db.command.push(account) // 使用 push 操作符来添加申请者
      }
    });

    return {
      success: true,
      message: '申请成功',
      data: updateResult
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: '申请失败',
      error: e
    }
  }
};