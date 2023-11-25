import mongoose from "mongoose"
const { Schema, model }= mongoose


const contactUsSchema = new Schema({
    Names:{
        type:String,
        minLength:5,
        required:true
    },
    Email:{
        type:String,
        minLength:5,
        unique:false,
        match: [/\S+@\S+\.\S+/, 'Email is invalid'],
        required:true
    },
    Message:{
        type:String,
        required:true
    },
    CreatedAt:{
        type:Date,
        default:null
    }
})

export const Contact = model('contact',contactUsSchema)
