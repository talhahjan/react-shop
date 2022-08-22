import jwt_decode from "jwt-decode";
import { handleCallbackResponse } from "./lib";
import axios from "axios";

const refreshJwt = async () => {
  return await axios
    .get(`api/jwt/refresh`)
    .then((res) => localStorage.setItem("token", res.data.authorisation.token))
    .catch((error) => console.log(`error refreshing jwt token`, error));
};

const useAuth = (token) => {
  google.accounts.id.initialize({
    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    callback: handleCallbackResponse,
  });

  google.accounts.id.prompt();
  const lastDate = Date.now() - 1 * 24 * 60 * 60 * 1000;

  if (!token) return null;

  const user = jwt_decode(token);

  // if age of token is more than one day refresh it
  if (user.nbf * 1000 < lastDate) {
    console.log(`jwt need to be refreshed`);
    refreshJwt();
  }

  if (user.exp * 1000 < Date.now()) {
    console.log(`jwt expired`);
    localStorage.removeItem("token");
    return null;
  }

  return user;
};

export default useAuth;
