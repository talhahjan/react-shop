import React,{useContext} from 'react'
import { Outlet,Navigate } from "react-router-dom";
import { userContext } from '../index';

const ProtectedRoutes = () => {
    const user = useContext(userContext);
  return (
   user ? <Outlet />: <Navigate to='/login' />
  )
}


export default ProtectedRoutes
