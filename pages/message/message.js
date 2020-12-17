// pages/message/message.js
import {request} from '../../request/index'
import { myshowToast } from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reply_content:[
    ], 
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getMessageList()
  },

  // 获取消息
  getMessageList(){
    request({
      url: `info/reply`
    }).then(res =>{
      if(!res.data.status){
        myshowToast(res.data.error)
      }else{
        const {reply_content} = res.data
        this.setData({
          reply_content
        })
      }
    })
    console.log(this.data.reply_content)
  },

  // 进入详情页
  detailmsg(e) {
    const {text} = e.currentTarget.dataset
    wx.navigateTo({
      url: '../detailmsg/detailmsg?text='+text,
    });
  }
})