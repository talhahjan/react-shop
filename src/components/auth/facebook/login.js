import { useEffect } from "react";
import axios from "axios";
const FacebookLogin = (props) => {
  const cssClass = props.cssClass ? props.cssClass : "";
  function login() {
    if (FB.getAuthResponse()) {
      return onError("user All Ready Logged in");
    }

    FB.login(function (response) {
      if (response.authResponse) {
        FB.api(`/me?fields=id,name,email,picture`, function (response) {
          LoginInbackend(response);
        });
      } else {
        onError("User cancelled login or did not fully authorize.");
      }
    });
  }

  const onError = async (error) => {
    console.log(error);
  };

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
      .post(`api/login/facebook`, user)
      .then((res) => {
        console.log(res);
        if ((res.statusText = "Logged in success")) {
          localStorage.setItem("token", res.data.authorisation.token);
          window.location = process.env.REACT_APP_HOME_PAGE;
        } else {
          console.log(res);
        }
      })
      .catch((error) => {
        throw new Error(error);
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

export default FacebookLogin;
