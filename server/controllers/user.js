const User = require('../models/user');
const bcrypt = require('bcrypt');

const addUser = async (req,res) => {
    const {name,email, password} = req.body;
    
    try{
        const userFound = await User.findOne({email:email});
        const saltRounds= 10;
        if(userFound){
            res.status(409).json({"message":"Email already exist!!!"});
        }
        else{
            bcrypt.hash(password,saltRounds,async (err,hash)=>{
                if(err){
                    res.status(404).json({"message":"Something went wrong!"});
                }
                else{
                    const user = new User({name:name,email:email,password:hash});
                    await user.save();
                    res.status(200).json(user);
                }
            })
        }
    }
    catch(err){
        console.log(err);
    }
}
module.exports= {addUser};