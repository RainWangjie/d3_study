// import * as d3 from 'd3';

//画布大小
const width = 400;
const height = 400;

//在 body 里添加一个 SVG 画布
const svg = d3
  .select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

//画布周边的空白
const padding = { left: 30, right: 30, top: 20, bottom: 20 };

//定义一个数组
const dataset = [10, 20, 30, 40, 33, 24, 12, 5];

//x轴的比例尺
const xScale = d3
  .scaleBand()
  .domain(d3.range(dataset.length))
  .rangeRound([0, width - padding.left - padding.right]);

//y轴的比例尺
const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset)])
  .range([height - padding.top - padding.bottom, 0]);

//定义x轴
const xAxis = d3.axisBottom().scale(xScale);

//定义y轴
const yAxis = d3.axisLeft().scale(yScale);

//矩形之间的空白
const rectPadding = 4;

//添加矩形元素
const rects = svg
  .selectAll('.MyRect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr('class', 'MyRect')
  .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
  .attr('x', function(d, i) {
    return xScale(i) + rectPadding / 2;
  })
  .attr('y', function(d) {
    //这里是要改变的，即初始状态
    const min = yScale.domain()[0];
    return yScale(min); //可以得知，这里返回的是最大值
  })
  .attr('width', function() {
    return xScale.step() - rectPadding;
  })
  .attr('height', function(d) {
    //这里要改变，即初始状态
    return 0;
  })
  .attr('fill', 'blue')
  .transition() //添加过渡
  .duration(1000) //持续时间
  .delay(function(d, i) {
    //延迟
    return i * 400;
  })
  // .ease(d3.easeElasticInOut) //这里读者可以自己将注释去掉，看看效果（chrome浏览器会报错，但是不影响效果）
  .attr('y', function(d) {
    //回到最终状态
    return yScale(d);
  })
  .attr('height', function(d) {
    //回到最终状态
    return height - padding.top - padding.bottom - yScale(d);
  });

svg
  .selectAll('.MyRect')
  .on('mouseover', function() {
    d3.select(this)
      .transition()
      .duration(1500) //当鼠标放在矩形上时，矩形变成黄色
      .attr('fill', 'yellow');
  })
  .on('mouseout', function() {
    d3.select(this)
      .transition()
      .delay(1500)
      .duration(1500) //当鼠标移出时，矩形变成蓝色
      .attr('fill', 'blue');
  });

//添加文字元素
const texts = svg
  .selectAll('.MyText')
  .data(dataset)
  .enter()
  .append('text')
  .attr('class', 'MyText')
  .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
  .attr('x', function(d, i) {
    return xScale(i) + rectPadding / 2;
  })
  .attr('y', function(d) {
    const min = yScale.domain()[0];
    return yScale(min);
  })
  .attr('dx', function() {
    (xScale.step() - rectPadding) / 2;
  })
  .attr('dy', 20)
  .text(function(d) {
    return d;
  })
  .transition()
  .duration(1000)
  .delay(function(d, i) {
    return i * 400;
  })
  //.ease(d3.easeElasticInOut)
  .attr('y', function(d) {
    return yScale(d);
  });

//添加x轴
svg
  .append('g')
  .attr('class', 'axis')
  .attr(
    'transform',
    'translate(' + padding.left + ',' + (height - padding.bottom) + ')'
  )
  .call(xAxis);

//添加y轴
svg
  .append('g')
  .attr('class', 'axis')
  .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
  .call(yAxis);
