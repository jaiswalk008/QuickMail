
import Email from '../models/email';

export const sendEmail = async (req:any,res:any) =>{
   
    const newEmail = new Email({...req.body,sender:req.user.email,senderId:req.user._id});
    await newEmail.save();
    res.json({message: 'Email sent successfully'});

}
