import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PrivateRoute from "./components/Privateroute.jsx";
import Listings from "./pages/Listings.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import MediaPage from "./pages/MediaPage.jsx";
import EvaluationPage from "./pages/EvaluationPage.jsx";
import EvaluationEvents from "./pages/EvaluationEvents.jsx";
import JudgeScorePage from "./pages/JudgeScorePage.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import JudgeLogin from "./pages/JudgeLogin.jsx";
import PrizeSetup from "./pages/PrizeSetup.jsx";
import PrizeLogin from "./pages/PrizeLogin.jsx";
import PrizeClaim from "./pages/PrizeClaim.jsx";
function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/listings"
            element={
              <PrivateRoute>
                <Listings />
              </PrivateRoute>
            }
          />
          <Route
            path="/evaluation"
            element={
              <PrivateRoute>
                <EvaluationEvents />
              </PrivateRoute>
            }
          />

          <Route
            path="/evaluation/:id"
            element={
              <PrivateRoute>
                <EvaluationPage />
              </PrivateRoute>
            }
          />
          <Route path="/judge/score/:eventId" element={<JudgeScorePage />} />
          <Route path="/judge-dashboard" element={<Leaderboard />} />
          <Route path="/judge-login" element={<JudgeLogin />} />
          <Route path="/leaderboard/:eventId" element={<Leaderboard />} />
          <Route path="/listings/:id" element={<EventDetails />} />
          <Route path="/listings/:id/media" element={<MediaPage />} />
          <Route path="/evaluation/:id/prize" element={<PrizeSetup />} />
          <Route path="/prize-login" element={<PrizeLogin />} />
          <Route path="/prize-claim" element={<PrizeClaim />} />
          <Route element />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
