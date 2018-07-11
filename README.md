# D3 学习

D3 (或者叫 D3.js )是一个基于 web 标准的 JavaScript 可视化库. D3 可以借助 SVG, Canvas 以及 HTML 将你的数据生动的展现出来. D3 结合了强大的可视化交互技术以及数据驱动 DOM 的技术结合起来, 让你可以借助于现代浏览器的强大功能自由的对数据进行可视化。

## 坐标系

左上角为原点，同 `canvas`，向右为 X 轴正方向，向下为 Y 轴正方向

## API

> select

```js
// 类 jq 选择器
const svg = d3.select('svg');
svg.selectAll('.MyRect');
```

> data

```js
// 绑定数据
const dataset = [30, 10, 43, 55, 13];
svg.selectAll('.MyRect').data(dataset);
```

> enter,append

```js
// 添加 element 至 svg
svg
  .selectAll('.MyRect')
  .data(dataset)
  .enter()
  .append('rect');
```

> scale,axis

```js
// 数据与图示比例关系；Y轴数据对应高度；[0,100] =>[0,500]
const yScale = d3
  .scaleLinear()
  .domain([0, 100])
  .range([0, 500]);

// 定义左侧Y轴，并绑定Scale
const yAxis = d3.axisLeft().scale(yScale);
```

综合应用

```js
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
    return yScale(d);
  })
  .attr('width', function() {
    return xScale.step() - rectPadding;
  })
  .attr('height', function(d) {
    return height - padding.top - padding.bottom - yScale(d);
  })
  .attr('fill', 'blue');

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
```

![rect](/assets/rect.png)

### challenge：create a chart

## Site

[官方 API](https://github.com/d3/d3/blob/master/API.md)

[D3 示例](https://bl.ocks.org/) 

[D3 在线编辑器](http://blockbuilder.org/) 类似`Codepen`

### 附：

[D3.js v5 入门教程](https://blog.csdn.net/qq_34414916/article/details/80026029)

[D3.js v3 入门教程](http://wiki.jikexueyuan.com/project/d3wiki/introduction.html)
