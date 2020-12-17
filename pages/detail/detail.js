import { myshowToast, getJsonObject } from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {

    list: ['男', '女'],
    listEdu: ['专科', '本科', '研究生'],
    startDate: '2010-01',
    endDate: '2030-12',
    selectedStartDate: '2020-05',
    selectedEndDate: '2021-06',
    selectedIndex: 0,
    baseInfo1: [],
    base: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow () {

  },

  // 接受传递过来的字段
  onLoad(options) {
    let { baseInfo} = options || ''
    if (baseInfo) {
      var baseInfo1 = getJsonObject(baseInfo)
    } 
    this.setData({
      baseInfo1,
    })
  },

  // 检测是不为空
  inputEmpty(e){
    const {value} = e.detail
    const {text} = e.currentTarget.dataset
    if(!value){
      myshowToast(text)
    }
  },

  // 邮箱验证部分实时监测
  inputmail: function (e) {

    let email = e.detail.value

    let checkedNum = this.checkEmail(email)

  },

  // 邮箱验证规则
  checkEmail: function (email) {

    let str = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/

    if (str.test(email)) {

      return true

    } else {

      wx.showToast({

        title: '请填写正确的邮箱号',

        image: './../../../../images/fail.png'

      })

      return false

    }
  },
  // 手机号部分

  inputPhoneNum: function (e) {

    let phoneNumber = e.detail.value

    if (phoneNumber.length === 11) {

      let checkedNum = this.checkPhoneNum(phoneNumber)

    } else {
      wx.showToast({

        title: '手机号不正确',

        image: './../../../../images/fail.png'

      })
    }

  },

  // 手机号验证规则
  checkPhoneNum: function (phoneNumber) {

    let str = /^1\d{10}$/

    if (str.test(phoneNumber)) {

      return true

    } else {

      wx.showToast({

        title: '手机号不正确',

        image: './../../../../images/fail.png'

      })

      return false

    }

  },

  // 保存信息
  save(e) {
    // 将参数传回上一页
    const pages = getCurrentPages()
    const prevPage = pages[pages.length - 2] // 上一页
    // 调用上一个页面的setData 方法，将数据存储
    let baseInfo = e.detail.value
    let info = this.formatDate(baseInfo)
    let base = JSON.stringify(info)
    prevPage.setData({
      base
    })
    // 返回上一页
    wx.navigateBack({
      delta: 1
    })
   
  },

  // 选择性别的index
  change(e) {
    this.setData({
      selectedIndex: e.detail.value,
    })
  },

  startDate(e) {
    this.setData({
      selectedStartDate: e.detail.value
    })
  },

  endDate(e) {
    this.setData({
      selectedEndDate: e.detail.value
    })
  },

  // 处理毕业时间
  formatDate(e) {
    const date = this.data.selectedStartDate + '-' + this.data.selectedEndDate
   if(e['14']){
    e['16'] = date
   }
    return e
  },
})