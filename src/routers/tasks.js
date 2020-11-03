const express = require('express')
const auth = require('../middleware/auth')
    //const { findByIdAndUpdate } = require('../models/tasks')
const Task = require('../models/tasks')
const User = require('../models/users')
const router = new express.Router()

router.post('/tasks', auth, async(req, res) => {

    // const tasks=await new Task(req.body)
    const task = new Task({
            ...req.body,
            owner: req.user._id
        })
        //req.send(tasks)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(error)
    }
})

router.get('/tasks', auth, async(req, res) => {

    try {
        const match = {}
        const sort = {}
        if (req.query.completed) {
            match.completed = req.query.completed === 'true'
        }
        if (req.query.sortWhy) {
            const splits = req.query.sortWhy.split(':')
            sort[splits[0]] = splits[1] === 'desc' ? -1 : 1
        }

        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send(e)
    }

})




router.get('/tasks/:id', auth, async(req, res) => {

    const _id = req.params.id
    try {
        console.log(req.user._id)
        const user = await Task.findOne({ _id, owner: req.user._id })
        if (!user) {
            return res.status(404).send()
        }
        return res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id', auth, async(req, res) => {
    //    const _id=req.params.id
    const updates = Object.keys(req.body)
    const allow = ['description', 'completed', 'owner']
    const isvalid = updates.every((x) => allow.includes(x))

    if (!isvalid) {
        res.status(400).send('Invalid updates.')
    }



    try {
        //const user=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})

        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }


        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }

})

router.delete('/tasks/:id', auth, async(req, res) => {

    try {
        const user = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }

})

module.exports = router