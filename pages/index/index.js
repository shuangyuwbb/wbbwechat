<<<<<<< HEAD
// const HTTP = require('../../utils/http.js')
import {
  HTTP
} from '../../utils/http.js'
let http = new HTTP();
Page({
  data: {
    
  },
  //页面创建时执行
  onLoad: function(options) {

  },
  addResume:function(){
=======
import { request } from '../../request/index.js'
import { myshowToast, baseUrl,login } from '../../utils/util'

const app = getApp()
Page({
  data: {
    baseUrl: baseUrl,
    resume_content: [],
    url: '',
    src: '../../images/admin.png',
    showModal: false,
  },

  onLoad(e) {
    app.getAuthKey().then(res => {
      console.log(res)
      this.getResumeList()
    })
  },

  onShow() {
    // this.getResumeList()
  },

  // 创建简历
  addResume() {
>>>>>>> fccf51a... 首次提交
    wx.navigateTo({
      url: '../add-resume/add-resume',
    })
  },

<<<<<<< HEAD
  editer:function(){
    console.log(222)
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

  },
  onShareAppMessage:function(){
    
  }
  
=======
  // 弹窗
  showDialogBtn(id) {
    request({
      url: `resume/download/${id}`
    }).then(res => {
      if (!res.data.status) {
        myshowToast(res.data.error)
      } else {
        const url = res.data.download_url
        this.setData({
          showModal: true,
          url,
        })
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
      } else {
        const { resume_content } = res.data
        this.setData({
          resume_content
        })
      }
    })
  },

  // 删除简历
  removeResume(id) {
    request({
      url: `resume/delete/${id}`
    }).then(res => {
      if (res.data.error) {
        myshowToast(res.data.error)
      } else {
        myshowToast(res.data.success, this.getResumeList())
      }
    })
  },

  // 预览简历
  previewResume(e) {
    const resumeId = e.currentTarget.dataset.id
    request({
      url: `resume/my/${resumeId}`
    }).then(res => {
      if (!res.data.status) {
        myshowToast(res.data.error)
      } else {
        let { resume_content } = res.data
        resume_content = JSON.stringify(resume_content)
        wx.navigateTo({
          url: '../preview/preview?resume_content=' + resume_content,
        })
      }
    })
  },

  //隐藏模态对
  hideModal() {
    this.setData({
      showModal: false
    });
  },

  // 复制
  onConfirm() {
    wx.setClipboardData({
      data: this.data.url,
      success: (result) => {
        myshowToast('复制成功！')
      }
    });
    this.hideModal();
  },

  // picker下拉
  more(e) {
    let { id } = e.currentTarget.dataset
    wx.showActionSheet({
      itemList: ['导出', '删除'],
      success: res => {
        console.log(res.tapIndex)
        if (res.tapIndex === 0) {
          this.showDialogBtn(id)
        } else if (res.tapIndex === 1) {
          this.removeResume(id)
        }
      }
    })
  },

  // 编辑简历
  editResume(e) {
    const resumeEditId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../edit/edit?resumeEditId=' + resumeEditId,
    });
  },

  onPullDownRefresh() {
    this.getResumeList()
  },

  onShareAppMessage(res) {
    return {
      title: '简学苑',
      path: '/pages/index/index',
      success: (res) => {
        myshowToast('转发成功！')
      },
      fail: (res) => {
        myshowToast('转发失败！')
      }
    }
  }
>>>>>>> fccf51a... 首次提交
})