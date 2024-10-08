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
    const { members, applicants, limit } = project; // 获取成员列表、申请列表和限制

    // 检查项目成员是否已满
    if (members.length >= limit) {
      return {
        success: false,
        message: '项目成员已满'
      };
    }

    // 检查账号是否已经在项目成员列表中
    if (members.includes(account)) {
      return {
        success: false,
        message: '账号已在项目成员列表中'
      };
    }

    // 检查账号是否在申请列表中
    const applicantSet = new Set(applicants); // 将数组转换为 Set
    if (!applicantSet.has(account)) { // 使用 has 方法检查账号是否存在
      return {
        success: false,
        message: '账号不在申请列表中'
      };
    }

    // 从申请列表中移除账号
    const updatedApplicants = applicants.filter(applicant => applicant !== account);

    // 添加账号到项目成员列表
    const updateResult = await projectCollection.doc(_id).update({
      data: {
        members: db.command.push(account), // 使用 push 操作符来添加成员
        applicants: db.command.pull(account) // 使用 pull 操作符来移除申请者
      }
    });

    if (updateResult.updated === 0) {
      return {
        success: false,
        message: '更新项目信息失败，可能是因为没有实际更新'
      };
    }

    return {
      success: true,
      message: '成功加入项目成员列表并从申请列表中移除'
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