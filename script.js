const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

const WIDTH = 800;
const HEIGHT = 600;

const PAD = (984 - WIDTH) / 2;

const svg = d3.select("svg");

let xAxisScale;
let yAxisScale;
let xScale;
let yScale;

const drawCanvas = () => {
  svg.attr("width", WIDTH);
  svg.attr("height", HEIGHT);
};

const generateScales = (values) => {
  yScale = d3
    .scaleLinear()
    .domain([0, d3.max(values, (item) => item[1])])
    .range([0, HEIGHT - 2 * PAD]);
  xScale = d3
    .scaleLinear()
    .domain([0, values.length - 1])
    .range([PAD, WIDTH - PAD]);

  const datesArr = values.map((item) => {
    return new Date(item[0]);
  });

  xAxisScale = d3
    .scaleTime()
    .domain([d3.min(datesArr), d3.max(datesArr)])
    .range([PAD, WIDTH - PAD]);
  yAxisScale = d3
    .scaleTime()
    .domain([0, d3.max(values, (item) => item[1])])
    .range([HEIGHT - PAD, PAD]);
};

const generateAxes = () => {
  const xAxis = d3.axisBottom(xAxisScale);
  const yAxis = d3.axisLeft(yAxisScale);

  svg
    .append("g")
    .call(xAxis)
    .attr("id", "x-axis")
    .attr("transform", "translate(0, " + (HEIGHT - PAD) + ")");

  svg
    .append("g")
    .call(yAxis)
    .attr("id", "y-axis")
    .attr("transform", "translate(" + PAD + ", 0)");
};

const drawBars = (values) => {
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("id", "tooltip")
    .style("visibility", "hidden")

  svg
    .selectAll("rect")
    .data(values)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("data-date", (item) => item[0])
    .attr("data-gdp", (item) => item[1])
    .attr("width", (WIDTH - 2 * PAD) / values.length)
    .attr("height", (item) => yScale(item[1]))
    .attr("y", (item) => HEIGHT - PAD - yScale(item[1]))
    .attr("x", (item, index) => xScale(index))
    .on("mouseover", (e, item) => {
      tooltip.transition().style("visibility", "visible");
      tooltip.text(item[0]);
    })
    .on("mouseout", (e, item) => {
      tooltip.transition().style("visibility", "hidden");
      tooltip.text(item[0]);
      
      document.querySelector('#tooltip').setAttribute('data-date', item[0])
    });
};

// request data
async function getData() {
  const res = await fetch(url);
  const jsonData = await res.json();
  const { data: values } = jsonData;
  drawCanvas();
  generateScales(values);
  generateAxes();
  drawBars(values);
}

getData();
