<<<<<<< HEAD
import { useState } from 'react'
import './index.css'
import { Goals } from './pages/Goals'


=======
import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SessionSummary from "./Pages/AnalyticsPage";
import SessionDetails from "./Pages/SessionDetails"; // Import the new component for session details
import UsageView from "./Pages/Usage";
import Insights from "./Pages/Insights";
>>>>>>> main
function App() {
  return (
<<<<<<< HEAD
    <>
      <Goals className="m-8" />
    </>
  )
=======
    <Router>
      <Routes>
        {/* For your specific Modules Modify this so that your Components show up when you run Vite */}
        <Route path="/" element={<SessionSummary />} />
        
        {/* No need to to remove the below */}
        <Route path="/session/:sessionId" element={<SessionDetails />} />
        <Route path="/Usage" element={<UsageView />} />
        <Route path="/Insights" element={<Insights />} />
      </Routes>
    </Router>
  );
>>>>>>> main
}

export default App;
