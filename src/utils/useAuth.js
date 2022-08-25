import jwt_decode from "jwt-decode";
import axios from "axios";

const refreshJwt = async () => {
  return await axios
    .get(`api/jwt/refresh`)
    .then((res) => localStorage.setItem("token", res.data.authorization.token))
    .catch((error) => console.log(`error refreshing jwt token`, error));
};

const useAuth = (token) => {
  const lastDate = Date.now() - 1 * 24 * 60 * 60 * 1000;

  if (!token) {
    return null;
  }

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
