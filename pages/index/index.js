const app =  getApp();

Page({

    
    data: {
        userinfo:{}
    },
    //页面创建时执行
    onLoad: function(options) {
        
        
    },
    //打印用户昵称
    dayin:function(){
        var that = this;
        if(app.globalData.obj){
        // that.setData({
        //     userinfo:app.globalData.obj, 
           
        // })
      console.log(app.globalData.obj)
    }  
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
