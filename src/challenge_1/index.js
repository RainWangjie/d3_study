import * as d3 from 'd3';
import tsv from './data.tsv';

const city = 'New York';
const width = 800;
const height = 300;
const margin = { top: 20, bottom: 20, left: 20, right: 20 };
var svg = d3
  .select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

// dataset of city temperatures across time
d3.tsv(tsv).then(data => {
  console.log('data', data);
  // clean the data
  data.forEach(d => {
    d.date = d3.timeParse('%Y%m%d')(d.date);
    d.date = new Date(d.date); // x data
    d[city] = ++d[city]; // y data
  });

  // scales
  var xExtent = d3.extent(data, d => d.date);
  var xScale = d3
    .scaleTime()
    .domain(xExtent)
    .range([margin.left, width - margin.right]);
  //      	var yExtent = d3.extent(data, d => d[city]);
  var yMax = d3.max(data, d => d[city]);
  var yScale = d3
    .scaleLinear()
    .domain([0, yMax])
    .range([height - margin.bottom, margin.top]);

  var heightScale = d3
    .scaleLinear()
    .domain([0, yMax])
    .range([0, height - margin.top - margin.bottom]);

  // create the rectangles
  var rect = svg
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('width', 2)
    .attr('height', function(d) {
      return heightScale(d[city]);
    })
    .attr('x', function(d) {
      return xScale(d.date);
    })
    .attr('y', function(d) {
      return yScale(d[city]);
    })
    .attr('fill', 'blue')
    .attr('stroke', 'white');

  var xAxis = d3
    .axisBottom()
    .scale(xScale)
    //       	.tickFormat(d => d3.timeFormat('%b %Y')(d));
    .tickFormat(d3.timeFormat('%b %Y'));
  var yAxis = d3.axisLeft().scale(yScale);

  // 添加绑定X轴
  svg
    .append('g')
    .attr('transform', 'translate(' + [0, height - margin.bottom] + ')')
    .call(xAxis);
  // 添加绑定Y轴
  svg
    .append('g')
    .attr('transform', 'translate(' + [margin.left, 0] + ')')
    .call(yAxis);
});
