function buildCharts(sample) {

    //fetch data from json file
    d3.json("samples.json").then((data) => {
      
        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
      
        var sampleValues = result.sample_values;
        var otuIds = result.otu_ids;
        var otuLabels = result.otu_labels;

      console.log(sampleValues);
      console.log(otuIds);
      console.log(otuLabels);

      
    // create the trace for bar chart
      var trace = {
        x: otuIds.slice(0.10).map(otuId => `OTU ${otuId}`).reverse(),
        y: sampleValues.slice(0,10).reverse(),
        text: otuLabels.slice(0,10).reverse(),
        type: "bar",
        orientation: "h"
      };
      
      // Create the data array for the bar plot
      var data = [trace];
      
      // Define the bar plot layout
      var layout = {
        title: "Samples for each OTU",
        xaxis: { title: "OTU IDs" },
        yaxis: { title: "Sample Values" }
      };
      
    // Plot the chart to a div tag with id "bar"
    Plotly.newPlot("bar", data, layout);

    // create bubble chart
    var trace1 = {
        x: otuIds,
        y: sampleValues,
        mode: 'markers',
        marker: {size: sampleValues, color: otuIds},
        text: otuLabels
    };

    // create data and layout for bubble chart

    var data1 = [trace1];

    var layout1 = {
        title: "Samples for each OTU",
        xaxis: {title: "OTU ID"},
        yaxis: {title: "Sample Values"}
    };

        // Plot the chart to div tag w/ id "bubble"

    Plotly.newPlot ("bubble", data1, layout1);

   });
};

// // Display sample metadata/demographic info

// function sampleMetadata (sample) {

//     d3.json("data/samples.json").then((data) => {
//         // use id sample-metadata
//         var metaData = d3.select("#sample-metadata");
//         // clear existing metadata
//         metaData.html("");
//         // get each key and value in the metadata
//         Object.entries(data).forEach(([key, value]) => {
//           metaData.append("h3").text(`${key}:${value}`);
//         });
        
//     });
// };


// // Create initial dropdown menu 

// function init () {

//   // Use D3 to select the dropdown menu
//   var dropdownMenu = d3.select("#selDataset");

//     // Get the data from the json file
//     d3.json("data/samples.json").then((data) => {

//         // Get the id data to the dropdown menu
//         data.names.forEach(function(name) {
//             dropdown.append("option").text(name).property("value");
//     });

//     // Get the first metadata and plots to display
//     firstPlot(data.names[0]);
//     firstMetaData(data.names[0]);

//     });

// };

// // Create a function to update all plots and metadata when new sample selected
// function updateData(sample) {
//     changePlots(sample);
//     changeMetaData(sample);
// }

// init ();
