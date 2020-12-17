import { request } from '../../request/index';
import { myshowToast, getChangeJson, baseUrl } from '../../utils/util'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    baseUrl: baseUrl,
    job_tag: [],
    jobTag: '',
    resumeName: '我的简历',
    jobTagId: '',
    html_content: [],
    resume_content: {},
    formList: [
      { fieldId: 2, fieldContent: '' },
      { fieldId: 4, fieldContent: '' },
      { fieldId: 3, fieldContent: '' },
      { fieldId: 5, fieldContent: '' },
      { fieldId: 11, fieldContent: '' },
      { fieldId: 23, fieldContent: '' },
      { fieldId: 13, fieldContent: '' },
      { fieldId: 15, fieldContent: '' },
      { fieldId: 17, fieldContent: '' },
      { fieldId: 14, fieldContent: '' },
      { fieldId: 16, fieldContent: '' },
      { fieldId: 24, fieldContent: '' },
      { fieldId: 26, fieldContent: '' },
      { fieldId: 25, fieldContent: '' },
      { fieldId: 27, fieldContent: '' },
      { fieldId: 18, fieldContent: '' },
      { fieldId: 19, fieldContent: '' },
      { fieldId: 20, fieldContent: '' },
      { fieldId: 21, fieldContent: '' },
    ],
    pict: '../../images/uexpand.png',
    pict1: '../../images/expand.png',
    diaplay: 'block',
    src1: '../../images/addpict.png',
    resumeId: '',
    resumeEditId: '',
    src: '../../images/addpict.png',
    baseInfo: [
      { fieldId: 2, fieldContent: '' },
      { fieldId: 4, fieldContent: '' },
      { fieldId: 3, fieldContent: '' },
      { fieldId: 5, fieldContent: '' },
      { fieldId: 11, fieldContent: '' },
      { fieldId: 23, fieldContent: '' }
    ],
    edu: [
      { fieldId: 13, fieldContent: '' },
      { fieldId: 15, fieldContent: '' },
      { fieldId: 17, fieldContent: '' },
      { fieldId: 14, fieldContent: '' },
      { fieldId: 16, fieldContent: '' }
    ],
    jobSum: [
      { fieldId: 24, fieldContent: '' },
      { fieldId: 26, fieldContent: '' },
      { fieldId: 25, fieldContent: '' },
      { fieldId: 27, fieldContent: '' }
    ],
    experance: [
      { fieldId: 18, fieldContent: '' },
      { fieldId: 19, fieldContent: '' },
      { fieldId: 20, fieldContent: '' },
      { fieldId: 21, fieldContent: '' },
    ],
    experanceList: [],
  },

  // 获取简历id
  onLoad(options) {
    let { resumeId, resumeEditId } = options || ''
    this.setData({
      resumeId,
      resumeEditId
    })
    if (resumeEditId) {
      this.getResumeMsg()
      this.refresh()
    }
  },

  onShow() {
   
    const pages = getCurrentPages()
    const currPage = pages[pages.length - 1]
    let obj = currPage.data.obj || ''
    let base = currPage.data.base || ''

    if (obj) {
      const object = JSON.parse(obj)
      this.data.formList.forEach(v => {
        if (v.fieldId === object.fieldId) {
          v.fieldContent = object.fieldContent
        }
      })
    }
    if (base) {
      const object = JSON.parse(base)
      this.getObjectItem(object)
    }
    const experanceList = this.getJsonKey(this.data.experance)
    this.setData({
      experanceList
    })

    this.getChangeArray(this.data.formList)
  },

  // 教育经历
  editEduDetail() {
    let edu = getChangeJson(this.data.edu)
    wx.navigateTo({
      url: `../detail/detail?baseInfo=` + edu,
    });
  },

  // 编辑基础信息
  editBasicInfo() {
    let baseInfo = getChangeJson(this.data.baseInfo)
    wx.navigateTo({
      url: '../detail/detail?baseInfo=' + baseInfo
    });
  },

  // 编辑求职总结
  editJobSum() {
    let jobSum = getChangeJson(this.data.jobSum)
    wx.navigateTo({
      url: '../detail/detail?baseInfo=' + jobSum
    });
  },
  // 添加项目经历等
  addItem(e) {
    let experance = this.data.experance
    let item = {}
    experance.forEach(element => {
      if (element.fieldId == e.currentTarget.dataset.field) {
        item.fieldId = element.fieldId
        item.fieldContent = element.fieldContent
      }
    })
    wx.navigateTo({
      url: '../add-item/item?item=' + getChangeJson(item),
    });
  },

  // 预览建立
  preview() {
    wx.navigateTo({
      url: '../preview/preview',
    });
  },

  // 提交保存
  save() {
    let realData = this.checkForm(this.data.formList)
    console.log(realData)
    let resumeId = this.getResumeId()
    request({
      url: `resume/update/field/${resumeId}`,
      method: 'POST',
      data: getChangeJson(realData)
    }).then(res => {
      if (res.data.status) {
        myshowToast(res.data.success, this.goTab)
      } else {
        myshowToast(res.data.error)
      }
    })
  },

  // 获取简历信息
  getResumeMsg() {
    this.refresh()
    request({
      url: `resume/edit/wechat/${this.data.resumeEditId}`
    }).then((res) => {
      if (res.data.status) {
        this.setData({
          html_content: res.data.html_content
        })
        this.formListCopy()
        this.getChangeArray(this.data.formList)
      }
    })
  },

  //上传头像
  chooseImage() {
    let resumeId = this.getResumeId()
    
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success:res=> {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.uploadFile({
          url: `${this.data.baseUrl}resume/update/head/${resumeId}`, //
          filePath: tempFilePaths[0],
          name: 'headImg',
          formData: {
            'user': 'test'
          },
          header :{
            'content-type': 'application/json',
            'Cookie': wx.getStorageSync('PHPSESSID')
          },
          success:res =>{
           this.refresh()
          },
          fail:err => {
            console.log(err)
          }
        })
      }
    })
  },

  // 搜索工作标签
  searchJobTag(e) {
    const { value } = e.detail
    if (value) {
      request({
        url: `/tag/job/${value}`,
      }).then((res) => {
        if (!res.data.status) {
          myshowToast(res.data.error)
        } else {
          const { job_tag } = res.data
          this.setData({
            job_tag
          })
        }
      })
    }

  },

  // 选择工作标签
  chooseTag(e) {
    const jobTagObj = e.currentTarget.dataset.text
    const jobTagId = jobTagObj.split(':')[1]
    const jobTag = jobTagObj.split(':')[0]
    this.setData({
      jobTag,
      jobTagId,
      job_tag: ''
    })

  },

  // 保存工作标签
  saveJobTag() {
    const resumeId = this.getResumeId()
    request({
      url: `/resume/update/tag/${resumeId}/${this.data.jobTagId}`,
    }).then(res => {
      if (res.data.status === true) {
        myshowToast(res.data.success)
      } else {
        myshowToast(res.data.error)
      }
    })
  },

  // 获取简历名称并更新简历
  getResumeName(e) {
    const resumeId = this.getResumeId()
    const { value } = e.detail
    request({
      url: `resume/update/name/${resumeId}/${value}`
    }).then(res => {
      if (!res.data.status) {
        myshowToast(res.data.error)
      } else {
        myshowToast(res.data.success)
      }
    })
  },

  getJsonKey(object) {
    let list = []
    object.forEach(element => {
      list.push(element.fieldId)
    });
    return list
  },

  // 判断是编辑还是创建获取对应简历id
  getResumeId() {
    let resumeId = ''

    if (this.data.resumeEditId) {
      resumeId = this.data.resumeEditId
    } else {
      resumeId = this.data.resumeId
    }
    return resumeId
  },

  onPullDownRefresh() {
    this.refresh()
  },

  // 风格对象并对应位置赋值formlist
  getObjectItem(object) {
    let arr = []
    for (let key in object) {
      let obj = {}
      obj.fieldId = key
      obj.fieldContent = object[key]
      arr.push(obj)
    }
    this.data.formList.forEach(v => {
      arr.forEach(m => {
        if (v.fieldId == m.fieldId) {
          v.fieldContent = m.fieldContent
        }
      })
    })
  },

  //校验为空去除
  checkForm(array) {
    let result = []
    array.forEach(v => {
      if (!v.fieldContent == '') {
        result.push(v)
      }
    })
    return result
  },

  // 遍历数组，根据fieldId分类
  getChangeArray(array) {
    let baseInfo = this.data.baseInfo
    let edu = this.data.edu
    let jobSum = this.data.jobSum
    let experance = this.data.experance
    array.forEach(element => {
      if (element.fieldId < 12 || element.fieldId === 23) {
        baseInfo.forEach(v => {
          if (v.fieldId === element.fieldId) {
            v.fieldContent = element.fieldContent
          }
        })

      } else if (element.fieldId > 12 && element.fieldId < 18) {
        edu.forEach(v => {
          if (v.fieldId === element.fieldId) {
            v.fieldContent = element.fieldContent
          }
        })
      } else if (element.fieldId >= 18 && element.fieldId < 22) {
        experance.forEach(v => {

          if (v.fieldId === element.fieldId) {
            v.fieldContent = element.fieldContent
          }
        })
      } else if (element.fieldId >= 24 && element.fieldId < 28) {
        jobSum.forEach(v => {

          if (v.fieldId === element.fieldId) {
            v.fieldContent = element.fieldContent
          }
        })
      }
    })
    this.setData({
      baseInfo,
      edu,
      experance,
      jobSum
    })
  },

  goTab() {
    wx.switchTab({
      url: '../index/index',
    });
  },

  // 赋值保存
  formListCopy() {
    this.data.formList.forEach(v => {
      this.data.html_content.forEach(m => {
        if (v.fieldId === m.fieldId) {
          v.fieldContent = m.fieldContent
        }
      })
    })
  },

  // 删除照片
  removePict() {
    const resumeId = this.getResumeId()
    request({
      url: `/resume/update/head/remove/${resumeId}`
    }).then(res =>{
      if(!res.data.status){
        myshowToast(res.data.error)
      }else{
        this.refresh()
      }
      
    })
  },

  // shuaxin
  refresh() {
    const resumeId = this.getResumeId()
    request({
      url: '/resume/my/' + resumeId
    }).then(res => {
      this.setData({
        resumeName: res.data.resume_content.resumeName,
        jobTag: res.data.resume_content.jobTag
      })
      console.log(res.data)
      if(res.data.resume_content.resumeHead){
        this.setData({
          src: this.data.baseUrl+res.data.resume_content.resumeHead,
          flag: true
        })
      }else{
        this.setData({
          src: this.data.src1,
          flag: false
        })
      }
    })
  }
})