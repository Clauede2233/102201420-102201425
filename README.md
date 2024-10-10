

```
 fuyou
├─ miniprogram
│  ├─ app.js                
│  ├─ app.json
│  ├─ app.wxss
│  ├─ asset                     #字体
│  │  └─ lianmeng.ttf
│  ├─ cloudfunctions            #云函数
│  │  ├─ createProject          #创建项目云函数
│  │  ├─ getprofile             #获取个人信息云函数
│  │  ├─ getproject_id          #获取项目云函数
│  │  ├─ joinprojectrequest_id  #加入项目云函数
│  │  ├─ joinproject_id         #同意加入项目云函数
│  │  ├─ log                    #登录云函数
│  │  ├─ register               #注册云函数
│  │  ├─ reject                 #拒绝加入项目云函数
│  │  ├─ saveProfile            #保存个人信息云函数
│  │  ├─ saveUserInfo           #保存个人信息云函数2（账号管理）
│  │  └─ updatePassword         #更新密码云函数
│  ├─ envList.js
│  ├─ home            #程序主页
│  │  ├─ person        #个人界面
│  │  │  ├─ feedback    #用户反馈界面
│  │  │  ├─ fix         #编辑界面
│  │  │  ├─ privacy      #账号管理界面
│  │  │  │  ├─ fix0       #信息维护界面
│  │  │  │  ├─ fix1         #修改密码界面
│  │  │  └─ project         #个人相关项目界面
│  │  │     └─ joinlist     #项目申请加入界面
│  │  └─ project       #项目主页面
│  │     ├─ chat       #聊天界面
│  │     ├─ create     #创建项目界面
│  │     ├─ detail      #项目详情界面
│  │     ├─ detail2     #项目详情界面——从用户页面点击的（可以查看申请加入列表）
│  ├─ images         #图片文件
│  │  ├─ pink0.jpg
│  │  ├─ pink1.jpg
│  │  ├─ pink2.jpg
│  │  ├─ pink3.jpg
│  │  ├─ pink4.jpg
│  │  ├─ pink5.jpg
│  │  ├─ pink6.jpg    
│  ├─ pages           #登录主页
│  │  ├─ home         #成功登录后跳转页面
│  │  ├─ log          #学生登录界面
│  │  ├─ log2         #导师登录界面
│  │  └─ register     #注册界面
```
**使用说明**：从我们的github仓库即可下载解压缩，导入通过微信小程序开发者平台即可运行，[小程序开发者平台下载地址](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

1.点击导入

![](https://img2024.cnblogs.com/blog/3487271/202410/3487271-20241010221140646-1387039394.png)

2.选择miniprogram文件

![](https://img2024.cnblogs.com/blog/3487271/202410/3487271-20241010221233617-706295597.png)

3.点击创建

![](https://img2024.cnblogs.com/blog/3487271/202410/3487271-20241010221430885-871127980.png)

4.点击编译即可在左侧看到小程序

![](https://img2024.cnblogs.com/blog/3487271/202410/3487271-20241010221458156-1819496312.png)

5.点击头像登录

![](https://img2024.cnblogs.com/blog/3487271/202410/3487271-20241010221915209-1534890828.png)

6.直接与小程序交互即可

**项目组织**：我们根据后端和前端分别编写，后端工作保存在云函数文件cloudfunctions内，前端分为两个主题部分，代表登录的pages和代表程序主页的home文件，又根据每一个页面的所属分别整理，比如个人信息的文件全部整理在home/person文件内

如有问题可联系本人QQ：1754095418；伙伴QQ：2827955818
