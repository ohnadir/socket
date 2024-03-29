const  User = require("../Models/user");
const jwtToken = require("../utils/jwtToken");
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { email } = req.body;
    try {
        if(email){
            const isEmailExist = await User.findOne({ email : email });
            if (isEmailExist) {
                return res.status(400).json({ 
                   status: "failed",
                   message: "Email already taken" 
                });
            }
        }
        const user = await User.create(req.body);
        const token = jwtToken(user);
        return res.status(200).json({ 
            status: "success",
            user: user,
            token: token,
            message: "Register User successfully" 
        });
    } catch (error) {
        
        return  res.status(500).json({ 
            status: "failed",
            message: "Error. Try again" 
        });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email : email });
        if(!user){
            req.send({
                statusCode: 200,
                status: "failed",
                message: "Incorrect Credential"
            })
        }
        if(user.password !== password){
            return res.status(404).json({ 
                status: "failed",
                message: "Incorrect credential" 
            });

        }
        const token = jwtToken(user);
        return res.status(200).json({ 
            status: "success",
            user: user,
            token: token,
            message: "Login User successfully" 
        });
    } catch (error) {
        
        return  res.status(500).json({ 
            status: "failed",
            message: "Error. Try again" 
        });
    }
};


exports.allUser = async (req, res) => {
    
    try {
        const users = await User.find({}).sort({ _id:-1});
        if (!users) {
            return res.status(404).json({ 
               status: "failed",
               message: "No User found at this moment" 
            });
        }
        return res.status(200).json({ 
            status: "success",
            user: users,
            message: "Users Fetch successfully" 
        });
    } catch (error) {
        return  res.status(500).json({ 
            status: "failed",
            message: "Error. Try again" 
        });
    }
};

exports.loadUser = async (req, res) => {
    try {
        if (!req.id) {
            res.send("Token not Found");
        }
        const user = await User.findById({_id: req.id});
        return res.status(200).json({ 
            status: "success",
            user: user,
            message: "Load User successfully" 
        });
    } catch (error) {
        
        return  res.status(500).json({ 
            status: "failed",
            message: "Error. Try again" 
        });
    }
};