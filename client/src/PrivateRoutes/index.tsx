import React, { useContext } from 'react'
import { Ctx } from '../context/Ctx';
import { Navigate } from 'react-router-dom';

type childrenProps = {
  children : React.ReactNode
}

    const PrivateRoute = ({children} : childrenProps): JSX.Element => {
    const userInfo : any = useContext(Ctx);  
    const userToken : string | null = localStorage.getItem('userToken');
  return (
    <div>
      {(userToken)? children : <Navigate to="/login"/>}
    </div>
  )
}

export default PrivateRoute
