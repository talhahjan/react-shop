import React from "react";
import FacebookLoginBtn from "../pages/auth/facebook/login";
export const FacebookLogin = () => {
  const onSuccess = async (response) => {
    console.log(response);
  };
  return (
    <FacebookLoginBtn cssClass="btn btn-primary " onSuccess={onSuccess}>
      Login With FB
    </FacebookLoginBtn>
  );
};
