const express = require('express')
const router = express.Router()
const {getGoals , postGoals , putGoals , patchGoals , deleteGoals } = require('../controllers/goalControllers')
const {protect} = require('../middleware/authMiddleware')

// router.route('/').get(getGoals).post(postGoals)
// router.route('/:id').put(putGoals).patch(patchGoals).delete(deleteGoals)

router.get('/' , protect , getGoals)

router.post('/' , protect , postGoals)

router.put('/:id' , protect , putGoals)

router.patch('/:id' , protect , patchGoals)

router.delete('/:id' , protect , deleteGoals)

module.exports = router