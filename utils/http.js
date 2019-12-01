import { config } from '../config.js'
//错误提示
const tips = {
  1: '抱歉出现一个错误',
  1005: '请求过时',
}
class HTTP {

  request(params) {
    if (!params.method) {
      params.method = 'GET';
    }
    wx.request({
      url: config.api_base_url + params.url,
      data: params.data,
      method: params.method,
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        console.log('成功请求')
        let code = res.statusCode.toString;
        console.log(res.data)
        console.log(code)
        if (code.startsWith('2')) {
          //请求成功
          params.success(res.data)
        } else {
          //处理服务器异常
          let error_code = res.data.error_code;
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        console.log('#################')
        this._show_error(1005)
      }
    })
  }

  _show_error(error_code) {
    if (!error_code) {
      error_code = 1;
    }
    wx.showToast({
      title: [error_code],
      icon: 'error',
      duration: 2000
    })
  }

}
//导出HTTP类
export { HTTP };