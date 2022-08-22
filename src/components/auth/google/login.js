import { useEffect, useState } from "react";

import axios from "axios";
const GoogleLogin = (props) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div
        id="g_id_onload"
        data-client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        data-ux_mode="redirect"
        data-login_uri="https://tjshop.vercel.app"
      ></div>
      <div className="g_id_signin" data-type="standard"></div>
    </>
  );
};

export default GoogleLogin;
