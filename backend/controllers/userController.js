const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler')
const UserDb = require('../model/userModel')

const registerUser = asyncHandler( async (req , res)=>{

    const {name , email , password} = req.body
    
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please Add All Fields User Controler')
    }

    const userExist = await UserDb.findOne({email})

    if(userExist){
        res.status(400)
        throw new Error('Email Alredy Exists')
    }

    const hashedPassword = await bcrypt.hash(password , 10)
   
    const createUser = await UserDb.create({
        name , 
        email ,
        password : hashedPassword
    })

    if(createUser){
        res.status(200).json({
            _id : createUser.id,
            name : createUser.name,
            email: createUser.email,
            token : generateJWT(createUser.id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid User Data')
    }

    // res.json({ message : req.body })
}) 

const loginUser = asyncHandler( async (req , res)=>{

    const { email , password } = req.body

    const userExist = await UserDb.findOne({email})
    var validPwd = await bcrypt.compare(password, userExist.password)

    if( userExist && validPwd ){
        res.status(200).json({
            _id : userExist.id,
            name : userExist.name,
            email: userExist.email,
            token : generateJWT(userExist.id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid Credentia semhl')
    }
})
  
const getUserDetails = asyncHandler( async (req , res)=>{
    const {_id , name , email} = await UserDb.findById(req.userDetails.id)

    res.json({
        id: _id,
        name,
        email
    })
})

const semh = asyncHandler( async (req , res)=>{
    res.json({message : req.userDetails})
})

const generateJWT = (id)=>{
    return jwt.sign({id} , process.env.SECRET_SEMH , {
        expiresIn : '30d'
    })
} 

module.exports = {
    registerUser,
    loginUser,
    getUserDetails,
    semh
}