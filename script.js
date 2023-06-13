pledgesURL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json";
movieSalesURL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";
gameSalesURL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

const canvas = d3.select("#canvas");
const tooltip = d3.select("#tooltip");

let movieData;

const drawTreeMap = () => {
  const hierarchy = d3
    .hierarchy(movieData, (node) => node["children"])
    .sum((node) => node["value"])
    .sort((node1, node2) => node2["value"] - node1["value"]);

  const createTreeMap = d3.treemap().size([1000, 600]);

  createTreeMap(hierarchy);

  const movieTiles = hierarchy.leaves();
  console.log(movieTiles);

  const block = canvas
    .selectAll("g")
    .data(movieTiles)
    .enter()
    .append("g")
    .attr(
      "transform",
      (movie) => "translate(" + movie["x0"] + ", " + movie["y0"] + ")"
    );

  block
    .append("rect")
    .attr("class", "tile")
    .attr("fill", (movie) => {
      const category = movie["data"]["category"];
      switch (category) {
        case "Action":
          return "orange";
          break;
        case "Drama":
          return "lightgreen";
          break;
        case "Adventure":
          return "coral";
          break;
        case "Family":
          return "lightblue";
          break;
        case "Animation":
          return "pink";
          break;
        case "Comedy":
          return "khaki";
          break;
        case "Biography":
          return "tan";
          break;
        default:
          return "#404";
          break;
      }
    })
    .attr("data-name", (movie) => movie["data"]["name"])
    .attr("data-category", (movie) => movie["data"]["category"])
    .attr("data-value", (movie) => movie["data"]["value"])
    .attr("width", (movie) => movie["x1"] - movie["x0"])
    .attr("height", (movie) => movie["y1"] - movie["y0"])
    .on("mouseover", (e, movie) => {
      tooltip.transition().style("visibility", "visible");
      tooltip.html(
        "$" +
          movie["data"]["value"].toString() +
          "<hr />" +
          movie["data"]["name"]
      );
    })
    .on("mouseout", (movie) =>
      tooltip.transition().style("visibility", "hidden")
    );
  block
    .append("text")
    .text((movie) => movie["data"]["name"])
    .attr("x", 5)
    .attr("y", 20);
};
// request data
async function getData() {
  try {
    const resCounty = await fetch(movieSalesURL);
    const data = await resCounty.json();
    movieData = data;
  } catch (error) {
    console.log(error);
  }
  drawTreeMap();
}

getData();
