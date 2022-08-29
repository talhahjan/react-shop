import { useEffect } from "react";
import { handleCallbackResponse } from "../lib";
const GoogleLogin = ({ shape, cssClass, size, width, height }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log("jsloaded");
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleCallbackResponse,
        // context: "use",
        // ux_mode: "redirect",
      });

      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        {
          theme: "outline",
          size: size ? size : "large",
          shape: shape ? shape : "rectangular",
          width: width ? width : "250px",
          height: height ? height : "35px",
        } // customization attributes
      );
      google.accounts.id.prompt();
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="buttonDiv" className={cssClass}></div>;
};
export default GoogleLogin;
