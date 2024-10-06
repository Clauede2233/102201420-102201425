// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const userCollection = db.collection('users');

  // 获取当前用户信息
  const userInfo = cloud.getWXContext().OPENID;
  console.log('用户OpenID:', userInfo);

  try {
    // 查询出对应OpenID的文档
    const queryResult = await userCollection.where({
      _openid: userInfo
    }).get();

    if (queryResult.data.length === 0) {
      return {
        success: false,
        message: '没有找到对应的用户信息'
      };
    }

    // 返回查询到的用户信息
    return {
      success: true,
      message: '获取成功',
      data: queryResult.data[0]
    };
  } catch (e) {
    return {
      success: false,
      message: '获取失败',
      error: e
    }
  }
};