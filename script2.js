function showTreeMapPage() {

//Define the dataset for this treemap.
const dataset = [
    { name: "United Kingdom", cases: 361780 },
    { name: "France", cases: 605368 },
    { name: "Spain", cases: 289715 },
    { name: "Italy", cases: 434088 },
    { name: "Belgium", cases: 406605 },
    { name: "Switzerland", cases: 502752 },
    { name: "Portugal", cases: 542494 }
  ];
  
//Defines the dimensions of the svg container.
const width = 500;
const height = 500;
  
//Defines the color scale for the circles.
const color = d3.scaleOrdinal(d3.schemeCategory10);
  
//Create a pack layout.
const pack = d3.pack()
    .size([width - 2, height - 2])
    .padding(3);
  
//Create root node for the treemap.
const root = d3.hierarchy({ children: dataset })
    .sum((d) => d.cases);
  
//Generate the pack layout
pack(root);
  
//Create an svg container for the treemap.
const svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [250, 250, width, height]);
  
//Create group for the treemap and centre.
const group = svg.append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`); 
  
//Initate the tooltip for mouse over.
const tooltip = d3.select("body")
.append("div")
.attr("id", "tooltip")
.style("opacity", 0)
.style("position", "absolute")
.style("padding", "10px")
.style("background-color", "white")
.style("border-radius", "5px")
.style("box-shadow", "0 0 10px rgba(0,0,0,0.2)")
.style("pointer-events", "none");

//Create a group for the treemap nodes.
const node = group
  .selectAll("circle")
  .data(root.descendants())
  .join("circle")
  .attr("cx", (d) => d.x)
  .attr("cy", (d) => d.y)
  .attr("r", 0) // set initial size to 0
  .attr("fill", (d) => color(d.depth))
  .on("mouseover", function (event, d) {
    d3.select(this).attr("stroke", "#000").attr("stroke-width", 2);
    const cases = d.data.cases;
    d3.select("#tooltip")
      .style("opacity", 1)
      .html(`${d.data.name}: ${cases} per million`);
  })
  .on("mousemove", function (event) {
    d3.select("#tooltip")
      .style("left", event.pageX + 10 + "px")
      .style("top", event.pageY - 10 + "px");
  })
  .on("mouseleave", function () {
    d3.select(this).attr("stroke", null).attr("stroke-width", 0);
    d3.select("#tooltip").style("opacity", 0);
  })
  //Add 1 second transition to treemap nodes.
  .transition() 
  .duration(1000)
  .attr("r", (d) => d.r); 

//Add labels to the treemap nodes.
const label = group
  .selectAll("text")
  .data(root.descendants())
  .join("text")
  .attr("text-anchor", "middle")
  .attr("fill", "white")
  .style("font-size", "14px")
  .style("font-weight", "bold")
  .style("pointer-events", "none")
  .attr("x", (d) => d.x)
  .attr("y", (d) => d.y)
  .text((d) => d.data.name)
  .style("opacity", 0) 
  //Add 1 second transition to labels.
  .transition() 
  .duration(1000) 
  .style("opacity", 1); 
  
}