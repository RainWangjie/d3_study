import * as d3 from 'd3';
import tsv from '../challenge_1/data.tsv';

const city = 'New York';
const width = 800;
const height = 300;
const margin = { top: 20, bottom: 20, left: 20, right: 20 };
const svg = d3
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
  const xExtent = d3.extent(data, d => d.date);
  const xScale = d3
    .scaleTime()
    .domain(xExtent)
    .range([margin.left, width - margin.right]);

  const yMax = d3.max(data, d => d[city]);
  const yScale = d3
    .scaleLinear()
    .domain([0, yMax])
    .range([height - margin.bottom, margin.top]);

  // line data
  const line = d3
    .line()
    .x(d => xScale(d.date))
    .y(d => yScale(d[city]))
    .curve(d3.curveCatmullRom);

  // create the line
  svg
    .append('path')
    .attr('d', line(data))
    .attr('fill', 'none')
    .attr('stroke', 'blue');

  const xAxis = d3
    .axisBottom()
    .scale(xScale)
    .tickFormat(d3.timeFormat('%b %Y'));
  const yAxis = d3.axisLeft().scale(yScale);

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
