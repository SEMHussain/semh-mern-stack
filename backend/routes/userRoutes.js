const express = require('express')
const router = express.Router()
const { registerUser , loginUser , getUserDetails , semh } = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.get('/' ,(req , res)=>{
    res.send("wow ok user")
})

router.post('/' , registerUser);
router.post('/login' , loginUser);
router.get('/me' , protect , getUserDetails);
router.get('/semh' , protect , semh);


module.exports = router