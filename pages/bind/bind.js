// pages/bind/bind.j
import { myshowToast, baseUrl } from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    title: '快去邮箱激活吧!'
  },

  // 注册绑定切换tab
  changeRegTab() {
    this.setData({
      isShow: true
    })
  },

  changeLogTab() {
    this.setData({
      isShow: false
    })
  },
  // 提交表单
  submit(e) {
    let userPassword = e.detail.value.userPassword
    let password = e.detail.value.password
    let userAcount = e.detail.value.userAcount
    let checkEmail = this.checkEmail(userAcount)
    // 校验邮箱
    if (!checkEmail) {
      return
    }
    // 判断为空
    if (userPassword === '' || password === '' || userAcount === '') {
      myshowToast('用户名不能为空!')
      return
    }
    // 发送绑定账户请求
    if (password === undefined) {
      wx.login({
        success: (res) => {
          wx.request({
            url: baseUrl + 'user/bind',
            method: 'POST',
            header: { 'content-type': 'application/json' },
            dataType: 'json',
            responseType: 'text',
            data: {
              userAcount,
              userPassword,
              wechatId: res.code
            },
            success: res => {
              if (!res.data.status) {
                myshowToast(res.data.error)
              } else {
                wx.switchTab({
                  url: '../index/index'
                })
              }
            }
          })
        }
      })
    } else {
      // 判断密码一致
      if (password !== userPassword) {
        myshowToast('两次密码不一致！')
        return
      }
      // 发送注册账户请求
      wx.request({
        url: baseUrl + 'user/register/wechat',
        data: {
          userAcount,
          userPassword
        },
        header: { 'content-type': 'application/json' },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: res => {
          if (!res.data.status) {
            myshowToast(res.data.error)
          } else {
            myshowToast(res.data.success,this.bindAccount(userAcount,userPassword))
            this.setData({
              isShow: !this.data.isShow
            })
          }
        }
      })
    }
  },
  // 实时邮箱验证
  inputemail(e) {
    let email = e.detail.value
    let checkedNum = this.checkEmail(email)
  },
  // 邮箱验证规则
  checkEmail(email) {
    let str = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    if (str.test(email)) {
      return true
    } else {
      myshowToast('请填写正确的邮箱号')
      return false
    }
  },

  bindAccount(userAcount,userPassword) {
    wx.login({
      success: (res) => {
        wx.request({
          url: baseUrl + 'user/bind',
          method: 'POST',
          header: { 'content-type': 'application/json' },
          dataType: 'json',
          responseType: 'text',
          data: {
            userAcount,
            userPassword,
            wechatId: res.code
          },
          success: res => {
            myshowToast(this.data.title)
          }
        })
      }
    })

  }
})