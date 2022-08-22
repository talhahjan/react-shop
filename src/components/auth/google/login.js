import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
const GoogleLogin = (props) => {
  const [loaded, setLoaded] = useState(false);
  const handleCallbackResponse = (response) => {
    const userObject = jwt_decode(response.credential);

    const user = {
      provider: "google",
      provider_id: userObject.sub,
      email: userObject.email,
      first_name: userObject.given_name,
      last_name: userObject.family_name,
      avatar: userObject.picture,
      jwt: response.credential,
    };
    LoginBackend(user);
    console.log("response", user);
  };

  const LoginBackend = async (user) => {
    await axios
      .post(`api/login/google`, user)
      .then((res) => {
        if ((res.statusText = "Logged in success")) {
          localStorage.setItem("token", res.data.authorization.token);
          console.log(res);
          window.location = process.env.REACT_APP_HOME_PAGE;
        } else {
          console.log(res);
        }
      })
      .catch((error) => {
        throw new Error("error occurred while login user from back-end server");
      });
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client"; // whatever url you want here
    script.async = true;
    script.defer = true;
    script.addEventListener("load", () => setLoaded(true));
    document.head.appendChild(script);

    return () => {};
  }, []);

  useEffect(() => {
    if (!loaded) return;
    // global google
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
      ux_mode: props.uxMode ? props.uxMode : "pop",
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: props.theme ? props.theme : "outline",
      logo_alignment: props.logo_alignment ? props.logo_alignment : "left",
      shape: props.shape ? props.shape : "pill",
      width: props.width ? props.width : "200px",
      size: props.size ? props.size : "large",
      type: props.type ? props.type : "standard",
    });
  }, [loaded]);

  return <div id="signInDiv"></div>;
};

export default GoogleLogin;
