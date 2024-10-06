// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
  const { name, gender, birthday, account, phone, signature } = event;
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
      // 如果没有找到用户信息，则创建新的用户记录
      await userCollection.add({
        data: {
          name,
          gender,
          birthday,
          account,
          phone,
          signature,
          _openid: userInfo,
          createdAt: db.serverDate() // 记录创建时间
        }
      });
      return {
        success: true,
        message: '用户信息保存成功'
      };
    } else {
      // 如果找到用户信息，则更新现有记录
      const docId = queryResult.data[0]._id;
      await userCollection.doc(docId).update({
        data: {
          name,
          gender,
          birthday,
          account,
          phone,
          signature
        }
      });
      return {
        success: true,
        message: '用户信息更新成功'
      };
    }
  } catch (e) {
    return {
      success: false,
      message: '保存失败',
      error: e
    }
  }
};