const mongoose=require('mongoose')
const validator=require('validator')
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
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
module.exports=User