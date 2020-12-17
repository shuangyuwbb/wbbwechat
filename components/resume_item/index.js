// component/resume_item/index.js
Component({
  /**
   * 组件的属性列表
   */
  data: {
    src: null,
    time: '2019-12-7 22:10',
    work: 'Java后端工程师',
  },


  created: function() {
    wx.getStorage({
      key: 'picture',
      success: (res) => {
        this.setData({
          src: res.data,
        })
      },
    })
  },
  detached: function() {
    // 在组件实例被从页面节点树移除时执行
  },


  properties: {

  },

  /**
   * 组件的初始数据
   */

  /**
   * 组件的方法列表
   */
  methods: {
    
    onShareAppMessage: function() {

    }
  }
})