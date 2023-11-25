import mongoose from "mongoose"
const { Schema, SchemaTypes, model } = mongoose
import idvalidator from "mongoose-id-validator";

const speakersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    imageId: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    socialMedia:
    {
        linkedIn: {
            type: String,
            required: true
        },
        twitter: {
            type: String,
            required: true
        }
    },
    eventId: {
        type: SchemaTypes.ObjectId,
        ref: "event",
        required: true
    },
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

speakersSchema.plugin(idvalidator)

export const Speaker = model('speaker', speakersSchema)
