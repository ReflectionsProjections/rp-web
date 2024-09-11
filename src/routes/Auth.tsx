import { Navigate } from "react-router-dom";
import { Config } from "../config";
import { jwtDecode } from "jwt-decode";

const POST_AUTH_URL = "/home/";
const BAD_AUTH_URL = "/unauthorized/";
const AUTH_URL = "/auth/";

export default function Auth() {
  console.log("Auth component");
  console.log(window.location.search);

  interface JwtPayload {
    roles: string[];
  }
  
  const urlSearchParams = new URLSearchParams(window.location.search);
  let jwt = localStorage.getItem("jwt");
  
  // JWT not in local storage
  if (!jwt) {
    window.history.pushState({}, document.title, "/");
    
    // Check if JWT is in our query params    
    jwt = urlSearchParams.get("token");
    if (jwt) {
      localStorage.setItem("jwt", jwt);
    }
  }

  // jwt in local storage or query params
  if (jwt) {
    const decodedToken = jwtDecode(jwt) as JwtPayload;
    if (decodedToken.roles.includes("ADMIN") || decodedToken.roles.includes("STAFF")) {
      return <Navigate to={POST_AUTH_URL} replace={true}/>;
    }
    
    localStorage.removeItem("jwt");
    return <Navigate to={BAD_AUTH_URL} replace={true}/>;
  }

  jwt = urlSearchParams.get("token");
  console.log("jwt:", jwt);

  if (jwt) {
    localStorage.setItem("jwt", jwt)
    return <Navigate to={AUTH_URL} replace={true}/>;
  } else {
    console.log("Redirecting to api login...");
    window.location.href = Config.API_BASE_URL + "/auth/login/admin/";
    return null;
  }
}
