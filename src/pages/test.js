import React from "react";
import FacebookLoginBtn from "../pages/auth/facebook/login";
export const FacebookLogin = () => {
  const onSuccess = async (response) => {
    console.log(response);
    LoginInbackend(response);
  };

  const onError = async (error) => {
    console.log(error);
  };

  const LoginInbackend = async (response) => {
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
      .get(`api/login/facebook`, user)
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
