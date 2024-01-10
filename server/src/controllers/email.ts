
import Email from '../models/email';

export const sendEmail = async (req:any,res:any) =>{
   
    const newEmail = new Email({...req.body,sender:req.user.email,
        senderId:req.user._id, senderName:req.user.name});
    await newEmail.save();
    res.json({message: 'Email sent successfully'});

}
export const inbox = async (req:any,res:any) =>{
    
    try {
        console.log(req.user.email);
        const inbox = await Email.find({reciever:req.user.email});
        // console.log(inbox);
        res.json(inbox);
    } catch (error) {
        console.log(error);
    }

}
export const markEmailAsRead = async (req:any , res:any) =>{
    const emailId = req.params.id;
    // console.log(emailId);
    try{
        await Email.findByIdAndUpdate({_id:emailId},{isRead:true})
    }
    catch(err){
        console.log(err);
    }
}