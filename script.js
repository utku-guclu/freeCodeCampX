// Define the node class
class Node {
  constructor(country, code) {
    this.country = country;
    this.code = code;
    this.links = [];
  }
}

// Define the linked list class
class LinkedList {
  constructor() {
    this.nodes = [];
  }

  // Method to add a node to the list
  add(country, code) {
    const newNode = new Node(country, code);
    this.nodes.push(newNode);
  }

  // Method to connect nodes based on provided links
  connect(links) {
    links.forEach((link) => {
      const sourceNode = this.nodes[link.source];
      const targetNode = this.nodes[link.target];
      if (sourceNode && targetNode) {
        sourceNode.links.push(targetNode);
      } else {
        console.error("One or both nodes not found.");
      }
    });
  }
}

// Function to visualize the graph using D3
function visualizeGraph(nodes, links) {
  const width = 1000;
  const height = 800;

  const container = d3.select(".container");
  const svg = container
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "#333");

  const forceSim = d3
    .forceSimulation(nodes)
    .force("link", d3.forceLink().links(links).strength(1.6))
    .force("charge", d3.forceManyBody().strength(-0.75))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collide", d3.forceCollide(20))
    .on("tick", ticked);

  const link = svg
    .selectAll(".link")
    .data(links)
    .enter()
    .append("line")
    .attr("class", "link");

  const node = container
    .select(".flags")
    .selectAll("img")
    .data(nodes)
    .enter()
    .append("img")
    .attr("class", (d) => "flag flag-" + d.code)
    .style("transform", "scale(0.5)")
    .call(
      d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

  const linkIndex = {};
  links.forEach(function (d) {
    linkIndex[d.source.index + "," + d.target.index] = 1;
  });

  function borders(a, b) {
    return (
      linkIndex[a.index + "," + b.index] || linkIndex[b.index + "," + a.index]
    );
  }

  const bordering = d3
    .select("body")
    .append("div")
    .style("position", "fixed")
    .style("top", 0)
    .style("left", 0)
    .style("padding", "5px")
    .style("box-shadow", "1px 1px 1px 1px #222")
    .style("color", "#999")
    .style("background-color", "#fff")
    .style("opacity", 0)
    .style("transition", "all 500ms ease-out 0ms");

  node
    .on("mouseover", function (event, d) {
      let details = "";
      details +=
        '<img class="flag flag-' +
        d.code +
        '"/><div class="country-label main">' +
        d.country +
        "</div>";

      // Find neighbors of the current node
      const neighbors = links
        .filter((link) => link.source === d || link.target === d)
        .map((link) => (link.source === d ? link.target : link.source));

      // Add neighbors to the details
      neighbors.forEach((neighbor) => {
        details +=
          '<img class="flag flag-' +
          neighbor.code +
          '"/><div class="country-label">' +
          neighbor.country +
          "</div>";
      });

      node.style("transform", function (o) {
        if (borders(d, o)) {
          return "scale(0.8)";
        } else {
          return "scale(0.35)";
        }
      });

      link.classed("link-active", function (o) {
        return o.source === d || o.target === d ? true : false;
      });

      d3.select(this).style("transform", "scale(1.1)");

      bordering.html(details).style("opacity", 1);
    })
    .on("mouseout", function (d) {
      bordering.style("opacity", 0);
      link.classed("link-active", false);
      node.style("transform", "scale(0.5)");
    });

  function ticked() {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);
    node
      .style("left", (d) => d.x - 16 + "px")
      .style("top", (d) => d.y - 16 + "px");
  }

  function dragstarted(event, d) {
    if (!event.active) {
      forceSim.alphaTarget(0.05).restart();
    }
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active) {
      forceSim.alphaTarget(0);
    }
    d.fx = null;
    d.fy = null;
  }
}

// Create a new instance of LinkedList
const countriesList = new LinkedList();

fetch("countries.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const nodesData = data.nodes;
    const linksData = data.links;

    nodesData.forEach((nodeData) => {
      console.log("Adding node:", nodeData);
      countriesList.add(nodeData.country, nodeData.code);
    });

    // Connect countries based on links
    countriesList.connect(linksData);

    // Call the function to visualize the graph
    visualizeGraph(countriesList.nodes, linksData);
  })
  .catch((error) => {
    console.error("Error fetching countries.json:", error);
  });
