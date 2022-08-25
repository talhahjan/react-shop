import jwt_decode from "jwt-decode";
import axios from "axios";

export const LoginBackend = async (user) => {
  console.log(user);
  await axios
    .post(`api/login/${user.provider}`, user)
    .then((res) => {
      if ((res.statusText = "Logged in success")) {
        signIn(res.data.authorization.token);
      } else {
        throw new Error(
          "unknown error  occurred during login user in back-end server"
        );
      }
    })
    .catch((error) => {
      throw new Error("error occurred while login user from back-end server");
    });
};

export const signOut = () => {
  localStorage.removeItem("token");
  console.log("signed In successfully");
};

export const signIn = (token) => {
  localStorage.setItem("token", token);
  window.location = process.env.REACT_APP_HOME_PAGE;
  console.log("signed Out successfully");
};

export const onSuccessLogin = (response) => {
  const jwt = response._tokenResponse.oauthAccessToken;

  const user = {
    provider: response.user.providerData.providerId,
    provider_id: response.user.providerData.uid,
    email: response.email,
    first_name: response._tokenResponse.displayName,
    last_name: response._tokenResponse.lastName,
    avatar: response._tokenResponse.photoUrl,
    jwt: jwt,
  };
  // oauthAccessToken;

  LoginBackend(user);
};

export const onErrorLogin = (error) => {
  return error;
};
