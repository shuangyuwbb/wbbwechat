// component/resume_item/index.js
Component({
  /**
   * 组件的属性列表
   */

 
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    src: '',
    time: '2019-12-7 22:10',
    work: 'Java后端工程师',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    more:function(event){
      this.triggerEvent('more',event.detail,{})
      console.log(3333)
    },
    
    onShareAppMessage: function() {
     
    }
  }
})
