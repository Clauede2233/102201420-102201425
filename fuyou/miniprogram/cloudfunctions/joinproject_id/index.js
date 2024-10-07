// 云函数入口文件
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
    const { members, limit } = project; // 获取成员列表和限制

    if (members.length >= limit) {
      return {
        success: false,
        message: '项目成员已满'
      };
    }

    if (members.includes(account)) {
      return {
        success: false,
        message: '账号已在项目成员列表中'
      };
    }

    // 添加账号到项目成员列表
    const updateResult = await projectCollection.doc(_id).update({
      data: {
        members: db.command.push(account) // 使用 push 操作符来添加成员
      }
    });

    return {
      success: true,
      message: '申请加入项目成功',
      data: updateResult
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: '申请加入项目失败',
      error: e
    }
  }
};