import jwt from 'jsonwebtoken';
import User from '../models/user';

const authenticate = async (req:any, res:any, next:any) => {
    try{
        const token = req.header('Authorization');
        const result :any = jwt.verify(token , process.env.JWT_SECRET_KEY);
        const user = await User.findById({_id:result.userId});
        req.user = user;
        next();
    }
    catch(err){console.log(err)}
}
export default authenticate;