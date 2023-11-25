import mongoose from "mongoose"
const { Schema, SchemaTypes, model } = mongoose;
import idvalidator from "mongoose-id-validator";

const eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    agenda: [
        {
            from: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            to: {
                type: String,
                required: true
            },
            description:{
                type:String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: null
    },
    createdBy: {
        type: SchemaTypes.ObjectId,
        ref: "user",
        required: true
    }
})

eventSchema.plugin(idvalidator)

export const Event = model('event', eventSchema)
