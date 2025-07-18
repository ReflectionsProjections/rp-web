import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Page } from "./components/Page";
import { Home } from "./routes/Home";
import { Login } from "./routes/Login";
import { ResumeAllPDF } from "./routes/ResumeAllPDF";
import { ResumeBook } from "./routes/ResumeBook/ResumeBook";
import { DownloadPage } from "./routes/DownloadPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={<Page showNav={true} pageContent={<Home />} />}
        />
        <Route
          path="/resume-book/:resumeId/download"
          element={<DownloadPage />}
        />
        <Route path="/resume-book/:resumeId?" element={<ResumeBook />} />
        <Route
          path="/login"
          element={<Page showNav={true} pageContent={<Login />} />}
        />
        <Route
          path="/resume-book/dev"
          element={<Page showNav={false} pageContent={<ResumeAllPDF />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
