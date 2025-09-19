import Home from "./routes/pages/Home";
import Stats from "./routes/pages/Stats";
import Events from "./routes/pages/Events";
import Meetings from "./routes/pages/Meetings";
import Roles from "./routes/pages/Roles";
import Sponsors from "./routes/pages/Sponsors";
import Checkin from "./routes/pages/Checkin";
import Leaderboard from "./routes/pages/Leaderboard";
import Attendance from "./routes/pages/Attendance";
import Massmailer from "./routes/pages/Massmailer";
import Speakers from "./routes/pages/Speakers";
import Shifts from "./routes/pages/Shifts";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/stats", element: <Stats /> },
  { path: "/events", element: <Events /> },
  { path: "/meetings", element: <Meetings /> },
  { path: "/roles", element: <Roles /> },
  { path: "/sponsors", element: <Sponsors /> },
  { path: "/speakers", element: <Speakers /> },
  { path: "/shifts", element: <Shifts /> },
  { path: "/checkin", element: <Checkin /> },
  { path: "/massmailer", element: <Massmailer /> },
  { path: "/leaderboard-view", element: <Leaderboard /> },
  { path: "/attendance-view", element: <Attendance /> }
];

export default routes;
