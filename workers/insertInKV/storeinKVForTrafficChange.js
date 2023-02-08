// Fetch the CSV file from the remote URL
const Papa=require('papaparse');
const axios=require('axios').default;
var varArrTotal=[];
var varArrHttp=[];

fetch("https://raw.githubusercontent.com/lauragift21/hiring-submission-data/main/internet-traffic.csv")
  .then(response => response.text())
  .then(data => {
    // Convert the CSV data to JSON
    let jsondata = Papa.parse(data, {
      header: true,
      dynamicTyping: true
    }).data;
    const keys = Object.keys(jsondata[0]);
    const totalObj = []
    const httpObj = []
    keys.map((key) => {
      if(key.startsWith('total/timestamp')){
        const tempKey = jsondata[0][key];
        const tempValue = jsondata[0][key.replace('timestamp', 'value')];
        totalObj.push({
          key: tempKey,
          value: tempValue,
        });
        }
        if(key.startsWith('http/timestamp')){
          const tempKey = jsondata[0][key];
          const tempValue = jsondata[0][key.replace('timestamp', 'value')];
          httpObj.push({
            key: tempKey,
            value: tempValue,
          });
          }  
    });
    var i=0;
    var arr=[];
    var arrhttp=[];
    var cnt=0;
    var avg=0;
    var avghttp=0;
    for(var j=0;j<totalObj.length;j++){
      var startDate = (totalObj[i].key).toString().substring(0,10);
      var endDate = (totalObj[j].key).toString().substring(0,10);
      if(startDate!==endDate || j===totalObj.length-1){
        avg=avg/cnt;
        avghttp=avghttp/cnt;
        arr.push(avg);
        arrhttp.push(avghttp);
        cnt=0;
        avg=0;
        avghttp=0;
        i=j; 
      }
      avg=avg+totalObj[j].value;
      avghttp=avghttp+httpObj[j].value;
      cnt++;
    }
    avg=0;
    avghttp=0;
    cnt=0;
    var k=0;
    i=0;

    for(var j=0;j<totalObj.length;j++){
      var startDate = (totalObj[i].key).toString().substring(0,10);
      var endDate = (totalObj[j].key).toString().substring(0,10);
      if(startDate!==endDate || j===totalObj.length-1){
        avg=avg/cnt;
        avg=Math.sqrt(avg);
        varArrTotal.push({
          key: k.toString(),
          value: JSON.stringify({
            date: totalObj[i].key,
            variance: avg,
          })
        });
        varArrHttp.push({
          key: k.toString(),
          value: JSON.stringify({
            date: totalObj[i].key,
            variance: avghttp,
          })
        });
        cnt=0;
        avg=0;
        avghttp=0;
        k++;
        i=j;
      }
      avg=avg+(arr[k]-totalObj[j].value)*(arr[k]-totalObj[j].value);
      avghttp=avghttp+(arrhttp[k]-httpObj[j].value)*(arrhttp[k]-httpObj[j].value);
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
      console.log("Success in pushing to Total KV");
    })
    .catch(function (error) {
      console.error(error);
    });  
  })
  .then(() => {
    var options = {
      method: 'PUT',
      url: 'https://api.cloudflare.com/client/v4/accounts/0f8d933e21e2d53fadf1a16694f1c1dc/storage/kv/namespaces/fcf3594b9f6940bc981e6b9ff9419e78/bulk',
      headers: {'Content-Type': 'application/json', 'X-Auth-Email': 'shubhpachchigar@gmail.com', 'X-Auth-Key': '20dd7845fcf8b1dc3163f21e3a8181afaa230'},
      data: varArrHttp
    };
    
    axios.request(options)
    .then(()=> {
      console.log("Success in pushing to HTTP KV");
    })
    .catch(function (error) {
      console.error(error);
    });  
  })
  .catch(error => {
    console.error("Error fetching and storing data:", error);
  });

