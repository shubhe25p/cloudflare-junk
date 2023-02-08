import Store from '../radarStore';

const median = arr => {
    const mid = Math.floor(arr.length / 2),
      nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  };



const handleComputeStat = async () => {
    const trafficChangeJSON = new Store();
    const body = await trafficChangeJSON._all();

    var avg = 0;
    var min = 1;
    var max = 0;
    body.map((val) => {
        if(val < min)
            min = parseFloat(val);
        if(val > max)
            max = parseFloat(val);
        avg += parseFloat(val);

    });
    avg = avg / body.length;   
    const medianVal = parseFloat(median(body));


    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
    };
    const response = {
        mean: avg.toFixed(3),
        median: medianVal.toFixed(3),
        min: min.toFixed(3),
        max: max.toFixed(3)
    };
    return new Response(JSON.stringify(response), { headers });
}

export default handleComputeStat;




