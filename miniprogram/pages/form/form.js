
import WxValidate from '../../utils/WxValidate.js'

Page({

 
  data: {},

  onLoad: function (options) {

    this.initValidate();
  },



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
    /**
     * 这里添写验证成功以后的逻辑
     * 
     */
    //验证通过以后->
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
  },

  /**
   * 表单-验证字段
   */
  initValidate() {

    /**
     * 4-2(配置规则)
     */
    const rules = {
      name: {
        required: true,
        rangelength: [2, 8]
      },
      idcard: {
        required: false,
        idcard: false,
      },
      tel: {
        required: true,
        tel: true,
      }

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
    /**
     * 也可以自定义验证规则
     */
    // this.WxValidate.addMethod('assistance', (value, param) => {
    //   return this.WxValidate.optional(value) || (value.length >= 1 && value.length <= 2)
    // }, '请勾选 《顺风男服务协议》')
  }
});