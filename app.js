require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const cookieparser=require("cookie-parser");
app.use(cookieparser());

app.use(express.urlencoded({extended:true}))

const router=require("./router/userroutes")

const mongoose=require("mongoose")
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

const {sigupuser,loginuser,logout}=require("./controller/usercontroller")

app.use(express.static("public"));
app.set("viewengine","ejs");

app.use(express.static("views"));

const verifytoken=require("./middleware/verifytoken")
const verifyrole=require("./middleware/verifyrole")

app.get("/logout",router)
app.post("/login",router)
app.post("/signup",router)

app.get("/dashboard",(req,res)=>{
  res.render("home.ejs")
}).get('/signup', (req, res) => {
  res.render("signup.ejs")
}).get('/login', (req, res) => {
  res.render("login.ejs")
});



app.get("/",(req,res)=>{
    res.render("frontpage.ejs")
})

app.get('/home', (req, res) => {
  res.render("home.ejs")
}).get('/about', (req, res) => {
  res.render("about.ejs")
}).get('/skills', (req, res) => {
  res.render("skills.ejs")
}).get('/projects', (req, res) => {
  res.render("projects.ejs")
}).get('/contactus', (req, res) => {
  res.render("contactus.ejs")
}).get('/profile',verifytoken, (req, res) => {
  res.render("profile.ejs")
}).get('/admin',verifytoken,verifyrole("admin"), (req, res) => {
  res.render("admin.ejs")
}).get('/', (req, res) => {
  res.render("home.ejs")
});

const PORT =3000;
app.listen(PORT, () => {
  console.log(`Server running! GET http://localhost:3000`);
});