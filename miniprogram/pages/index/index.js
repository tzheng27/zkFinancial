import WxValidate from '../../utils/WxValidate.js'


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
    
    this.initValidate();
  },

/////////////////////////////////////////////
// begin of  the validation

  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  submitForm(e) {
    /**
     * 4-3(表单提交校验)
     */
    const params = e.detail.value
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }

    this.submitInfo(params);
  },

  /**
   * 表单-提交
   */
  submitInfo(params) {
    // form提交
    let form = params;
    console.log('将要提交的表单信息：', form);

    wx.showToast({
      title: '提交成功！！！！',
    })
    this.GoToPrize()
  },

  /**
   * 表单-验证字段
   */
  initValidate() {

    const rules = {
      name: {
        required: true,
        rangelength: [2, 8]
      },
      tel: {
        required: true,
        tel: true,
      }
      // 配置false可关闭验证

    }
    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      name: {
        required: '请输入姓名',
        rangelength: '请输入2~4个汉字个汉字'
      },
      tel: {
        required: '请输入10位手机号码',
        tel: '请输入正确的手机号码',
      }

    }
    // 创建实例对象
    this.WxValidate = new WxValidate(rules, messages)

  },

// end of the validation
/////////////////////////////////////////////
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

  toFormValidate: function(e){
    wx.navigateTo({ url: 'pages/form/form' })
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

    this.GoToPrize()
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
  },

  GoToPrize: function(){
    wx.navigateTo({ url: '/pages/wheel/wheel' })
  }
  
})



