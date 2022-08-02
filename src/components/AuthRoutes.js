import React,{useContext} from 'react'
import { Outlet,Navigate } from "react-router-dom";
import { userContext } from '../index';

const AuthRoutes = () => {
    const user = useContext(userContext);

  return (
   user===null ? <Outlet />: <Navigate to='/' />
   
  )
}


export default AuthRoutes
