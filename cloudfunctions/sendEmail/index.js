// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

//引入发送邮件的类库
var nodemailer = require('nodemailer')

// // 创建一个SMTP客户端配置
// var config = {
//   host: 'smtp.163.com', //网易163邮箱 smtp.163.com
//   port: 25, //网易邮箱端口 25
//   auth: {
//     user: '@163.com', //邮箱账号
//     pass: '' //邮箱的授权码
//   }
// };

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}



// 创建一个SMTP客户端对象
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'frankxiao008@gmail.com',
    pass: '654321Xsh'
  }
});
// 云函数入口函数
exports.main = async (event, context) => {
  // 创建一个邮件对象
  var mail = {
    // 发件人
    from: '来自小石头 <1587072557@qq.com>',
    // 主题
    subject: '来自小石头的问候',
    // 收件人
    to: 'xiaosaihong2008@gmail.com',
    // 邮件内容，text或者html格式
    text: '你好啊，编程小石头' //可以是链接，也可以是验证码
  };

  let res = await transporter.sendMail(mail);
  return res;
}