const express = require("express");
const router = express.Router();
const { body, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/Auth");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");

const JWT_SECRET = "IAmTheBest";

// Route 1: New User Registration urlfil
router.post("/signup",

  // Adding validation
  [
    body("name").isLength({min:3}),
    body("email").isEmail(),
    body("password").isStrongPassword()
  ],
  async (req,res)=>{

    // Checking Errors
    const errors = validationResult(req); 
    if(!errors.isEmpty()){
      return res.status(400).send(errors)
    }
    
    // Finding duplicate user using email
    const duplicateUser = await User.findOne({email: req.body.email});
    if(duplicateUser){
      return res.status(400).send("This email already exist!")
    }
    

    try{
      const {name, email, password} = req.body;
      // Creating hash password using bcrypt
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      // Creating new User
      const user = new User({
        name: name,
        email: email,
        otp: otp,
        password: hashPassword
      });
      user.save();
      
      // JWT token for authentication
      const authToken = jwt.sign(user.id, JWT_SECRET);
      res.send(authToken)  

    }catch(error){
      return res.status(500).send(error)
    }

  }
)

// Route 2: Login Url
router.post("/login",
  // Adding Validation
  [
    body("email").isEmail(),
    body("password").isStrongPassword()
  ],
  async (req, res) => {
    const {email, password} = req.body;

    // Checking errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).send(errors);
    }

    // Finding user with email
    const user = await User.findOne({email:email});
    if(!user){
      return res.status(400).send("please login with correct credentials!");
    }

    try{
      // Compare passwords
      const equalPassword = await bcrypt.compare(password, user.password);
      if(!equalPassword){
        return res.status(400).send("please login with correct credentials!");
      }

      // JWT token for authentication
      const authToken = await jwt.sign(user.id, JWT_SECRET)
      res.send(authToken);

    }catch(error){
      return res.status(500).send("Some internal error occured!");
    }

  }
)

// Route 3: User Details Page
router.post("/details", fetchUser,
  async (req, res)=>{
    const user = await User.findById(req.userId).select("-password");
    res.send(user);
  }
)

module.exports = router;
