
function drawScatterPlotMatrix(data,  color_data){
  
  d3.select("#cleansheet").remove();

  var width = 960,
      size = 200,
      padding = 20;

  var x = d3.scale.linear()
      .range([padding / 2, size - padding / 2]);

  var y = d3.scale.linear()
      .range([size - padding / 2, padding / 2]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .ticks(6);

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(6);

  // var color = d3.scale.category10();

  var domainByTrait = {},
      traits = d3.keys(data[0]),
      n = traits.length;
  
  traits.forEach(function(trait) {
    domainByTrait[trait] = d3.extent(data, function(d) { return d[trait]; });
  }); 

  xAxis.tickSize(size * n);
  yAxis.tickSize(-size * n); 
  
  var svg = d3.select("#Content").append("svg")
      .attr("id","cleansheet")
      .style("margin-top","10")
      .attr("width", size * n + padding)
      .attr("height", size * n + padding)
    .append("g")
      .attr("transform", "translate(" + padding + "," + padding / 2 + ")")
      .style("font", "10px sans-serif")
      .style("font-weight","bold")

  svg.selectAll(".x.axis")
      .data(traits)
    .enter().append("g")
      .attr("class", "x axis")
      .attr("transform", function(d, i) { return "translate(" + (n - i - 1) * size + ",0)"; })
      .each(function(d) { x.domain(domainByTrait[d]); d3.select(this).call(xAxis); })

  svg.selectAll(".y.axis")
      .data(traits)
    .enter().append("g")
      .attr("class", "y axis")
      .attr("transform", function(d, i) { return "translate(0," + i * size + ")"; })
      .each(function(d) { y.domain(domainByTrait[d]); d3.select(this).call(yAxis); })
  
  svg.selectAll(".axis line")
      .style("stroke","#ddd");

  svg.selectAll(".axis path")
      .style("display","None");
  
      
  var cell = svg.selectAll(".cell")
      .data(cross(traits, traits))
    .enter().append("g")
      .attr("class", "cell")
      .attr("transform", function(d) { return "translate(" + (n - d.i - 1) * size + "," + d.j * size + ")"; })
      .each(plot);
    

  cell.filter(function(d) { return d.i === d.j; }).append("text")
      .attr("x", padding)
      .attr("y", padding)
      .attr("dy", ".71em")
      .text(function(d) { return d.x; })
      .style("size","100")


  function plot(p){
    var cell = d3.select(this);

    x.domain(domainByTrait[p.x]);
    y.domain(domainByTrait[p.y]);

    cell.append("rect")
        .attr("class", "frame")
        .attr("x", padding / 2)
        .attr("y", padding / 2)
        .attr("width", size - padding)
        .attr("height", size - padding)
        .style("fill","None")
        .style("stroke","black")
        .style("font-weight","bold")
        .style("text-transform","capitalize")

    cell.selectAll("circle")
        .data(data)
      .enter().append("circle")
        .attr("cx", function(d) { return x(d[p.x]); })
        .attr("cy", function(d) { return y(d[p.y]); })
        .attr("r", 3.5)
        .style("fill", color_data)
        .style("stroke", "black")
  }
}

function cross(a, b) {
  var c = [], n = a.length, m = b.length, i, j;
  for (i = -1; ++i < n;) for (j = -1; ++j < m;) c.push({x: a[i], i: i, y: b[j], j: j});
  return c;
}
  