import jwt_decode from "jwt-decode";
import axios from "axios";
export const handleCallbackResponse = (response) => {
  const userObject = jwt_decode(response.credential);

  const user = {
    provider: "google",
    provider_id: userObject.sub,
    email: userObject.email,
    first_name: userObject.given_name,
    last_name: userObject.family_name,
    avatar: userObject.picture,
    jwt: response.credential,
  };
  LoginBackend(user);
  console.log("response", user);
};

export const LoginBackend = async (user) => {
  await axios
    .post(`api/login/${user.provider}`, user)
    .then((res) => {
      if ((res.statusText = "Logged in success")) {
        localStorage.setItem("token", res.data.authorization.token);
        console.log(res);
        window.location = process.env.REACT_APP_HOME_PAGE;
      } else {
        console.log(res);
      }
    })
    .catch((error) => {
      throw new Error("error occurred while login user from back-end server");
    });
};
