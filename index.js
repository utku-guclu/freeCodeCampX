$(document).ready(() => {
  const w = 1000;
  const h = 480;

  const projection = d3.geo.equirectangular();
  const path = d3.geo.path().projection(projection);
  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  svg.append("rect").attr("width", w).attr("height", h).attr("fill", "white");

  const g = svg.append("g");

  d3.json("https://d3js.org/world-50m.v1.json", (err, data) => {
    if (err) console.log(err);

    g.append("path")
      .datum(topojson.feature(data, data.objects.countries))
      .attr("d", path);

    svg.call(
      d3.behavior.zoom().on("zoom", () => {
        g.attr(
          "transform",
          "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")"
        );
      })
    );

    d3.json(
      "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json",
      (err, data) => {
        if (err) console.log(err);

        const locations = data.features;
        let hue = 0;

        locations.forEach((d) => {
          hue += 0.36;
          d.color = "hsl(" + hue + ", 100%, 50%)";
        });

        g.selectAll("circle")
          .data(locations)
          .enter()
          .append("circle")
          .attr("cx", (d) => {
            if (d.geometry) {
              return projection([
                d.geometry.coordinates[0],
                d.geometry.coordinates[1],
              ])[0];
            }
          })
          .attr("cy", (d) => {
            if (d.geometry) {
              return projection([
                d.geometry.coordinates[0],
                d.geometry.coordinates[1],
              ])[1];
            }
          })
          .attr("r", (d) => {
            if (d.properties.mass) {
              return Math.pow(parseInt(d.properties.mass), 1 / 9);
            }
          })
          .style("fill", (d) => d.color)
          .on("mouseover", function (d) {
            d3.select(this).style("fill", "black");
            d3.select("#name").text(d.properties.name);
            d3.select("#nametype").text(d.properties.nametype);
            d3.select("#fall").text(d.properties.fall);
            d3.select("#mass").text(d.properties.mass);
            d3.select("#recclass").text(d.properties.recclass);
            d3.select("#reclat").text(d.properties.reclat);
            d3.select("#reclong").text(d.properties.reclong);
            d3.select("#year").text(d.properties.year);
            d3.select("#tooltip")
              .style("left", d3.event.pageX + 20 + "px")
              .style("top", d3.event.pageY + 20 + "px")
              .style("display", "block")
              .style("opacity", 0.8);
          })
          .on("mouseout", function (d) {
            d3.select(this).style("fill", d.color);
            d3.select("#tooltip").style("display", "none");
          });
      }
    );
  });
});
