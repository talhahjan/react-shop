import React, { useState, useEffect } from "react";
import { FaFacebookF } from "react-icons/fa";
import { onErrorLogin, onSuccessLogin } from "../lib";
const FacebookLogin = ({ cssClass, btnText, icon }) => {
  const [jsLoaded, setJsLoaded] = useState(false);

  useEffect(() => {
    if (!jsLoaded) {
      console.log("js not Loaded");
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
    console.log("jsLoaded");

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const SignIn = () => {
    FB.login(
      function (response) {
        console.log(response);
        if (response.authResponse) {
          const jwt = response.authResponse.accessToken;
          const provider_id = response.authResponse.userID;
          FB.api(
            "/me?fields=id,name,email,picture,location,first_name,last_name,hometown",
            (response) => {
              const user = {
                provider: "facebook.com",
                provider_id: provider_id,
                email: response.email ? response.email : null,
                first_name: response.first_name,
                last_name: response.last_name,
                avatar: response.picture.data.url,
                jwt: jwt,
                 location: response.location ? response.location.name : null,
                 homeTown: response.hometown ? response.hometown.name : null,
              };

              onSuccessLogin(user);
            }
          );
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      {
        scope: "public_profile,email,user_location,user_hometown",
        auth_type: "rerequest",
      }
    );
  };

  return (
    <button className={cssClass} onClick={() => SignIn()}>
      {icon}
      {btnText}
    </button>
  );
};
export default FacebookLogin;
