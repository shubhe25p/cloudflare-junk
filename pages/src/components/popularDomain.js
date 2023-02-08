import React, { useState, useEffect } from 'react';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
  
  function PopularDomain() {
    const [domains, setDomains] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDomain = async () => {
      const resp = await fetch('https://workers.cfwgen-api.workers.dev/popular-domain');
      const domainResp = await resp.json();
      const domains = domainResp.rankingEntries;
      setDomains(domains);
      setLoading(false);
    };

    getDomain();
  }, []);
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      {!loading ?
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Domain</TableCell>
            <TableCell align="left">Rank</TableCell>
            <TableCell align="left">Category</TableCell>
            <Tooltip title="The combination score is combination of domain popularity and the percentage change in traffic patterns.">
            <TableCell align="left">Combination Score</TableCell>
            </Tooltip>
          </TableRow>
        </TableHead>
        <TableBody>
          {domains.map((row) => (
            <TableRow
              key={row.domain}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.domain}
              </TableCell>
              <TableCell align="left">{row.rank}</TableCell>
              <TableCell align="left">{row.category}</TableCell>
              <TableCell align="left">{row.combination_score.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>: <CircularProgress />}
      </Box>
    );
  }

  export default PopularDomain;

  
