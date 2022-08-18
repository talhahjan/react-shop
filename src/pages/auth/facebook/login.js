import { useEffect } from "react";
import axios from "axios";
import { Outlet, Navigate } from "react-router-dom";
const FacebookLoginBtn = (props) => {
  const cssClass = props.cssClass ? props.cssClass : "btn";
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
    FB.api(`/me?fields=email,name,picture`, function (response) {
      onSuccess(response);
    });
  }

  const LoginInbackend = async (response) => {
    let names = response.name.split(" ");
    let user = {
      provider: "facebook",
      provider_id: response.id,

      email: response.email,
      first_name: names[0],
      last_name: names[1],
      avatar: response.picture.data.url,
      jwt: response.accessToken,
    };

    await axios
      .get(`api/login/facebook`, user)
      .then((res) => {
        if ((res.statusText = "Logged in success")) {
          localStorage.setItem("token", res.data.authorisation.token);
          console.log(res);
          window.location = process.env.REACT_APP_HOME_PAGE;
        } else {
          console.log(res);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
