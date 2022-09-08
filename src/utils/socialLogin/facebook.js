import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { onErrorLogin, onSuccessLogin } from "../lib";

const FacebookLogin = ({ cssClass, btnText, icon }) => {
  const navigate = useNavigate();
  const [jsLoaded, setJsLoaded] = useState(false);

  useEffect(() => {
    if (!jsLoaded) {
      return;
    }

    window.fbAsyncInit = function () {
      FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID,
        autoLogAppEvents: true,
        xfbml: false,
        version: "v14.0",
      });
    };
  }, [jsLoaded]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.defer = true;
    script.crossorigin = "anonymous";
    script.onload = () => setJsLoaded(true);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const runApi = (response, jwt, provider_id) => {
    const user = {
      provider: "facebook.com",
      provider_id: provider_id,
      email: response.email,
      first_name: response.first_name,
      last_name: response.last_name,
      avatar: response.picture.data.url,
      jwt: jwt,
      location: response.location ? response.location.name : null,
      homeTown: response.hometown ? response.hometown.name : null,
    };
    if (!response.email) return navigate("/register", { state: user });
    onSuccessLogin(user);
  };

  const SignIn = () => {
    FB.getLoginStatus(function (response) {
      if (response.authResponse) {
        const jwt = response.authResponse.accessToken;
        const provider_id = response.authResponse.userID;
        FB.api(
          "/me?fields=id,name,email,picture,location,first_name,last_name,hometown",
          (response) => {
            runApi(response, jwt, provider_id);
          }
        );
      } else {
        FB.login(
          function (response) {
            console.log(response);
            if (response.authResponse) {
              const jwt = response.authResponse.accessToken;
              const provider_id = response.authResponse.userID;
              FB.api(
                "/me?fields=id,name,email,picture,location,first_name,last_name,hometown",
                (response) => {
                  runApi(response, jwt, provider_id);
                }
              );
            } else {
              onErrorLogin("User cancelled login or did not fully authorize.");
            }
          },
          {
            scope: "public_profile,email,user_location,user_hometown",
            auth_type: "rerequest",
          }
        );
      }
    });
  };

  return (
    <button className={cssClass} onClick={() => SignIn()}>
      {icon}
      {btnText}
    </button>
  );
};
export default FacebookLogin;
