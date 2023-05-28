const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body , validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt  = require('jsonwebtoken');
const jwtsecret = "mynameisvishaljha19042000harharmahadev"
router.post("/createuser", 
body('email').isEmail().withMessage('Invalid email'),
body('name').isLength({min:5}).withMessage('Name must be at least 5 character long'),
body('password','short password').isLength({min:5}).withMessage('password must be at least 5 character long'),
async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt)
    try{
       await User.create({ 
            name:req.body.name,
            password:secPassword,
            email:req.body.email,
            location:req.body.location,
            });
            res.json({success:true});
    }catch(error){
        console.log(error);
        res.json({success:false});
    }
})

router.post("/loginuser",body('email').isEmail().withMessage('Invalid email'),
body('password','short password').isLength({min:5}).withMessage('password must be at least 5 character long'),async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array() });
    }
    let email = req.body.email
    try{
        
      let userData= await User.findOne({email});
      if(!userData){
        return res.status(400).json({errors:"Try logging in with correct credentials"})
      }
      const pwdCompare = await bcrypt.compare(req.body.password,userData.password)
      if(!pwdCompare){
        return res.json({errors:"password check krle bhai"}) 
      }
      const data = {
        user:{
          id:userData.id
        }
      }
      const authtoken = jwt.sign(data,jwtsecret)
      return res.json({success:true,authtoken:authtoken}) 
    }catch(error){
        console.log(error);
        res.json({success:false});
    }
})
module.exports = router; 