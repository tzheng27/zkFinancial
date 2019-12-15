// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

//引入发送邮件的类库
var nodemailer = require('nodemailer')

// 创建一个SMTP客户端对象
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', //网易163邮箱 smtp.163.com
  port: 465, //网易邮箱端口 25
  secure:true,
  auth: {
    user: 'zhengtian07@gmail.com', //邮箱账号
    pass: 'youaretheBEST27!' //邮箱的授权码
  },
  path: '/usr/sbin/sendmail'
});

// 云函数入口函数
exports.main = async(event, context) => {
  // 创建一个邮件对象
  let res = await transporter.sendMail({
    from: event.from,
    to: event.to,
    subject: event.subject,
    text:event.body
  });
  return res;
  
}