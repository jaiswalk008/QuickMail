const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
const generateAccessToken = (id) =>{
   return jwt.sign({userId:id} , process.env.JWT_SECRET_KEY);
}
const login = async (req,res) => {
    const {email,password} = req.body;
    const user =  await User.findOne({email:email});
    if(user){
        bcrypt.compare(password,user.password, (err,result) =>{
            
            if(err){
                res.status(404).json({"message":"Something went wrong!"});
            }else if(result){
                res.status(200).json({success: true, message: 'Log in Success' ,token : generateAccessToken(user.id ), "username": user.name});
            }
            else{
                res.status(501).json({"message":"password incorrect"});
            }
        })
    }else{
        res.status(404).json({"message":"User not found!"});
    }
}
module.exports= {addUser , login};