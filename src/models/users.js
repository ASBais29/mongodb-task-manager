const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const task = require('./tasks.js')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 7,
        validate(value) {
            if (value.includes('password'))
                throw new Error('Invalid Password')
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    sassy_img: {
        type: Buffer
    }



}, {
    timestamps: true
})
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

// userSchema.statics.findByCredentials=async (email, password)=>{
//     const user=await User.findOne({email})
//     if(!user){
//         throw new Error('User not find')
//     }
//     const isMatch=await bcrypt.compare(p,user.password)
//     if(!isMatch)
//     {
//         throw new Error('Invalid passsword')
//     }
// return user

// }

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.sassy_img

    return userObject
}

userSchema.methods.authTokenGenerator = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWTSECRET)
    user.tokens = user.tokens.concat({ token: token })
    await user.save()


    return token
}

userSchema.statics.findByCredentials = async(e, p) => {
    const user = await User.findOne({ email: e })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(p, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}



userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }


    console.log('Before')
    next() //end the middleware
})

userSchema.pre('remove', async function(next) {
    const user = this
    await task.deleteMany({ owner: user._id })
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User