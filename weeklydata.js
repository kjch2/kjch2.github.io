const margin = { top: 20, right: 20, bottom: 30, left: 50 };
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

console.log("File Loaded");

d3.csv("data/weekly_cases.csv", function(data) {

    var x = d3.scaleTime()
    .domain(d3.extent(data, function(d) { return new Date(d.date); }))
    .range([0, width]);

    var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d.value; })])
    .range([height, 0]);

    var xAxis = d3.axisBottom(x);
    var yAxis = d3.axisLeft(y);
    
    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    var lineGenerators = [];
    var continents = ["Asia", "Europe", "Africa", "North America", "South America", "Oceania"]
    var europe = ["Belgium", "Italy", "France", "United Kingdom", "Spain", "Sweden", "Denmark", "Russia", "Portugal", "Poland", "Norway", "Germany", "Luxembourg", "Greece"]
    var asia = ["China", "Japan", "India", "Indonesia", "Thailand", "Singapore", "Philippines", "Vietname", "Hong Kong", "Malaysia", "Mongolia", "Pakistan", "Taiwan", "Cambodia"]
    var africa = ["Morocco", "South Africa", "Ghana", "Nigeria", "Senegal", "Cameroon", "Chad", "Tunisia", "Algeria", "Guinea", "Burundi", "Mozambique", "Botswana", "Liberia", "Niger"]
    var oceania = ["New Zealand", "Australia", "Fiji", "Solomon Islands", "Papua New Guinea", "Tonga", "Somoa", "Guam", "Cook Islands"]
    var northAmerica = ["United States", "Canada", "Mexico", "Cuba", "Jamaica", "Panama", "Greenland", "Dominican Republic", "Costa Rica", "Puerto Rico", "El Salvador", "Honduras", "Cayman Islands"]
    var southAmerica = ["Brazil", "Argentina", "Colombia", "Peru", "Chile", "Venezuela", "Ecuador", "Bolivia", "Uruguay", "Guyana", "Paraguay"]
    
    continents.forEach(function(column) {
        lineGenerators.push(d3.line()
        .x(function(d) { return x(new Date(d.date)); })
        .y(function(d) { return y(+d[column]); }));
    });

    var svg = d3.select("#line-graph")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.selectAll(".line")
        .data(continents)
        .enter().append("path")
            .attr("class", "line")
            .attr("d", function(column) { return lineGenerators[continents.indexOf(column)](data); })
            .style("stroke", function(column) { return colorScale(column); });
    
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    
    svg.append("g")
        .attr("class", "axis")
        .call(yAxis);

});
