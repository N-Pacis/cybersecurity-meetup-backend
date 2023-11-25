import mongoose from "mongoose"
const { Schema,SchemaTypes, model } = mongoose
import idvalidator from "mongoose-id-validator";

const partnersSchema = new Schema({
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
    roleId:{
        type: SchemaTypes.ObjectId,
        ref: "role",
        required: true
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
    createdBy: {
        type: SchemaTypes.ObjectId,
        ref: "user",
        required: true
    }
})

partnersSchema.plugin(idvalidator)

export const Partner = model('partner', partnersSchema)
