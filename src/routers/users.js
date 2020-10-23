const express=require('express')
const { Mongoose } = require('mongoose')
//const { findByIdAndUpdate } = require('../models/tasks')
const User = require('../models/users')
const router=new express.Router()


router.post('/users',async (req,res)=>{ 

    const users=await new User(req.body)
    try{
     await users.save()
     res.status(201).send(users)
    }catch(e){
        res.status(400).send(e)
    }
    })   
    router.post('/users/login', async (req, res) => {
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password)
            res.send(user)
        } catch (e) {
            res.status(400).send('You are an imposter')
        }
    })


router.get('/users',async (req,res)=>{
        
       try{
       const user=await User.find({})
        res.send(user)
       } catch(e){
            res.status(500).send(e)
       }
    
    })
    
    router.get('/users/:id',async ( req,res)=>{
    
        const _id= req.params.id
    try{
       
        const user=await User.findById(_id)
        if(!user)
        {
            return res.status(404).send()
        }
        return res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
    })
    
    router.patch('/users/:id',async(req,res)=>{
    //    const _id=req.params.id
        const updates=Object.keys(req.body)
        const allow=['name','email','age','password']
        const isvalid=updates.every((x)=>allow.includes(x))
    
        if(!isvalid)
        {
            res.status(400).send('Invalid updates.')
        }
    
    
    
        try{
            //const user=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
            
            const user=await User.findById(req.params.id)
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
    
    router.delete('/users/:id',async(req,res)=>{
    
        try{
            const user=await User.findByIdAndDelete(req.params.id)
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