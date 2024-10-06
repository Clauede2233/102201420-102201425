// 引入所需模块
const cloud = require('wx-server-sdk');
const bcrypt = require('bcryptjs');

// 初始化云环境
cloud.init();
const db = cloud.database();

// 登录云函数入口
exports.main = async (event, context) => {
  const { account, password, role } = event;  // 从事件中解构 username, password, 和 role
  try {
    // 输入验证
    if (!account || !password) {
      return { success: false, message: '用户名和密码不能为空' };
    }

    // 查找用户
    const userQuery = await db.collection('users').where({ account }).get();
    if (userQuery.total === 0) {
      return { success: false, message: '用户不存在' };
    }
    const user = userQuery.data[0];
    if (!user) {
      return { success: false, message: '用户信息不存在' };
    }
    // 密码验证
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return { success: false, message: '密码错误' };
    }

    // 角色验证
    if (role && role !== user.role) {
      return { success: false, message: '角色不匹配' };
    }

    // 登录成功
    return {
      success: true,
      message: '登录成功',
      userId: user._id
    };
  } catch (err) {
    console.error('登录失败:', err);
    return {
      success: false,
      message: err.message || '登录失败'
    };
  }
};