// Fetch the CSV file from the remote URL
const Papa=require('papaparse');
var axios = require("axios").default;

var rankArray = [];
var k=0;
fetch("https://raw.githubusercontent.com/lauragift21/hiring-submission-data/main/top-domain.csv")
  .then(response => response.text())
  .then(data => {
    // Convert the CSV data to JSON
    let jsondata = Papa.parse(data, {
      header: true,
      dynamicTyping: true
    }).data;
    jsondata.forEach((item) => {
        if(item.rank!==null){
            const obj = {
                domain: item.domain,
                rank: item.rank,
                category: item.category,
                combination_score: (1.0/(item.rank+1.0)+item.rankChange),
            };
        rankArray.push({
            key: k.toString(),
            value: JSON.stringify(obj),
        });
        k++;
    }
    });
    
})
.then(() => {
    var options = {
        method: 'PUT',
        url: '***',
        headers: {'Content-Type': 'application/json', 'X-Auth-Email': '***', 'X-Auth-Key': '***'},
        data: rankArray
      };
    
      axios.request(options)
      .then(()=> {
        console.log("Success in pushing to rank change array");
      })
      .catch(function (error) {
        console.error(error);
      });  
}) 
  .catch(error => {
    console.error("Error fetching and storing data:", error);
  });

