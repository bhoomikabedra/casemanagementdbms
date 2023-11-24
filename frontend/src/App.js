import React from 'react';
import {BrowserRouter,Route,Routes} from "react-router-dom";
// import SecondLogin from "./pages/seconlogin"
import Register from "./pages/register"
import Victim  from "./pages/victimland"
import Nav  from "./pages/nav"
import Policelogin  from "./pages/policelogin"
import Pslogin  from "./pages/pslogin"
import Victimlogin  from "./pages/victimlogin"
import Complaint from "./pages/complaint"
import Pspage from "./pages/pspage"
import Policepage from "./pages/policepage"
import Caseupdate from "./pages/caseupdate"
import Stationpolice from "./pages/stationpolice"
import Policecases from "./pages/policecases"
import UpdateCases from "./pages/updatecases"
import Seeupdatevictim from "./pages/seeupdatevictim"
import Leaderboard from "./pages/leaderboard"


function App() {
  return (
     <BrowserRouter>
     <Routes>
      {/* <Route exact path="/login" element={<SecondLogin/>} /> */}
      <Route exact path="/register" element={<Register/>} /> 
      <Route exact path="/victimland" element={<Victim/>} />
      <Route exact path="/" element={<Nav/>} />
      <Route exact path="/police_login" element={<Policelogin/>} />
      <Route exact path="/police_station_login" element={<Pslogin/>} />
      <Route exact path="/victimlogin" element={<Victimlogin/>} />
      <Route exact path="/complaint" element={<Complaint/>} />
      <Route exact path="/pspage" element={<Pspage/>} />
      <Route exact path="/policepage" element={<Policepage/>} />
      <Route exact path="/caseupdate" element={<Caseupdate/>} />
      <Route exact path="/stationpolice" element={<Stationpolice/>} />
      <Route exact path="/policecases" element={<Policecases/>} />
      <Route exact path="/updatecases/:complaint_id" element={<UpdateCases/>} />
      <Route exact path="/seeupdatevictim" element={<Seeupdatevictim/>} />
      <Route exact path="/leaderboard" element={<Leaderboard/>} />
     </Routes>
     </BrowserRouter>
  );
}

export default App;