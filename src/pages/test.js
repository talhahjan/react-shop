 
import React from 'react';
import FacebookLogin from 'react-facebook-login';


const responseFacebook = (response) => {
    console.log(response);
  }

export const SocialLogin = () => {
  return (
    <FacebookLogin
    appId="377398063014920"
    autoLoad={true}
    fields="name,email,picture"
    callback={responseFacebook}
    cssClass="my-facebook-button-class"
    icon="fa-facebook"
  />
  )
}
