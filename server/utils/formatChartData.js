function formatChartData(data){    
    try{ 
      const res = {
        timestamps: [],
        seriesLabels: [],
        seriesValues: [],
      };

      //helper function to convert the Prometheus MS timestamp to HH:MM
      const timeFilter = /[0-9][0-9]:[0-9][0-9]/
      const msToTimestamp = (ms) => new Date(1000 * ms).toISOString().match(timeFilter)[0];

      //pop the last series off the query response to extract timestamp and groupBy label
      const initialSet = data.pop();
      const groupByLabel = Object.keys(initialSet.metric)[0];

      // add this last series to the response object arrays
      res.timestamps = initialSet.values.map(vals => msToTimestamp(vals[0]));
      res.seriesLabels.push(initialSet.metric[groupByLabel] || 'Cluster')
      res.seriesValues.push(initialSet.values.map(vals => vals[1]))
    
      // for each remaining dataset, push the series label and array of datapoints onto the res object
      data.forEach(dataset => {
        res.seriesLabels.push(dataset.metric[groupByLabel]); // add a new dataseries label to our res
        res.seriesValues.push(dataset.values.map(vals => vals[1])); // add the dataseries to our res
      });
      
      //return the constructed response
      return res;
    } catch(err){
      console.log(err);
    }
  }

  module.exports = fortmatChartData