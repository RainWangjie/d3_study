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

> extent

```js
// 对data有序化，返回[min,max],同d3.min,d3.max
d3.extent(data, d => d.date);
```

## Shape

> Line(Path，贝塞尔，)

简化 SVG path 元素 code，例：`<path d="M10 10 H 90 V 90 H 10 L 10 10"/>`

```js
// line data
const line = d3
  .line()
  // x轴赋值
  .x(d => xScale(d.date))
  // y轴赋值
  .y(d => yScale(d[city]))
  // 非直线连接，贝塞尔曲线连接数据点
  .curve(d3.curveCatmullRom);
```

> Pie(arc)

闭合的 path 形成扇形，多个 arc 组成圆型（饼图）

```js
const dataset = [30, 10, 43, 55, 13];
const arc = d3
  .arc()
  .innerRadius(0)
  .outerRadius(100);
```

## Transitons

示例：

- [柱状图](https://codesandbox.io/s/l7w21xokvq)
- [饼图](https://codesandbox.io/s/xokn5pn4j4)
- [关系图](https://codesandbox.io/s/zr37vwyvo3)
- [tree 图](https://codesandbox.io/s/6y77wp46vn)

需加载 tsv or json 文件，codesandbox fetch 遇到点问题，暂放在工程内

- challenge_1 : `yarn run challenge_1`，柱状图
- challenge_2 : `yarn run challenge_2`，折线图

## Site

[官方 API](https://github.com/d3/d3/blob/master/API.md)

[D3 示例](https://bl.ocks.org/) 

[D3 在线编辑器](http://blockbuilder.org/) 类似`Codepen`

### 附：

[D3.js v5 入门教程](https://blog.csdn.net/qq_34414916/article/details/80026029)

[D3.js v3 入门教程](http://wiki.jikexueyuan.com/project/d3wiki/introduction.html)
