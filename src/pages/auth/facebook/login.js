import { useEffect } from "react";
import axios from "axios";
const FacebookLoginBtn = (props) => {
  const cssClass = props.cssClass ? props.cssClass : "";
  const appID = props.appID
    ? props.appID
    : process.env.REACT_APP_FACEBOOK_APP_iD;
  const onSuccess = props.onSuccess;
  const onError = props.onError;
  function login() {
    if (FB.getAuthResponse()) {
      return onError("user All Ready Logged in");
    }

    try {
      FB.login(function (response) {
        console.log("user Logged In successfully");
        console.log(response.authResponse.userID);
        testAPI();
      });
    } catch (error) {
      onerror(error);
    }
  }

  function testAPI() {
    FB.api(`/me?fields=email,name,picture,location`, function (response) {
      onSuccess(response);
    });
  }

  useEffect(() => {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: "v14.0",
      });
    };
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  return (
    <button className={cssClass} onClick={login}>
      {props.children}
    </button>
  );
};

export default FacebookLoginBtn;
