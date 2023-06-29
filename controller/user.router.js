const mongoose = require("mongoose");
const express = require("express");
const jwt = require('jsonwebtoken');
require("dotenv").config();
const { Router } = require("express")
const bcrypt = require("bcrypt");
const { USER } = require("../model/user.model")
const userController = Router();



userController.get("/", async(req, res)=>{
    res.send("USER MODEL");

})



userController.post("/register", async(req, res)=>{
    const { name, email, password} = req.body;


    await bcrypt.hash(password, 8 , async(err, hash)=>{
        if(err){
            return res.status(511).send("password is not hashed");
        }
        const user = await USER.create({ name, email, password: hash});
        return res.status(200).send({ mess: "Registered ", user: user})

    })
})

userController.post("/login", async(req, res)=>{
    const { email, password} = req.body;

    // console.log(email, password)

    const user = await USER.findOne({email});
    if(!user){
        return res.status(404).send("Invalid User");

    }

    const hashed_pass = user.password;

    await bcrypt.compare(password, hashed_pass, (err,res)=>{
        if(err){
            return res.status(511).send("Bcryption Failed");
        }
        if(result){
            const token = jwt.sign(
                {
                    email: user.email,
                    userId: user._id
                },
                process.env.TOKEN_KEY
            );
            res.send({
                message: "login successful",
                token: token,
                email: email,
                name: user.name
            });
            
        }
        else{
            res.send("Invalid Password")
        }
    })
})


//  UserController.post("/")

// FOr logged in users
const loggedInUser = async(req, res)=>{

    try{

        let token = req.headers.authorization || "";

        if(token){
            const tokenRes = jwt.verify(token, process.env.TOKEN_KEY);
            let userData  = USER.findById(tokenRes._id);
            delete userData.
            res.send({ data: userData, status: " User Data deleted"})
        }
        else{
            console.log(err)
            res.status(404).send({ message: "User is not logged in ", status: "Error while deleting the Password"})
        }

    }catch(err){
        console.log(err)
    }
}

module.exports = { userController }



