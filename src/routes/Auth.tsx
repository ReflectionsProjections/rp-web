import {Navigate, useSearchParams} from "react-router-dom";
import {Config} from "../config";

const POST_AUTH_URL = "/home/"

export default function Auth() {
  console.log("Auth component");
  console.log(window.location.search)

  const [searchParams] = useSearchParams();

  let jwt = localStorage.getItem("jwt");
  if (!jwt) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    window.history.pushState({}, document.title, "/");
    jwt = urlSearchParams.get("token");
    if (jwt) {
      localStorage.setItem("jwt", jwt);
    }
  }

  // jwt found in local storage
  if (jwt) {
    return <Navigate to={POST_AUTH_URL} replace={true}/>;
  }

  jwt = searchParams.get("token");
  console.log("jwt:", jwt);

  if (jwt) {
    localStorage.setItem("jwt", jwt);
    console.log("Redirecting to post-auth URL...");
    return <Navigate to={POST_AUTH_URL} replace={true}/>;
  } else {
    console.log("Redirecting to api login...");
    window.location.href = Config.API_BASE_URL + "/auth/login/web/";
    return null;
  }
}