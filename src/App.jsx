import "./App.css";
import "./index.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";

// import Navbar from "./components/common/Navbar";
// import Footer from "./components/common/Footer";

import MatchesPage from "./pages/MatchesPage";
import SelectplayerPage from "./pages/SelectplayerPage";
import TeamPage from "./pages/TeamsPage"



function App() {
  return (
    <div className="m-0 p-0  overflow-x-hidden">
      <BrowserRouter>
        <div className="m-0 p-0 w-screen overflow-x-hidden flex flex-col min-h-screen">
          {/* <Navbar /> */}

          {/* ✅ Main content area */}
          <main className="flex-grow ">
            <Routes>
              <Route path="/" element={<MatchesPage />} />
              <Route path="/select-players/:event_id" element={<SelectplayerPage />} />
              <Route path="/teams" element={<TeamPage/>} />
            </Routes>
          </main>

          {/* <Footer /> */}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;