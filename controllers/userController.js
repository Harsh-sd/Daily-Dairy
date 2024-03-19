const User=require("../models/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const {validationResult}=require("express-validator");
exports.signup=async(req,res,next)=> {
    try {
        const errors=validationResult(req);
        console.log(errors);
        if(!errors.isEmpty()){
            const error=new Error("validation fails");
            error.statuscode=422;
            error.validationErrors = errors.array();
            throw error;
        }
        const email=req.body.email;
        const password=req.body.password;
        const name=req.body.name; 

        const existuser=await User.findOne({email:email});
        if (existuser) {
            res.status(500).send({message:"enter a different email"})
        }
        const hashpassword=await bcrypt.hash(password , 12);
        const user=new User({
            email:email,
            password:hashpassword,
            name:name
        });
        const savedUser=await user.save();
        res.status(201).send({message:"user signup successfully" , user:savedUser});
    } catch (error) {
        console.log(error);
     //   res.status(500).send({message:"Internal server error"});
        if(!error.statuscode){
            error.statuscode=500;
        }
        next(error);
    }
};
//localhost:3000/login
exports.login= async(req,res,next)=> {
    try {
        const email=req.body.email;
        const password=req.body.password;
        const user=await User.findOne({email:email});
        //if user not found
        if(!user) {
            res.status(500).send({message:"Email does not matched"})
        }
        //comparing the password
        const compare=await bcrypt.compare(password , user.password);
        if(!compare) {
            res.status(500).send({message:" password not matched"})
        }
        //Generating the token
        const token=jwt.sign({
            email:email,
        },"secret key" , {expiresIn:"1yr"});
        res.status(201).send({message:"login successfully" , token:token})
} 
catch (error) {
    console.log(error);
    res.status(500).send({message:"Internal server error"});
}
    };