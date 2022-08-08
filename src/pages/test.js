import React from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import InstagramLogin from 'react-instagram-login';



const responseInstagram = (response) => {
  console.log(response);
}


export const SocialLogin = () => {
  return (
  <>
    <FacebookLogin
    clientId="377398063014920"
    buttonText="Facebook Login"
    onSuccess={responseInstagram}
    onFailure={responseInstagram}
  />
  <InstagramLogin
  clientId="396795559223412"
  buttonText="Instagram Login"
  onSuccess={responseInstagram}
  onFailure={responseInstagram}
/>
    <GoogleLogin
    clientId="924551858846-j9h4o2dv11p6bbt9chrm99rg0uhjhcnn.apps.googleusercontent.com"
    buttonText="Google Login"
    onSuccess={responseInstagram}
    onFailure={responseInstagram}
  />
  </>
  )
}