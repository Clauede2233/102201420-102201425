// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
  const { name, major, avatarUrl } = event;
  const db = cloud.database();
  const userCollection = db.collection('users');
  // 获取当前用户信息
  const userInfo = cloud.getWXContext().OPENID;
  console.log('用户OpenID:', userInfo);

  try {
    // 先查询出对应OpenID的文档
    const queryResult = await userCollection.where({
      _openid: userInfo
    }).get();

    if (queryResult.data.length === 0) {
      return {
        success: false,
        message: '没有找到对应的用户信息'
      };
    }

    // 获取文档ID
    const docId = queryResult.data[0]._id;

    // 更新用户信息
    await userCollection.doc(docId).update({
      data: {
        name,
        major,
        avatarUrl
      }
    });

    return {
      success: true,
      message: '更新成功'
    };
  } catch (e) {
    return {
      success: false,
      message: '保存失败',
      error: e
    }
  }
};