// Fetch the JSON data and console log it - day 1 act 8; also http://learnjsdata.com/read_data.html
d3.json("data/samples.json").then(function(data) {
    console.log(data.names);
 // Use D3 to select the dropdown menu
 var dropdownMenu = d3.select("#selDataset");
 // loop through each name 
 function appendtag(item) {
   dropdownMenu.append("option").text(item)
  }
 data.names.forEach(appendtag)

    // Create an array for each object rows   day 2 activity 9
var metadata = data.metadata;
  console.log(metadata);

  // Call updatePlotly() when a change takes place to the DOM
// d3.selectAll("#selDataset").on("change", updatePlotly);
d3.select("#selDataset").on("change", optionChanged);

// This function is called when a dropdown menu item is selected
function updatePlotly() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var personData = dropdownMenu.property("value");
    console.log(personData);
  
  var filteredData = metadata.filter(metadata => metadata.id == personData);
    console.log(filteredData)
}

//  Use D3 to load metadata object -- code not working, dislplays 'OBJECT' in table
//  var dropdownMenu = d3.select("#sample-metadata");
//  function appendtag(item) {
//    dropdownMenu.append("option").text(item)
//   }
//  data.metadata.forEach(appendtag)
// ------------------------------------

// Assign the value of the dropdown menu option to a variable -- 
// ---CONSOLE LOG SHOWS DATA BUT NOT ON DASHBOARD YET, do not need this code ---
  // var metadataData = dropdownMenu.property("value");
  // console.log(metadataData);

  // var filteredData = metadata.filter(metadata => metadata.id == metadataData);
  // console.log(filteredData)

var names = Object.values(data.names);
var samples = Object.values(data.samples);

// Create an array of music provider labels

// Create an array of labels
var labels = Object.keys(data.names);
// var label = object.values(data.names);
  console.log(labels);

// Display the default plot
  var data = [{
    values: names,
    labels: labels,
    type: "bar"
    // orientation: "h"
  }];

  var layout = {
    height: 600,
    width: 800
  };

  Plotly.newPlot("bar", data, layout);
});

function optionChanged(newSample) {
  // updateMetadata(newSample);
  updateCharts(newSample);
}