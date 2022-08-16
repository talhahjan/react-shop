import React from "react";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import InstagramLogin from "react-instagram-login";
import { FaGooglePlusG, FaFacebookF, FaInstagram } from "react-icons/fa";
import axios from "axios";

const responseGoogle = async (response) => {
  let user = {
    provider: "google",
    provider_id: response.profileObj.googleId,
    email: response.profileObj.email,
    first_name: response.profileObj.familyName,
    last_name: response.givenName,
    avatar: response.profileObj.imageUrl,
    jwt: response.tokenObj.id_token,
  };

  await axios
    .post(`api/login/google`, user)
    .then((res) => {
      if ((res.statusText = "Logged in success")) {
        localStorage.setItem("token", res.data.authorisation.token);
        window.location = process.env.REACT_APP_HOME_PAGE;
      } else {
        console.log(res);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const errorGoogle = (error) => {
  console.log("error", error);
};

const responseFacebook = async (response) => {
  let names = response.name.split(" ");
  let user = {
    provider: "facebook",
    provider_id: response.id,
    email: response.email,
    first_name: names[0],
    last_name: names[1],
    avatar: response.picture.data.url,
    jwt: response.accessToken,
  };

  await axios
    .post(`api/login/facebook`, user)
    .then((res) => {
      if ((res.statusText = "Logged in success")) {
        localStorage.setItem("token", res.data.authorisation.token);
        console.log(res);
        window.location = process.env.REACT_APP_HOME_PAGE;
      } else {
        console.log(res);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const errorFacebook = (error) => {
  console.log("error", error);
};

const responseInstagram = (response) => {
  console.log("error", response);
};

export const SocialInstagramLogin = () => {
  return (
    <InstagramLogin
      clientId={process.env.REACT_APP_INSTAGRAM_CLIENT_ID}
      cssClass="btn-social btn-outline-instagram btn-social-circle waves-effect waves-light m-1"
      onSuccess={responseInstagram}
      onFailure={responseInstagram}
      scope="user_profile, user_media"
      buttonText={<FaInstagram />}
    />
  );
};

export const SocialGoogleLogin = () => {
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      onSuccess={responseGoogle}
      onFailure={errorGoogle}
      cookiePolicy={"single_host_origin"}
      render={(renderProps) => (
        <button
          disabled={renderProps.disabled}
          className="btn-social btn-outline-instagram btn-social-circle waves-effect waves-light m-1"
          onClick={renderProps.onClick}
        >
          <FaGooglePlusG />
        </button>
      )}
    />
  );
};

export const SocialFacebookLogin = () => {
  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_APP_ID}
      cssClass="btn-social btn-outline-facebook btn-social-circle waves-effect waves-light m-1"
      callback={responseFacebook}
      fields="name,email,picture"
      textButton={<FaFacebookF />}
    />
  );
};
