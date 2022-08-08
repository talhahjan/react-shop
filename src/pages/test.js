import React from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import InstagramLogin from 'react-instagram-login';



const response= (response) => {
  console.log(response);
}


export const SocialLogin = () => {
  return (
  <>

<FacebookLogin
    appId="377398063014920"
    autoLoad={true}
    fields="name,email,picture"
    callback={response}
    cssClass="my-facebook-button-class"
    icon="fa-facebook"
  />



<InstagramLogin
  clientId="396795559223412"
  buttonText="Instagram Login"
    onSuccess={response}
    onFailure={response}
    scope='instagram_graph_user_profile'
  />


<GoogleLogin
clientId="924551858846-j9h4o2dv11p6bbt9chrm99rg0uhjhcnn.apps.googleusercontent.com"
    buttonText="Login Google"
    onSuccess={response}
    onFailure={response}
    cookiePolicy={'single_host_origin'}
  />


  </>
  )
}