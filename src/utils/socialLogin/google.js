import { handleCallbackResponse } from "../lib";
import { useEffect } from "react";
const GoogleLogin = ({ shape, cssClass, size, width, height }) => {
  useEffect(() => {
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
  }, []);

  return <div id="buttonDiv" className={cssClass}></div>;
};
export default GoogleLogin;
