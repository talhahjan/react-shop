import { useState, useEffect } from "react";
const LoginFacebook = () => {
  function logout() {
    FB.getLoginStatus((response) => {
      if (response.status === "connected") {
        FB.logout();
      } else {
        console.log("user not logged in");
      }
    });
  }

  function login() {
    FB.getLoginStatus(function (response) {
      statusChangeCallback(response);
    });
  }

  function statusChangeCallback(response) {
    console.log("statusChangeCallback");
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === "connected") {
      // Logged into your app and Facebook.
      testAPI();
    } else {
      // The person is not logged into your app or we are unable to tell.
      document.getElementById("status").innerHTML =
        "Please log " + "into this app.";
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function (response) {
      statusChangeCallback(response);
    });
  }

  function testAPI() {
    FB.api("/me?fields=id,name,email,picture", function (response) {
      console.log(response);
    });
  }

  useEffect(() => {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: "v11.0",
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
    <div>
      <button className="btn btn-danger d-block m-2" onClick={login}>
        Login with Facebook
      </button>
      <button className="btn btn-danger d-block m-2" onClick={logout}>
        logout
      </button>
      <div id="status"></div>
    </div>
  );
};

export default LoginFacebook;
