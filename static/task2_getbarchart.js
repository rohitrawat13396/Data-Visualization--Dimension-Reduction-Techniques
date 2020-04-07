
function drawBarChart(response){

  var margin = {top: 20, right: 20, bottom: 60, left: 60},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var x0 = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);
      
  var x1 = d3.scale.ordinal();

  var y = d3.scale.linear()
    .range([height, 0]);

  var color = d3.scale.ordinal()
    //.range(["#98abc5", "#8a89a6", "#7b6888"]);
    .range(color_data);

  var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    
  var svg = d3.select("#Content").append("svg")
      .attr("id","cleansheet")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var data = [] //List of Dictionary Required.
  var pca_all = [];
  var len = response.expl_var_ratio_mm.length;
  for (i = 0; i < len; i++){
    data[i] = {"Original Data": [response.expl_var_ratio_mm[i],response.cum_expl_var_ratio_mm[i]], 
              "Random Sampled Data": [response.expl_var_ratio_random[i],response.cum_expl_var_ratio_random[i]], 
              "Stratified Sampled Data": [response.expl_var_ratio_strata[i],response.cum_expl_var_ratio_strata[i]], "pca": i}; 
  }

  var data_names = ["Original Data","Random Sampled Data","Stratified Sampled Data"];

  for (i =0; i <  len; i++) {
    data[i].data_types = data_names.map(function(name) { return {name: name, value: +data[i][name][0],value2: +data[i][name][1]}; });
    pca_all[i] = i;
  };

  x0.domain(pca_all);
  x1.domain(data_names).rangeRoundBands([0, x0.rangeBand()]);
  y.domain([0, 1]);
  //console.log(y.domain())

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
  .append("text")
    .style("text-anchor", "end")
    .attr("x", width-10)
    .attr("y", 50)
    .attr("dx", ".71em")
    .text("PCA Component")

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Explained Variance Ratio");

  // console.log(data);
  var Pca = svg.selectAll(".Pca")
    .data(data)
  .enter().append("g")
    .attr("class", "Pca")
    .attr("transform", function(d) { return "translate(" + x0(d.pca) + ",0)"; });

  //console.log("after pca")
  Pca.selectAll("rect")
    .data(function(d) { return d.data_types; })
  .enter().append("rect")
    .attr("width", x1.rangeBand())
    .attr("x", function(d) { return x1(d.name); })
    .attr("y", function(d) { return y(d.value); })
    .attr("height", function(d) { return height - y(d.value); })
    .style("fill", function(d) { return color(d.name); });
    
  //legend
  var legend = svg.selectAll(".legend")
    .data(data_names.slice().reverse())
  .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);

  legend.append("text")
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) { return d; });

  //line chart

  var vline = d3.svg.line()
      .x(function(d,i){ return x0(i) + 4; })
      .y(function(d){ return y(d.data_types[0].value2); })
        //.interpolate("cardinal");

  svg.append("path")
    .data([data])
    .attr("class", "line1")
    .style("stroke", color(0))
    .style("fill", "None")
    .style("stroke-width", "2px")
    .attr("d",vline)
    
  var vline = d3.svg.line()
      .x(function(d,i){ return x0(i) + 12; })
      .y(function(d){ return y(d.data_types[1].value2); })


  svg.append("path")
    .data([data])
    .attr("class", "line2")
    .style("stroke", color(1))
    .style("fill", "None")
    .style("stroke-width", "2px")
    .attr("d",vline)

  var vline = d3.svg.line()
      .x(function(d,i){ return x0(i)+20; })
      .y(function(d){ return y(d.data_types[2].value2); })

  svg.append("path")
    .data([data])
    .attr("class", "line3")
    .style("stroke", color(2))
    .style("fill", "None")
    .style("stroke-width", "2px")
    .attr("d",vline)

  svg.append("line")          
    .style("stroke", "black") 
    .style("stroke-dasharray", ("3, 3")) 
    .style("stroke-width", 2)
    .attr("x1", 0)     
    .attr("y1", y(0.75))
    .attr("x2", x0(9)/2 + 38)     
    .attr("y2", y(0.75));

  svg.append("line")         
    .style("stroke", "black")
    .style("stroke-dasharray", ("3, 3"))  
    .style("stroke-width", 2)
    .attr("x1", x0(9)/2 + 4)     
    .attr("y1", y(0))
    .attr("x2", x0(9)/2 + 4)     
    .attr("y2", y(0.75));

  svg.append("line")          
      .style("stroke", "black")
      .style("stroke-dasharray", ("3, 3"))  
      .style("stroke-width", 2)
      .attr("x1", x0(9)/2 + 18)     
      .attr("y1", y(0))
      .attr("x2", x0(9)/2 + 18)     
      .attr("y2", y(0.75));

      
  svg.append("line")          
      .style("stroke", "black")
      .style("stroke-dasharray", ("3, 3"))  
      .style("stroke-width", 2)
      .attr("x1", x0(9)/2 + 38)     
      .attr("y1", y(0))
      .attr("x2", x0(9)/2 + 38)     
      .attr("y2", y(0.75));
  
}