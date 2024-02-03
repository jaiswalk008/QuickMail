
import Email from '../models/Email';
import user from '../models/user';

export const sendEmail = async (req:any,res:any) =>{
   try {
        const receiver =await user.findOne({email:req.body.reciever}); 
        if(!receiver) return res.status(400).json({message:'No user with this email'});
        const {subject , bodyHTML , bodyText} = req.body;
        const newEmail = new Email({subject , bodyHTML ,
            senderId:req.user._id.toString(), receiverId:receiver._id.toString()});
        await newEmail.save();
        res.json(newEmail);
   } catch (error) {
    console.log(error); 
   }

}

export const retrieveEmails = async (req:any,res:any) =>{
    
    try {
        // console.log(req.user.email);
        const receivedEmails = await Email.find({receiverId:req.user._id.toString(),hasReceiverDeleted:false});
        const sendersPromise = receivedEmails.map(async (email) =>{
            const sender = await user.findById({_id:email.senderId});
            return sender;
        })
        const senders = await Promise.all(sendersPromise);
        console.log('senders....')

        console.log(senders);

        console.log('sent emails....')

        const sentEmails = await Email.find({senderId:req.user._id.toString(),hasSenderDeleted:false});
        console.log(sentEmails);
        const receiversPromise = sentEmails.map(async (email) =>{
            const receiver = await user.findById({_id:email.receiverId});
            return receiver;
        })
        const receivers = await Promise.all(receiversPromise);
        console.log('receivers....');
        console.log(receivers);
        res.json({receivedEmails,sentEmails,senders,receivers});
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


export const deleteEmail = async (req: any, res: any) => {
    const emailId = req.params.id;
    try {
      const email = await Email.findById({ _id: emailId });
      if (email.senderId === req.user._id.toString()) {
        email.hasReceiverDeleted
          ? await Email.findByIdAndDelete(email._id)
          : await Email.findByIdAndUpdate(email._id, { hasSenderDeleted: true });
      } else {
        email.hasSenderDeleted
          ? await Email.findByIdAndDelete(email._id)
          : await Email.findByIdAndUpdate(email._id, { hasReceiverDeleted: true });
      }
    } catch (err) {
      console.log(err);
    }
  };
