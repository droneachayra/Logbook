const router = require("express").Router();

const Logboook = require('../models/logbook');
const User = require('../models/user');

 router.post('/register', (req, res) => {
 //  res.json("register work" );
    const user = new User({
                        displayName: req.body.displayName,
                       email: req.body.email,
                        password: req.body.password,
                    })
                    user.save()
                                    .then((_) => {
                                       res.json({ success: true, message: "Account has been created" })
                                    })
                                    .catch((err) => {
                                                          if (err.code === 11000) {
                                                            return res.json({ uccses: false, message: "Email is Already exist ! " })
                                                          }
                                                            res.json({ succses: false, message: "Authentication failed" })
                                                     })
});

router.post('/login', (req, res) => {
   // res.json( "login" );
});

router.post('/logbook', (req, res) => {
    //res.json("logbbok work" );
     const loguser = new Logbook({
                        trainer: req.body.Trainer,
                        trainy: req.body.Trainy,
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
                                                             return res.json({ succses: false, message: "Trainy is Already exist ! " })
                                                           }
                                                             res.json({ succses: false, message: "Authentication failed" })
                                                      })
 });
module.exports = router