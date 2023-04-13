import React, { useContext } from 'react'
import { Ctx } from '../context/Ctx';
import { Navigate } from 'react-router-dom';

    const PrivateRoute: React.FC = ({children}): JSX.Element => {

    const userInfo : any = useContext(Ctx);  
    const userToken : string | null = localStorage.getItem('userToken');
  return (
    <div>
      {(userToken)? children : <Navigate to="/login"/>}
    </div>
  )
}

export default PrivateRoute
