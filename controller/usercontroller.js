const model=require("../model/usermodel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const secretkey="mysecretkey";

// require("dotenv").config();
// const secretkey=process.env.SECRET_KEY;


async function signupuser(req,res) {
   try {
          const{email,password}=req.body
          const exist=await model.findOne({email})
          if (exist) {
            res.send("email already taken")
            return;
          }
  if (!email || !password) return res.status(400).send("All fields required");
  if (!/^[^\s@]+@gmail\.com/.test(email))
    return res.status(400).send("Email must be a valid @gmail.com");
 
//   if (!/^(?=.*[A-Za-z])(?=.*)̣[A-Za-z]̣6,/.test(password)) {
//     return res.status(400).send("Password must contain letters & numbers");
//   }
 
    const hashpassword=await bcrypt.hash(password,10)
    
    const newmodel=await new model({
        email,password:hashpassword
    })
    await newmodel.save()
    res.render("home.ejs")
    } catch (error) {
      console.log(error);
}
    }



async function loginuser(req,res){

    const{email,password}=req.body;
    const exist= await model.findOne({email})
    if(!exist){
     res.send("email not exist")
     return;
    }
    const ismatch=await bcrypt.compare(password,exist.password)
        if(!ismatch){
            res.send("password incorrect");
            return;
        }
    const token=jwt.sign({id:exist.id,role:exist.role},process.env.SECRET_KEY,{expiresIn:"1h"});
    res.cookie("token",token);
    res.render("home.ejs")
}
async function logout(req,res) {
    res.clearCookie("token")
    res.render("frontpage.ejs")
}
module.exports={signupuser,loginuser,logout};