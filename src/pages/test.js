import React, { useCallback, useRef, useState } from 'react'
import {
  LoginSocialGoogle,
  LoginSocialFacebook,
  LoginSocialInstagram,
  IResolveParams,
} from 'reactjs-social-login'



// REDIRECT URL must be same with URL where the (reactjs-social-login) components is locate
// MAKE SURE the (reactjs-social-login) components aren't unmounted or destroyed before the ask permission dialog closes
const REDIRECT_URI = window.location.href;

const SocialLogin = () => {


  const onLogoutSuccess = useCallback(() => {
    alert('logout success')
  }, [])

  return (
          <LoginSocialGoogle
          client_id={process.env.REACT_APP_GOOGLE_APP_ID}
            onResolve={(IResolveParams) => {
              let {provider, date}=IResolveParams;
             console.log(provider)
            }}
            onReject={(err) => {
              console.log("rejected")
            }}
          >
            {console.log(process.env.REACT_APP_GOOGLE_APP_ID)}
            <button className='btn btn-primary'>Login</button>
          </LoginSocialGoogle>
  )
}

export default SocialLogin;