import {HTTP} from '../../utils/http.js'
import {Paint} from '../../utils/paint/first.js'
let paint = new Paint()
let http = new HTTP();

Page({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */

  onLaunch: function () {
   
  },

  ddd:function(){
    //需要把canvas转成图片后才能保存
    wx.canvasToTempFilePath({
      canvasId: 'demo',
      success: res => {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            // utils.aiCardActionRecord(19);
            wx.showModal({
              content: '图片已保存到相册，赶紧晒一下吧~',
              showCancel: true,
              confirmText: '好的',
              confirmColor: '#333',
              success: function (res) {
                if (res.confirm) { }
              },
              fail: function (res) { }
            })
          },
        })
      }
    }, this)
    
    
    
  },



  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    let context = wx.createCanvasContext('demo')
    paint.paint(context)
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
