<<<<<<< HEAD
//app.js
import {HTTP} from 'utils/http.js';
let http = new HTTP();
App({
  onLaunch: function() {
    wx.clearStorageSync('PHPSESSID')
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    // 登录
    wx.login({

      success: res => {
        if (res.code) {

        http.request({
          url:'user/wechatlogin',
          method:'POST',
          data:{
            userAcount:res.code
          },
          success:(res)=>{
            console.log(res)
          }
        })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
  }

=======
import {baseUrl} from './utils/util'
App({
  onLaunch: function (ops) {
    if (ops.scene == 1044) {
      console.log(ops.shareTicket)
    }
    // 展示本地存储能力
    wx.removeStorageSync("PHPSESSID")
    wx.removeStorageSync("logs");

  },
  getAuthKey() {
  
    return new Promise(function (resolve, reject) {
        // 调用登录接口
        wx.login({
          success: res =>{
            if (res.code) {
              wx.request({
                url: baseUrl + '/user/wechatlogin',
                method: 'POST',
                data: {
                  wechatId: res.code
                },
                success: res => {
                  if (!res.data.status) {
                    reject()
                    myshowToast(res.data.error)
                    wx.navigateTo({
                      url: '../bind/bind',
                    })
                  }else{
                    let cookie = res.header["Set-Cookie"]
                    wx.setStorageSync("PHPSESSID", cookie)
                    resolve(res)
                  }
                }
              })
            } 
            
          }
        })
    });
  }
>>>>>>> fccf51a... 首次提交
})