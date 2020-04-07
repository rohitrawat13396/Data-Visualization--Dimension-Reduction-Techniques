
function task2_getBarChartData(){ 
    $.get("/task2", function(response){
      
      d3.select("#cleansheet").remove();
      d3.select("#cleansheet").remove();
      d3.select("#cleansheet").remove();
      drawBarChart(response);
    });
  }
  
  function task3_getScatterPlotData(){
    $.get("/task3", function(response){

      d3.select("#cleansheet").remove();
      d3.select("#cleansheet").remove();
      d3.select("#cleansheet").remove();
      drawScatterPlot(response.pcomponent_mm,  color_data[0]);
      drawScatterPlot(response.pcomponent_random,  color_data[1]);
      drawScatterPlot(response.pcomponent_strata,  color_data[2]);
    });
  } 
  
  function task3_MDS_Euclidean(){
    $.get("/task3_MDS_Euclidean", function(response){

      d3.select("#cleansheet").remove();
      d3.select("#cleansheet").remove();
      d3.select("#cleansheet").remove();
      drawScatterPlot(response.mds_euclidean_mm,  color_data[0]);
      drawScatterPlot(response.mds_euclidean_random,  color_data[1]);
      drawScatterPlot(response.mds_euclidean_strata,  color_data[2]);
    });
  } 
  
  function task3_MDS_Correlation(){
    $.get("/task3_MDS_Correlation", function(response){

      d3.select("#cleansheet").remove();
      d3.select("#cleansheet").remove();
      d3.select("#cleansheet").remove();
      drawScatterPlot(response.mds_correlation_mm,  color_data[0]);
      drawScatterPlot(response.mds_correlation_random,  color_data[1]);
      drawScatterPlot(response.mds_correlation_strata,  color_data[2]);
    });
  }
  
  function task3_ScatterPlotMatrix(dataset_type){
    $.get("/task3_ScatterPlotMatrix", function(response){

      d3.select("#cleansheet").remove();
      d3.select("#cleansheet").remove();
      d3.select("#cleansheet").remove();
      
      if (dataset_type  ==  "ORIGINAL")
        {drawScatterPlotMatrix(response.top3_attr_data_mm,  color_data[0]);}
      else if(dataset_type  ==  "RANDOM")
        {drawScatterPlotMatrix(response.top3_attr_data_random,  color_data[1]);}
      else
        {drawScatterPlotMatrix(response.top3_attr_data_strata,  color_data[2]);}
    });
  }