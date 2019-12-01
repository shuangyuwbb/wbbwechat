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
    dayin:function(){
      http.request({
        // url:'user/wechatlogin',
        url: 'resume/myresume',
        method: 'POST',
        // data:{
        //     wechatId : 43986728734960
        //     // appkey:KDLDaSADSDLWWbF
        // },
      })
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
