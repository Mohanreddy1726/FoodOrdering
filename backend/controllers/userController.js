import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

// login user
const loginUser = async (req,res) => {
    const {email,password} = req.body
    try {
        // Checking if user exists
        const user = await userModel.findOne({email})
        if (!user) {
            return res.json({success:false,message:"User does not exist"})
        }
        // verifying password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({success:false,message:"Invalid credentials"})
        }
        // Creating JWT token
        const token = createToken(user._id)
        res.json({success:true,token})
    }
    catch (error) {
        console.log(error)
        return res.json({success:false,message:"Something went wrong, please try again later"})
    }
}
// Creating JWT token
const createToken = (id) => {
            return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})
        } 

// register user
const registerUser = async (req,res) => {
    const {name,email,password} = req.body
    try {
        // Checking if user already exists
        const exists = await userModel.findOne({email})
        if (exists) {
            return res.json({success:false,message:"User already exists"})
        }
        // validating email and strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false,message:"Please enter a valid email address"})
        }
        if (password.length<8) {
            return res.json({success:false,message:"Password must be at least 8 characters long"})
        }
        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);   

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        });
        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:"Something went wrong, please try again later"})
    }
}   

export {loginUser,registerUser}