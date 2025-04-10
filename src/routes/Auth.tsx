import { Navigate } from "react-router-dom";
import { Config } from "../config";
import api from "../util/api";
import { useEffect, useState } from "react";

const POST_AUTH_URL = "/home/";
const BAD_AUTH_URL = "/unauthorized/";

const DEV_JWT = import.meta.env.VITE_DEV_JWT;

async function verifyAuth() {
  if (DEV_JWT) {
    localStorage.setItem('jwt', DEV_JWT);
  }

  let jwt = localStorage.getItem("jwt");
  
  // JWT not in local storage
  if (!jwt) {
    console.log("not in local storage!");
    const urlSearchParams = new URLSearchParams(window.location.search);
    window.history.pushState({}, document.title, "/");
    
    // Check if JWT is in our query params    
    jwt = urlSearchParams.get("token");
    if (jwt) {
      console.log("jwt in search params!");
      localStorage.setItem("jwt", jwt);
    }
  }

  // jwt in local storage or query params
  if (jwt) {
    console.log("FOUND JWT!!!");
    const response = await api.get("/auth/info");

    const roles = response.data.roles;

    if (roles.includes("ADMIN") || roles.includes("STAFF")) {
      return <Navigate to={POST_AUTH_URL} replace={true}/>;
    }
    
    localStorage.removeItem("jwt");
    return <Navigate to={BAD_AUTH_URL} replace={true}/>;
  } else {
    console.log("Redirecting to api login...");
    window.location.href = Config.API_BASE_URL + "/auth/login/admin/";
    return null;
  }
}

export default function Auth() {
  const [redirect, setRedirect] = useState<JSX.Element | null>(null);

  useEffect(() => {
    verifyAuth().then((element) => setRedirect(element));
  }, []);

  return redirect;
}
