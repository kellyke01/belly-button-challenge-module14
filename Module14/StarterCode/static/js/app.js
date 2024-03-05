// cut from index   

//let data = d3.json("samples.json");
//console.log(data);


//function that updates the dashboard


//function that populates the metadata
function demoInfo(sample)
{
    //console.log(sample);

    //use d3.json in order to get the data
    d3.json("samples.json").then((data) => {
        //grab all of the metadata
        let metaData = data.metadata;
        //console.log(metaData);

        //filter based on the value  (sample return 1 result in an array)
        let result = metaData.filter(sampleResult => sampleResult.id == sample);
        //console.log(result);

        //access index 0 from the array
        let resultData = result[0];
        console.log(resultData);

        //clear the metadata out
        d3.select("#sample-metadata").html(" "); //clear the html out
            

        // use Object.entries to get the value key pairs
        Object.entries(resultData).forEach(([key, value]) => {
            //add to the sample data / 
            d3.select("#sample-metadata")
                .append("h5").text(`${key}: ${value}`);
        });
    });
}

//function that builds the bar chart
function buildBarChart(sample)
{
    //console.log(sample);
    //grab all samples
    let data = d3.json("samples.json");
    console.log(data);

    d3.json("samples.json").then((data) => {
        //grab all of the sampledata
        let sampleData = data.samples;
        //console.log(metaData);

        //filter based on the value  (sample return 1 result in an array)
        let result = sampleData.filter(sampleResult => sampleResult.id == sample);
        //console.log(result);

        //access index 0 from the array
        let resultData = result[0];
        console.log(resultData);

        //get the 0tu_ids, labels and sample_values
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;


        //build your chart
        //get the yticks
        let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`);
        let xValues = sample_values.slice(0, 10);
        let textLabels = otu_labels.slice(0, 10);
        
        let barChart = {
            y: yticks.reverse(),
            x: xValues.reverse(),
            text: textLabels.reverse(),
            type: "bar",
            orientation: "h"
        }

        let layout= {
            title: "Top 10 Belly Button Bacteria"
        };

        Plotly.newPlot("bar", [barChart], layout);
    });
}

//function that builds the bubble chart
function buildBubbleChart(sample)
{
       //console.log(sample);
    //grab all samples
    let data = d3.json("samples.json");
    console.log(data);

    d3.json("samples.json").then((data) => {
        //grab all of the sampledata
        let sampleData = data.samples;
        //console.log(metaData);

        //filter based on the value  (sample return 1 result in an array)
        let result = sampleData.filter(sampleResult => sampleResult.id == sample);
        //console.log(result);
        //access index 0 from the array
        let resultData = result[0];
        console.log(resultData);

        //get the 0tu_ids, labels and sample_values
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;

        let bubbleChart = {
            y: sample_values,
            x: otu_ids,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        }

        let layout= {
            title: "Bacteria Cultures for Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"}
        };

     Plotly.newPlot("bubble", [bubbleChart], layout);
 });
};


//function that initializes the dashboard
function initialize()
{
    //access the dropdown selector from the index.html file
    var select = d3.select("#selDataset");

    // use d3.json in order to get the data
    d3.json("samples.json").then((data) => {
        let sampleNames = data.names;// made an array of the names
        //console.log(sampleNames);

        //use a for each to create an option for each of those samples
        sampleNames.forEach((sample) => {
            select.append("option")
                .text(sample)
                .property("value", sample);
        });
        //when initialized, pass in the information for the first sample
        let sample1 = sampleNames[0];

        //call the function to build the metaData
        demoInfo(sample1);
        //call function to build bar chart
        buildBarChart(sample1);
        //call function to build the bubble chart
        buildBubbleChart(sample1);
    });
}

//function that updates the dashboard
function optionChanged(item)
{
    //call the update to the metadata
    demoInfo(item);
    //call function for bar chart
    buildBarChart(item);
    //call the function to build the bubble chart
    buildBubbleChart(item);
    //prints the item for now
    //console.log(item);
}

//call the initialize function
initialize();




