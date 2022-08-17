import { useState, useEffect } from "react";
const LoginFacebook = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);

  const onLoginClick = () => {
    window.FB.login();
  };

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
      <button onClick={onLoginClick}>Login with Facebook</button>
    </div>
  );
};
export default LoginFacebook;
