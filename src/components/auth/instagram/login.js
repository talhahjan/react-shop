import { useEffect } from "react";
import axios from "axios";
const InstagramLogin = (props) => {
  const cssClass = props.cssClass ? props.cssClass : "";
  const appID = props.appID
    ? props.appID
    : process.env.REACT_APP_INSTAGRAM_CLIENT_iD;

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
      .post(`api/login/google`, user)
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
        throw new Error("error occured while login user from back-end server");
      });
  };

  useEffect(() => {}, []);

  return <button className={cssClass}>{props.children}</button>;
};

export default InstagramLogin;
