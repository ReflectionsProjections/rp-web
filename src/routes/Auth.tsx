import { Navigate } from "react-router-dom";
import { Config } from "../config";
import { jwtDecode } from "jwt-decode";

const POST_AUTH_URL = "/home/";
const BAD_AUTH_URL = "/unauthorized/";

export default function Auth() {
  interface JwtPayload {
    roles: string[];
  }

  localStorage.setItem("jwt", "");
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
    console.log(POST_AUTH_URL);
    const decodedToken = jwtDecode(jwt) as JwtPayload;
    if (
      decodedToken.roles.includes("ADMIN") ||
      decodedToken.roles.includes("STAFF")
    ) {
      return <Navigate to={POST_AUTH_URL} replace={true} />;
    }

    localStorage.removeItem("jwt");
    return <Navigate to={BAD_AUTH_URL} replace={true} />;
  } else {
    console.log("Redirecting to api login...");
    window.location.href = Config.API_BASE_URL + "/auth/login/admin/";
    return null;
  }
}
