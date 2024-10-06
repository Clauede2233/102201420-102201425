// 云函数入口文件
const cloud = require('wx-server-sdk');
const bcrypt = require('bcryptjs');
cloud.init();
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const { username, password, role } = event;
  const userInfo = cloud.getWXContext().OPENID;
  console.log('用户OpenID:', userInfo);
  try {
    // 输入验证
    if (!username || !password || role === '') {
      return { success: false, message: '用户名、密码和角色不能为空' };
    }
    if (username.length < 4 || username.length > 12 || !(/^\d+$/).test(username)) {
      return { success: false, message: '用户名必须为4-12位数字' };
    }
    if (password.length < 4) {
      return { success: false, message: '密码至少4个字符' };
    }

    // 密码加密
    const hashedPassword = await bcrypt.hash(password, 10);

    // 验证用户名是否已存在
    const userQuery = await db.collection('users').where({ username }).get();
    if (userQuery.data.length > 0) {
      return { success: false, message: '用户名已存在' };
    }

    

    // 插入新用户数据
    const userResult = await db.collection('users').add({
      data: {
        username,
        password: hashedPassword,
        role,
        _openid:userInfo,
        createdAt: db.serverDate()
      }
    });

    // 检查数据库响应
    if (userResult._id) {
      return {
        success: true,
        message: '注册成功',
        userId: userResult._id
      };
    } else {
      return {
        success: false,
        message: '数据库添加失败',
      };
    }
  } catch (err) {
    console.error('注册失败:', err);
    return {
      success: false,
      message: err.message || '注册失败'
    };
  }
};