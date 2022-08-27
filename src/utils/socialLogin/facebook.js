import React, { useState, useEffect } from "react";
import { FaFacebookF } from "react-icons/fa";
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
          console.log("Welcome!  Fetching your information.... ");
          FB.api(
            "/me?fields=id,name,email,picture,location,first_name,last_name,hometown",
            function (response) {
              console.log(response);
            }
          );
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      {
        scope: "public_profile,email,user_location,user_hometown",
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