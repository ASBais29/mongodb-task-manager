const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')


const userSchema= new mongoose.Schema({
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
            if (!validator.isEmail(value
                )) {
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
    password:{
        type: String,
        trim: true,
        required: true,
       minlength:7,
        validate(value){
            if(value.includes('password'))
            throw new Error('Invalid Password')
        }
    }
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

userSchema.statics.findByCredentials = async (e,p) => {
    const user = await User.findOne({ email:e })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(p, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}



userSchema.pre('save',async function(next){
const user=this
if(user.isModified('password'))
{
    user.password=await bcrypt.hash(user.password,8)
}


console.log('Before')
next()//end the middleware
})

const User = mongoose.model('User', userSchema)
module.exports=User