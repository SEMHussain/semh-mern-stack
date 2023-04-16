const asyncHandler = require('express-async-handler')
const Goal = require('../model/goalModel')
const userModel = require('../model/userModel')
const getGoals = asyncHandler( async (req, res) => {

    const getGoals = await Goal.find({user : req.userDetails.id})
    res.status(200).json(getGoals)
    // res.status(200).json({ message: "Get Goals Controllers" })
})

const postGoals = asyncHandler (async (req, res) => {
    // console.log(req.body.text);
    if (!req.body.text) {
        // res.status(400).json({errorMsg : "Empty Error Message"})
        res.status(400)
        throw new Error('Please Enter Textfield')
    }
    const postGoal = await Goal.create({
        text : req.body.text,
        user : req.userDetails.id
    })
    res.status(200).json(postGoal)
    // res.status(200).json({message : `Post Goals Controllers ${req.body.text}`})
})

const putGoals = asyncHandler (async (req, res) => {

    const getUdateId = await Goal.findById(req.params.id)

    if(!getUdateId){
        res.status(400)
        throw new Error('Sorry Goal Not Found')
    }

    const user = await userModel.findById(req.userDetails.id)
console.log(user.id);
console.log(getUdateId);
    if(!user){
        res.status(401)
        throw new Error('Sorry User Not Found')
    }

    if(getUdateId.user.toString() !== user.id){
        res.status(401)
        throw new Error('User Not Authorized')
    }
    const updateValue = await Goal.findOneAndUpdate(req.params.id , req.body,)
    res.status(200).json(getUdateId)
    // res.status(200).json({ Message: `Put Goals Controllers ${req.params.id}` })
})

const patchGoals = asyncHandler (async (req, res) => {
    res.status(200).json({ Message: `Patch Goals Controllers ${req.params.id}` })
})

const deleteGoals = asyncHandler (async (req, res) => {

    const getDeleteId = await Goal.findById(req.params.id)

    if(!getDeleteId){
        res.status(400)
        throw new Error('Sorry Goal Not Found DELETE ID')
    }

    const user = await userModel.findById(req.userDetails.id)
console.log(user.id);
    if(!user){
        res.status(401)
        throw new Error('Sorry User Not Found')
    }

    if(getUdateId.user.toString() !== user.id){
        res.status(401)
        throw new Error('User Not Authorized')
    }

    const deleteValue = await Goal.findByIdAndDelete(req.params.id)
    res.status(200).json(deleteValue)

    // res.status(200).json({ Message: `Delete Goals Controllers ${req.params.id}` })
})

module.exports = {
    getGoals,
    postGoals,
    putGoals,
    patchGoals,
    deleteGoals
}