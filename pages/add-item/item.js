// pages/add-item/item.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addExperience: "添加",
    fieldId: '',
    array: [0],
    inputVal: []
  },

  onLoad(options) {

    const { item } = options || ''
    let itemObj = {}
    if(item){
      itemObj = JSON.parse(item)
      this.getChengeStr(itemObj)
    }
    if (itemObj.fieldId == 18) {
      this.setData({
        fieldId: itemObj.fieldId
      })
    } else if (itemObj.fieldId == 19) {
      this.setData({
        fieldId: itemObj.fieldId
      })
    } else if (itemObj.fieldId == 20) {
      this.setData({
        fieldId: itemObj.fieldId
      })
    } else {
      this.setData({
        fieldId: itemObj.fieldId
      })
    }

  },
  //获取input的值
  getInputVal(e) {
    var nowIdx = e.currentTarget.dataset.idx;//获取当前索引
    var val = e.detail.value;//获取输入的值
    var oldVal = this.data.inputVal;
    console.log(val)
    oldVal[nowIdx] = val;//修改对应索引值的内容
    this.setData({
      inputVal: oldVal
    })
  },
  //添加input
  addItem() {
    var old = this.data.array;
    old.push(1);//这里不管push什么，只要数组长度增加1就行
    this.setData({
      array: old
    })
  },
  //删除input
  delInput(e) {

    var nowidx = e.currentTarget.dataset.idx;//当前索引
    console.log(e)
    var oldInputVal = this.data.inputVal;//所有的input值
    var oldarr = this.data.array;//循环内容
    oldarr.splice(nowidx, 1);    //删除当前索引的内容，这样就能删除view了
    oldInputVal.splice(nowidx, 1);//view删除了对应的input值也要删掉
    if (oldarr.length < 1) {
      oldarr = [0]  //如果循环内容长度为0即删完了，必须要留一个默认的。这里oldarr只要是数组并且长度为1，里面的值随便是什么
    }
    this.setData({
      array: oldarr,
      inputVal: oldInputVal
    })
  },

  // 字符串格式处理
  getStrVal(array) {
    let str = ''
    array.forEach(element => {
      str += element + '#'
    })
    str = str.slice(0, -1)
    return str
  },

  // 风格字符
  getChengeStr(obj) {
    console.log(obj.fieldContent)
    let item = obj.fieldContent.split('#')
    this.setData({
      array: item,
      inputVal: item
    })
  },

  save() {
    const pages = getCurrentPages()
    const prevPage = pages[pages.length - 2]

    let obj = {}
    const str = this.getStrVal(this.data.inputVal)
    const fieldId = this.data.fieldId
    obj['fieldId'] = fieldId
    obj['fieldContent'] = str
    const object = JSON.stringify(obj)
    prevPage.setData({
      obj: object
    })
    wx.navigateBack({
      delta: 1
    })
  }
})