// const app =  getApp();
import {HTTP} from '../../utils/http.js'
let http = new HTTP();
Page({
    data: {
       test:1
    },
    //页面创建时执行
    onLoad: function(options) {
        
    },
<<<<<<< HEAD
    log:function(){
      http.request({
        // url:'user/wechatlogin',
        url: 'resume/myresume',
        method: 'POST',
        data:{
            // wechatId : 43986728734960
            // appkey:KDLDaSADSDLWWbF
        },
        success:(res)=>{
          console.log(res)
=======
    dayin:function(){
      var session_id = wx.getStorageSync('PHPSESSID');
      console.log(session_id)
      if (session_id != "" && session_id != null) {
        var header = { 'content-type': 'application/json', 'Cookie': session_id }
      } else {
        var header = { 'content-type': 'application/json' }
      }//如果session_id不为空那么就让它给值
      // http.request({
      //   // url:'user/wechatlogin',
      //   url: 'resume/myresume',
      //   header:header,
      //   method: 'POST',
      //   // data:{
      //   //     wechatId : 43986728734960
      //   //     // appkey:KDLDaSADSDLWWbF
      //   // },
      // })
      wx.request({
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        url: 'https://lwork.online/resume/myresume',
        header: {'content-type': 'application/json', 'Cookie': session_id},
        method: 'POST',
        success: function (res) {
          if(session_id==""||session_id==null){
            var cookie = res.header["Set-Cookie"];
            wx.setStorageSync('PHPSESSID', cookie)
          }
          
          console.log(res.data)


>>>>>>> e7d609b4c5bc3bd7c2f902ce547807af6db4dd00
        }
      })
      //var utils=require('../../utils/util.js')
      // utils.NetRequest('https://lwork.online/resume/myresume',
      //       {
      //         wechatId: 1
      //       },
      //       function () {
      //         //console.log(res.data)

      //       },)
    },
    // 页面首次渲染完毕时执行
    onReady: function() {
        //Do some when page ready.
        
    },
     // 页面出现在前台时执行
    onShow: function() {
        //Do some when page show.
        
    },
    //页面从前台变为后台时执行
    onHide: function() {
        //Do some when page hide.
        
    },
    // 页面销毁时执行
    onUnload: function() {
        //Do some when page unload.
        
    },
    //下拉刷新时执行
    onPullDownRefresh: function() {
        //Do some when page pull down.
        
    }
})
