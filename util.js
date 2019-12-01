const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
//带着sessionId进行请求，自动获取服务端返回的sessionId存入全局变量中




function NetRequest({ url, data, success, fail=function(){}, method = "POST" }) {

  var session_id = wx.getStorageSync('PHPSESSID');//本地取存储的sessionID
  if (session_id != "" && session_id != null) {
    var header = { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + session_id }
  } else {
    var header = { 'content-type': 'application/x-www-form-urlencoded' }
  }

  console.log(session_id);
  url =url;
  wx.request({
    url: url,
    method: method,
    data: data,
    header: header,
    success: res => {
      if (session_id == "" || session_id == null) {
        wx.setStorageSync('PHPSESSID', res.data.session_id) //如果本地没有就说明第一次请求 把返回的session id 存入本地
      }
      console.log(res);
      let data = res.data
      res['statusCode'] === 200 ? success(data) : fail(res)
    }
  })

}

module.exports = {
  formatTime: formatTime,
  NetRequest:NetRequest
}
