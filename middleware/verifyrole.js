
function verifyrole(allowedrole){
  return(req,res,next)=>{
    const role=req.user.role;
    if (allowedrole!=role) {
      return res.render("frontpage.ejs")
    }
    next()
  }
}
module.exports=verifyrole;
