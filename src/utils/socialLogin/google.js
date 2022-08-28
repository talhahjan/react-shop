import { handleCallbackResponse } from "../lib";
import { useEffect } from "react";
export const GoogleLogin = ({ cssClass, size, type, width }) => {
  useEffect(() => {
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: size ? size : "large" } // customization attributes
    );
  }, []);

  return <div id="buttonDiv"></div>;
};
