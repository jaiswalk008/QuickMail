
import Email from '../models/email';
import user from '../models/user';
export const sendEmail = async (req:any,res:any) =>{
    const reciever =await user.findOne({email:req.body.reciever}); 
    console.log(reciever);
    const newEmail = new Email({...req.body,sender:req.user.email,
        senderId:req.user._id.toString(), senderName:req.user.name , recieverName: reciever.name});
    await newEmail.save();
    res.json(newEmail);

}
export const inbox = async (req:any,res:any) =>{
    
    try {
        // console.log(req.user.email);
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
        res.json({message:'Email marked as read'});
    }
    catch(err){
        console.log(err);
    }
}
export const getSentEmails = async (req:any , res:any) =>{
    try{
        const sentEmails = await Email.find({senderId:req.user._id});
        // console.log(sentEmails);
        res.json(sentEmails)
        // console.log(req.user);
    }
    catch(err){
        console.log(err)
    }
}
export const deleteEmail = async(req:any,res:any) =>{
    const emailId = req.params.id;
    // console.log(emailId);
    try{
        const email = await Email.findById({_id:emailId});
        if(email.sender==='') await Email.findByIdAndDelete({_id:emailId});
        else await Email.findByIdAndUpdate({_id:emailId},{reciever:""});
        // console.log('email deleted');
        res.json({message:'Email deleted successfully'});
    }
    catch(err){
        console.log(err);
    }
}
