import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TypedAxiosInstance } from "../api/type-wrapper";

type AuthCallbackProps = {
  api: TypedAxiosInstance;
};

const AuthCallback: React.FC<AuthCallbackProps> = ({ api }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const returnTo = decodeURIComponent(params.get("state") || "/");
    const redirect_uri = `${window.location.origin}/auth/callback`;

    if (!code) {
      void navigate("/unauthorized");
      return;
    }

    api
      .post("/auth/login/web", { code, redirectUri: redirect_uri })
      .then((response) => {
        localStorage.setItem("jwt", response.data.token);
        void navigate(returnTo);
      })
      .catch(() => {
        void navigate("/unauthorized");
      });
  }, [api, navigate]);

  return <p>Completing login...</p>;
};

export default AuthCallback;
