import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  roles: string[];
  exp: number; // in seconds
}

export function verifyJwt(jwt: string) {
  let decodedToken;
  try {
    decodedToken = jwtDecode<JwtPayload>(jwt);
  } catch (error) {
    return null;
  }

  if (decodedToken.exp < Date.now() / 1000) {
    return null;
  }

  return decodedToken;
}