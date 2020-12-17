// pages/Rdetails/Rdetails.js
import { request } from '../../request/index'
import { myshowToast, baseUrl } from '../../utils/util'
import wxParse from '../../utils/wxParse/wxParse'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    requires: {},
    baseUrl: baseUrl,
    resumeId: '',
    resumeName: '',
    resume_content: [],
    showModal: false,
    requireSchoolId: '',
    name: '',
    startTime: '',
    endTime: '',
    writer: '',
    select: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let name = options.name
    let startTime = options.startTime
    let endTime = options.endTime
    let requireSchoolId = options.requireSchoolId
    this.setData({
      name,
      startTime,
      endTime,
      requireSchoolId
    })
  },

  onShow() {
    this.getRecuritDetail()
    this.getResumeList()
  },
  // 获取招聘详情信息
  getRecuritDetail() {
    request({
      url: `school/content/${this.data.requireSchoolId}`
    }).then((res) => {
      if (!res.data.status) {
        myshowToast(res.data.error)
      }else{
        const { requires_content,requires } = res.data
        wxParse.wxParse('requires_content', 'html', requires_content, this, 5)
        this.setData({
          requires
        })
      }
    })
  },

  //弹窗
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },


  //隐藏模态对
  hideModal: function () {

    this.setData({
      select: false,
      showModal: false

    });

  },

  // 确定选择，投递简历
  onConfirm: function () {
    this.hideModal();
    request({
      url: `school/deliver/${this.data.requireSchoolId}/${this.data.resumeId}`
    }).then((res) => {
      if (res.data.status) {
        myshowToast(res.data.success)
      }else{
        myshowToast(res.data.error)
      }
    })

  },

  // 获取简历列表
  getResumeList() {
    request({
      url: `resume/my`
    }).then((res) => {
      if (!res.data.status) {
        myshowToast(res.data.error)
      }else{
        const { resume_content } = res.data
        this.setData({
          resume_content
        })
      }
    })
  },

  // 显示下拉框
  bindShowSelect() {
    this.setData({
      select: !this.data.select
    })
  },
  // 选择简历
  mySelect(e) {
    var name = e.currentTarget.dataset.id
    this.setData({
      text: name,
      select: false
    })
  },

  // 选择简历
  chooseResume(e) {
   
    let resumeId = e.currentTarget.dataset.text.split('#')[0]
    let resumeName = e.currentTarget.dataset.text.split('#')[1]
    this.setData({
      resumeName,
      resumeId,
      select: !this.data.select
    })
  }
})
