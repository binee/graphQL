import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 

const verifyToken = ({req})=>{
    const secretKey = 'Graph Tutorial';
    const { authorization } = req.headers;
    if(!authorization) throw new Error('Token not found')
     const {userId} = jwt.verify(authorization,'Graph Tutorial')
     console.log(userId)
     return {userId}
}

export default verifyToken