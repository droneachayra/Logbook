const router = require("express").Router();
const Logboook = require('../models/logbook');
const User = require('../models/user');
const Trainer = require('../models/trainers');
const Drone = require('../models/drones');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');
const spawn = require('child_process').spawn;

router.post('/register', (req, res) => {
//  res.json("register work" );
   bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
         return res.json({ success: false, message: "Hash Error" })
      } else {
         const user = new User({
            displayName: req.body.displayName,
            email: req.body.email,
            password: hash,
         }).save()
         .then((_) => {
            res.json({ success: true, message: "Account has been created" })
         })
         .catch((err) => {
            if (err.code === 11000) {
               return res.json({ uccses: false, message: "Email is Already exist ! " })
            }
            res.json({ succses: false, message: "Authentication failed" })
         })
      }
   })
});

router.post('/login', (req, res) => {
// res.json( "login" );
   User.find({email:req.body.email}).exec().then((result)=>{
      if(result.length<1){
         return res.json({success:false,message:"User not found"})
      }
      const user=result[0];
      bcrypt.compare(req.body.password,user.password,(err,ret)=>{
         if(ret){
            const payload={
               userId:user._id
            } 
            const token = jwt.sign(payload,"webBatch")
            return res.json({success:true,message:"Login Successful",token:token})
         }else{
            return res.json({success:false,message:"Password does not match"})
         }
      })
   }).catch(err=>{
      res.json({success:false,message:"Authentication failed"})
   })
});

router.post('/logbook', (req, res) => {
//res.json("logbbok work" );

   const loguser = new Logbook({
      trainer: req.body.Trainer,
      trainee: req.body.Trainee,
      drone: req.body.Drone,
      startDate: req.body.Drone,
      endDate: req.body.Drone,
      duration: req.body.Drone,
   })
   loguser.save()
   .then((_) => {
      res.json({ success: true, message: "Log has been created" })
   })
   .catch((err) => {
      if (err.code === 11000) {
         return res.json({ success: false, message: "Trainee already exists!" })
      }
      res.json({ succses: false, message: "Authentication failed" })
   })
});


/*************************************************/
router.post('/trainer', (req, res) => {
   const trainer = new Trainer({
      name: req.body.name,
   })
   trainer.save()
   .then((_) => {
      res.json({success:true, message: "Trainer added"})
   })
   .catch((err) => {
      if(err.code === 11000) {
         return res.json({success:true, message: "Trainer already present"})
      }
      res.json({success:false, message: err})
   })
});

router.get('/getTrainer', (req, res) => {
   Trainer.find().then((result) => {
      res.json(result);
   })
})

router.post('/drone', (req, res) => {
   const drone = new Drone({
      uin: req.body.uin,
      class: req.body.class,
      category: req.body.category
   })
   drone.save()
   .then((_) => {
      res.json({success:true, message: "Drone added"})
   })
   .catch((err) => {
      if(err.code === 11000) {
         return res.json({success:true, message: "Drone already present"})
      }
      res.json({success:false, message: err})
   })
});

router.get('/getDrone', (req, res) => {
   Drone.find({}).exec().then((result) => {
      res.json(result);
   })
})

router.get('/python', (req, res) => {
   let python;
   Trainer.find({}).exec().then((result)=>{
      if(result != null){
         python = spawn('python', ['C:/Users/utkri/OneDrive/Desktop/Logbook/routes/script1.py', result]);
      }
 
   })
   var dataToSend;
   // spawn new child process to call the python script
   
   // collect data from script

   // python.stdout.on('data', function (data) {
   //  console.log('Pipe data from python script ...');
   //  dataToSend = data.toString();
   // });

   // python.stderr.on('data', (data) => {
   //    console.log(`stderr: ${data}`);
   //  });
   // // in close event we are sure that stream from child process is closed
   // python.on('close', (code) => {
   // console.log(`child process close all stdio with code ${code}`);
   // // send data to browser
   // res.send(dataToSend)
   // });
   
  })

module.exports = router