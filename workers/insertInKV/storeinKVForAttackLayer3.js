// Fetch the CSV file from the remote URL
const Papa=require('papaparse');
var axios = require("axios").default;

var varArrTotal=[];

fetch("https://raw.githubusercontent.com/lauragift21/hiring-submission-data/main/attack-layer3-traffic.csv")
  .then(response => response.text())
  .then(data => {
    let jsondata = Papa.parse(data, {
      header: true,
      dynamicTyping: true
    }).data;
    const keys = Object.keys(jsondata[0]);
    const totalObj = []
    keys.map((key) => {
      if(key.startsWith('total/timestamp')){
        const tempKey = jsondata[0][key];
        const tempValue = jsondata[0][key.replace('timestamp', 'value')];
        totalObj.push({
          key: tempKey,
          value: tempValue,
        });
        }
    });
    var i=0;
    var cnt=0;
    var avg=0;
    var k=0;
    for(var j=0;j<totalObj.length;j++){
      var startDate = new Date(totalObj[i].key).getDate()+"/"+new Date(totalObj[i].key).getMonth()+"/"+new Date(totalObj[i].key).getFullYear();
      var endDate = new Date(totalObj[j].key).getDate()+"/"+new Date(totalObj[j].key).getMonth()+"/"+new Date(totalObj[j].key).getFullYear();
      if(startDate!==endDate || j===totalObj.length-1){
        avg=avg/cnt;
        const obj={
          date: totalObj[i].key,
          val: avg
        };
        varArrTotal.push({
            key: k.toString(),
            value: JSON.stringify(obj)
        });
        cnt=0;
        avg=0;
        i=j; 
        k++;
      }
      avg=avg+totalObj[j].value;
      cnt++;
      
    }
})
.then(() => {
    var options = {
      method: 'PUT',
      url: '***',
      headers: {'Content-Type': 'application/json', 'X-Auth-Email': '***', 'X-Auth-Key': '***'},
      data: varArrTotal
    };
  
    axios.request(options)
    .then(()=> {
      console.log("Success in pushing to AttackLayer KV");
    })
    .catch(function (error) {
      console.error(error);
    });  
  })
  .catch(error => {
    console.error("Error fetching and storing data:", error);
  });

