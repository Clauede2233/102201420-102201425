// 云函数入口文件
const cloud = require('wx-server-sdk');
const bcrypt = require('bcryptjs'); // 用于密码加密

cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
  const { account, oldPassword, newPassword, confirmPassword } = event;
  const db = cloud.database();
  const userCollection = db.collection('users');
  // 获取当前用户信息
  const userInfo = cloud.getWXContext().OPENID;
  console.log('用户OpenID:', userInfo);

  try {
    // 先查询出对应账号的用户文档
    const queryResult = await userCollection.where({
      account
    }).get();

    if (queryResult.data.length === 0) {
      return {
        success: false,
        message: '没有找到对应的用户信息'
      };
    }

    // 获取文档ID
    const userDoc = queryResult.data[0];

    // 验证旧密码
    const isOldPasswordCorrect = await bcrypt.compare(oldPassword, userDoc.password);
    if (!isOldPasswordCorrect) {
      return {
        success: false,
        message: '旧密码不正确'
      };
    }

    // 验证新密码和确认密码是否一致
    if (newPassword !== confirmPassword) {
      return {
        success: false,
        message: '新密码与确认密码不一致'
      };
    }

    // 密码加密
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // 更新用户密码
    await userCollection.doc(userDoc._id).update({
      data: {
        password: hashedNewPassword
      }
    });

    return {
      success: true,
      message: '密码更新成功'
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: '密码更新失败',
      error: e
    }
  }
};