
const Email = require('../models/email');

const sendEmail = async (req,res) =>{
    // const {sender,reciever,subject,body} = req.body;
    // console.log(req.user);
    // console.log(sender,reciever,subject,body);
    const newEmail = new Email({...req.body,sender:req.user.email,senderId:req.user._id});
    await newEmail.save();
    res.json({message: 'Email sent successfully'});

}
module.exports = {sendEmail};