<<<<<<< HEAD
// pages/more/more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
})
=======
// pages/data/data.js

import * as echarts from '../../components/ec-canvas/echarts'
import { myshowToast, getPixelRatio } from '../../utils/util'
import { request } from '../../request/index'

var Chart = []

Page({

  data: {
    jobTagName: 'java后端工程师',
    job_tag: [],
    city: [],
    education: [],
    salary: [],
    experience: [],
    skill: [],
    tagId: 2,

    xDataPay : [],
    dataListPay : [],
    dataEdu : [],
    xDataEdu : [],
    xDataSki : [],
    dataSki : [],
    dataListJob : [],
    xDataJob : [],
   


    ec1: {
      lazyLoad: true // 延迟加载
    },
    ec2: {
      lazyLoad: true // 延迟加载
    },
    ec3: {
      lazyLoad: true // 延迟加载
    },
    ec4: {
      lazyLoad: true // 延迟加载
    },
    ec5: {
      lazyLoad: true // 延迟加载
    }

  },

  onShow: function () {
    // 薪资折线图
    this.echartsComponnet1 = this.selectComponent('#mychart1')
    // 学历pie图
    this.echartsComponnet2 = this.selectComponent('#mychart2')
    // 技能pie图
    this.echartsComponnet3 = this.selectComponent('#mychart3')
    // 工作经历
    this.echartsComponnet4 = this.selectComponent('#mychart4')
    // 工作经历
    this.echartsComponnet5 = this.selectComponent('#mychart5')

    this.getTagData(this.data.tagId)
    this.goTop()
  },
  // 获取数据
  getData: function () {

    this.data.dataListPay = this.dataDeal(this.data.salary)
    this.data.xDataPay = this.dataDealSpilt(this.data.salary)

    this.data.dataEdu = this.dataDeal(this.data.education)
    this.data.xDataEdu = this.dataDealSpilt(this.data.education)

    this.data.xDataSki = this.dataDealSpilt(this.data.skill)
    this.data.dataSki = this.dataDeal(this.data.skill)

    this.data.dataListJob = this.dataDeal(this.data.experience)
    this.data.xDataJob = this.dataDealSpilt(this.data.experience)
    // //如果是第一次绘制
    if (!Chart[0]) {
      this.init_echarts(1); //初始化图表
    } else {
      this.setOption(1); //更新数据
    }
    if (!Chart[1]) {
      this.init_echarts(2); //初始化图表
    } else {
      this.setOption(2); //更新数据
    }
    if (!Chart[2]) {
      this.init_echarts(3); //初始化图表
    } else {
      this.setOption(3); //更新数据
    }
    if (!Chart[3]) {
      this.init_echarts(4); //初始化图表
    } else {
      this.setOption(4); //更新数据
    }
  },
  //初始化图表
  init_echarts: function (i) {
    this['echartsComponnet' + i].init((canvas, width, height) => {
      // 初始化图表
      Chart[i - 1] = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: getPixelRatio()
      });
      this.setOption(i);
      return Chart[i - 1];
    });
  },

  setOption: function (i) {
    Chart[i - 1].clear();  // 清除
    Chart[i - 1].setOption(this['getOption' + i]());  //获取新数据
  },

  // 折线图
  getOption1: function () {
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: '薪资分布',
        left: 'center'
      },

      tooltip: {
        show: true,
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: this.data.xDataPay,
        axisLabel: {
          interval: 0,      //坐标轴刻度标签的显示间隔(在类目轴中有效) 0:显示所有  1：隔一个显示一个 :3：隔三个显示一个...
          rotate: -20,   //标签倾斜的角度，显示不全时可以通过旋转防止标签重叠（-90到90）
          fontSize: "8"
        },
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: this.data.dataListPay,
        type: 'line'
      }]
    }
    return option;
  },

  // 学历pie图
  getOption2: function () {
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: '学历要求',
        left: 'center'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: this.data.xDataEdu
      },
      series: [{

        type: 'pie',
        center: ['50%', '50%'],
        radius: '50%',
        data: this.data.dataEdu
      }],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        }
      }
    };

    return option;
  },

  // 热门技能
  getOption3: function () {
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: '技能要求',
        left: 'center'
      },
      series: [{

        type: 'pie',
        center: ['50%', '50%'],
        radius: '50%',
        data: this.data.dataSki
      }],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    };

    return option;
  },

  // 工作经验bar图
  getOption4: function () {
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: '工作经历',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: this.data.xDataJob
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      yAxis: {
        type: 'value'
      },
      xAxis: {
        type: 'category',
        data: this.data.xDataJob,
        axisLabel: {
          interval: 0,      //坐标轴刻度标签的显示间隔(在类目轴中有效) 0:显示所有  1：隔一个显示一个 :3：隔三个显示一个...
          rotate: -20,  //标签倾斜的角度，显示不全时可以通过旋转防止标签重叠（-90到90）
          fontSize: "8"
        },
      },
      series: [
        {
          data: this.data.dataListJob,
          type: 'bar',
          barWidth: 20,

        },

      ],

    };

    return option;
  },

  // 获取输入框数据发送请求
  getInputValue(e) {
    const { value } = e.detail
    if (value) {
      request({
        url: `tag/job/${value}`
      }).then((res) => {
        const { job_tag } = res.data
        this.setData({
          job_tag
        })
      })
    }
  },

  // 选择工作标签&发送标签对应请求数据
  chooseJobTag(e) {
    const tagObj = e.currentTarget.dataset.text
    const tagId = tagObj.split(':')[1]
    const jobTagName = tagObj.split(':')[0]
    this.setData({
      job_tag: [],
      jobTagName
    })
    this.getTagData(tagId)
  },

  // 发送请求
  getTagData(id) {
    request({
      url: `analyze/${id}`
    }).then(res => {
      if (!res.data.status) {
        myshowToast(res.data.error)
      } else {
        const { education } = res.data
        const { city } = res.data
        const { experience } = res.data
        const { salary } = res.data
        const { skill } = res.data
        this.setData({
          education,
          city,
          experience,
          salary,
          skill
        })
      }
      this.getData()
    })
  },

  // 数据处理饼状图
  dataDeal(arrData) {
    let obj = arrData.map(item => {
      return {
        'name': item.content,
        'value': item.times
      }
    })
    return obj
  },

  // 数据处理分解
  dataDealSpilt(arrData) {
    let xDataPay = []
    arrData.forEach(element => {
      xDataPay.push(element.content)
    })
    return xDataPay
  },

  // 页面隐藏消坏
  onHide: function () {
    for (let i = 0; i < Chart.length; i++) {
      Chart[i].clear()
    }
    this.setData({
      jobTagName: ''
    })
  },

  // 转换函数，返回数据为x,y,value
  convertData: function (data) {
    let res = []
    console.log(data)
    for (let i = 0; i < data.length; i++) {
      let geoCoord = geoCoordMap[data[i].name]  //得到对应坐标
      if (geoCoord) {  //判断data第i个的name对应的地理坐标是否存在
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value)  //两个value值连接
        });
      }
    }
    return res;
  },

  goTop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {//判断这个方法是否可用
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  }

})
>>>>>>> fccf51a... 首次提交
