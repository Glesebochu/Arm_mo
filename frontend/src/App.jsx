import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SessionSummary from "./Pages/AnalyticsPage";
import SessionDetails from "./Pages/SessionDetails"; // Import the new component for session details
import Signup from "./Pages/Signup";
import UsageView from "./Pages/Usage";
import Insights from "./Pages/Insights";
import Home from "./Pages/Home";
import Settings from "./Pages/Settings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/" element={<SessionSummary />} />
        <Route path="/session/:sessionId" element={<SessionDetails />} />
        <Route path="/Usage" element={<UsageView />} />
        <Route path="/Insights" element={<Insights />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
