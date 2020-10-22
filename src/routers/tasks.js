const express=require('express')
const { findByIdAndUpdate } = require('../models/tasks')
const Task = require('../models/tasks')
const router=new express.Router()

router.post('/tasks',async (req,res)=>{

    const tasks=await new Task(req.body)
    try{
     await tasks.save()
     res.send(tasks)
    }catch(e){
        res.stautus(400).send(error)
    }
    })
    
    router.get('/tasks',async (req,res)=>{
        
       try{
       const user=await Task.find({})
        res.send(user)
       } catch(e){
            res.status(500).send(e)
       }
    
    })
    
    router.get('/tasks/:id',async ( req,res)=>{
    
        const _id= req.params.id
    try{
       
        const user=await Task.findById(_id)
        if(!user)
        {
            return res.status(404).send()
        }
        return res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
    })
    
    router.patch('/tasks/:id',async(req,res)=>{
    //    const _id=req.params.id
        const updates=Object.keys(req.body)
        const allow=['description','completed']
        const isvalid=updates.every((x)=>allow.includes(x))
    
        if(!isvalid)
        {
            res.status(400).send('Invalid updates.')
        }
    
    
    
        try{
            //const user=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
            
            const user=await Task.findById(req.params.id)
            updates.forEach((update)=> user[update]=req.body[update])
            
            await user.save()

            if(!user)
            {
                return res.status(404).send()
            }
            res.send(user)
        }catch(e){
            res.status(500).send(e)
        }
    
    })
    
    router.delete('/tasks/:id',async(req,res)=>{
    
        try{
            const user=await Task.findByIdAndDelete(req.params.id)
            if(!user)
            {
                return res.status(404).send()
            }
            res.send(user)
        }catch(e){
            res.status(500).send(e)
        }
    
    })
    
    module.exports=router