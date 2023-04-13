import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 


dotenv.config();
 const getAuthToken = (user) => {
    const secretKey = 'Graph Tutorial';
    const token = jwt.sign({
        _id: user._id,
        username:user.username,
        email:user.email
    },
    secretKey
    );
    return token;
}


export default getAuthToken;