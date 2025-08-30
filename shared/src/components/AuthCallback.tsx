import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const returnTo = decodeURIComponent(params.get("state") || "/");
    const redirectUrl = new URL("/auth/callback", window.location.origin);

    if (!code) {
      void navigate("/unauthorized");
      return;
    }

    api
      .post("/auth/login/web", { code, redirectUri: redirectUrl.toString() })
      .then((response) => {
        localStorage.setItem("jwt", response.data.token);
        void navigate(returnTo);
      })
      .catch(() => {
        void navigate("/unauthorized");
      });
  }, [navigate]);

  return <p>Completing login...</p>;
};

export default AuthCallback;
