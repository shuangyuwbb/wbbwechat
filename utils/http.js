import {
  config
} from '../config.js'
//错误提示
const tips = {
  1: '抱歉出现一个错误',
  1005: '请求过时',
}

//封装HTTP请求类
class HTTP {
  request(params) {
    if (!params.method) {
      //默认get请求
      params.method = 'GET';
    }
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
      url: config.api_base_url + params.url,
      data: params.data,
      method: params.method,
      header: header,
      success: (res) => {
        console.log('成功请求');
        if(session_id == ''||session_id == null){
          var cookie = res.header["Set-Cookie"];
          wx.setStorageSync("PHPSESSID", cookie)
        }
        let code = res.statusCode.toString()
        if (code.startsWith('2')) {
          //请求成功
         params.success && params.success(res)//传入success方法就执行回调函数
        } else {
          //处理服务器异常
          this._show_error(res.data.error)
        }
      },
      fail: (err) => {
        console.log('#################')
        this._show_error(1005)
      }
    })
  }


  //提示错误
  _show_error(error_code) {
    if (!error_code) {
      error_code = 1;
    }
    wx.showToast({
      title: [error_code],
      icon: 'success',
      duration: 2000,
    })
  }
}

//导出HTTP类
export {HTTP};