import mongoose from "mongoose"
const { Schema,SchemaTypes, model } = mongoose
import idvalidator from "mongoose-id-validator";

const applicantSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email:{
        type:String,
        minLength:5,
        unique:true,
        match: [/\S+@\S+\.\S+/, 'Email is invalid'],
        required:true
    },
    phone:{
        type:String,
        minLength:10,
        maxLength:10,
        required:true
    },
    organization: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    status:{
        type:String,
        enum:['pending','archived','passed','accepted'],
        default:'pending',
        required:true
    },
    eventId:{
        type: SchemaTypes.ObjectId,
        ref: "event",
        required: true
    },
    createdAt: {
        type: Date,
        default: null
    },
    applicationEmailSent: {
        type: Boolean,
        default: false
    },
    confirmationRejectionEmailSent:{
        type: Boolean,
        default: false
    }
})

applicantSchema.plugin(idvalidator)

export const Applicant = model('applicant', applicantSchema)
