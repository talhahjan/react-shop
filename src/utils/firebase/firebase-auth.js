import { auth } from "./firebase-config";
import { signInWithPopup } from "firebase/auth";
import { onErrorLogin, onSuccessLogin } from "../lib";
const SocialMediaAuth = (provider) => {
  return signInWithPopup(auth, provider)
    .then((response) => {
      return onSuccessLogin(response);
    })
    .catch((error) => {
      return onErrorLogin(error);
    });
};
export default SocialMediaAuth;
