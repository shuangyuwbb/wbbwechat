import { request } from "../../request/index"
import { myshowToast, baseUrl } from '../../utils/util'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: baseUrl,
    resume_content: [
      {
        jobTag: "",
        resumeCreatetime: "",
        resumeHead: "",
        resumeId: "",
        resumeName: "",
        resumePic: [
        ]
      }
    ],
    style: [
      {
        styleId: 1,
        styleName: "白",
        stylePic: "/style_white.png"
      }
    ],
    num: '',
    scrollLeft: 0,
    display: 'none',
    mask: 'none',
    myfirst: '',
    flag: 'true'
  },

  // 拿到简历信息
  onLoad(options) {
    let resume_content = options.resume_content
    resume_content = JSON.parse(resume_content)
    this.setData({
      resume_content
    })
  },

  onReady() {
    this.getStyleList()
  },
  // 预览切换样式
  handlePreview(e) {
    const styleId = e.currentTarget.dataset.index
    console.log(styleId)
    request({
      url: `resume/update/style/${styleId}/${this.data.resume_content.resumeId}`
    }).then(res => {
      if (!res.data.status) {
        myshowToast(res.data.error)
      } else {
        request({
          url: '/resume/my/' + this.data.resume_content.resumeId
        }).then(res => {
          if (!res.data.status) {
            myshowToast(res.data.error)
          } else {
            this.setData({
              resume_content: res.data.resume_content,
              display: 'none',
              mask: 'none'
            })
          }
        })
      }

    })

  },

  // 前一个
  prev: function (e) {
    if (this.data.scrollLeft > 0) {
      this.setData({
        scrollLeft: this.data.scrollLeft - 85
      })
    }

    console.log(this.data.scrollLeft)
  },
  //下一个
  last: function (e) {

    const width = (this.data.num - 4) * 85
    console.log(width)
    if (this.data.scrollLeft < width) {
      this.setData({
        scrollLeft: this.data.scrollLeft + 85
      })
    }

    console.log(this.data.scrollLeft)
  },

  // 获取样式模板
  getStyleList() {
    request({
      url: `resume/styles`
    }).then(res => {
      if (!res.data.status) {
        myshowToast(res.data.error)
      }
      const { style } = res.data
      const num = style.length
      this.setData({
        style,
        num
      })
    })
  },

  // 放大图片
  changeStyle() {
    this.setData({
      flag: !this.data.flag,
    })
  },

  onPullDownRefresh() {
    request({
      url: '/resume/my/' + this.data.resume_content.resumeId
    }).then(res => {
      this.setData({
        resume_content: res.data.resume_content
      })
    })
  },

})
