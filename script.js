const edURL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const countyURL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

let countyData;
let edData;

const canvas = d3.select("#canvas");
const tooltip = d3.select("#tooltip");

const drawMap = () => {
  canvas
    .selectAll("path")
    .data(countyData)
    .enter()
    .append("path")
    .attr("d", d3.geoPath())
    .attr("class", "county")
    .attr("fill", (countyDataItem) => {
      const id = countyDataItem["id"];
      const county = edData.find((item) => item["fips"] === id);
      const percentage = county["bachelorsOrHigher"];
      if (percentage <= 15) {
        return "tomato";
      } else if (percentage <= 30) {
        return "orange";
      } else if (percentage <= 45) {
        return "lightgreen";
      } else {
        return "green";
      }
    })
    .attr("data-flips", (countyDataItem) => countyDataItem["id"])
    .attr("data-education", (countyDataItem) => {
      const id = countyDataItem["id"];
      const county = edData.find((item) => item["fips"] === id);

      const percentage = county["bachelorsOrHigher"];
      return percentage;
    })
    .on("mouseover", (e, countyDataItem) => {
      tooltip.transition().style("visibility", "visible");

      const id = countyDataItem["id"];
      const county = edData.find((item) => item["fips"] === id);

      tooltip.text(
        county["fips"] +
          " - " +
          county["area_name"] +
          ", " +
          county["state"] +
          " : " +
          county["bachelorsOrHigher"] +
          "%"
      );
      tooltip.attr("data-education", county["bachelorsOrHigher"]);
    })
    .on("mouseout", (countyDataItem) =>
      tooltip.transition().style("visibility", "hidden")
    );
};

// request data
async function getData() {
  try {
    const resCounty = await fetch(countyURL);
    const countyDt = await resCounty.json();
    countyData = topojson.feature(countyDt, countyDt.objects.counties).features;

    const resEd = await fetch(edURL);
    const edDt = await resEd.json();
    edData = edDt;
  } catch (error) {
    console.log(error);
  }
  drawMap();
}

getData();
