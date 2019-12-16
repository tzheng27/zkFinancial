// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

//引入发送邮件的类库
var nodemailer = require('nodemailer')

// 创建一个SMTP客户端对象
let transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com', 
  secureConnection:false,
  //port: 465, 
  port: 587,
  //secure:true,
  tls:{
    ciphers: 'SSLv3'
  },
  auth: {
    user: 'yourEmail', //邮箱账号
    pass: 'yourPassword' //邮箱的授权码
  },
  path: '/usr/sbin/sendmail'
});

// 云函数入口函数
exports.main = async(event, context) => {
  //创建一个邮件对象
    let res = await transporter.sendMail({
      from: event.from,
      to: event.toCompany,
      subject: event.subject,
      text:event.body
   });
   if(event.toClient !== null)
   await transporter.sendMail({
      from: event.from,
      to: event.toClient,
      subject: event.subject,
      text:event.body
   })
  return res;
  
}