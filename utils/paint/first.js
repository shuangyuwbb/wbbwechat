class Paint{
  paint(context){
//设置背景
    context.setFillStyle('#FFFFFF')
    context.fillRect(0, 0, 300, 700)
   
    context.setFillStyle('#030303')
    context.setFontSize(13);
    context.fillText('基本信息',30,20)
    context.setFontSize(10);
    context.fillText('性别：女',40,50);
    context.fillText('qq号：2355346246',40,70);
    context.fillText('电话号码：3215457367',40,90);
    context.fillText('职业意向',180,50);
    context.fillText('年龄：25', 180,70);
    context.fillText('邮箱：3235432@qq.com', 180,90);
    
    context.setFontSize(13);
    context.fillText('教育经历',30,120);
    context.setFontSize(10);
    context.fillText('江西理工大学',40,150);
    context.fillText('本科', 40, 170);
    context.fillText('绩点', 40, 190);
    context.fillText('2017年9月 2021年6月', 180, 150);
    context.fillText('2017年9月 2021年6月', 180, 170);
    context.fillText('3.5', 180, 190);
  
    context.setFontSize(13);
    context.fillText('能力技术', 30, 220);
    context.setFontSize(12);
    context.fillText('项目经历', 35, 250);
    context.setFontSize(10);
    context.fillText('1、曹集购物网站，机构加盟，社交网站', 40, 270);
    context.fillText('2、曹集购物网站，机构加盟，社交网站都是高档货', 40, 290);

    context.setFontSize(12);
    context.fillText('荣誉奖章', 35, 315);
    context.setFontSize(10);
    context.fillText('1、全国大学生数学建模三等奖', 40, 335);
    context.fillText('2、大学生英语竞赛参赛奖', 40,355);
    context.fillText('2、计算机等级考试一等', 40, 375);
    
    context.setFontSize(12);
    context.fillText('即能掌握', 35, 400);
    context.setFontSize(10);
    context.fillText('1、熟悉C++/Java', 40, 420);
    context.fillText('2、学习了数据结构、算法等', 40, 440);
    context.fillText('2、曹集购物网站，机构加盟，社交网站都是高档货', 40, 460);

    context.setFontSize(12);
    context.fillText('实习经历', 35, 485);
    context.setFontSize(10);
    context.fillText('1、顺丰--前端开发', 40, 505);
    context.fillText('2018-2019', 180,505);

    context.draw();
  }
}
export {Paint}

