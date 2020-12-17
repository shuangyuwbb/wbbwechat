// pages/bind_school/school.js
import { request } from '../../request/index.js'
import { myshowToast } from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    school_name: [],
    school: '',
    schoolId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  // 监听输入框内容
  getInputValue(e) {
    const { value } = e.detail
    if (value) {
      request({
        url: `tag/school/${value}`,
      }).then((res) => {
        if (!res.data.status) {
          myshowToast(res.data.error)
        } else {
          const { school_name } = res.data
          this.setData({
            school_name
          })
        }

      })
    }
  },

  // 选择学校保存学校
  changeSchool(e) {
    const schoolObj = e.currentTarget.dataset.text
    const schoolId = schoolObj.split(':')[1]
    const school = schoolObj.split(':')[0]
    this.setData({
      school,
      schoolId,
      school_name: ''
    })
  },

  // 发送绑定请求
  bind() {
    request({
      url: `school/bind/${this.data.schoolId}`
    }).then((res) => {
      if (!res.data.status) {
        myshowToast(res.data.error)
      } else {
        wx.switchTab({
          url: '../recruit/recruit',
        })
      }
    })

  },
})