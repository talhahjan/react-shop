import React, { useEffect, useState } from "react";
import { handleCallbackResponse } from "../lib";
const GoogleLogin = (props) => {
  useEffect(() => {
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: props.theme ? props.theme : "outline",
      logo_alignment: props.logo_alignment ? props.logo_alignment : "left",
      shape: props.shape ? props.shape : "pill",
      width: props.width ? props.width : null,
      size: props.size ? props.size : "large",
      type: props.type ? props.type : "standard",
    });
  }, []);

  return (
    <div id="signInDiv" className={props.cssClass ? props.cssClass : ""}></div>
  );
};

export default GoogleLogin;
