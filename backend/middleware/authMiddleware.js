const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const UserModel = require('../model/userModel')

const protect = asyncHandler(async (req , res , next)=>{

    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            console.log(req.headers.authorization)
            const decode = jwt.verify(token , process.env.SECRET_SEMH)

            console.log(decode);

            req.userDetails = await UserModel.findById(decode.id).select('-password')

            next()

        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error("Not Authorized")
        }
    }

    if(!token){
        res.status(401)
        throw new Error("Not Authorized , No Token Password")
    }
})

module.exports = {
    protect
}