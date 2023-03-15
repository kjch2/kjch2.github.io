window.onload = function() {

const data = [{
    date: new Date("2022-01-01"),
    area1: 12,
    area2: 9,
    area3: 8,
    area4: 4,
    area5: 14,
    area6: 10,
    area7: 6,
    area8: 8,
    area9: 11,
    area10: 13
  },
  {
    date: new Date("2022-01-02"),
    area1: 8,
    area2: 11,
    area3: 13,
    area4: 7,
    area5: 10,
    area6: 9,
    area7: 11,
    area8: 12,
    area9: 8,
    area10: 6
  },
  {
    date: new Date("2022-01-03"),
    area1: 6,
    area2: 10,
    area3: 12,
    area4: 9,
    area5: 8,
    area6: 12,
    area7: 11,
    area8: 7,
    area9: 10,
    area10: 9
  },
  {
    date: new Date("2022-01-04"),
    area1: 10,
    area2: 8,
    area3: 11,
    area4: 12,
    area5: 6,
    area6: 13,
    area7: 8,
    area8: 9,
    area9: 12,
    area10: 7
  },
  {
    date: new Date("2022-01-05"),
    area1: 9,
    area2: 6,
    area3: 10,
    area4: 8,
    area5: 11,
    area6: 11,
    area7: 10,
    area8: 6,
    area9: 9,
    area10: 8
  },
  {
    date: new Date("2022-01-06"),
    area1: 11,
    area2: 9,
    area3: 8,
    area4: 10,
    area5: 7,
    area6: 10,
    area7: 9,
    area8: 12,
    area9: 11,
    area10: 13
  },
  {
    date: new Date("2022-01-07"),
    area1: 13,
    area2: 11,
    area3: 7,
    area4: 6,
    area5: 12,
    area6: 9,
    area7: 8,
    area8: 10,
    area9: 10,
    area10: 11
  },
  {
    date: new Date("2022-01-08"),
    area1: 8,
    area2: 10,
    area3: 9,
    area4: 12,
    area5: 6,
    area6: 8,
    area7: 11,
    area8: 12,
    area9: 9,
    area10: 10
  },
  {
    date: new Date("2022-01-09"),
    area1: 7,
    area2: 8,
    area3: 11,
    area4: 9,
    area5: 10,
    area6: 7,
    area7: 10,
    area8: 6,
    area9: 13,
    area10: 8
  },
  {
    date: new Date("2022-01-10"),
    area1: 12,
    area2: 6,
    area3: 13,
    area4: 11,
    area5: 9,
    area6: 12,
    area7: 7,
    area8: 8,
    area9: 11,
    area10: 6
  }
];

// set the dimensions and margins of the graph
const margin = {
  top: 20,
  right: 30,
  bottom: 50,
  left: 50
};
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#line-graph")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// format the date and parse it
const formatTime = d3.timeFormat("%Y-%m-%d");
const parseTime = d3.timeParse("%Y-%m-%d");
data.forEach(function(d) {
  d.date = parseTime(formatTime(d.date));
});

// set the ranges
const x = d3.scaleTime().range([0, width]);
const y = d3.scaleLinear().range([height, 0]);

// define the 10 colors for the lines
const color = d3.scaleOrdinal(d3.schemeCategory10);

// define the line
const line = d3.line()
  .x(function(d) {
    return x(d.date);
  })
  .y(function(d) {
    return y(d.value);
  });

// scale the range of the data
x.domain(d3.extent(data, function(d) {
  return d.date;
}));
y.domain([0, d3.max(data, function(d) {
  return d3.max([d.area1, d.area2, d.area3, d.area4, d.area5, d.area6, d.area7, d.area8, d.area9, d.area10]);
})]);

// add the x axis
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

// add the y axis
svg.append("g")
  .call(d3.axisLeft(y));

// add the lines
svg.selectAll(".line")
  .data(['area1', 'area2', 'area3', 'area4', 'area5', 'area6', 'area7', 'area8', 'area9', 'area10'])
  .enter()
  .append("path")
  .attr("class", "line")
  .attr("d", function(d) {
    return line(data.map(function(row) {
      return {
        date: row.date,
        value: row[d]
      };
    }));
  })
  .style("stroke", function(d) {
    return color(d);
  })
  .style("stroke-width", 2)
  .style("fill", "none");

  console.log("File Loaded!")
}