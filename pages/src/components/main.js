import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {

  return (
    <div>
      <h1>Endpoints</h1>
      <h2>
        <Link to={`/traffic-change`}>Traffic-change</Link>
      </h2>
      <h2>
        <Link to={`/popular-domains`}>Popular Domains</Link>
      </h2>
      <h2>
        <Link to={`/attack-layer3`}>AttackLayer3</Link>
      </h2>
    </div>
  );
};


export default Main;