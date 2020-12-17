<<<<<<< HEAD
=======
import { request } from "../../request/index"
import { myshowToast, baseUrl } from '../../utils/util'

>>>>>>> fccf51a... 首次提交
// pages/recruit/recruit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
=======
    school_requires: [],
    baseUrl: baseUrl
  },
  // 向数据库发情请求查看是否绑定学校
  // 代码补
  onShow: function () {
    this.getRecruitList()
  },

  // 获取招聘信息
  getRecruitList() {
    request({
      url: 'school/info',
    }).then((res) => {
      if (!res.data.status) {
        myshowToast(res.data.error,this.bindSchool())
      } else {
        const { school_requires } = res.data
        this.setData({
          school_requires
        })
      }
    })
  },

  // 绑定学校
  bindSchool(){
    wx.navigateTo({
      url: '../bind_school/school',
    })
  },

  onPullDownRefresh() {
    this.getRecruitList()
  },
>>>>>>> fccf51a... 首次提交
})