var bellybuttonData;

// initialize the data
function init(){
    // populate the dropdown
    var dropdownMenu = d3.select("#selDataset");
   
    d3.json("data/samples.json").then((data) =>{
        bellybuttonData = data;
        var subjectID = data.names;
        subjectID.forEach((ID) => {
            dropdownMenu.append('option').text(ID).property('value', ID);
        });
         // promise pending
        const selectID = subjectID[0];
        buildPlot(selectID);
        updateMetadata(selectID);
    });
}
// console.log(subjectID);
function buildPlot(sample) {    
    d3.json("data/samples.json").then((data) => {
    var samples = data.samples;
    // var personData = data.samples;
    var filterData = samples.filter(sampleObject => sampleObject.id == sample);
    // var filterData = samples.filter(sampleObject => sampleObject.id == personData);
    var result = filterData[0];
    var sample_values = result.sample_values;
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    // console.log(result);
    // console.log(sample_values);
    // console.log(otu_ids);
    // console.log(otu_labels);   
    
    var trace1 = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
        size: sample_values,
        color: otu_ids,
        colorscale:"Rainbow"
        }
    };

// get the op 10 OTUs found in each individual
    // var otu_10 = otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
    // console.log(otu_ids);
    // // get corresponding top 10 labels for each OTU
    // var labels = otu_labels.slice(0,10).reverse();
    // var otu_10 = otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();

    // -----------------
    // Getting the top 10 
    var sample_values_10 = result.sample_values.slice(0, 10).reverse();
    console.log("top 10 sample: " + sample_values_10);

    // // get only top 10 otu ids for the plot OTU and reversing it. 
    var OTU = (result.otu_ids.slice(0, 10)).reverse();
 
    // // get the otu id's to the desired form for the plot
    var OTU_id = OTU.map(d => "OTU " + d)
    console.log("OTU IDS: " + OTU_id);

    // // get the top 10 labels for the plot and reversing it.
    var labels = result.otu_labels.slice(0, 10).reverse();
    console.log("labels: " + labels);



    var data = [trace1];
    var layout = {
        title: 'Bacteria Cultures per Sample',
        showlegend: false,
        hovermode: 'closest',
        xaxis: {title:"OTU (Operational Taxonomic Unit) ID " +sample},
        font: { color: "#49a81d", family: "Arial, Helvetica, sans-serif" },
        margin: {t:30}
    };
    // passing in graph data to render bubble plot
    Plotly.newPlot('bubble', data, layout); 
    var trace1 = {
        // // x: sample_values.slice(0,10).reverse(),
        x: sample_values_10,
        // y: otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
        y: OTU_id,
        // text: otu_labels.slice(0,10).reverse(),
        text: labels,
        name: "Sample Detail",
        type: "bar",
        orientation: "h"
    };
    var data = [trace1];
    var layout = {
        title: "Top Ten OTUs for Individual " +sample,
        margin: {l: 100, r: 100, t: 100, b: 100},
        font: { color: "#49a81d", family: "Arial, Helvetica, sans-serif" }
    };
    Plotly.newPlot("bar", data, layout);  
    });
  }
  
  function updateMetadata(sample) {
    d3.json("data/samples.json").then((data) => {
        var metadata = data.metadata;
        // var personMetadata = data.metadata;
        var filterData = metadata.filter(sampleObject => sampleObject.id == sample);
        // var filterData = metadata.filter(sampleObject => sampleObject.id == personData);

        var result = filterData[0];
        var panelBody = d3.select("#sample-metadata");
         // remove any children from the list before refreshing with new data
         panelBody.html("");

        // Object.entries(result).forEach(([key, value]) => {
        //     metaPanel.append("h6").text(`${key.toUpperCase()}: ${value}`)
        Object.entries(result).forEach((key)=>{
            panelBody.append("p").text(key[0] + ":" + key[1]);

        })
    

    });
  }
  
  function optionChanged(selectNew) {
    updateMetadata(selectNew);
    buildPlot(selectNew);
  }
  
  init();
