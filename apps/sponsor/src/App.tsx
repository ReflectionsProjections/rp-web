import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Page } from "./components/Page";
import { Home } from "./routes/Home";
import { Login } from "./routes/Login";
import { ResumeAllPDF } from "./routes/ResumeBook/ResumeAllPDF";
import { ResumeBook } from "./routes/ResumeBook/ResumeBook";
import { DownloadPage } from "./routes/DownloadPage";
import { AuthCallback, googleAuth, RequireAuth } from "@rp/shared";
import { useEffect } from "react";

function RefreshHandler() {
  useEffect(() => {
    if (window.location.pathname === "/resume-book/dev") {
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get("redirect");
      googleAuth(false, redirect ?? undefined);
      return;
    }

    window.location.href = "/login";
  }, []);

  return <p>Redirecting to login...</p>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/refresh" element={<RefreshHandler />} />
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
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route element={<RequireAuth />}>
          <Route
            path="/resume-book/dev"
            element={<Page showNav={false} pageContent={<ResumeAllPDF />} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
