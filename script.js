function showLineGraphPage() {

    
//Define the dataset for this graph.   
const data = [
            {
              date: new Date("2020-02-25"),
              Asia: 6381,
              Africa: 0,
              Europe: 248,
              NorthAmerica: 27,
              SouthAmerica: 0,
              Oceania: 7,
            },
            {
              date: new Date("2020-02-26"),
              Asia: 5328,
              Africa: 1,
              Europe: 352,
              NorthAmerica: 29,
              SouthAmerica: 0,
              Oceania: 8,
            },
            {
              date: new Date("2020-02-27"),
              Asia: 5872,
              Africa: 1,
              Europe: 462,
              NorthAmerica: 29,
              SouthAmerica: 1,
              Oceania: 8,
            },
            {
              date: new Date("2020-02-28"),
              Asia: 5901,
              Africa: 1,
              Europe: 784,
              NorthAmerica: 34,
              SouthAmerica: 1,
              Oceania: 9,
            },
            {
              date: new Date("2020-02-29"),
              Asia: 6248,
              Africa: 2,
              Europe: 1133,
              NorthAmerica: 42,
              SouthAmerica: 2,
              Oceania: 5,
            },
            {
              date: new Date("2020-03-01"),
              Asia: 6754,
              Africa: 2,
              Europe: 1449,
              NorthAmerica: 45,
              SouthAmerica: 2,
              Oceania: 4,
            },
            {
              date: new Date("2020-03-02"),
              Asia: 7233,
              Africa: 14,
              Europe: 2091,
              NorthAmerica: 48,
              SouthAmerica: 4,
              Oceania: 8,
            },
            {
              date: new Date("2020-03-03"),
              Asia: 8202,
              Africa: 18,
              Europe: 2558,
              NorthAmerica: 77,
              SouthAmerica: 9,
              Oceania: 8,
            },
            {
              date: new Date("2020-03-04"),
              Asia: 9564,
              Africa: 21,
              Europe: 3261,
              NorthAmerica: 124,
              SouthAmerica: 9,
              Oceania: 12,
            },
            {
              date: new Date("2020-03-05"),
              Asia: 9848,
              Africa: 34,
              Europe: 4309,
              NorthAmerica: 179,
              SouthAmerica: 21,
              Oceania: 23,
            },
            {
              date: new Date("2020-03-06"),
              Asia: 10810,
              Africa: 36,
              Europe: 5504,
              NorthAmerica: 262,
              SouthAmerica: 35,
              Oceania: 37,
            },
            {
              date: new Date("2020-03-07"),
              Asia: 11231,
              Africa: 49,
              Europe: 6877,
              NorthAmerica: 342,
              SouthAmerica: 58,
              Oceania: 42,
            }
    ];
        
const margin = {
    top: 20,
    right: 30,
    bottom: 50,
    left: 50};
          
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;
          
//Appends the svg object to the line graph div.
const svg = d3.select("#line-graph")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
          
//Formats the date and parse it for timeline.
const formatTime = d3.timeFormat("%Y-%m-%d");
const parseTime = d3.timeParse("%Y-%m-%d");
        data.forEach(function(d) {
        d.date = parseTime(formatTime(d.date));});
          
//Sets the x and y ranges using defined height and width.
const x = d3.scaleTime().range([0, width]);
const y = d3.scaleLinear().range([height, 0]);
          
//Defines the color scale for the lines.
const color = d3.scaleOrdinal(d3.schemeCategory10);
          
//Defines the line.
const line = d3.line()
    .x(function(d) { return x(d.date);})
    .y(function(d) {return y(d.value);});
          
//Scale the range of the data
x.domain(d3.extent(data, function(d) {return d.date;}));
y.domain([0, d3.max(data, function(d) {return d3.max([d.Asia, d.Africa, d.Europe, d.NorthAmerica, d.SouthAmerica, d.Oceania]);})]);
          
//Add the x axis to the svg object.
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .append("text")
    .attr("class", "axis-label")
    .attr("x", width / 2)
    .attr("y", 40)
    .attr("fill", "black")
    .text("Timeline");
          
//Add the y axis to the svg object.
svg.append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("class", "axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -40)
    .attr("fill", "black")
    .text("Weekly COVID Cases");   

//Add the lines with the animation and transition.
svg.selectAll(".line")
    .data(['Asia', 'Africa', 'Europe', 'NorthAmerica', 'SouthAmerica', 'Oceania'])
    .enter()
    .append("path")
    .attr("class", "line")
    .style("stroke-width", 2)
    .style("fill", "none")
    .attr("d", function(d) {return line(data.map(function(row) {return {date: row.date,value: row[d]};}));})
    .style("stroke", function(d) {return color(d);})
    .attr("stroke-dasharray", function() {const length = this.getTotalLength();return length + " " + length;})
    .attr("stroke-dashoffset", function() {
const length = this.getTotalLength(); return length;})
    .transition()
    .duration(3000)
    .ease(d3.easeLinear)
    .attr("stroke-dashoffset", 0);
        
    console.log("File Loaded!")
    }