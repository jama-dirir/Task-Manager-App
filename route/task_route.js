const express=require('express')
const router=express.Router()

const {readTasks,readTask,register_task,updateTask,deleteTask}=require('../controllers/task_control')

router.get('/list',readTasks)
router.get('/read/:id',readTask)
router.post('/create',register_task)
router.put('/update/:id',updateTask)
router.delete('/delete/:id',deleteTask)

module.exports=router

