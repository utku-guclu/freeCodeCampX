const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

const WIDTH = 1200;
const HEIGHT = 600;

const PAD = (1292 - WIDTH) / 2;

const canvas = d3.select("#canvas");

let xScale;
let yScale;

let minYear;
let maxYear;

let baseTemp = "";
let values = "";

const drawCanvas = () => {
  canvas.attr("width", WIDTH);
  canvas.attr("height", HEIGHT);
};

const generateScales = () => {
  minYear = d3.min(values, (item) => item["year"]);
  maxYear = d3.max(values, (item) => item["year"]);

  xScale = d3
    .scaleLinear()
    .domain([minYear, maxYear + 1])
    .range([PAD, WIDTH - PAD]);
  yScale = d3
    .scaleTime()
    .domain([new Date(0, 0, 0, 0, 0, 0, 0), new Date(0, 11, 0, 0, 0, 0, 0)])
    .range([PAD, HEIGHT - PAD]);
};

const drawCells = () => {
  const tooltip = d3.select("#tooltip");
  canvas
    .selectAll("rect")
    .data(values)
    .enter()
    .append("rect")
    .attr("class", "cell")
    .attr("fill", (item) => {
      const variance = item["variance"];
      if (variance <= -2) return "SteelBlue";
      else if (variance <= 0) return "LightSteelBlue";
      else if (variance <= 1) return "Orange";
      else return "Crimson";
    })
    .attr("data-year", (item) => item["year"])
    .attr("data-month", (item) => item["month"] - 1)
    .attr("data-temp", (item) => baseTemp + item["variance"])
    .attr("height", (HEIGHT - PAD) / 12)
    .attr("y", (item) => yScale(new Date(0, item["month"] - 1, 0, 0, 0, 0, 0)))
    .attr("width", (item) => {
      const numOfYears = maxYear - minYear;
      return (WIDTH - PAD) / numOfYears;
    })
    .attr("x", (item) => xScale(item["year"]))
    .on("mouseover", (e, item) => {
      tooltip.transition().style("visibility", "visible");
      const monthNames = [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      tooltip.text(
        item["year"] +
          " " +
          monthNames[item["month"] - 1] +
          " - " +
          (baseTemp + item["variance"]) +
          "(" +
          item["variance"] +
          ")"
      );
    })
    .on("mouseout", (item) =>
      tooltip.transition().style("visibility", "hidden")
    );
};

const drawAxes = () => {
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
  const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%B"));

  canvas
    .append("g")
    .call(xAxis)
    .attr("id", "x-axis")
    .attr("transform", "translate(0, " + (HEIGHT - PAD) + ")");

  canvas
    .append("g")
    .call(yAxis)
    .attr("id", "y-axis")
    .attr("transform", "translate(" + PAD + ", " + 0 + ")");
};

// request data
async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  baseTemp = data["baseTemperature"];
  values = data["monthlyVariance"];
  console.log(baseTemp, values);
  generateScales();
  drawCells();
  drawAxes();
}

drawCanvas();
getData();
