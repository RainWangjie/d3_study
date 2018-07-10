// import * as d3 from 'd3';

const marge = { top: 60, bottom: 60, left: 60, right: 60 };
const svg = d3
  .select('body')
  .append('svg')
  .attr('width', 500)
  .attr('height', 500);
const width = svg.attr('width');
const height = svg.attr('height');
const g = svg
  .append('g')
  .attr('transform', 'translate(' + marge.top + ',' + marge.left + ')');

//准备数据
const nodes = [
  //节点集
  { name: '湖南邵阳' },
  { name: '山东莱州' },
  { name: '广东阳江' },
  { name: '山东枣庄' },
  { name: '泽' },
  { name: '恒' },
  { name: '鑫' },
  { name: '明山' },
  { name: '班长' }
];

const edges = [
  //边集
  { source: 0, target: 4, relation: '籍贯', value: 1.3 },
  { source: 4, target: 5, relation: '舍友', value: 1 },
  { source: 4, target: 6, relation: '舍友', value: 1 },
  { source: 4, target: 7, relation: '舍友', value: 1 },
  { source: 1, target: 6, relation: '籍贯', value: 2 },
  { source: 2, target: 5, relation: '籍贯', value: 0.9 },
  { source: 3, target: 7, relation: '籍贯', value: 1 },
  { source: 5, target: 6, relation: '同学', value: 1.6 },
  { source: 6, target: 7, relation: '朋友', value: 0.7 },
  { source: 6, target: 8, relation: '职责', value: 2 }
];

//设置一个color的颜色比例尺，为了让不同的扇形呈现不同的颜色
const colorScale = d3
  .scaleOrdinal()
  .domain(d3.range(nodes.length))
  .range(d3.schemeCategory10);

const forceSimulation = d3
  .forceSimulation()
  .force('link', d3.forceLink())
  .force('charge', d3.forceManyBody())
  .force('center', d3.forceCenter());

//生成节点数据
forceSimulation.nodes(nodes).on('tick', ticked); //这个函数很重要，后面给出具体实现和说明

//生成边数据
forceSimulation
  .force('link')
  .links(edges)
  .distance(function(d) {
    //每一边的长度
    return d.value * 100;
  });

//设置图形的中心位置
forceSimulation
  .force('center')
  .x(width / 2)
  .y(height / 2);

//在浏览器的控制台输出
console.log('nodes', nodes);
console.log('edges', edges);

//绘制边
const links = g
  .append('g')
  .selectAll('line')
  .data(edges)
  .enter()
  .append('line')
  .attr('stroke', function(d, i) {
    return colorScale(i);
  })
  .attr('stroke-width', 1);

const linksText = g
  .append('g')
  .selectAll('text')
  .data(edges)
  .enter()
  .append('text')
  .text(function(d) {
    return d.relation;
  });

const gs = g
  .selectAll('.circleText')
  .data(nodes)
  .enter()
  .append('g')
  .attr('transform', function(d, i) {
    const cirX = d.x;
    const cirY = d.y;
    return 'translate(' + cirX + ',' + cirY + ')';
  })
  .call(
    d3
      .drag()
      .on('start', started)
      .on('drag', dragged)
      .on('end', ended)
  );

//绘制节点
gs.append('circle')
  .attr('r', 10)
  .attr('fill', function(d, i) {
    return colorScale(i);
  });

//文字
gs.append('text')
  .attr('x', -10)
  .attr('y', -20)
  .attr('dy', 10)
  .text(function(d) {
    return d.name;
  });

function ticked() {
  links
    .attr('x1', function(d) {
      return d.source.x;
    })
    .attr('y1', function(d) {
      return d.source.y;
    })
    .attr('x2', function(d) {
      return d.target.x;
    })
    .attr('y2', function(d) {
      return d.target.y;
    });

  linksText
    .attr('x', function(d) {
      return (d.source.x + d.target.x) / 2;
    })
    .attr('y', function(d) {
      return (d.source.y + d.target.y) / 2;
    });

  gs.attr('transform', function(d) {
    return 'translate(' + d.x + ',' + d.y + ')';
  });
}

function started(d) {
  if (!d3.event.active) {
    forceSimulation.alphaTarget(0.8).restart();
    // 设置衰减系数，对节点位置移动过程的模拟，数值越高移动越快，数值范围[0，1]
  }
  d.fx = d.x;
  d.fy = d.y;
}
function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}
function ended(d) {
  if (!d3.event.active) {
    forceSimulation.alphaTarget(0);
  }
  d.fx = null;
  d.fy = null;
}