import { config } from '../config.js'
//错误提示
const tips = {
  1: '抱歉出现一个错误',
  1005: '请求过时',
}
//HTTP类
class HTTP {

  request(params) {
    if (!params.method) {
      //默认get请求
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
        let code = res.status;
        console.log(code)
        if (code) {
          //请求成功
          params.success(res.data)
        } else {
          //处理服务器异常
          console.log('false')
          let error_code = res.data.error.status;
          console.log(res.data.error)
          this._show_error(res.data.error)
          console.log(111111)
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
      icon: 'success',
      duration: 2000
    })
  }

}
//导出HTTP类
export { HTTP };