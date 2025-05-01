import { Navigate } from "react-router-dom";
import { Config } from "../config";
import api from "../util/api";
import { useEffect, useState } from "react";

const DEV_JWT = import.meta.env.VITE_DEV_JWT as string | undefined;

async function verifyAuth() {
  if (DEV_JWT) {
    localStorage.setItem("jwt", DEV_JWT);
  }

  const urlSearchParams = new URLSearchParams(window.location.search);
  const token = urlSearchParams.get("token");

  if (token) {
    localStorage.setItem("jwt", token);
    window.history.replaceState({}, document.title, "/auth");
  }

  const jwt = localStorage.getItem("jwt");

  if (!jwt) {
    console.log("No JWT found, preparing for login");

    const loginUrl = Config.API_BASE_URL + "/auth/login/admin/";
    window.location.href = loginUrl;
    return null;
  }

  const response = await api.get("/auth/info");
  const roles = response.data.roles;

  if (roles.includes("ADMIN") || roles.includes("STAFF")) {
    const destination = localStorage.getItem("originalDestination") || "/home/";
    localStorage.removeItem("originalDestination");
    return <Navigate to={destination} replace={true} />;
  }

  console.log("Not authorized");
  localStorage.removeItem("jwt");
  localStorage.removeItem("originalDestination");
  return <Navigate to="/unauthorized/" replace={true} />;
}

export default function Auth() {
  const [redirect, setRedirect] = useState<JSX.Element | null>(null);

  useEffect(() => {
    verifyAuth()
      .then((element) => setRedirect(element))
      .catch((error) => {
        console.log(error);
        setRedirect(<Navigate to="/unauthorized/" replace={true} />);
      });
  }, []);

  return redirect;
}
