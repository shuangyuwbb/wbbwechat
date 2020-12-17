// component/image-dot.js
Component({
  /**
   * 组件的属性列表
   */
  options:{
    multipleSlots:true
  },
  properties: {
    openType:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: ['删除','导出']
  },

  /**
   * 组件的方法列表
   */
  methods: {
    change() {
      
    }
  }
})
