import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SessionSummary from "./Pages/AnalyticsPage";
import SessionDetails from "./Pages/SessionDetails"; // Import the new component for session details
import UsageView from "./Pages/Usage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SessionSummary />} />
        <Route path="/session/:sessionId" element={<SessionDetails />} />
        <Route path = "/Usage" element={<UsageView/>} />
      </Routes>
    </Router>
  );
}

export default App;
