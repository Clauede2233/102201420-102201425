// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
  const { projectName,projectMajor, projectSimple, projectDescription, members,membersid,name,limit } = event;
  const db = cloud.database();
  const projectCollection = db.collection('projects');

  try {
    // 插入新项目
    const projectData = {
      projectName,
      projectMajor,
      projectSimple,
      projectDescription,
      members,
      membersid,
      name,
      limit,
      createdAt: db.serverDate(), // 使用服务器时间
    };

    const result = await projectCollection.add({
      data: projectData
    });

    return {
      success: true,
      message: '项目创建成功',
      projectId: result._id
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: '项目创建失败',
      error: e
    }
  }
};