
var tasks = ["Choose Task","Task2: Scree plot and Intrinsic Dimensionality","Task3: Scatterplot PCA Components","Task3: Scatterplot MDS (Euclidean)",
  "Task3: Scatterplot MDS (Correlation)","Task3: Scatterplot Matrix (Original Data)","Task3: Scatterplot Matrix (Random Sampled Data)",
  "Task3: Scatterplot Matrix (Stratified Sampled Data)"]

var color_data = ["red", "green", "orange"];

d3.select("#selectButton")
  .selectAll('myOptions')
  .data(tasks)
  .enter()
  .append('option')
  .text(function (d) { return d; }) // text showed in the menu
  .attr("value", function (d) { return d;})

d3.select("#selectButton").on("change", function(d) {
    taskname = d3.select(this).property("value")

    if (taskname == "Task2: Scree plot and Intrinsic Dimensionality")
      {task2_getBarChartData();}

    else if(taskname  ==  "Task3: Scatterplot PCA Components")
      { task3_getScatterPlotData();}

    else if(taskname  ==  "Task3: Scatterplot MDS (Euclidean)")
      { task3_MDS_Euclidean();}

    else if(taskname  ==  "Task3: Scatterplot MDS (Correlation)")
      { task3_MDS_Correlation();}

    else if(taskname == "Task3: Scatterplot Matrix (Original Data)")
      { task3_ScatterPlotMatrix("ORIGINAL");}

    else if(taskname == "Task3: Scatterplot Matrix (Random Sampled Data)")
      { task3_ScatterPlotMatrix("RANDOM");}

    else if(taskname == "Task3: Scatterplot Matrix (Stratified Sampled Data)")
      { task3_ScatterPlotMatrix("STRATIFIED");}
})