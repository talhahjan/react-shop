import React from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import InstagramLogin from 'react-instagram-login';



const response= (response) => {
  console.log(response);
}


const SocialLogin = () => {
  return (
  <>

<FacebookLogin
    appId={process.env.REACT_APP_FACEBOOK_APP_ID}
    autoLoad={true}
    fields="name,email,picture"
    callback={response}
    cssClass="my-facebook-button-class"
    icon="fa-facebook"
  />



<InstagramLogin
  clientId={process.env.REACT_APP_INSTAGRAM_APP_ID}
  buttonText="Instagram Login"
    onSuccess={response}
    onFailure={response}
    scope='user_profile,user_media'
    scopes='user_profile,user_media'
  />


<GoogleLogin
clientId={process.env.REACT_APP_GOOGLE_APP_ID}
    buttonText="Login Google"
    onSuccess={response}
    onFailure={response}
    cookiePolicy={'single_host_origin'}
  />


  </>
  )
}


export default SocialLogin