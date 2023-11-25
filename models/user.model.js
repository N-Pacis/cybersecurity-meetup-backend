import mongoose from "mongoose"
const { Schema, model }= mongoose

import jsonwebtoken from 'jsonwebtoken'
const {sign} = jsonwebtoken

const userSchema = new Schema({
    Firstname:{
        type:String,
        minLength:5,
        required:true
    },
    Lastname:{
        type:String,
        minLength:5,
        required:true
    },
    Phone:{
        type:String,
        minLength:10,
        maxLength:10,
        required:true
    },
    Email:{
        type:String,
        minLength:5,
        unique:true,
        match: [/\S+@\S+\.\S+/, 'Email is invalid'],
        required:true
    },
    LastLoggedIn:{
        type: Date,
        default: null
    },
    Password:{
        type:String,
        minLength:6,
        required:true
    },
    role:{
        type:String,
        enum:['admin', 'meetup-reviewer'],
        default:'meetup-reviewer'
    },
    passwordResetCode:{
        type: Object,
        default: null
    },
    requestPasswordReset:{
        type: Boolean,
        default: false
    },
    CreatedAt:{
        type:Date,
        default:null
    }
})

userSchema.methods.generateAuthToken = function(){
    const token = sign(
        {_id:this._id,role: this.role},
        process.env.JWT
    )
    return 'Bearer '+token
}

export const User = model('user',userSchema)
