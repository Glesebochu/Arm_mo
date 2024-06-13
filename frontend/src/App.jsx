import "./index.css";
import { Goals } from "./pages/Goals";
import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SessionSummary from "./pages/AnalyticsPage";
import SessionDetails from "./pages/SessionDetails"; // Import the new component for session details
import UsageView from "./pages/Usage";
import Insights from "./pages/Insights";
import { RemovedSessions } from "./components/Custom/RemovedSessionsTable";

import Home from "./pages/Home";
import { TransitionPhase } from "./pages/TransitionPhase";
// import Settings from "./pages/Settings";
import CreatePreparationPhase from "./pages/PreparationPhases/CreatePreparationPhase";
import DistractionsTable from "./components/ui/DistractionsTable";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* For your specific Modules Modify this so that your Components show up when you run Vite */}
          <Route path="/" element={<Goals />} />

          {/* No need to to remove the below */}
          {/* <Route path="/session/:sessionId" element={<SessionDetails />} />
          <Route path="/Usage" element={<UsageView />} />
          <Route path="/Insights" element={<Insights />} />
          <Route path="/RemovedSessions" element={<RemovedSessions />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Settings" element={<Settings />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
