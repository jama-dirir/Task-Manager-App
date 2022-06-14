const express=require('express')
const router=express.Router()
const auth=require('../middleware/auth')

const {readUsers,readUser,register_user,updateUser,deleteUser, login}=require('../controllers/user_control')

router.post('/login',login)
router.get('/list',readUsers)
router.get('/read/:id',readUser)
router.post('/create',register_user)
router.put('/update/:id',updateUser)
router.delete('/delete/:id',deleteUser)

module.exports=router

