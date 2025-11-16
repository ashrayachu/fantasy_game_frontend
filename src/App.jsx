import "./App.css";
import "./index.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Navbar from "./components/common/Navbar";
// import Footer from "./components/common/Footer";

import MatchesPage from "./pages/MatchesPage";
import SelectplayerPage from "./pages/SelectplayerPage";
import TeamPage from "./pages/TeamsPage"
import TeamPreview from "./pages/TeamPreviewPage"
import EditTeamPage from "./pages/EditTeamPage.jsx"




function App() {
  return (
    <div className="m-0 p-0  overflow-x-hidden">
      <BrowserRouter>
        <div className="m-0 p-0 w-screen overflow-x-hidden flex flex-col min-h-screen">
          <Navbar />

          {/* ✅ Main content area */}
          <main className="flex-grow ">
            <Routes>
              <Route path="/" element={<MatchesPage />} />
              <Route path="/select-players/:eventId" element={<SelectplayerPage />} />
              <Route path="/teams" element={<TeamPage/>} />
              <Route path="/preview/:teamId" element={<TeamPreview/>} />
              <Route path="/edit-team/:eventId/:teamId" element={<EditTeamPage/>} />


            </Routes>
          </main>

          {/* <Footer /> */}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;