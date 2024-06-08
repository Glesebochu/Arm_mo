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
// import Settings from "./pages/Settings";

import SessionDetails from "./pages/SessionDetails";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import UsageView from "./pages/Usage";
import Insights from "./pages/Insights";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Landing from "./pages/Landing";
import ProtectedRoute from "../utils/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Landing />
        } 
        />
        <Route path="/Home" element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        } />
        <Route path="/Usage" element={
          <ProtectedRoute>
            <UsageView />
          </ProtectedRoute>
        } 
        />
        <Route path="/session/:sessionId" element={
          <ProtectedRoute>
            <SessionDetails/>
          </ProtectedRoute>
        } />
        <Route path="/Insights" element={
          <ProtectedRoute>
            <Insights/>
          </ProtectedRoute>
        } />
        <Route path="/Settings" element={
          <ProtectedRoute>
            <Settings/>
          </ProtectedRoute>
        } />
        <Route path="/signup" element={
          <Signup/>
        }/>
        <Route path="/signin" element={
          <Signin/>
        }/>
      </Routes>
    </Router>
  );
}

export default App;
