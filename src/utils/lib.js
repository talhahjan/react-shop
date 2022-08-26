import jwt_decode from "jwt-decode";
import axios from "axios";
import firebase, { auth } from "./firebase/firebase-config";
export const handleCallbackResponse = (response) => {
  const userObject = jwt_decode(response.credential);

  const user = {
    provider: "google.com",
    provider_id: userObject.sub,
    email: userObject.email,
    first_name: userObject.given_name,
    last_name: userObject.family_name,
    avatar: userObject.picture,
    jwt: response.credential,
  };
  LoginBackend(user);
};

export const LoginBackend = async (user) => {
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
  firebase.auth().signOut();
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
    provider: response.providerId,
    provider_id: response.user.providerData[0].uid,
    email: response.user.email,
    first_name: response._tokenResponse.firstName,
    last_name: response._tokenResponse.lastName,
    avatar: response._tokenResponse.photoUrl,
    jwt: response._tokenResponse.oauthAccessToken,
  };
  // oauthAccessToken;
  console.log("user", user);
  console.log("response", response);
  LoginBackend(user);
};

export const onErrorLogin = (error) => {
  return error;
};
