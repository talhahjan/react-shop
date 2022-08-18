import React from "react";
import FacebookLoginBtn from "../pages/auth/facebook/login";
export const FacebookLogin = () => {
  const onSuccess = async (response) => {
    console.log(response);
  };

  const onError = async (error) => {
    console.log(error);
  };

  return (
    <FacebookLoginBtn
      cssClass="btn btn-primary "
      onError={onError}
      onSuccess={onSuccess}
    >
      Login With FB
    </FacebookLoginBtn>
  );
};
