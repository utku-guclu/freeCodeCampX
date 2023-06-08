const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

const WIDTH = 800;
const HEIGHT = 600;

const PAD = (984 - WIDTH) / 2;

const svg = d3.select("svg");
let tooltip = d3.select("#tooltip");

let xScale;
let yScale;

const drawCanvas = () => {
  svg.attr("width", WIDTH);
  svg.attr("height", HEIGHT);
};

const generateScales = (values) => {
  xScale = d3
    .scaleLinear()
    .domain([
      d3.min(values, (item) => item["Year"] - 1),
      d3.max(values, (item) => item["Year"] + 1),
    ])
    .range([PAD, WIDTH - PAD]);
  yScale = d3
    .scaleTime()
    .domain([
      d3.min(values, (item) => new Date(item["Seconds"] * 1000)),
      d3.max(values, (item) => new Date(item["Seconds"] * 1000)),
    ])
    .range([PAD, HEIGHT - PAD]);
};

const generateAxes = () => {
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
  const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));

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

const drawPoints = (values) => {
  svg
    .selectAll("circle")
    .data(values)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("r", "5")
    .attr("data-xvalue", (d) => d["Year"])
    .attr("data-yvalue", (d) => new Date(d["Seconds"] * 1000))
    .attr("cx", (d) => xScale(d["Year"]))
    .attr("cy", (d) => yScale(new Date(d["Seconds"] * 1000)))
    .attr("fill", (d) => (d["Doping"] !== "" ? "orange" : "lightgreen"))
    .on("mouseover", (e, item) => {
      tooltip.transition().style("visibility", "visible");

      item["Doping"] !== ""
        ? tooltip.text(
            item["Year"] + " - " + item["Time"] + " - " + item["Doping"]
          )
        : tooltip.text(
            item["Year"] + " - " + item["Time"] + " - " + "No Allegations"
          );
      tooltip.attr('data-year', item['Year'])
    })
    .on("mouseout", (e, item) => {
      tooltip.transition().style("visibility", "hidden");
    });
};

// request data
async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  drawCanvas();
  generateScales(data);
  generateAxes();
  drawPoints(data);
}

getData();
