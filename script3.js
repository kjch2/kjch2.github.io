function showScatterPlotPage() {

//Define the dataset for this plot.
const data = [
  { country: "USA", gdp: 70248, cases: 302752 },
  { country: "China", gdp: 12556, cases: 69560 },
  { country: "Germany", gdp: 51203, cases: 459113 },
  { country: "Japan", gdp: 39312, cases: 268951 },
  { country: "India", gdp: 2256, cases: 31535 },
  { country: "Russia", gdp: 12194, cases: 155168 },
  { country: "Brazil", gdp: 7507, cases: 172239 },
  { country: "Australia", gdp: 60443, cases: 434752 }
];

//Set up the dimensions of the svg container.
const width = 800;
const height = 600;
const margin = { top: 50, right: 50, bottom: 50, left: 50 };

//Initialise the svg container.
const svg = d3.select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

//Set the x axis scale.
const xScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.gdp)])
  .range([margin.left, width - margin.right]);

//Set the y axis scale.
const yScale = d3.scaleLinear()
  .domain([d3.min(data, d => d.cases), d3.max(data, d => d.cases)])
  .range([height - margin.bottom, margin.top]);

//Define the range of colors to be used for the plots.
const colorScale = d3.scaleOrdinal()
  .domain(data.map(d => d.country))
  .range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", '#e69A8d', '#f6ae2d', '#36c9a7']);

//Add the x axis to the svg element.
svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale))
    .append("text")
    .attr("class", "axis-label")
    .attr("x", width / 2)
    .attr("y", 40)
    .attr("fill", "black")
    .text("GDP Per Capita"); 

//Add the y axis to the svg element.
svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(yScale))
    .append("text")
    .attr("class", "axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 10)
    .attr("fill", "black")
    .text("Total COVID Cases");


//Define the tooltop for use in mouse over.
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

//Add the data points to the plot using the color scale.
svg.selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", margin.left)
  .attr("cy", d => yScale(d.cases))
  .attr("r", 10)
  .attr("fill", d => colorScale(d.country))
  //Show the tooltip on mouse over.
  .on("mouseover", function (event, d) {    
    const countryname = d.country;
    d3.select("#tooltip")   
      .style("opacity", 1)
      .html(`${countryname}`);
      console.log((d) => d.data.country);
  })
  //Keep the tooltop beside the cursor.
  .on("mousemove", function (event) {
    d3.select("#tooltip")
      .style("left", event.pageX + 10 + "px")
      .style("top", event.pageY - 10 + "px");
  })
  //Hide the tooltip when the mouse is no longer hovering over.
  .on("mouseleave", function () {
    d3.select("#tooltip").style("opacity", 0);
  })
  //Transition for plots entering the scatter plot.
  .transition()
  .delay((d, i) => i * 100)
  .duration(1000)
  .attr("cx", d => xScale(d.gdp));

// Add labels for the data points
//svg.selectAll("text")
  //.data(data)
  //.enter()
  //.append("text")
  //.text(d => d.country)
  //.attr("x", margin.left + 15)
  //.attr("y", d => yScale(d.cases) + 5)
  //.attr("font-size", "12px")
  //.attr("fill", "black")
  //.transition()
  //.delay((d, i) => i * 100)
  //.duration(1000)
  //.attr("x", d => xScale(d.gdp) + 15);
}