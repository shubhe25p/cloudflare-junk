import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart for traffic change',
      },
    },
  };
  
  const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  function TrafficChange() {
    const [labelHttp, setLabelHttp] = useState([]);
    const [labels, setLabels] = useState([]);
    const [formatted, setFormatted] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTraffic = async () => {
      const resp = await fetch('https://workers.cfwgen-api.workers.dev/traffic-change');
      const trafficResp = await resp.json();
      let formatted = (trafficResp.data.total).map((item) => {
        let dateObj = new Date(item.date);
        return month[dateObj.getMonth()] + " " + dateObj.getDate();
      });
      setFormatted(formatted);
      setLabels(trafficResp.data.total);
      setLabelHttp(trafficResp.data.https);
      setLoading(false);
    };

    getTraffic();
  }, []);
   const data = {
    labels: formatted,
    datasets: [
      {
        label: 'Total Traffic Change',
        data: labels.map((item) => item.variance),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'HTTP Traffic Change',
        data: labelHttp.map((item) => item.variance),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {!loading ?<Bar options={options} data={data} />: <CircularProgress />}
      </Box>
    );
  }

  export default TrafficChange;

  
