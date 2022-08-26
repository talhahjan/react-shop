import firebase, { auth } from "./firebase-config";
import { signInWithPopup } from "firebase/auth";
import { onSuccessLogin as onSuccess, onErrorLogin as onError } from "../lib";
const SocialMediaAuth = async (provider) => {
  return await signInWithPopup(auth, provider)
    .then((response) => {
      console.log(response);
      return onSuccess(response);
    })
    .catch((error) => {
      console.log(error);
      return onError(error);
    });
};
export default SocialMediaAuth;
