import Dashboard from "./routes/pages/Dashboard";
import Stats from "./routes/pages/Stats";
import Events from "./routes/pages/Events";
import Meetings from "./routes/pages/Meetings";
import Roles from "./routes/pages/Roles";
import Sponsors from "./routes/pages/Sponsors";
import Merch from "./routes/pages/Merch";
import EventCheckin from "./routes/pages/EventCheckin";
import Attendance from "./routes/pages/Attendance";
import Speakers from "./routes/pages/Speakers";
import Shifts from "./routes/pages/Shifts";

const routes = [
  { path: "/", element: <Dashboard /> },
  { path: "/stats", element: <Stats /> },
  { path: "/events", element: <Events /> },
  { path: "/meetings", element: <Meetings /> },
  { path: "/roles", element: <Roles /> },
  { path: "/sponsors", element: <Sponsors /> },
  { path: "/merch", element: <Merch /> },
  { path: "/event-checkin", element: <EventCheckin /> },
  { path: "/attendance-view", element: <Attendance /> },
  { path: "/speakers", element: <Speakers /> },
  { path: "/shifts", element: <Shifts /> }
];

export default routes;
