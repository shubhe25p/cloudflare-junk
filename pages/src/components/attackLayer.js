import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
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
        text: 'Chart.js Bar Chart for Attack Layer 3',
      },
    },
  };
  
  const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  function AttackLayer3() {
    const [formatted, setFormatted] = useState([]);
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getAttackVolume = async () => {
      const resp = await fetch('https://workers.cfwgen-api.workers.dev/attack-layer3');
      const response = await resp.json();
      let formatted = response.data.map((item) => {
        let dateObj = new Date(item.date);
        return month[dateObj.getMonth()] + " " + dateObj.getDate();
      });
      setFormatted(formatted);
      setResponse(response.data);
      setLoading(false);
    };

    getAttackVolume();
  }, []);
   const data = {
    labels: formatted,
    datasets: [
      {
        label: 'Attack Volume',
        data: response.map((res) => res.val),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {!loading ?<Line options={options} data={data} />: <CircularProgress />}
      </Box>
    );
  }

  export default AttackLayer3;

  
