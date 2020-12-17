//同时发送异步请求的次数
import { baseUrl, login } from '../utils/util'
let ajaxTimes = 0;
export const request = (params) => {
  ajaxTimes++;
  wx.showLoading({
    title: '加载中',
    mask: true,
  });
  var session_id = wx.getStorageSync('PHPSESSID'); //本地取存储的sessionID
  if (session_id != "" && session_id != null) {
    var header = {
      'content-type': 'application/json',
      'Cookie': session_id
    }
  } else {
    var header = {
      'content-type': 'application/json'
    }
  }
  wx.request({
    url: baseUrl+'/user/islogin',
    header: header,
    success: res =>{
      if(!res.data.status){
        login()
      }else{
        
      }
    },
    fail: err=>{
      console.log(err)
    }
  })
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseUrl + params.url,
      header: header,
      success: (res) => {
        resolve(res);
        wx.stopPullDownRefresh()
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
        ajaxTimes--;
        //当同时发送所有请求都完成再关闭
        if (ajaxTimes === 0) {
          wx.hideLoading();
        }
      }
    })
  })
}