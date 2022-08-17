import { useState, useEffect } from "react";
const LoginFacebook = () => {
 useEffect(() => {
        window.fbAsyncInit = () => {
            window.FB.init({
                appId            : process.env.REACT_APP_FACEBOOK_APP_ID,
                autoLogAppEvents : true,
                xfbml            : true,
                version          : 'v11.0'
            });
        };

  function Login() {
    FB.getLoginStatus(function (response) {
      if (response.status === "connected") {
        // The user is logged in and has authenticated your
        // app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed
        // request, and the time the access token
        // and signed request each expire.
        var uid = response.authResponse.userID;
        var accessToken = response.authResponse.accessToken;
        console.log("userall ready loged In ", response);
        testAPI();
      } else if (response.status === "not_authorized") {
        // The user hasn't authorized your application.  They
        // must click the Login button, or you must call FB.login
        // in response to a user gesture, to launch a login dialog.
        console.log("user is not loged In ", response);
        FB.login();
        console.log("user Loged id by call fb.login method ", response);
        testAPI();
      } else {
        // The user isn't logged in to Facebook. You can launch a
        // login dialog with a user gesture, but the user may have
        // to log in to Facebook before authorizing your application.
        console.log("user not logged In try failed");
      }
    });
  }

  // This is called with the results from from FB.getLoginStatus().
  // Load the SDK asynchronously
  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log("Welcome!  Fetching your information.... ");
    FB.api("/me", function (response) {
      console.log("Successful login for: " + response.name);
      document.getElementById("status").innerHTML =
        "Thanks for logging in, " + response.name + "!";
    });
  }

  return (
    <div>
      <button onClick={Login}>Login with Facebook</button>
      {/* <button className="d-block" onClick={logout}>
        Logout
      </button> */}
      <div id="status"></div>
    </div>
  );
};
export default LoginFacebook;
