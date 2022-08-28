import jwt_decode from "jwt-decode";
import axios from "axios";
import { Navigate } from "react-router-dom";
export const handleCallbackResponse = (response) => {
  const userObject = jwt_decode(response.credential);
  console.log("user object", userObject);
  const user = {
    provider: "google.com",
    provider_id: userObject.sub,
    email: userObject.email,
    first_name: userObject.given_name,
    last_name: userObject.family_name,
    avatar: userObject.picture,
    jwt: response.credential,
  };
  console.log("user ", user);
  LoginBackend(user);
};

const socialSignOut = (provider) => {
  switch (provider) {
    case "google.com":
      console.log("google logout performed");
      google.accounts.id.disableAutoSelect();
    case "facebook.com":
      FB.logout((response) => {
        console.log("facebook logout", response);
      });
    case "twitter.com":
  }
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
      throw new Error(
        "error occurred while login user from back-end server",
        error
      );
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

export const onSuccessLogin = (user) => {
  console.log(user);
  socialSignOut(user.provider);
  if (!user.email) Navigate("/register", { state: user });
  else LoginBackend(user);
};

export const onErrorLogin = (error) => {
  return error;
};
