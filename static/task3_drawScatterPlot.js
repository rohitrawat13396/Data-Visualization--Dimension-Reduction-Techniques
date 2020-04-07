
function drawScatterPlot(two_pca_components,  color_data){
  
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var xValue =  function(d) { return d[0]},
    xScale = d3.scale.linear().range([0, width]),
    xMap = function(d) { return xScale(xValue(d));}, // data -> display
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");
  
  var yValue = function(d) { return d[1]}, // data -> value
    yScale = d3.scale.linear().range([height, 0]), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left");


  //Padding and setting domains of x and y axes, to avoid outgraph plotting of points 
  // xScale.domain([-1,1]);
  xScale.domain(d3.extent(two_pca_components, function(d) { return d[0]; })).nice();
  yScale.domain(d3.extent(two_pca_components, function(d) { return d[1]; })).nice();
  // yScale.domain([-1,1]);

  // add the graph canvas to the body of the webpage
  var svg = d3.select("#Content").append("svg")
    .attr("id","cleansheet")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("component 1");

  // y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("component 2");  

  svg.selectAll(".dot")
      .data(two_pca_components)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .style("fill", color_data)
      .style("stroke", "black");

  
}
