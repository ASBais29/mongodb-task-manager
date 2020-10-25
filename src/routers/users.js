const express=require('express')
const { Mongoose } = require('mongoose')
//const { findByIdAndUpdate } = require('../models/tasks')
const User = require('../models/users')
const auth=require('../middleware/auth.js')
const router=new express.Router()

router.post('/users',async (req,res)=>{ 

    const users=await new User(req.body)
    const token=await users.authTokenGenerator()
   
    try{
        await users.save()
     res.status(201).send({users,token})
    }catch(e){
        res.status(400).send(e)
    }
    })   

router.post('/users/login', async (req, res) => {
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password)
            const token=await user.authTokenGenerator()

            res.send({user,token})
        } catch (e) {
            res.status(400).send('You are an imposter')
        }
    })


router.get('/users/me',auth,async (req,res)=>{
    
    res.send(req.user)
    
    })


 router.post('/users/logout',auth,async(req,res)=>{
     try{
       req.user.tokens=req.user.tokens.filter((token)=>{
           return token.token!==req.token
       })
       await req.user.save()
        res.send()


     }catch(e){
res.status(500).send()
     }
 })   
    
 router.post('/users/logoutall',auth,async(req,res)=>{
    try{
      req.user.tokens=[]
      await req.user.save()
       res.send()


    }catch(e){
res.status(500).send()
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
    
router.patch('/users/me',auth,async(req,res)=>{
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
            
            const user=req.user
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
    
router.delete('/users/me',auth , async(req,res)=>{
    
        try{
           await req.user.remove() 
            res.send(req.user)
        }catch(e){
            res.status(500).send(e)
        }
    
    })
    
    module.exports=router