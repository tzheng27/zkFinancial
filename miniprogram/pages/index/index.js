Page({
  data: {
    calculator:true,
    contact:false,
    application: false,
    date:null,
    today:null,
    time: "9:00",
    mortgageTypes: [
      {name: 'refinance', value: 'Refinance', checked: false},
      {name: 'purchase', value: 'Purchase', checked: false}
    ],
    credit: 400,
    analyzed: false,

  },

  onLaunch: function(){
    if(!wx.cloud) {
      console.error('请使用更高的版本')
    }else{
      wx.cloud.init({
        
        env: "playground-zt"
      })
    }

    this.globalData = {}
  },

  onLoad:function() {
    var currentDate = new Date()
    var month = currentDate.getMonth()+1
    var day = currentDate.getDate()
    var year = currentDate.getFullYear()
    this.setData ({
      date: year+"-"+month+"-"+day,
      today: year+"-"+month+"-"+day
    })
  },

  onShareAppMessage() {
    return {
      title: '中凯金融',
      path: 'pages/index/index'
    }
  },

  onCalculate: function(e) {
    this.setData ({
      calculator: true,
      contact: false,
      application: false
    })
  },

  onContact: function(e) {
    this.setData ({
      calculator: false,
      contact: true,
      application: false
    })
  },

  onApplication: function(e) {
    this.setData ({
      calculator: false,
      contact: false,
      application: true
    })
  },

  mortgageCheckBoxChange: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  }, 

  changeCredit: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.setData({
      
      credit: e.detail.value,
    })
  },

  onSubmitContactInfo: function(e) {
    wx.showToast({
      title: "预约成功",
      icon: 'success',
      duration: 1000
    })
  },

  sendEmail(){
    wx.cloud.callFunction({
      name: "sendEmailTwo",
      success(res){
        console.log("success sent", res)
      },
      fail(res){
        console.log("fail to send", res)
      }
    })
  },

  CalculateMrg: function(e) {
    console.log('credit: ', this.data.credit)
    wx.showLoading({
      title: '正在分析中',
    })
    
    var that = this
    setTimeout(function () {
      wx.hideLoading()
      that.setData({
      analyzed: true
    })
    }, 2000)
  },

  ReturnToCal: function(e) {
    this.setData({
      analyzed: false
    })
  }
})

// //index.js
// const app = getApp()

// Page({
//   data: {
//     //avatarUrl: './user-unlogin.png',
//     userInfo: {},
//     logged: false,
//     takeSession: false,
//     requestResult: '',
//     imgUrls: ['./zk1.JPG', './zk2.JPG', './zk3.JPG'],
//     indicatorDots: true,
//     vertical: false,
//     autoplay: true,
//     interval: 2000,
//     duration: 500
//   },

//   onLoad: function() {
//     if (!wx.cloud) {
//       wx.redirectTo({
//         url: '../chooseLib/chooseLib',
//       })
//       return
//     }

//     // 获取用户信息
//     wx.getSetting({
//       success: res => {
//         if (res.authSetting['scope.userInfo']) {
//           // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
//           wx.getUserInfo({
//             success: res => {
//               this.setData({
//                 avatarUrl: res.userInfo.avatarUrl,
//                 userInfo: res.userInfo
//               })
//             }
//           })
//         }
//       }
//     })
//   },

//   onGetUserInfo: function(e) {
//     if (!this.data.logged && e.detail.userInfo) {
//       this.setData({
//         logged: true,
//         avatarUrl: e.detail.userInfo.avatarUrl,
//         userInfo: e.detail.userInfo
//       })
//     }
//   },

//   onGetOpenid: function() {
//     // 调用云函数
//     wx.cloud.callFunction({
//       name: 'login',
//       data: {},
//       success: res => {
//         console.log('[云函数] [login] user openid: ', res.result.openid)
//         app.globalData.openid = res.result.openid
//         wx.navigateTo({
//           url: '../userConsole/userConsole',
//         })
//       },
//       fail: err => {
//         console.error('[云函数] [login] 调用失败', err)
//         wx.navigateTo({
//           url: '../deployFunctions/deployFunctions',
//         })
//       }
//     })
//   },

//   // 上传图片
//   doUpload: function () {
//     // 选择图片
//     wx.chooseImage({
//       count: 1,
//       sizeType: ['compressed'],
//       sourceType: ['album', 'camera'],
//       success: function (res) {

//         wx.showLoading({
//           title: '上传中',
//         })

//         const filePath = res.tempFilePaths[0]
        
//         // 上传图片
//         const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
//         wx.cloud.uploadFile({
//           cloudPath,
//           filePath,
//           success: res => {
//             console.log('[上传文件] 成功：', res)

//             app.globalData.fileID = res.fileID
//             app.globalData.cloudPath = cloudPath
//             app.globalData.imagePath = filePath
            
//             wx.navigateTo({
//               url: '../storageConsole/storageConsole'
//             })
//           },
//           fail: e => {
//             console.error('[上传文件] 失败：', e)
//             wx.showToast({
//               icon: 'none',
//               title: '上传失败',
//             })
//           },
//           complete: () => {
//             wx.hideLoading()
//           }
//         })

//       },
//       fail: e => {
//         console.error(e)
//       }
//     })
//   },

// })
