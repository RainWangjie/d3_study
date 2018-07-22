import * as d3 from 'd3';
import csv from './barleyfull.csv';
// properties
const radius = 10;
const duration = 1500;
const width = 800;
const height = 600;
const svg = d3
  .select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

const g = svg.append('g').attr('transform', `translate(${radius},0)`);
// scales
const xScale = d3.scaleBand().rangeRound([0, width]);
const yScale = d3.scaleLinear().range([height, 0]);
const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
const t = d3.transition().duration(1000);
function update(data, year) {
  const _data = data.filter(d => d.year === year);

  let circles = g.selectAll('circle').data(_data, d => d.key);

  circles
    .exit()
    .transition(t)
    .attr('r', 0)
    .remove();

  circles
    .enter()
    .append('circle')
    .attr('r', radius)
    .attr('cy', d => yScale(d.yield))
    .merge(circles)
    .attr('cx', d => xScale(d.site))
    .transition(t)
    .attr('cy', d => yScale(d.yield))
    .attr('fill', d => colorScale(d.gen));
}

d3.csv(csv).then(response => {
  console.log(response);
  response.forEach(function(d) {
    // convert yield and year from string to int
    d.year = +d.year;
    d.yield = +d.yield;
    // use gen and site as the unique key for each datum
    d.key = d.site + ':' + d.gen;
  });

  const xDomain = response.map(d => d.site);
  xScale.domain(xDomain);

  const yMax = d3.max(response, d => d.yield);
  yScale.domain([0, yMax]);
  const startYear = 1927;
  const numYears = 9;
  let index = 0;
  //   update(response, startYear);
  setInterval(() => {
    update(response, startYear + (index % numYears));
    index += 1;
  }, duration);
});
