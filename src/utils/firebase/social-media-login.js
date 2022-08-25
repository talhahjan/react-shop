import SocialMediaAuth from "./firebase-auth";
import {
  facebookProvider,
  googleProvider,
  githubProvider,
} from "./authProviders";
const handleOnClick = async (provider) => {
  const res = await SocialMediaAuth(provider);
  console.log(res);
};

export const Google = ({ cssClass, btnText }) => {
  return (
    <button className={cssClass} onClick={() => handleOnClick(googleProvider)}>
      {btnText}
    </button>
  );
};

export const Facebook = ({ cssClass, btnText }) => {
  return (
    <button
      className={cssClass}
      onClick={() => handleOnClick(facebookProvider)}
    >
      {btnText}
    </button>
  );
};

export const Github = ({ cssClass, btnText }) => {
  return (
    <button className={cssClass} onClick={() => handleOnClick(githubProvider)}>
      {btnText}
    </button>
  );
};
