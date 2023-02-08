import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Main from './components/main';
import TrafficChange from './components/TrafficChange';
import PopularDomain from './components/popularDomain';
import AttackLayer3 from "./components/attackLayer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/traffic-change" element={<TrafficChange />} />
      <Route path="/popular-domains" element={<PopularDomain />} />
      <Route path="/attack-layer3" element={<AttackLayer3 />} />
    </Routes>
  );
}

export default App;