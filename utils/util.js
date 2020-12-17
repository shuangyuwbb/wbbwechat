<<<<<<< HEAD
=======

>>>>>>> fccf51a... 首次提交
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

<<<<<<< HEAD

=======
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const arrRemoveObj = (array, obj) => {
  let length = array.length;
  for (let i = 0; i < length; i++) {
    if (array[i] === obj) {
      if (i === 0) {
        array.shift();
        return array;
      } else if (i === length - 1) {
        array.pop();
        return array;
      } else {
        array.splice(i, 1);
        return array;
      }
    }
  }
}

// showToast封装
const myshowToast = (title, callback) => {
  wx.showToast({
    title: title,
    icon: 'none',
    duration: 1500,
    mask: false,
    success: (res) => {
      if (callback) {
        callback()
      }
    },
    fail: (err) => {

    }
  })
}

// json转json字符串封装
const getChangeJson = object => {
  let json = JSON.stringify(object)
  return json
}

//json字符转化对象
const getJsonObject = str => {
  const object = JSON.parse(str)
  return object
}
//登录封装
const login = (resolve) => {
  wx.login({
    timeout: 10000,
    success: res => {
      if (res.code) {
        wx.request({
          url: baseUrl + '/user/wechatlogin',
          method: 'POST',
          data: {
            wechatId: res.code
          },
          success: res => {
            if (!res.data.status) {
              myshowToast(res.data.error)
              wx.navigateTo({
                url: '../bind/bind',
              })
            }else{
              let cookie = res.header["Set-Cookie"]
              wx.setStorageSync("PHPSESSID", cookie)
            }
          }
        })
      }
    },
    fail: (err) => {
      console.log(err)
    },
    complete: () => { }
  });
}

const getPixelRatio = () => {
  let pixelRatio = 0
  wx.getSystemInfo({
    success: function (res) {
      pixelRatio = res.pixelRatio
    },
    fail: function () {
      pixelRatio = 0
    }
  })
  return pixelRatio
}

// const baseUrl = "https://120.26.186.150/"
// const baseUrl = "https://180.76.107.185/"
// const baseUrl = "https://iwork.online/"
const baseUrl = "https://jlresume.online/"
module.exports = {
  formatTime,
  arrRemoveObj,
  myshowToast,
  getChangeJson,
  getJsonObject,
  baseUrl,
  login,
  getPixelRatio

}
>>>>>>> fccf51a... 首次提交
