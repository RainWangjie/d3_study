// import * as d3 from 'd3';

const marge = { top: 60, bottom: 60, left: 60, right: 60 };
const svg = d3
  .select('body')
  .append('svg')
  .attr('width', 400)
  .attr('height', 400);
const width = svg.attr('width');
const height = svg.attr('height');
const g = svg
  .append('g')
  .attr('transform', 'translate(' + marge.top + ',' + marge.left + ')');

const dataset = [30, 10, 43, 55, 13]; //需要将这些数据变成饼状图的数据

//设置一个color的颜色比例尺，为了让不同的扇形呈现不同的颜色
const colorScale = d3
  .scaleOrdinal()
  .domain(d3.range(dataset.length))
  .range(d3.schemeCategory10);

//新建一个饼状图
const pie = d3.pie();

//新建一个弧形生成器
const innerRadius = 0; //内半径
const outerRadius = 100; //外半径
const arc_generator = d3
  .arc()
  .innerRadius(0)
  .outerRadius(100);

//将原始数据变成可以绘制饼状图的数据，
const pieData = pie(dataset);

//在浏览器的控制台打印pieData
console.log(pieData);

const gs = g
  .selectAll('.g')
  .data(pieData)
  .enter()
  .append('g')
  .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')'); //位置信息

//绘制饼状图的各个扇形
gs.append('path')
  .attr('d', function(d) {
    return arc_generator(d); //往弧形生成器中出入数据
  })
  .attr('fill', function(d, i) {
    return colorScale(i); //设置颜色
  });
